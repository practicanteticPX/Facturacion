import { prismaServ } from '../config/database.js';
import proveedorService from './proveedorService.js';
import personaService from './personaService.js';
import companiaService from './companiaService.js';
import docuprexService from './docuprexService.js';
import {
  validarObservaciones,
  validarCamposRequeridos
} from '../utils/validators.js';

// Excluye creadoEn/actualizadoEn: son TIMESTAMPTZ y el adapter WASM de Prisma
// no puede parsear el formato que envÃ­a PostgreSQL ('2025-12-09 15:33:35.83334-05')
const FACTURA_SELECT = {
  numeroControl: true, cia: true, ciaNit: true, nit: true, proveedor: true,
  numeroFactura: true, fechaRadicado: true, fechaFactura: true,
  facturaCredito: true, acuseReciboSCI: true, entregadaA: true,
  fechaEntrega: true, fechaRecepcionCausacion: true, recibidaPor: true,
  fechaRevisionCausacion: true, numeroCausacion: true, fechaCausacion: true,
  observaciones: true, enProceso: true, finalizado: true, causado: true,
};

class FacturaService {
  convertirBooleanos(factura) {
    // Los booleanos ya vienen correctamente de la base de datos
    return factura;
  }

  formatearFechaParaGraphQL(fecha) {
    if (!fecha) return null;
    if (typeof fecha === 'string') return fecha;

    // Si es un objeto Date, convertir a formato YYYY-MM-DD
    try {
      const fechaObj = new Date(fecha);
      if (isNaN(fechaObj.getTime())) return null;

      return fechaObj.toISOString().split('T')[0];
    } catch (error) {
      console.error('Error formateando fecha:', error);
      return null;
    }
  }

  formatearFactura(factura) {
    return this.convertirBooleanos({
      ...factura,
      fechaRadicado: this.formatearFechaParaGraphQL(factura.fechaRadicado),
      fechaFactura: this.formatearFechaParaGraphQL(factura.fechaFactura),
      fechaEntrega: this.formatearFechaParaGraphQL(factura.fechaEntrega),
      fechaRecepcionCausacion: this.formatearFechaParaGraphQL(factura.fechaRecepcionCausacion),
      fechaRevisionCausacion: this.formatearFechaParaGraphQL(factura.fechaRevisionCausacion),
      fechaCausacion: this.formatearFechaParaGraphQL(factura.fechaCausacion),
      creadoEn: factura.creadoEn ? factura.creadoEn.toISOString() : null,
      actualizadoEn: factura.actualizadoEn ? factura.actualizadoEn.toISOString() : null,
      enProceso: factura.enProceso || false,
      finalizado: factura.finalizado || false,
      causado: factura.causado || false
    });
  }

  async obtenerNumeroControlDesdeSecuencia(reservar = false) {
    const [result] = reservar
      ? await prismaServ.$queryRaw`
          SELECT nextval(pg_get_serial_sequence('crud_facturas."T_Facturas"', 'numero_control'))::int AS numero
        `
      : await prismaServ.$queryRaw`
          WITH sequence_info AS (
            SELECT pg_get_serial_sequence('crud_facturas."T_Facturas"', 'numero_control') AS sequence_name
          )
          SELECT (
            CASE
              WHEN s.last_value IS NULL THEN s.start_value
              ELSE s.last_value + s.increment_by
            END
          )::int AS numero
          FROM pg_sequences s
          JOIN sequence_info si
            ON format('%I.%I', s.schemaname, s.sequencename) = si.sequence_name
        `;

    const numeroControl = Number(result?.numero);

    if (!Number.isInteger(numeroControl) || numeroControl <= 0) {
      throw new Error('No se pudo obtener un numero de control valido desde la secuencia');
    }

    return numeroControl.toString();
  }

  async obtenerProximoNumeroControl() {
    try {
      const proximoNumero = await this.obtenerNumeroControlDesdeSecuencia(false);
      console.log(`Proximo numero de control: ${proximoNumero}`);
      return proximoNumero;
    } catch (error) {
      console.error('Error obteniendo proximo numero de control:', error);
      throw error;
    }
  }

  async reservarNumeroControl() {
    try {
      const numeroControl = await this.obtenerNumeroControlDesdeSecuencia(true);
      console.log(`Numero de control reservado: ${numeroControl}`);
      return numeroControl;
    } catch (error) {
      console.error('Error reservando numero de control:', error);
      throw error;
    }
  }

  async crearFactura(datos, archivo = null) {
    try {
      const camposRequeridos = [
        'numeroControl',
        'cia',
        'nit',
        'numeroFactura',
        'fechaRadicado',
        'fechaFactura'
      ];
      validarCamposRequeridos(datos, camposRequeridos);

      if (!archivo) {
        throw new Error('Debe adjuntar el PDF de la factura para poder inscribirla');
      }

      await companiaService.validarCompaniaExiste(datos.cia);

      const nombreProveedor = await proveedorService.validarYObtenerNombreProveedor(datos.nit);

      if (datos.entregadaA) {
        await personaService.validarPersonaExiste(datos.entregadaA);
      }

      const nuevoNumeroControl = parseInt(datos.numeroControl, 10);

      if (!Number.isInteger(nuevoNumeroControl) || nuevoNumeroControl <= 0) {
        throw new Error('El campo numeroControl debe ser un numero entero positivo');
      }

      const facturaExistente = await prismaServ.factura.findUnique({
        where: { numeroControl: nuevoNumeroControl },
        select: { numeroControl: true }
      });

      if (facturaExistente) {
        throw new Error(`Ya existe una factura con el numero de control ${nuevoNumeroControl}`);
      }

      const ciaNit = proveedorService.generarCiaNit(datos.cia, datos.nit);

      const factura = await prismaServ.factura.create({
        data: {
          numeroControl: nuevoNumeroControl,
          cia: datos.cia,
          ciaNit: ciaNit,
          nit: datos.nit,
          proveedor: nombreProveedor,
          numeroFactura: datos.numeroFactura,
          fechaRadicado: new Date(datos.fechaRadicado),
          fechaFactura: new Date(datos.fechaFactura),
          facturaCredito: datos.facturaCredito || false,
          acuseReciboSCI: datos.acuseReciboSCI || false,
          entregadaA: datos.entregadaA || '',
          fechaEntrega: datos.fechaEntrega ? new Date(datos.fechaEntrega) : new Date()
        },
        // Evita que Prisma lea created_at/updated_at al devolver la fila insertada.
        // Con el adapter pg actual, TIMESTAMPTZ puede llegar en un formato que no parsea bien.
        select: { numeroControl: true }
      });

      await prismaServ.$queryRaw`
        SELECT setval(
          pg_get_serial_sequence('crud_facturas."T_Facturas"', 'numero_control'),
          GREATEST(
            ${nuevoNumeroControl},
            COALESCE((SELECT MAX(numero_control)::int FROM crud_facturas."T_Facturas"), ${nuevoNumeroControl})
          ),
          true
        )
      `;

      console.log('Ingreso directo a DocuPrex: verificando datos...');
      console.log('EntregadaA:', datos.entregadaA);
      console.log('Archivo:', archivo ? `SI (${archivo.filename})` : 'NO');

      if (datos.entregadaA && archivo) {
        try {
          const correoDestinatario = await personaService.obtenerCorreoPorNombre(datos.entregadaA);

          await docuprexService.enviarFacturaADocuprex({
            factura: {
              numeroControl: nuevoNumeroControl,
              cia: datos.cia,
              proveedor: nombreProveedor,
              numeroFactura: datos.numeroFactura,
              fechaFactura: datos.fechaFactura,
              fechaEntrega: datos.fechaEntrega ? new Date(datos.fechaEntrega).toISOString() : new Date().toISOString(),
              entregadaA: datos.entregadaA
            },
            correoDestinatario,
            archivo
          });

          console.log(`Factura enviada a DocuPrex exitosamente para ${correoDestinatario}`);
        } catch (docuprexError) {
          console.error('Error al enviar factura a DocuPrex (factura creada exitosamente):', docuprexError);
          console.error('Stack trace:', docuprexError.stack);
        }

        return await this.obtenerFacturaCompleta(factura.numeroControl);
      }

      console.log(
        'No se enviara a DocuPrex:',
        !datos.entregadaA ? 'No hay destinatario' : 'No aplica'
      );
      return await this.obtenerFacturaCompleta(factura.numeroControl);

      // Enviar correo si hay destinatario. El adjunto es opcional.
      console.log('ðŸ“§ Verificando envÃ­o de correo...');
      console.log('ðŸ“§ EntregadaA:', datos.entregadaA);
      console.log('ðŸ“§ Archivo:', archivo ? `SÃ (${archivo.filename})` : 'NO');

      if (datos.entregadaA) {
        try {
          console.log('ðŸ“§ Obteniendo correo de:', datos.entregadaA);
          const correoDestinatario = await personaService.obtenerCorreoPorNombre(datos.entregadaA);
          console.log('ðŸ“§ Correo obtenido:', correoDestinatario);

          console.log('ðŸ“§ Enviando correo...');
          await emailService.enviarCorreoFactura({
            to: correoDestinatario,
            numeroControl: nuevoNumeroControl,
            numeroFactura: datos.numeroFactura,
            proveedor: nombreProveedor,
            archivo: archivo
          });

          console.log(`âœ… Correo de factura enviado exitosamente a ${correoDestinatario}`);
        } catch (emailError) {
          console.error('âŒ Error al enviar correo de factura (factura creada exitosamente):', emailError);
          console.error('âŒ Stack trace:', emailError.stack);
          // No lanzamos el error para que la factura se cree aunque falle el correo
        }
      } else {
        console.log('âš ï¸ No se enviarÃ¡ correo:',
          'No hay destinatario'
        );
      }

      return await this.obtenerFacturaCompleta(factura.numeroControl);
    } catch (error) {
      console.error('Error creando factura:', error);
      throw error;
    }
  }

  async obtenerFacturaCompleta(numeroControl) {
    const factura = await prismaServ.factura.findUnique({
      where: { numeroControl: parseInt(numeroControl) },
      select: FACTURA_SELECT
    });

    if (!factura) {
      throw new Error(`Factura con nÃºmero de control ${numeroControl} no encontrada`);
    }

    return this.formatearFactura({
      ...factura,
      ciaNit: proveedorService.generarCiaNit(factura.cia, factura.nit),
      proveedor: factura.proveedor || 'Proveedor no encontrado'
    });
  }

  async obtenerTodasLasFacturas(filtros = {}) {
    try {
      const where = {};

      if (filtros.cia) {
        where.cia = filtros.cia;
      }

      if (filtros.nit) {
        where.nit = filtros.nit;
      }

      if (filtros.numeroControl) {
        // numeroControl es Int, convertir y buscar por igualdad
        const numeroControlInt = parseInt(filtros.numeroControl);
        if (!isNaN(numeroControlInt)) {
          where.numeroControl = numeroControlInt;
        }
      }

      // PaginaciÃ³n: valores por defecto
      const page = filtros.page || 1;
      const pageSize = filtros.pageSize || 100;
      const skip = (page - 1) * pageSize;

      // Consultar total de registros (para calcular hasMore)
      const total = await prismaServ.factura.count({ where });

      // Consultar facturas con paginaciÃ³n
      const facturas = await prismaServ.factura.findMany({
        where,
        select: FACTURA_SELECT,
        orderBy: {
          numeroControl: 'desc'
        },
        skip,
        take: pageSize
      });

      // El proveedor ya estÃ¡ almacenado en la tabla, no necesitamos hacer lookups individuales
      const facturasCompletas = facturas.map((factura) => {
        return this.formatearFactura({
          ...factura,
          ciaNit: proveedorService.generarCiaNit(factura.cia, factura.nit),
          proveedor: factura.proveedor || 'Proveedor no encontrado'
        });
      });

      return {
        facturas: facturasCompletas,
        total,
        page,
        pageSize,
        hasMore: skip + facturas.length < total
      };
    } catch (error) {
      console.error('Error obteniendo facturas:', error);
      throw new Error('Error al obtener las facturas');
    }
  }

  async actualizarFactura(numeroControl, datos) {
    try {
      const facturaExistente = await prismaServ.factura.findUnique({
        where: { numeroControl: parseInt(numeroControl) },
        select: FACTURA_SELECT
      });

      if (!facturaExistente) {
        throw new Error(`Factura con nÃºmero de control ${numeroControl} no encontrada`);
      }

      // Validar que la factura no estÃ© en proceso
      if (facturaExistente.enProceso) {
        throw new Error('No se puede editar una factura que estÃ¡ en proceso');
      }

      if (datos.cia) {
        await companiaService.validarCompaniaExiste(datos.cia);
      }

      let nombreProveedor = null;
      if (datos.nit) {
        nombreProveedor = await proveedorService.validarYObtenerNombreProveedor(datos.nit);
      }

      if (datos.entregadaA) {
        await personaService.validarPersonaExiste(datos.entregadaA);
      }

      if (datos.recibidaPor) {
        await personaService.validarPersonaExiste(datos.recibidaPor);
      }

      if (datos.observaciones) {
        validarObservaciones(datos.observaciones);
      }

      const datosActualizacion = {};

      const camposPermitidos = [
        'cia', 'nit', 'numeroFactura', 'fechaRadicado', 'fechaFactura',
        'facturaCredito', 'acuseReciboSCI', 'entregadaA', 'fechaEntrega',
        'fechaRecepcionCausacion', 'recibidaPor', 'fechaRevisionCausacion',
        'numeroCausacion', 'fechaCausacion', 'observaciones'
      ];

      const camposBooleanos = ['facturaCredito', 'acuseReciboSCI'];

      camposPermitidos.forEach(campo => {
        if (datos[campo] !== undefined) {
          if (campo.includes('fecha')) {
            // Solo crear Date si la fecha no estÃ¡ vacÃ­a y es vÃ¡lida
            if (datos[campo] && datos[campo].trim() !== '') {
              const fecha = new Date(datos[campo]);
              // Verificar que la fecha sea vÃ¡lida
              if (!isNaN(fecha.getTime())) {
                datosActualizacion[campo] = fecha;
              } else {
                datosActualizacion[campo] = null;
              }
            } else {
              // Si estÃ¡ vacÃ­a, establecer como null
              datosActualizacion[campo] = null;
            }
          } else if (camposBooleanos.includes(campo)) {
            // Los booleanos se guardan directamente
            datosActualizacion[campo] = datos[campo] || false;
          } else {
            datosActualizacion[campo] = datos[campo];
          }
        }
      });

      if (datos.cia || datos.nit) {
        const ciaFinal = datos.cia || facturaExistente.cia;
        const nitFinal = datos.nit || facturaExistente.nit;
        datosActualizacion.ciaNit = proveedorService.generarCiaNit(ciaFinal, nitFinal);
      }

      if (nombreProveedor) {
        datosActualizacion.proveedor = nombreProveedor;
      }

      const facturaActualizada = await prismaServ.factura.update({
        where: { numeroControl: parseInt(numeroControl) },
        data: datosActualizacion,
        select: { numeroControl: true }
      });



      return await this.obtenerFacturaCompleta(facturaActualizada.numeroControl);
    } catch (error) {
      console.error('Error actualizando factura:', error);
      throw error;
    }
  }
}

export default new FacturaService();








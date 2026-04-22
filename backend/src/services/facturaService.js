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
// no puede parsear el formato que envía PostgreSQL ('2025-12-09 15:33:35.83334-05')
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

  async obtenerProximoNumeroControl() {
    try {
      // Obtener todos los números de control para encontrar el máximo correctamente
      const facturas = await prismaServ.factura.findMany({
        select: {
          numeroControl: true
        }
      });

      // Si no hay facturas, empezar desde 1
      if (facturas.length === 0) {
        return '1';
      }

      // Convertir todos los números de control a enteros y encontrar el máximo
      const numerosControl = facturas
        .map(f => parseInt(f.numeroControl))
        .filter(n => !isNaN(n)); // Filtrar valores no numéricos

      const maxNumero = numerosControl.length > 0
        ? Math.max(...numerosControl)
        : 0;

      // El próximo número es el máximo + 1
      const proximoNumero = maxNumero + 1;

      // Verificar que el número no exista (seguridad adicional)
      const existe = await prismaServ.factura.findFirst({
        where: {
          numeroControl: proximoNumero
        }
      });

      // Si existe (caso extremo), buscar el siguiente disponible
      if (existe) {
        console.warn(`⚠️ Número de control ${proximoNumero} ya existe, buscando siguiente disponible...`);
        let numeroDisponible = proximoNumero + 1;
        let existeNumero = true;

        while (existeNumero) {
          existeNumero = await prismaServ.factura.findFirst({
            where: {
              numeroControl: numeroDisponible
            }
          });
          if (existeNumero) {
            numeroDisponible++;
          }
        }

        return numeroDisponible.toString();
      }

      console.log(`✅ Próximo número de control: ${proximoNumero}`);
      return proximoNumero.toString();
    } catch (error) {
      console.error('Error obteniendo próximo número de control:', error);
      throw error;
    }
  }

  async crearFactura(datos, archivo = null) {
    try {
      const camposRequeridos = [
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

      const nuevoNumeroControl = await this.obtenerProximoNumeroControl();

      const ciaNit = proveedorService.generarCiaNit(datos.cia, datos.nit);

      const factura = await prismaServ.factura.create({
        data: {
          numeroControl: parseInt(nuevoNumeroControl),
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
      console.log('📧 Verificando envío de correo...');
      console.log('📧 EntregadaA:', datos.entregadaA);
      console.log('📧 Archivo:', archivo ? `SÍ (${archivo.filename})` : 'NO');

      if (datos.entregadaA) {
        try {
          console.log('📧 Obteniendo correo de:', datos.entregadaA);
          const correoDestinatario = await personaService.obtenerCorreoPorNombre(datos.entregadaA);
          console.log('📧 Correo obtenido:', correoDestinatario);

          console.log('📧 Enviando correo...');
          await emailService.enviarCorreoFactura({
            to: correoDestinatario,
            numeroControl: nuevoNumeroControl,
            numeroFactura: datos.numeroFactura,
            proveedor: nombreProveedor,
            archivo: archivo
          });

          console.log(`✅ Correo de factura enviado exitosamente a ${correoDestinatario}`);
        } catch (emailError) {
          console.error('❌ Error al enviar correo de factura (factura creada exitosamente):', emailError);
          console.error('❌ Stack trace:', emailError.stack);
          // No lanzamos el error para que la factura se cree aunque falle el correo
        }
      } else {
        console.log('⚠️ No se enviará correo:',
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
      throw new Error(`Factura con número de control ${numeroControl} no encontrada`);
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

      // Paginación: valores por defecto
      const page = filtros.page || 1;
      const pageSize = filtros.pageSize || 100;
      const skip = (page - 1) * pageSize;

      // Consultar total de registros (para calcular hasMore)
      const total = await prismaServ.factura.count({ where });

      // Consultar facturas con paginación
      const facturas = await prismaServ.factura.findMany({
        where,
        select: FACTURA_SELECT,
        orderBy: {
          numeroControl: 'desc'
        },
        skip,
        take: pageSize
      });

      // El proveedor ya está almacenado en la tabla, no necesitamos hacer lookups individuales
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
        throw new Error(`Factura con número de control ${numeroControl} no encontrada`);
      }

      // Validar que la factura no esté en proceso
      if (facturaExistente.enProceso) {
        throw new Error('No se puede editar una factura que está en proceso');
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
            // Solo crear Date si la fecha no está vacía y es válida
            if (datos[campo] && datos[campo].trim() !== '') {
              const fecha = new Date(datos[campo]);
              // Verificar que la fecha sea válida
              if (!isNaN(fecha.getTime())) {
                datosActualizacion[campo] = fecha;
              } else {
                datosActualizacion[campo] = null;
              }
            } else {
              // Si está vacía, establecer como null
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

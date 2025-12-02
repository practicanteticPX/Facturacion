import { prismaServ } from '../config/database.js';
import proveedorService from './proveedorService.js';
import personaService from './personaService.js';
import companiaService from './companiaService.js';
import emailService from './emailService.js';
import {
  validarObservaciones,
  validarCamposRequeridos
} from '../utils/validators.js';

class FacturaService {
  convertirBooleanos(factura) {
    return {
      ...factura,
      facturaCredito: factura.facturaCredito === 'Si',
      acuseReciboSCI: factura.acuseReciboSCI === 'Si',
      legalizaAnticipo: factura.legalizaAnticipo === 'Si'
    };
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
      actualizadoEn: factura.actualizadoEn ? factura.actualizadoEn.toISOString() : null
    });
  }

  async obtenerProximoNumeroControl() {
    try {
      const ultimaFactura = await prismaServ.factura.findFirst({
        orderBy: {
          numeroControl: 'desc'
        },
        select: {
          numeroControl: true
        }
      });

      const proximoNumeroControl = ultimaFactura
        ? (parseInt(ultimaFactura.numeroControl) + 1).toString()
        : '1';

      return proximoNumeroControl;
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

      await companiaService.validarCompaniaExiste(datos.cia);

      const nombreProveedor = await proveedorService.validarYObtenerNombreProveedor(datos.nit);

      if (datos.entregadaA) {
        await personaService.validarPersonaExiste(datos.entregadaA);
      }

      const nuevoNumeroControl = await this.obtenerProximoNumeroControl();

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
          facturaCredito: datos.facturaCredito ? 'Si' : 'No',
          acuseReciboSCI: datos.acuseReciboSCI ? 'Si' : 'No',
          legalizaAnticipo: datos.legalizaAnticipo ? 'Si' : 'No',
          entregadaA: datos.entregadaA || '',
          fechaEntrega: datos.fechaEntrega ? new Date(datos.fechaEntrega) : new Date()
        }
      });

      // Enviar correo si hay destinatario y archivo adjunto
      console.log('📧 Verificando envío de correo...');
      console.log('📧 EntregadaA:', datos.entregadaA);
      console.log('📧 Archivo:', archivo ? `SÍ (${archivo.filename})` : 'NO');

      if (datos.entregadaA && archivo) {
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
          !datos.entregadaA ? 'No hay destinatario' : 'No hay archivo adjunto'
        );
      }

      return await this.obtenerFacturaCompleta(factura.id);
    } catch (error) {
      console.error('Error creando factura:', error);
      throw error;
    }
  }

  async obtenerFacturaCompleta(id) {
    const factura = await prismaServ.factura.findUnique({
      where: { id }
    });

    if (!factura) {
      throw new Error(`Factura con ID ${id} no encontrada`);
    }

    let proveedor = null;
    try {
      proveedor = await proveedorService.obtenerProveedorPorNit(factura.nit);
    } catch (error) {
      console.warn(`Proveedor no encontrado para NIT ${factura.nit}`);
    }

    return this.formatearFactura({
      ...factura,
      ciaNit: proveedorService.generarCiaNit(factura.cia, factura.nit),
      proveedor: proveedor ? proveedor.Nombre : 'Proveedor no encontrado'
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
        where.numeroControl = { contains: filtros.numeroControl };
      }

      const facturas = await prismaServ.factura.findMany({
        where,
        orderBy: {
          creadoEn: 'desc'
        }
      });

      const facturasCompletas = await Promise.all(
        facturas.map(async (factura) => {
          let proveedor = null;
          try {
            proveedor = await proveedorService.obtenerProveedorPorNit(factura.nit);
          } catch (error) {
            console.warn(`Proveedor no encontrado para NIT ${factura.nit}`);
          }

          return this.formatearFactura({
            ...factura,
            ciaNit: proveedorService.generarCiaNit(factura.cia, factura.nit),
            proveedor: proveedor ? proveedor.Nombre : 'Proveedor no encontrado'
          });
        })
      );

      return facturasCompletas;
    } catch (error) {
      console.error('Error obteniendo facturas:', error);
      throw new Error('Error al obtener las facturas');
    }
  }

  async actualizarFactura(id, datos) {
    try {
      const facturaExistente = await prismaServ.factura.findUnique({
        where: { id }
      });

      if (!facturaExistente) {
        throw new Error(`Factura con ID ${id} no encontrada`);
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
        'numeroControl', 'cia', 'nit', 'numeroFactura', 'fechaRadicado', 'fechaFactura',
        'facturaCredito', 'acuseReciboSCI', 'legalizaAnticipo', 'entregadaA', 'fechaEntrega',
        'fechaRecepcionCausacion', 'recibidaPor', 'fechaRevisionCausacion',
        'numeroCausacion', 'fechaCausacion', 'observaciones'
      ];

      const camposBooleanos = ['facturaCredito', 'acuseReciboSCI', 'legalizaAnticipo'];

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
            // Convertir booleanos a "Si"/"No" para la BD
            datosActualizacion[campo] = datos[campo] ? 'Si' : 'No';
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
        where: { id },
        data: datosActualizacion
      });

      return await this.obtenerFacturaCompleta(facturaActualizada.id);
    } catch (error) {
      console.error('Error actualizando factura:', error);
      throw error;
    }
  }
}

export default new FacturaService();

import { prismaServ } from '../config/database.js';
import proveedorService from './proveedorService.js';
import personaService from './personaService.js';
import companiaService from './companiaService.js';
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

  async crearFactura(datos) {
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

    return this.convertirBooleanos({
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

          return this.convertirBooleanos({
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

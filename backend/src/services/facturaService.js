import { prismaServ } from '../config/database.js';
import proveedorService from './proveedorService.js';
import personaService from './personaService.js';
import companiaService from './companiaService.js';
import {
  validarElaboroPlantilla,
  validarObservaciones,
  validarCamposRequeridos
} from '../utils/validators.js';

class FacturaService {
  async crearFactura(datos) {
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

      await companiaService.validarCompaniaExiste(datos.cia);

      await proveedorService.validarYObtenerNombreProveedor(datos.nit);

      if (datos.entregadaA) {
        await personaService.validarPersonaExiste(datos.entregadaA);
      }

      if (datos.elaboroPlantilla) {
        validarElaboroPlantilla(datos.elaboroPlantilla);
      }

      const factura = await prismaServ.factura.create({
        data: {
          numeroControl: datos.numeroControl,
          cia: datos.cia,
          nit: datos.nit,
          numeroFactura: datos.numeroFactura,
          fechaRadicado: new Date(datos.fechaRadicado),
          fechaFactura: new Date(datos.fechaFactura),
          facturaCredito: datos.facturaCredito || false,
          acuseReciboSCI: datos.acuseReciboSCI || false,
          entregadaA: datos.entregadaA || null,
          fechaEntrega: datos.fechaEntrega ? new Date(datos.fechaEntrega) : null,
          elaboroPlantilla: datos.elaboroPlantilla || null
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

    return {
      ...factura,
      ciaNit: proveedorService.generarCiaNit(factura.cia, factura.nit),
      proveedor: proveedor ? proveedor.Nombre : 'Proveedor no encontrado'
    };
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

          return {
            ...factura,
            ciaNit: proveedorService.generarCiaNit(factura.cia, factura.nit),
            proveedor: proveedor ? proveedor.Nombre : 'Proveedor no encontrado'
          };
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

      if (datos.nit) {
        await proveedorService.validarYObtenerNombreProveedor(datos.nit);
      }

      if (datos.entregadaA) {
        await personaService.validarPersonaExiste(datos.entregadaA);
      }

      if (datos.recibidaPor) {
        await personaService.validarPersonaExiste(datos.recibidaPor);
      }

      if (datos.elaboroPlantilla) {
        validarElaboroPlantilla(datos.elaboroPlantilla);
      }

      if (datos.observaciones) {
        validarObservaciones(datos.observaciones);
      }

      const datosActualizacion = {};

      const camposPermitidos = [
        'numeroControl', 'cia', 'nit', 'numeroFactura', 'fechaRadicado', 'fechaFactura',
        'facturaCredito', 'acuseReciboSCI', 'entregadaA', 'fechaEntrega', 'elaboroPlantilla',
        'fechaRecepcionCausacion', 'recibidaPor', 'fechaRevisionCausacion',
        'numeroCausacion', 'fechaCausacion', 'observaciones'
      ];

      camposPermitidos.forEach(campo => {
        if (datos[campo] !== undefined) {
          if (campo.includes('fecha') && datos[campo]) {
            datosActualizacion[campo] = new Date(datos[campo]);
          } else {
            datosActualizacion[campo] = datos[campo];
          }
        }
      });

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

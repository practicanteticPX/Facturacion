import facturaService from '../services/facturaService.js';
import personaService from '../services/personaService.js';
import proveedorService from '../services/proveedorService.js';
import companiaService from '../services/companiaService.js';
import authService from '../services/authService.js';
import { OPCIONES_PLANTILLA, OBSERVACIONES } from '../utils/constants.js';

export const resolvers = {
  Query: {
    facturas: async (_, { filtros }) => {
      return await facturaService.obtenerTodasLasFacturas(filtros || {});
    },

    factura: async (_, { id }) => {
      return await facturaService.obtenerFacturaCompleta(id);
    },

    proximoNumeroControl: async () => {
      return await facturaService.obtenerProximoNumeroControl();
    },

    personas: async () => {
      return await personaService.obtenerTodasLasPersonas();
    },

    proveedor: async (_, { nit }) => {
      return await proveedorService.obtenerProveedorPorNit(nit);
    },

    companias: async () => {
      const companias = await companiaService.obtenerTodasLasCompanias();
      return companias.map(c => c.cia);
    },

    opcionesPlantilla: () => {
      return Object.values(OPCIONES_PLANTILLA);
    },

    opcionesObservaciones: () => {
      return Object.values(OBSERVACIONES);
    }
  },

  Mutation: {
    login: async (_, { input }) => {
      try {
        const result = await authService.login(input.username, input.password);
        return result;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    crearFactura: async (_, { input }) => {
      return await facturaService.crearFactura(input);
    },

    actualizarFactura: async (_, { id, input }) => {
      return await facturaService.actualizarFactura(id, input);
    }
  }
};

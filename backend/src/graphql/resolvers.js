import facturaService from '../services/facturaService.js';
import personaService from '../services/personaService.js';
import proveedorService from '../services/proveedorService.js';
import companiaService from '../services/companiaService.js';
import authService from '../services/authService.js';
import { OPCIONES_PLANTILLA, OBSERVACIONES } from '../utils/constants.js';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';

export const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    facturas: async (_, { filtros }) => {
      return await facturaService.obtenerTodasLasFacturas(filtros || {});
    },

    factura: async (_, { numeroControl }) => {
      return await facturaService.obtenerFacturaCompleta(numeroControl);
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

    crearFactura: async (_, { input, archivo }) => {
      console.log('🔵 Creando factura - Input:', JSON.stringify(input, null, 2));
      console.log('🔵 Archivo recibido:', archivo ? 'SÍ' : 'NO');

      let archivoData = null;

      if (archivo) {
        try {
          const { createReadStream, filename, mimetype } = await archivo;
          const stream = createReadStream();

          // Leer el archivo en un buffer
          const chunks = [];
          for await (const chunk of stream) {
            chunks.push(chunk);
          }
          const buffer = Buffer.concat(chunks);

          archivoData = {
            filename,
            mimetype,
            buffer
          };

          console.log(`✓ Archivo procesado: ${filename} (${mimetype}, ${buffer.length} bytes)`);
        } catch (error) {
          console.error('❌ Error procesando archivo:', error);
          // Continuar sin archivo si hay error
        }
      }

      return await facturaService.crearFactura(input, archivoData);
    },

    actualizarFactura: async (_, { numeroControl, input }) => {
      return await facturaService.actualizarFactura(numeroControl, input);
    }
  }
};

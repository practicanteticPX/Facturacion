import { prismaDb } from '../config/database.js';

class ProveedorService {
  async obtenerProveedorPorNit(nit) {
    try {
      // Limpiar el NIT: quitar espacios en blanco al inicio y al final
      const nitLimpio = nit?.trim();

      if (!nitLimpio) {
        throw new Error('NIT no proporcionado');
      }

      console.log(`🔍 Buscando proveedor con NIT: "${nitLimpio}"`);

      const proveedor = await prismaDb.proveedor.findFirst({
        where: { Nit: nitLimpio }
      });

      if (!proveedor) {
        throw new Error(`Proveedor con NIT ${nitLimpio} no encontrado`);
      }

      console.log(`✅ Proveedor encontrado: ${proveedor.Nombre}`);
      return proveedor;
    } catch (error) {
      console.error('Error obteniendo proveedor:', error);
      throw error;
    }
  }

  generarCiaNit(cia, nit) {
    return `${cia}${nit}`;
  }

  async validarYObtenerNombreProveedor(nit) {
    const proveedor = await this.obtenerProveedorPorNit(nit);
    return proveedor.Nombre;
  }
}

export default new ProveedorService();

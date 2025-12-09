import { prismaServ } from '../config/database.js';

class CompaniaService {
  async obtenerTodasLasCompanias() {
    try {
      const companias = await prismaServ.$queryRaw`
        SELECT id, cia
        FROM crud_facturas."T_Cias"
        ORDER BY cia ASC
      `;
      return companias;
    } catch (error) {
      console.error('Error obteniendo compañías:', error);
      throw new Error('Error al obtener la lista de compañías');
    }
  }

  async obtenerCompaniaPorCodigo(codigo) {
    try {
      const companias = await prismaServ.$queryRaw`
        SELECT id, cia
        FROM crud_facturas."T_Cias"
        WHERE cia = ${codigo}
        LIMIT 1
      `;
      return companias.length > 0 ? companias[0] : null;
    } catch (error) {
      console.error('Error obteniendo compañía:', error);
      throw error;
    }
  }

  async validarCompaniaExiste(codigo) {
    const compania = await this.obtenerCompaniaPorCodigo(codigo);

    if (!compania) {
      throw new Error(`Compañía con código ${codigo} no encontrada en la base de datos`);
    }

    return true;
  }

  async obtenerCodigosCompanias() {
    const companias = await this.obtenerTodasLasCompanias();
    return companias.map(c => c.cia);
  }
}

export default new CompaniaService();

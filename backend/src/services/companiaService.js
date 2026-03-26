import { poolServ } from '../config/database.js';

class CompaniaService {
  async obtenerTodasLasCompanias() {
    try {
      const { rows } = await poolServ.query(
        `SELECT id, cia FROM crud_facturas."T_Cias" ORDER BY cia ASC`
      );
      return rows;
    } catch (error) {
      console.error('Error obteniendo compañías:', error);
      throw new Error('Error al obtener la lista de compañías');
    }
  }

  async obtenerCompaniaPorCodigo(codigo) {
    try {
      const { rows } = await poolServ.query(
        `SELECT id, cia FROM crud_facturas."T_Cias" WHERE cia = $1 LIMIT 1`,
        [codigo]
      );
      return rows.length > 0 ? rows[0] : null;
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

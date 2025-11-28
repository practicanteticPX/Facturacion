import { prismaServ } from '../config/database.js';

class CompaniaService {
  async obtenerTodasLasCompanias() {
    try {
      const companias = await prismaServ.compania.findMany({
        orderBy: {
          cia: 'asc'
        }
      });
      return companias;
    } catch (error) {
      console.error('Error obteniendo compañías:', error);
      throw new Error('Error al obtener la lista de compañías');
    }
  }

  async obtenerCompaniaPorCodigo(codigo) {
    try {
      const compania = await prismaServ.compania.findFirst({
        where: { cia: codigo }
      });
      return compania;
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

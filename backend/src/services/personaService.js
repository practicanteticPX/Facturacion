import { prismaServ } from '../config/database.js';

class PersonaService {
  async obtenerTodasLasPersonas() {
    try {
      const personas = await prismaServ.persona.findMany({
        orderBy: {
          nombre: 'asc'
        }
      });
      return personas;
    } catch (error) {
      console.error('Error obteniendo personas:', error);
      throw new Error('Error al obtener la lista de colaboradores');
    }
  }

  async validarPersonaExiste(nombre) {
    const persona = await prismaServ.persona.findFirst({
      where: { nombre }
    });

    if (!persona) {
      throw new Error(`Persona ${nombre} no encontrada en la base de datos`);
    }

    return true;
  }
}

export default new PersonaService();

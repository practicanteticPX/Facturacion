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
      where: {
        nombre: {
          equals: nombre,
          mode: 'insensitive'
        }
      }
    });

    if (!persona) {
      throw new Error(`Persona ${nombre} no encontrada en la base de datos`);
    }

    return true;
  }

  async obtenerCorreoPorNombre(nombre) {
    try {
      const persona = await prismaServ.persona.findFirst({
        where: {
          nombre: {
            equals: nombre,
            mode: 'insensitive'
          }
        },
        select: {
          correo: true,
          nombre: true
        }
      });

      if (!persona) {
        throw new Error(`Persona ${nombre} no encontrada en la base de datos`);
      }

      if (!persona.correo) {
        throw new Error(`La persona ${nombre} no tiene correo electrónico registrado`);
      }

      return persona.correo;
    } catch (error) {
      console.error('Error obteniendo correo de persona:', error);
      throw error;
    }
  }
}

export default new PersonaService();

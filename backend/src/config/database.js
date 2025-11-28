import { PrismaClient as PrismaClient1 } from '../generated/client1/index.js';
import { PrismaClient as PrismaClient2 } from '../generated/client2/index.js';

export const prismaServ = new PrismaClient1();
export const prismaDb = new PrismaClient2();

export const connectDatabases = async () => {
  try {
    await prismaServ.$connect();
    console.log('✅ Conectado a SERV_QPREX (Escritura)');

    await prismaDb.$connect();
    console.log('✅ Conectado a DB_QPREX (Solo Lectura)');
  } catch (error) {
    console.error('❌ Error conectando a las bases de datos:', error);
    process.exit(1);
  }
};

export const disconnectDatabases = async () => {
  await prismaServ.$disconnect();
  await prismaDb.$disconnect();
  console.log('Desconectado de las bases de datos');
};

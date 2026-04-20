import { PrismaClient as PrismaClient1 } from '../generated/client1/index.js';
import { PrismaClient as PrismaClient2 } from '../generated/client2/index.js';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Exportados como let para que los módulos que importan tengan live binding
// tras la inicialización en connectDatabases()
export let prismaServ;
export let prismaDb;
export let poolServ; // Pool pg directo para queries sin modelo Prisma (ej. tablas sin PK)

function buildSSL() {
  // En Docker: CERTS_PATH=/app/certs | En local: CERTS_PATH=D:/facturacion/certs
  const certsPath = process.env.CERTS_PATH ?? path.resolve(__dirname, '../../..', 'certs');
  return {
    rejectUnauthorized: false,
    ca:   fs.readFileSync(path.join(certsPath, 'ca-cert.pem')),
    cert: fs.readFileSync(path.join(certsPath, 'admin-cert.pem')),
    key:  fs.readFileSync(path.join(certsPath, 'admin-key.pk8')),
  };
}

function createPool(connectionString, ssl) {
  const url = new URL(connectionString);
  ['sslcert', 'sslkey', 'sslrootcert', 'sslmode'].forEach(p => url.searchParams.delete(p));
  return new pg.Pool({ connectionString: url.toString(), ssl });
}

export const connectDatabases = async () => {
  try {
    const ssl = buildSSL();

    poolServ = createPool(process.env.DATABASE_URL, ssl);

    prismaServ = new PrismaClient1({
      adapter: new PrismaPg(poolServ),
    });
    prismaDb = new PrismaClient2({
      adapter: new PrismaPg(createPool(process.env.DATABASE_URL_2, ssl)),
    });

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
  await prismaServ?.$disconnect();
  await prismaDb?.$disconnect();
  console.log('Desconectado de las bases de datos');
};

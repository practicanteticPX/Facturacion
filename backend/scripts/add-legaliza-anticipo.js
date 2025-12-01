/**
 * Script para agregar el campo legaliza_anticipo a la tabla T_Facturas
 * Ejecutar con: node scripts/add-legaliza-anticipo.js
 */

import { PrismaClient } from '../src/generated/client1/index.js';

const prisma = new PrismaClient();

async function addLegalizaAnticipoField() {
  try {
    console.log('Conectando a la base de datos...');

    // Verificar si la columna ya existe
    const checkColumnQuery = `
      SELECT column_name
      FROM information_schema.columns
      WHERE table_schema = 'crud_facturas'
        AND table_name = 'T_Facturas'
        AND column_name = 'legaliza_anticipo'
    `;

    const result = await prisma.$queryRawUnsafe(checkColumnQuery);

    if (result.length > 0) {
      console.log('✓ La columna legaliza_anticipo ya existe en la tabla T_Facturas');
      return;
    }

    console.log('Agregando columna legaliza_anticipo...');

    // Agregar la columna
    const addColumnQuery = `
      ALTER TABLE "crud_facturas"."T_Facturas"
      ADD COLUMN "legaliza_anticipo" VARCHAR(2) NOT NULL DEFAULT 'No'
    `;

    await prisma.$executeRawUnsafe(addColumnQuery);

    console.log('✓ Columna legaliza_anticipo agregada exitosamente');

    // Agregar comentario
    const commentQuery = `
      COMMENT ON COLUMN "crud_facturas"."T_Facturas"."legaliza_anticipo"
      IS 'Indica si la factura legaliza un anticipo (Si/No)'
    `;

    await prisma.$executeRawUnsafe(commentQuery);

    console.log('✓ Comentario agregado a la columna');
    console.log('\n========================================');
    console.log('Campo legaliza_anticipo configurado correctamente');
    console.log('========================================\n');

  } catch (error) {
    console.error('Error ejecutando el script:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

addLegalizaAnticipoField();

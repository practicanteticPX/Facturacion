import { PrismaClient } from '../src/generated/client1/index.js';

const prisma = new PrismaClient();

async function checkTableColumns() {
  console.log('🔍 Verificando columnas de la tabla T_Facturas...\n');

  try {
    // Consultar las columnas de la tabla directamente desde PostgreSQL
    const columnas = await prisma.$queryRawUnsafe(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'crud_facturas'
      AND table_name = 'T_Facturas'
      ORDER BY ordinal_position;
    `);

    console.log('📋 Columnas encontradas en la tabla T_Facturas:');
    console.log('═'.repeat(80));

    columnas.forEach((col, index) => {
      console.log(`${index + 1}. ${col.column_name} (${col.data_type}) - Nullable: ${col.is_nullable}`);
    });

    console.log('═'.repeat(80));
    console.log(`\n✅ Total de columnas: ${columnas.length}\n`);

    // Buscar si existe una columna llamada 'existe'
    const tieneExiste = columnas.find(col => col.column_name === 'existe');
    if (tieneExiste) {
      console.log('⚠️  ¡ENCONTRADA! La tabla tiene una columna llamada "existe"');
    } else {
      console.log('✅ No existe una columna llamada "existe" en la tabla');
    }

  } catch (error) {
    console.error('❌ Error al verificar columnas:', error.message);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

checkTableColumns()
  .then(() => {
    console.log('\n✅ Verificación completada');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error fatal:', error);
    process.exit(1);
  });

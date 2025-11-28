import { config } from 'dotenv';
config();

import { prismaServ, prismaDb } from './src/config/database.js';

async function testConnection() {
  console.log('🔍 Probando conexión a las bases de datos...\n');

  try {
    console.log('📊 Probando SERV_QPREX...');

    const companias = await prismaServ.compania.findMany();
    console.log(`✅ Compañías encontradas: ${companias.length}`);
    companias.forEach(c => console.log(`   - ${c.codigo}: ${c.nombre}`));

    const personas = await prismaServ.persona.findMany({ take: 5 });
    console.log(`✅ Personas encontradas: ${personas.length} (mostrando primeras 5)`);
    personas.forEach(p => console.log(`   - ${p.nombre}`));

    console.log('\n📊 Probando DB_QPREX...');
    const proveedores = await prismaDb.proveedor.findMany({ take: 5 });
    console.log(`✅ Proveedores encontrados: ${proveedores.length} (mostrando primeros 5)`);
    proveedores.forEach(p => console.log(`   - ${p.Codigo}: ${p.Nombre}`));

    console.log('\n✅ ¡Todas las conexiones funcionan correctamente!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Detalles:', error);
  } finally {
    await prismaServ.$disconnect();
    await prismaDb.$disconnect();
  }
}

testConnection();

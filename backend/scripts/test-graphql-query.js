import { PrismaClient } from '../src/generated/client1/index.js';
import facturaService from '../src/services/facturaService.js';
import companiaService from '../src/services/companiaService.js';

async function testGraphQLQueries() {
  console.log('🔍 Simulando consultas GraphQL del frontend...\n');

  try {
    // Simular la query que hace el frontend al cargar el formulario
    console.log('📊 Query 1: proximoNumeroControl');
    const proximoNumero = await facturaService.obtenerProximoNumeroControl();
    console.log(`✅ Resultado: "${proximoNumero}"`);
    console.log(`   Tipo: ${typeof proximoNumero}\n`);

    // Simular la query de compañías
    console.log('📊 Query 2: companias');
    const companias = await companiaService.obtenerCodigosCompanias();
    console.log(`✅ Resultado: [${companias.map(c => `"${c}"`).join(', ')}]`);
    console.log(`   Total: ${companias.length} compañías\n`);

    console.log('✅ Todas las queries GraphQL funcionan correctamente!');
    console.log('👉 El frontend debería poder cargar el formulario sin errores.\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
    process.exit(1);
  }

  process.exit(0);
}

testGraphQLQueries();

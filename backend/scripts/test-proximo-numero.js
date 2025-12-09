import facturaService from '../src/services/facturaService.js';
import companiaService from '../src/services/companiaService.js';

async function test() {
  console.log('🧪 Probando servicios...\n');

  try {
    // 1. Probar obtener próximo número de control
    console.log('1️⃣ Probando obtenerProximoNumeroControl...');
    const proximoNumero = await facturaService.obtenerProximoNumeroControl();
    console.log(`✅ Próximo número de control: ${proximoNumero}`);
    console.log(`   Tipo: ${typeof proximoNumero}\n`);

    // 2. Probar obtener todas las compañías
    console.log('2️⃣ Probando obtenerTodasLasCompanias...');
    const companias = await companiaService.obtenerTodasLasCompanias();
    console.log(`✅ Compañías encontradas: ${companias.length}`);
    console.log('   Primeras 5 compañías:');
    companias.slice(0, 5).forEach(c => {
      console.log(`   - ${c.cia}`);
    });
    console.log();

    // 3. Probar obtener códigos de compañías
    console.log('3️⃣ Probando obtenerCodigosCompanias...');
    const codigos = await companiaService.obtenerCodigosCompanias();
    console.log(`✅ Códigos obtenidos: ${codigos.length}`);
    console.log(`   Primeros 5: ${codigos.slice(0, 5).join(', ')}\n`);

    console.log('✅ Todos los servicios funcionan correctamente!\n');

  } catch (error) {
    console.error('❌ Error en las pruebas:', error.message);
    console.error(error);
    process.exit(1);
  }

  process.exit(0);
}

test();

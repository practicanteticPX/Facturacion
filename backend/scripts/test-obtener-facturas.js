import facturaService from '../src/services/facturaService.js';

async function testObtenerFacturas() {
  console.log('🧪 Probando obtener facturas...\n');

  try {
    const facturas = await facturaService.obtenerTodasLasFacturas({});
    console.log(`✅ Facturas obtenidas: ${facturas.length}`);

    if (facturas.length > 0) {
      console.log('\n📄 Primera factura:');
      const primera = facturas[0];
      console.log(`  Número de Control: ${primera.numeroControl}`);
      console.log(`  Compañía: ${primera.cia || 'NULL'}`);
      console.log(`  Proveedor: ${primera.proveedor || 'NULL'}`);
      console.log(`  Número de Factura: ${primera.numeroFactura || 'NULL'}`);
      console.log(`  Fecha Factura: ${primera.fechaFactura || 'NULL'}`);
      console.log(`  Factura Crédito: ${primera.facturaCredito ?? 'NULL'}`);
    }

    console.log('\n✅ Test exitoso!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
    process.exit(1);
  }

  process.exit(0);
}

testObtenerFacturas();

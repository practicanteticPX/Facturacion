import { config } from 'dotenv';
config();

import { prismaDb } from './src/config/database.js';

async function testProveedor() {
  console.log('🔍 Probando búsqueda de proveedor...\n');

  try {
    // Primero, veamos algunos proveedores para entender el formato del NIT
    const proveedoresMuestra = await prismaDb.proveedor.findMany({ take: 10 });
    console.log('📊 Muestra de proveedores:');
    proveedoresMuestra.forEach(p => {
      console.log(`   - NIT: "${p.Nit}" | Nombre: "${p.Nombre}" | Cia: "${p.Cia}"`);
    });

    // Ahora intentemos buscar uno específico
    console.log('\n🔎 Buscando proveedor con NIT específico...');
    const nitBuscar = proveedoresMuestra[0]?.Nit;

    if (nitBuscar) {
      console.log(`   Buscando NIT: "${nitBuscar}"`);

      const proveedor = await prismaDb.proveedor.findFirst({
        where: { Nit: nitBuscar }
      });

      if (proveedor) {
        console.log(`   ✅ Proveedor encontrado: ${proveedor.Nombre}`);
      } else {
        console.log(`   ❌ No se encontró el proveedor`);
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prismaDb.$disconnect();
  }
}

testProveedor();

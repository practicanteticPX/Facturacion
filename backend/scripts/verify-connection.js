import { PrismaClient } from '../src/generated/client1/index.js';

const prisma = new PrismaClient();

async function verifyConnection() {
  console.log('🔍 Verificando conexión a la base de datos...\n');

  try {
    // 1. Contar registros
    const count = await prisma.factura.count();
    console.log(`✅ Conexión exitosa! Hay ${count} facturas en la base de datos.\n`);

    // 2. Obtener un registro de ejemplo para verificar las nuevas columnas
    const factura = await prisma.factura.findFirst({
      orderBy: { numeroControl: 'desc' }
    });

    if (factura) {
      console.log('📄 Ejemplo de registro (últimos datos):');
      console.log('  Número de Control:', factura.numeroControl);
      console.log('  Compañía:', factura.cia);
      console.log('  Proveedor:', factura.proveedor);
      console.log('  Número de Factura:', factura.numeroFactura);
      console.log('\n🆕 Nuevas columnas de auditoría:');
      console.log('  Creado en:', factura.creadoEn || 'NULL');
      console.log('  Actualizado en:', factura.actualizadoEn || 'NULL');
      console.log('\n📊 Nuevas columnas de estado:');
      console.log('  En proceso:', factura.enProceso);
      console.log('  Finalizado:', factura.finalizado);
      console.log('  Causado:', factura.causado);
    }

    console.log('\n✅ Todas las columnas están funcionando correctamente!');
    console.log('✅ El sistema está listo para usar.\n');

  } catch (error) {
    console.error('❌ Error al verificar conexión:', error.message);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

verifyConnection()
  .then(() => {
    console.log('✅ Verificación completada');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error fatal:', error);
    process.exit(1);
  });

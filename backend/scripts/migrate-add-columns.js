import { PrismaClient } from '../src/generated/client1/index.js';

const prisma = new PrismaClient();

async function runMigration() {
  console.log('🚀 Iniciando migración: Agregar columnas faltantes a T_Facturas...\n');

  try {
    // 1. Agregar columna created_at
    console.log('📝 Agregando columna created_at...');
    await prisma.$executeRawUnsafe(`
      ALTER TABLE crud_facturas."T_Facturas"
      ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ(6) DEFAULT NOW();
    `);
    console.log('✅ Columna created_at agregada\n');

    // 2. Agregar columna updated_at
    console.log('📝 Agregando columna updated_at...');
    await prisma.$executeRawUnsafe(`
      ALTER TABLE crud_facturas."T_Facturas"
      ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ(6) DEFAULT NOW();
    `);
    console.log('✅ Columna updated_at agregada\n');

    // 3. Agregar columna en_proceso
    console.log('📝 Agregando columna en_proceso...');
    await prisma.$executeRawUnsafe(`
      ALTER TABLE crud_facturas."T_Facturas"
      ADD COLUMN IF NOT EXISTS en_proceso BOOLEAN DEFAULT FALSE;
    `);
    console.log('✅ Columna en_proceso agregada\n');

    // 4. Agregar columna finalizado
    console.log('📝 Agregando columna finalizado...');
    await prisma.$executeRawUnsafe(`
      ALTER TABLE crud_facturas."T_Facturas"
      ADD COLUMN IF NOT EXISTS finalizado BOOLEAN DEFAULT FALSE;
    `);
    console.log('✅ Columna finalizado agregada\n');

    // 5. Agregar columna causado
    console.log('📝 Agregando columna causado...');
    await prisma.$executeRawUnsafe(`
      ALTER TABLE crud_facturas."T_Facturas"
      ADD COLUMN IF NOT EXISTS causado BOOLEAN DEFAULT FALSE;
    `);
    console.log('✅ Columna causado agregada\n');

    // 6. Actualizar registros existentes
    console.log('📝 Actualizando registros existentes con valores por defecto...');
    await prisma.$executeRawUnsafe(`
      UPDATE crud_facturas."T_Facturas"
      SET
          created_at = COALESCE(created_at, NOW()),
          updated_at = COALESCE(updated_at, NOW()),
          en_proceso = COALESCE(en_proceso, FALSE),
          finalizado = COALESCE(finalizado, FALSE),
          causado = COALESCE(causado, FALSE)
      WHERE created_at IS NULL OR updated_at IS NULL;
    `);
    console.log('✅ Registros actualizados\n');

    // 7. Crear función para trigger
    console.log('📝 Creando función para actualizar updated_at...');
    await prisma.$executeRawUnsafe(`
      CREATE OR REPLACE FUNCTION crud_facturas.update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = NOW();
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);
    console.log('✅ Función creada\n');

    // 8. Eliminar trigger si existe
    console.log('📝 Eliminando trigger anterior si existe...');
    await prisma.$executeRawUnsafe(`
      DROP TRIGGER IF EXISTS update_t_facturas_updated_at ON crud_facturas."T_Facturas";
    `);
    console.log('✅ Trigger anterior eliminado\n');

    // 9. Crear trigger
    console.log('📝 Creando trigger para updated_at...');
    await prisma.$executeRawUnsafe(`
      CREATE TRIGGER update_t_facturas_updated_at
          BEFORE UPDATE ON crud_facturas."T_Facturas"
          FOR EACH ROW
          EXECUTE FUNCTION crud_facturas.update_updated_at_column();
    `);
    console.log('✅ Trigger creado\n');

    // 10. Agregar comentarios
    console.log('📝 Agregando comentarios de documentación...');
    await prisma.$executeRawUnsafe(`
      COMMENT ON COLUMN crud_facturas."T_Facturas".created_at IS 'Fecha y hora de creación del registro';
    `);
    await prisma.$executeRawUnsafe(`
      COMMENT ON COLUMN crud_facturas."T_Facturas".updated_at IS 'Fecha y hora de última actualización del registro';
    `);
    await prisma.$executeRawUnsafe(`
      COMMENT ON COLUMN crud_facturas."T_Facturas".en_proceso IS 'Indica si la factura está en proceso';
    `);
    await prisma.$executeRawUnsafe(`
      COMMENT ON COLUMN crud_facturas."T_Facturas".finalizado IS 'Indica si la factura ha sido finalizada';
    `);
    await prisma.$executeRawUnsafe(`
      COMMENT ON COLUMN crud_facturas."T_Facturas".causado IS 'Indica si la factura ha sido causada';
    `);
    console.log('✅ Comentarios agregados\n');

    console.log('🎉 ¡Migración completada exitosamente!');
    console.log('✅ Todas las columnas fueron agregadas sin afectar los datos existentes.\n');

  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

runMigration()
  .then(() => {
    console.log('✅ Script finalizado correctamente');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error fatal:', error);
    process.exit(1);
  });

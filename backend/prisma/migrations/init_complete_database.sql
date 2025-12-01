/**
 * Script SQL completo de inicialización de Base de Datos
 * Schema: crud_facturas
 * Incluye todas las tablas del sistema
 */

-- Crear schema si no existe
CREATE SCHEMA IF NOT EXISTS "crud_facturas";

-- ============================================
-- Tabla: T_Cias (Compañías)
-- ============================================
CREATE TABLE IF NOT EXISTS "crud_facturas"."T_Cias" (
    "id" SERIAL,
    "cia" VARCHAR,
    CONSTRAINT "T_Cias_id_key" UNIQUE ("id")
);

COMMENT ON TABLE "crud_facturas"."T_Cias" IS 'Catálogo de compañías';

-- ============================================
-- Tabla: T_Personas (Colaboradores)
-- ============================================
CREATE TABLE IF NOT EXISTS "crud_facturas"."T_Personas" (
    "id" SERIAL,
    "nombre" VARCHAR,
    CONSTRAINT "T_Personas_id_key" UNIQUE ("id")
);

COMMENT ON TABLE "crud_facturas"."T_Personas" IS 'Catálogo de personas/colaboradores';

-- ============================================
-- Tabla: T_Facturas (Registro Principal)
-- ============================================
CREATE TABLE IF NOT EXISTS "crud_facturas"."T_Facturas" (
    "id" SERIAL PRIMARY KEY,
    "numero_control" VARCHAR(50) NOT NULL,
    "cia" VARCHAR(2) NOT NULL,
    "cia_nit" VARCHAR(50) NOT NULL,
    "nit" VARCHAR(20) NOT NULL,
    "proveedor" VARCHAR(255) NOT NULL,
    "numero_factura" VARCHAR(50) NOT NULL,
    "fecha_radicado" DATE NOT NULL,
    "fecha_factura" DATE NOT NULL,
    "factura_credito" VARCHAR(2) NOT NULL,
    "acuse_recibo_sci" VARCHAR(2) NOT NULL,
    "legaliza_anticipo" VARCHAR(2) NOT NULL DEFAULT 'No',
    "entregada_a" VARCHAR(255) NOT NULL,
    "fecha_entrega" DATE NOT NULL,
    "elaboro_plantilla" VARCHAR(10) DEFAULT '',
    "fecha_recepcion_causacion" DATE,
    "recibida_por" VARCHAR(255),
    "fecha_revision_causacion" DATE,
    "numero_causacion" VARCHAR(50),
    "fecha_causacion" DATE,
    "observaciones" VARCHAR(50),
    "created_at" TIMESTAMPTZ(6) DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ(6) DEFAULT NOW(),
    CONSTRAINT "t_facturas_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "uk_numero_control" UNIQUE ("numero_control")
);

COMMENT ON TABLE "crud_facturas"."T_Facturas" IS 'Tabla principal de registro de facturas';
COMMENT ON COLUMN "crud_facturas"."T_Facturas"."numero_control" IS 'Número de control único autoincremental generado por el sistema';
COMMENT ON COLUMN "crud_facturas"."T_Facturas"."cia" IS 'Código de compañía';
COMMENT ON COLUMN "crud_facturas"."T_Facturas"."cia_nit" IS 'Concatenación automática de Cia + NIT';
COMMENT ON COLUMN "crud_facturas"."T_Facturas"."nit" IS 'NIT del proveedor';
COMMENT ON COLUMN "crud_facturas"."T_Facturas"."proveedor" IS 'Nombre del proveedor (obtenido de DB_QPREX)';
COMMENT ON COLUMN "crud_facturas"."T_Facturas"."factura_credito" IS 'Indica si es factura a crédito (Si/No)';
COMMENT ON COLUMN "crud_facturas"."T_Facturas"."acuse_recibo_sci" IS 'Indica si tiene acuse de recibo SCI (Si/No)';
COMMENT ON COLUMN "crud_facturas"."T_Facturas"."legaliza_anticipo" IS 'Indica si la factura legaliza un anticipo (Si/No)';

-- ============================================
-- Índices para optimización
-- ============================================
CREATE INDEX IF NOT EXISTS "idx_facturas_cia" ON "crud_facturas"."T_Facturas" ("cia");
CREATE INDEX IF NOT EXISTS "idx_facturas_nit" ON "crud_facturas"."T_Facturas" ("nit");
CREATE INDEX IF NOT EXISTS "idx_facturas_numero_control" ON "crud_facturas"."T_Facturas" ("numero_control");

-- ============================================
-- Datos iniciales de ejemplo (opcional)
-- ============================================

-- Insertar compañías de ejemplo (eliminar si ya existen datos)
-- INSERT INTO "crud_facturas"."T_Cias" ("cia") VALUES
-- ('01'),
-- ('02'),
-- ('03')
-- ON CONFLICT DO NOTHING;

-- Insertar personas de ejemplo (eliminar si ya existen datos)
-- INSERT INTO "crud_facturas"."T_Personas" ("nombre") VALUES
-- ('Juan Pérez'),
-- ('María González'),
-- ('Carlos Rodríguez')
-- ON CONFLICT DO NOTHING;

-- ============================================
-- Verificación
-- ============================================
DO $$
BEGIN
    RAISE NOTICE '========================================';
    RAISE NOTICE 'Base de datos inicializada exitosamente';
    RAISE NOTICE 'Schema: crud_facturas';
    RAISE NOTICE 'Tablas creadas:';
    RAISE NOTICE '  - T_Cias (Compañías)';
    RAISE NOTICE '  - T_Personas (Colaboradores)';
    RAISE NOTICE '  - T_Facturas (Registro Principal)';
    RAISE NOTICE '========================================';
END $$;

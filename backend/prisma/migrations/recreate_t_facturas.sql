/**
 * Script SQL para reconstruir la tabla T_Facturas
 * Incluye todos los campos actualizados según schema.prisma
 */

-- Eliminar tabla existente si existe (cuidado con datos existentes)
-- DROP TABLE IF EXISTS "crud_facturas"."T_Facturas" CASCADE;

-- Crear tabla T_Facturas
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
    "updated_at" TIMESTAMPTZ(6) DEFAULT NOW()
);

-- Constraint único para numero_control
ALTER TABLE "crud_facturas"."T_Facturas"
    ADD CONSTRAINT "uk_numero_control" UNIQUE ("numero_control");

-- Índices para optimizar consultas
CREATE INDEX IF NOT EXISTS "idx_facturas_cia" ON "crud_facturas"."T_Facturas" ("cia");
CREATE INDEX IF NOT EXISTS "idx_facturas_nit" ON "crud_facturas"."T_Facturas" ("nit");
CREATE INDEX IF NOT EXISTS "idx_facturas_numero_control" ON "crud_facturas"."T_Facturas" ("numero_control");

-- Comentarios descriptivos
COMMENT ON TABLE "crud_facturas"."T_Facturas" IS 'Tabla principal para registro de facturas';
COMMENT ON COLUMN "crud_facturas"."T_Facturas"."numero_control" IS 'Número de control único autoincremental';
COMMENT ON COLUMN "crud_facturas"."T_Facturas"."legaliza_anticipo" IS 'Indica si la factura legaliza un anticipo (Si/No)';
COMMENT ON COLUMN "crud_facturas"."T_Facturas"."factura_credito" IS 'Indica si es factura a crédito (Si/No)';
COMMENT ON COLUMN "crud_facturas"."T_Facturas"."acuse_recibo_sci" IS 'Indica si tiene acuse de recibo SCI (Si/No)';

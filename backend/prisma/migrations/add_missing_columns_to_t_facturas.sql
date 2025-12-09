-- Migración: Agregar columnas faltantes a T_Facturas
-- Fecha: 2025-12-09
-- Descripción: Agrega columnas de auditoría (created_at, updated_at) y columnas de estado

-- 1. Agregar columna created_at (timestamp de creación)
ALTER TABLE crud_facturas."T_Facturas"
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ(6) DEFAULT NOW();

-- 2. Agregar columna updated_at (timestamp de actualización)
ALTER TABLE crud_facturas."T_Facturas"
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ(6) DEFAULT NOW();

-- 3. Agregar columna en_proceso (indica si la factura está en proceso)
ALTER TABLE crud_facturas."T_Facturas"
ADD COLUMN IF NOT EXISTS en_proceso BOOLEAN DEFAULT FALSE;

-- 4. Agregar columna finalizado (indica si la factura está finalizada)
ALTER TABLE crud_facturas."T_Facturas"
ADD COLUMN IF NOT EXISTS finalizado BOOLEAN DEFAULT FALSE;

-- 5. Agregar columna causado (indica si la factura ha sido causada)
ALTER TABLE crud_facturas."T_Facturas"
ADD COLUMN IF NOT EXISTS causado BOOLEAN DEFAULT FALSE;

-- Actualizar registros existentes con valores por defecto
UPDATE crud_facturas."T_Facturas"
SET
    created_at = COALESCE(created_at, NOW()),
    updated_at = COALESCE(updated_at, NOW()),
    en_proceso = COALESCE(en_proceso, FALSE),
    finalizado = COALESCE(finalizado, FALSE),
    causado = COALESCE(causado, FALSE)
WHERE created_at IS NULL OR updated_at IS NULL;

-- Crear trigger para actualizar automáticamente updated_at
CREATE OR REPLACE FUNCTION crud_facturas.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger a la tabla T_Facturas
DROP TRIGGER IF EXISTS update_t_facturas_updated_at ON crud_facturas."T_Facturas";
CREATE TRIGGER update_t_facturas_updated_at
    BEFORE UPDATE ON crud_facturas."T_Facturas"
    FOR EACH ROW
    EXECUTE FUNCTION crud_facturas.update_updated_at_column();

-- Comentarios en las columnas para documentación
COMMENT ON COLUMN crud_facturas."T_Facturas".created_at IS 'Fecha y hora de creación del registro';
COMMENT ON COLUMN crud_facturas."T_Facturas".updated_at IS 'Fecha y hora de última actualización del registro';
COMMENT ON COLUMN crud_facturas."T_Facturas".en_proceso IS 'Indica si la factura está en proceso';
COMMENT ON COLUMN crud_facturas."T_Facturas".finalizado IS 'Indica si la factura ha sido finalizada';
COMMENT ON COLUMN crud_facturas."T_Facturas".causado IS 'Indica si la factura ha sido causada';

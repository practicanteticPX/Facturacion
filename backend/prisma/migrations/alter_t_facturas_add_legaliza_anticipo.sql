/**
 * Script SQL para agregar el campo legaliza_anticipo a tabla existente
 * Usar este script si ya tienes datos en la tabla
 */

-- Agregar columna legaliza_anticipo si no existe
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'crud_facturas'
        AND table_name = 'T_Facturas'
        AND column_name = 'legaliza_anticipo'
    ) THEN
        ALTER TABLE "crud_facturas"."T_Facturas"
        ADD COLUMN "legaliza_anticipo" VARCHAR(2) NOT NULL DEFAULT 'No';

        RAISE NOTICE 'Columna legaliza_anticipo agregada exitosamente';
    ELSE
        RAISE NOTICE 'La columna legaliza_anticipo ya existe';
    END IF;
END $$;

-- Actualizar comentario de la columna
COMMENT ON COLUMN "crud_facturas"."T_Facturas"."legaliza_anticipo" IS 'Indica si la factura legaliza un anticipo (Si/No)';

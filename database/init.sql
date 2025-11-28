-- Script de inicialización para la tabla de facturas
-- Ejecutar en SERV_QPREX manualmente (NO se ejecuta automáticamente con Docker)

-- Crear esquema si no existe
CREATE SCHEMA IF NOT EXISTS crud_facturas;

-- Crear tabla de facturas
CREATE TABLE IF NOT EXISTS crud_facturas.facturas (
    id SERIAL PRIMARY KEY,
    numero_control VARCHAR(50) NOT NULL,
    cia VARCHAR(2) NOT NULL CHECK (cia IN ('PX', 'PT', 'PY')),
    nit VARCHAR(50) NOT NULL,
    numero_factura VARCHAR(100) NOT NULL,
    fecha_radicado DATE NOT NULL,
    fecha_factura DATE NOT NULL,
    factura_credito BOOLEAN DEFAULT FALSE,
    acuse_recibo_sci BOOLEAN DEFAULT FALSE,
    entregada_a VARCHAR(100),
    fecha_entrega DATE,
    elaboro_plantilla VARCHAR(10) CHECK (elaboro_plantilla IN ('', 'OK') OR elaboro_plantilla IS NULL),
    fecha_recepcion_causacion DATE,
    recibida_por VARCHAR(100),
    fecha_revision_causacion DATE,
    numero_causacion VARCHAR(100),
    fecha_causacion DATE,
    observaciones VARCHAR(100) CHECK (
        observaciones IN (
            'Factura Anulada',
            'Causada x Caja Menor',
            'Coincidencia de Consecutivo',
            'Factura Repetida'
        ) OR observaciones IS NULL
    ),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_facturas_cia ON crud_facturas.facturas(cia);
CREATE INDEX IF NOT EXISTS idx_facturas_nit ON crud_facturas.facturas(nit);
CREATE INDEX IF NOT EXISTS idx_facturas_numero_control ON crud_facturas.facturas(numero_control);
CREATE INDEX IF NOT EXISTS idx_facturas_fecha_radicado ON crud_facturas.facturas(fecha_radicado);

-- Crear función para actualizar automáticamente el campo actualizado_en
CREATE OR REPLACE FUNCTION crud_facturas.actualizar_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.actualizado_en = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger para actualizar automáticamente el timestamp
DROP TRIGGER IF EXISTS trigger_actualizar_timestamp ON crud_facturas.facturas;
CREATE TRIGGER trigger_actualizar_timestamp
    BEFORE UPDATE ON crud_facturas.facturas
    FOR EACH ROW
    EXECUTE FUNCTION crud_facturas.actualizar_timestamp();

-- Comentarios en las tablas
COMMENT ON TABLE crud_facturas.facturas IS 'Tabla de control de facturas (migración desde Excel)';
COMMENT ON COLUMN crud_facturas.facturas.numero_control IS 'Consecutivo asignado por el auxiliar administrativo';
COMMENT ON COLUMN crud_facturas.facturas.cia IS 'Compañía (PX, PT, PY)';
COMMENT ON COLUMN crud_facturas.facturas.nit IS 'Código del proveedor';
COMMENT ON COLUMN crud_facturas.facturas.numero_factura IS 'Número de factura del proveedor';
COMMENT ON COLUMN crud_facturas.facturas.fecha_radicado IS 'Fecha de radicado de la factura';
COMMENT ON COLUMN crud_facturas.facturas.fecha_factura IS 'Fecha de emisión de la factura';
COMMENT ON COLUMN crud_facturas.facturas.factura_credito IS 'Indica si la factura es a crédito';
COMMENT ON COLUMN crud_facturas.facturas.acuse_recibo_sci IS 'Acuse de recibo en SCI (desde 13/07/2022)';
COMMENT ON COLUMN crud_facturas.facturas.entregada_a IS 'Persona a la que se entregó la factura';
COMMENT ON COLUMN crud_facturas.facturas.fecha_entrega IS 'Fecha de entrega de la factura';
COMMENT ON COLUMN crud_facturas.facturas.elaboro_plantilla IS 'Indica si se elaboró plantilla (vacío o OK)';

-- Verificar que las tablas requeridas existen
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'crud_facturas'
        AND table_name = 'T_Personas'
    ) THEN
        RAISE NOTICE 'ADVERTENCIA: La tabla crud_facturas.T_Personas no existe. Debes crearla o verificar su existencia.';
    END IF;
END $$;

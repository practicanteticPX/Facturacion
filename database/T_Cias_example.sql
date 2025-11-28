-- Script de ejemplo para crear y poblar la tabla T_Cias
-- Ejecutar en SERV_QPREX en el esquema crud_facturas

-- Crear tabla T_Cias si no existe
CREATE TABLE IF NOT EXISTS crud_facturas."T_Cias" (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(10) NOT NULL UNIQUE,
    nombre VARCHAR(200) NOT NULL
);

-- Insertar compañías de ejemplo (ajustar según tus compañías reales)
INSERT INTO crud_facturas."T_Cias" (codigo, nombre)
VALUES
    ('PX', 'Compañía PX'),
    ('PT', 'Compañía PT'),
    ('PY', 'Compañía PY')
ON CONFLICT (codigo) DO NOTHING;

-- Verificar los datos insertados
SELECT * FROM crud_facturas."T_Cias" ORDER BY codigo;

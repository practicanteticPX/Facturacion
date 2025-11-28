-- Script de ejemplo para crear y poblar la tabla T_Personas
-- Ejecutar en SERV_QPREX en el esquema crud_facturas

-- Crear tabla T_Personas si no existe
CREATE TABLE IF NOT EXISTS crud_facturas."T_Personas" (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL
);

-- Insertar personas de ejemplo (ajustar según tus colaboradores reales)
INSERT INTO crud_facturas."T_Personas" (nombre)
VALUES
    ('Juan Pérez'),
    ('María García'),
    ('Carlos López'),
    ('Ana Martínez'),
    ('Luis Rodríguez')
ON CONFLICT DO NOTHING;

-- Verificar los datos insertados
SELECT * FROM crud_facturas."T_Personas" ORDER BY nombre;

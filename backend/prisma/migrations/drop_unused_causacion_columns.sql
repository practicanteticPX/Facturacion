-- Elimina columnas de causación que nunca fueron usadas en el código
ALTER TABLE crud_facturas."T_Facturas"
  DROP COLUMN IF EXISTS fecha_recepcion_causacion,
  DROP COLUMN IF EXISTS recibida_por,
  DROP COLUMN IF EXISTS fecha_revision_causacion;

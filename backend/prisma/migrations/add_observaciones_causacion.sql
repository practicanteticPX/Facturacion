-- Separa observaciones en dos campos: planilla y causación
-- observaciones       → observaciones de la planilla FV (ya existía, se amplía)
-- observaciones_causacion → observaciones del grupo de causación (era el campo observaciones)

ALTER TABLE crud_facturas."T_Facturas"
  ADD COLUMN IF NOT EXISTS observaciones_causacion VARCHAR(500);

-- Mover datos existentes de observaciones → observaciones_causacion
UPDATE crud_facturas."T_Facturas"
  SET observaciones_causacion = observaciones
  WHERE observaciones IS NOT NULL AND observaciones <> '';

-- Limpiar observaciones para que reciba las de planilla (se sincronizan desde DocuPrex)
UPDATE crud_facturas."T_Facturas" SET observaciones = NULL;

-- Ampliar columna observaciones para texto más largo
ALTER TABLE crud_facturas."T_Facturas"
  ALTER COLUMN observaciones TYPE VARCHAR(500);

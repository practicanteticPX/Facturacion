import { OPCIONES_PLANTILLA, OBSERVACIONES } from './constants.js';

export const validarElaboroPlantilla = (valor) => {
  if (valor && !Object.values(OPCIONES_PLANTILLA).includes(valor)) {
    throw new Error(`Elaboró Plantilla debe ser vacío o "OK"`);
  }
};

export const validarObservaciones = (valor) => {
  if (valor && !Object.values(OBSERVACIONES).includes(valor)) {
    throw new Error(`Observación inválida. Debe ser una de las opciones predefinidas`);
  }
};

export const validarCamposRequeridos = (campos, nombresCampos) => {
  nombresCampos.forEach(nombre => {
    if (!campos[nombre] && campos[nombre] !== false && campos[nombre] !== 0) {
      throw new Error(`El campo ${nombre} es requerido`);
    }
  });
};

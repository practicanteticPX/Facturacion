import { OPCIONES_PLANTILLA, OBSERVACIONES } from './constants.js';

const LABELS_CAMPOS = {
  cia: 'Cia',
  nit: 'NIT',
  numeroFactura: 'No. Factura',
  fechaRadicado: 'Fecha Radicado',
  fechaFactura: 'Fecha Factura',
  facturaCredito: 'Factura a Crédito',
  acuseReciboSCI: 'Acuse Recibo SCI',
  entregadaA: 'Entregada a',
  fechaEntrega: 'Fecha de Entrega',
  archivo: 'PDF de la factura'
};

export const obtenerNombreCampoVisible = (nombreCampo) => {
  return LABELS_CAMPOS[nombreCampo] || nombreCampo;
};

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
      throw new Error(`El campo ${obtenerNombreCampoVisible(nombre)} es obligatorio`);
    }
  });
};

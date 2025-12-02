import { gql } from '@apollo/client';

export const GET_FACTURAS = gql`
  query GetFacturas($filtros: FiltrosFacturaInput) {
    facturas(filtros: $filtros) {
      id
      numeroControl
      cia
      ciaNit
      nit
      proveedor
      numeroFactura
      fechaRadicado
      fechaFactura
      facturaCredito
      acuseReciboSCI
      legalizaAnticipo
      entregadaA
      fechaEntrega
      fechaRecepcionCausacion
      recibidaPor
      fechaRevisionCausacion
      numeroCausacion
      fechaCausacion
      observaciones
      creadoEn
      actualizadoEn
    }
  }
`;

export const GET_FACTURA = gql`
  query GetFactura($id: Int!) {
    factura(id: $id) {
      id
      numeroControl
      cia
      ciaNit
      nit
      proveedor
      numeroFactura
      fechaRadicado
      fechaFactura
      facturaCredito
      acuseReciboSCI
      legalizaAnticipo
      entregadaA
      fechaEntrega
      fechaRecepcionCausacion
      recibidaPor
      fechaRevisionCausacion
      numeroCausacion
      fechaCausacion
      observaciones
      creadoEn
      actualizadoEn
    }
  }
`;

export const GET_PERSONAS = gql`
  query GetPersonas {
    personas {
      id
      nombre
      correo
    }
  }
`;

export const GET_PROVEEDOR = gql`
  query GetProveedor($nit: String!) {
    proveedor(nit: $nit) {
      Nit
      Nombre
      Cia
    }
  }
`;

export const GET_COMPANIAS = gql`
  query GetCompanias {
    companias
  }
`;

export const GET_PROXIMO_NUMERO_CONTROL = gql`
  query GetProximoNumeroControl {
    proximoNumeroControl
  }
`;

export const GET_OPCIONES_PLANTILLA = gql`
  query GetOpcionesPlantilla {
    opcionesPlantilla
  }
`;

export const GET_OPCIONES_OBSERVACIONES = gql`
  query GetOpcionesObservaciones {
    opcionesObservaciones
  }
`;

export const CREAR_FACTURA = gql`
  mutation CrearFactura($input: CrearFacturaInput!, $archivo: Upload) {
    crearFactura(input: $input, archivo: $archivo) {
      id
      numeroControl
      cia
      ciaNit
      nit
      proveedor
      numeroFactura
      fechaRadicado
      fechaFactura
      facturaCredito
      acuseReciboSCI
      legalizaAnticipo
      entregadaA
      fechaEntrega
    }
  }
`;

export const ACTUALIZAR_FACTURA = gql`
  mutation ActualizarFactura($id: Int!, $input: ActualizarFacturaInput!) {
    actualizarFactura(id: $id, input: $input) {
      id
      numeroControl
      cia
      ciaNit
      nit
      proveedor
      numeroFactura
      fechaRadicado
      fechaFactura
      facturaCredito
      acuseReciboSCI
      legalizaAnticipo
      entregadaA
      fechaEntrega
      fechaRecepcionCausacion
      recibidaPor
      fechaRevisionCausacion
      numeroCausacion
      fechaCausacion
      observaciones
    }
  }
`;

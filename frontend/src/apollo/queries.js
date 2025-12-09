import { gql } from '@apollo/client';

export const GET_FACTURAS = gql`
  query GetFacturas($filtros: FiltrosFacturaInput) {
    facturas(filtros: $filtros) {
      facturas {
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
        enProceso
        finalizado
        causado
      }
      total
      page
      pageSize
      hasMore
    }
  }
`;

export const GET_FACTURA = gql`
  query GetFactura($numeroControl: Int!) {
    factura(numeroControl: $numeroControl) {
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
      enProceso
      finalizado
      causado
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
      entregadaA
      fechaEntrega
      creadoEn
      actualizadoEn
    }
  }
`;

export const ACTUALIZAR_FACTURA = gql`
  mutation ActualizarFactura($numeroControl: Int!, $input: ActualizarFacturaInput!) {
    actualizarFactura(numeroControl: $numeroControl, input: $input) {
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

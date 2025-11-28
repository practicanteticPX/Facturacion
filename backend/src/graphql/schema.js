import gql from 'graphql-tag';

export const typeDefs = gql`
  type Factura {
    id: Int!
    numeroControl: String!
    cia: String!
    ciaNit: String!
    nit: String!
    proveedor: String!
    numeroFactura: String!
    fechaRadicado: String!
    fechaFactura: String!
    facturaCredito: Boolean!
    acuseReciboSCI: Boolean!
    entregadaA: String
    fechaEntrega: String
    elaboroPlantilla: String
    fechaRecepcionCausacion: String
    recibidaPor: String
    fechaRevisionCausacion: String
    numeroCausacion: String
    fechaCausacion: String
    observaciones: String
    creadoEn: String!
    actualizadoEn: String!
  }

  type Persona {
    id: Int!
    nombre: String!
  }

  type Proveedor {
    Nit: String
    Nombre: String
    Cia: String
  }

  input CrearFacturaInput {
    numeroControl: String!
    cia: String!
    nit: String!
    numeroFactura: String!
    fechaRadicado: String!
    fechaFactura: String!
    facturaCredito: Boolean
    acuseReciboSCI: Boolean
    entregadaA: String
    fechaEntrega: String
    elaboroPlantilla: String
  }

  input ActualizarFacturaInput {
    numeroControl: String
    cia: String
    nit: String
    numeroFactura: String
    fechaRadicado: String
    fechaFactura: String
    facturaCredito: Boolean
    acuseReciboSCI: Boolean
    entregadaA: String
    fechaEntrega: String
    elaboroPlantilla: String
    fechaRecepcionCausacion: String
    recibidaPor: String
    fechaRevisionCausacion: String
    numeroCausacion: String
    fechaCausacion: String
    observaciones: String
  }

  input FiltrosFacturaInput {
    cia: String
    nit: String
    numeroControl: String
  }

  type Query {
    facturas(filtros: FiltrosFacturaInput): [Factura!]!
    factura(id: Int!): Factura
    personas: [Persona!]!
    proveedor(nit: String!): Proveedor
    companias: [String!]!
    opcionesPlantilla: [String!]!
    opcionesObservaciones: [String!]!
  }

  type Mutation {
    crearFactura(input: CrearFacturaInput!): Factura!
    actualizarFactura(id: Int!, input: ActualizarFacturaInput!): Factura!
  }
`;

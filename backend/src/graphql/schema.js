import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar Upload

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
    legalizaAnticipo: Boolean!
    entregadaA: String
    fechaEntrega: String
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
    correo: String
  }

  type Proveedor {
    Nit: String
    Nombre: String
    Cia: String
  }

  input CrearFacturaInput {
    cia: String!
    nit: String!
    numeroFactura: String!
    fechaRadicado: String!
    fechaFactura: String!
    facturaCredito: Boolean
    acuseReciboSCI: Boolean
    legalizaAnticipo: Boolean
    entregadaA: String
    fechaEntrega: String
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
    legalizaAnticipo: Boolean
    entregadaA: String
    fechaEntrega: String
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

  type User {
    username: String!
    displayName: String!
    email: String
    description: String!
  }

  type AuthResponse {
    success: Boolean!
    token: String!
    user: User!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type Query {
    facturas(filtros: FiltrosFacturaInput): [Factura!]!
    factura(id: Int!): Factura
    proximoNumeroControl: String!
    personas: [Persona!]!
    proveedor(nit: String!): Proveedor
    companias: [String!]!
    opcionesPlantilla: [String!]!
    opcionesObservaciones: [String!]!
  }

  type Mutation {
    login(input: LoginInput!): AuthResponse!
    crearFactura(input: CrearFacturaInput!, archivo: Upload): Factura!
    actualizarFactura(id: Int!, input: ActualizarFacturaInput!): Factura!
  }
`;

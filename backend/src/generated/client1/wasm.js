
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/wasm.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.CentroCostoScalarFieldEnum = {
  id: 'id',
  centroCosto: 'centroCosto',
  ciaCC: 'ciaCC',
  responsable: 'responsable'
};

exports.Prisma.FacturaScalarFieldEnum = {
  numeroControl: 'numeroControl',
  cia: 'cia',
  ciaNit: 'ciaNit',
  nit: 'nit',
  proveedor: 'proveedor',
  numeroFactura: 'numeroFactura',
  fechaRadicado: 'fechaRadicado',
  fechaFactura: 'fechaFactura',
  facturaCredito: 'facturaCredito',
  acuseReciboSCI: 'acuseReciboSCI',
  entregadaA: 'entregadaA',
  fechaEntrega: 'fechaEntrega',
  fechaRecepcionCausacion: 'fechaRecepcionCausacion',
  recibidaPor: 'recibidaPor',
  fechaRevisionCausacion: 'fechaRevisionCausacion',
  numeroCausacion: 'numeroCausacion',
  fechaCausacion: 'fechaCausacion',
  observaciones: 'observaciones',
  creadoEn: 'creadoEn',
  actualizadoEn: 'actualizadoEn',
  enProceso: 'enProceso',
  finalizado: 'finalizado',
  causado: 'causado'
};

exports.Prisma.NegociadorScalarFieldEnum = {
  id: 'id',
  negociador: 'negociador',
  cargo: 'cargo'
};

exports.Prisma.PersonaScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  correo: 'correo',
  cargo: 'cargo'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  CentroCosto: 'CentroCosto',
  Factura: 'Factura',
  Negociador: 'Negociador',
  Persona: 'Persona'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "D:\\facturacion\\backend\\src\\generated\\client1",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      },
      {
        "fromEnvVar": null,
        "value": "linux-musl-openssl-3.0.x"
      },
      {
        "fromEnvVar": null,
        "value": "windows"
      }
    ],
    "previewFeatures": [
      "driverAdapters",
      "multiSchema"
    ],
    "sourceFilePath": "D:\\facturacion\\backend\\prisma\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../../../prisma",
  "clientVersion": "5.22.0",
  "engineVersion": "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider        = \"prisma-client-js\"\n  output          = \"../src/generated/client1\"\n  previewFeatures = [\"multiSchema\", \"driverAdapters\"]\n  binaryTargets   = [\"native\", \"linux-musl-openssl-3.0.x\", \"windows\"]\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n  schemas  = [\"crud_facturas\"]\n}\n\nmodel CentroCosto {\n  id          Int     @id @default(autoincrement())\n  centroCosto String? @map(\"CentroCosto\") @db.VarChar(255)\n  ciaCC       String? @map(\"Cia_CC\") @db.VarChar(50)\n  responsable String? @map(\"Responsable\") @db.VarChar(255)\n\n  @@map(\"T_CentrosCostos\")\n  @@schema(\"crud_facturas\")\n}\n\n/// The underlying table does not contain a valid unique identifier and can therefore currently not be handled by Prisma Client.\nmodel Compania {\n  id  Int     @default(autoincrement())\n  cia String? @db.VarChar\n\n  @@map(\"T_Cias\")\n  @@ignore\n  @@schema(\"crud_facturas\")\n}\n\n/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\nmodel Factura {\n  numeroControl           Int       @id(map: \"t_facturas_pkey\") @default(autoincrement()) @map(\"numero_control\")\n  cia                     String?   @db.VarChar(2)\n  ciaNit                  String?   @map(\"cia_nit\") @db.VarChar(50)\n  nit                     String?   @db.VarChar(50)\n  proveedor               String?   @db.VarChar(100)\n  numeroFactura           String?   @map(\"numero_factura\") @db.VarChar(50)\n  fechaRadicado           DateTime? @map(\"fecha_radicado\") @db.Date\n  fechaFactura            DateTime? @map(\"fecha_factura\") @db.Date\n  facturaCredito          Boolean?  @map(\"factura_credito\")\n  acuseReciboSCI          Boolean?  @map(\"acuse_recibo_sci\")\n  entregadaA              String?   @map(\"entregada_a\") @db.VarChar(50)\n  fechaEntrega            DateTime? @map(\"fecha_entrega\") @db.Date\n  fechaRecepcionCausacion DateTime? @map(\"fecha_recepcion_causacion\") @db.Date\n  recibidaPor             String?   @map(\"recibida_por\") @db.VarChar(50)\n  fechaRevisionCausacion  DateTime? @map(\"fecha_revision_causacion\") @db.Date\n  numeroCausacion         String?   @map(\"numero_causacion\") @db.VarChar(50)\n  fechaCausacion          DateTime? @map(\"fecha_causacion\") @db.Date\n  observaciones           String?   @db.VarChar(50)\n  creadoEn                DateTime? @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n  actualizadoEn           DateTime? @default(now()) @map(\"updated_at\") @db.Timestamptz(6)\n  enProceso               Boolean?  @default(false) @map(\"en_proceso\")\n  finalizado              Boolean?  @default(false) @map(\"finalizado\")\n  causado                 Boolean?  @default(false) @map(\"causado\")\n\n  @@index([cia], map: \"idx_facturas_cia\")\n  @@index([nit], map: \"idx_facturas_nit\")\n  @@index([numeroControl], map: \"idx_numero_control\")\n  @@map(\"T_Facturas\")\n  @@schema(\"crud_facturas\")\n}\n\nmodel Negociador {\n  id         Int     @id @default(autoincrement())\n  negociador String? @db.VarChar(255)\n  cargo      String? @db.VarChar(255)\n\n  @@map(\"T_Negociadores\")\n  @@schema(\"crud_facturas\")\n}\n\nmodel Persona {\n  id     Int     @id @default(autoincrement())\n  nombre String? @db.VarChar(255)\n  correo String? @db.VarChar(255)\n  cargo  String? @db.VarChar(255)\n\n  @@map(\"T_Personas\")\n  @@schema(\"crud_facturas\")\n}\n",
  "inlineSchemaHash": "6681bef55456336ded0b13e6dae948862c465d6da34653019d2deec364223e20",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"CentroCosto\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"centroCosto\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"CentroCosto\"},{\"name\":\"ciaCC\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"Cia_CC\"},{\"name\":\"responsable\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"Responsable\"}],\"dbName\":\"T_CentrosCostos\"},\"Factura\":{\"fields\":[{\"name\":\"numeroControl\",\"kind\":\"scalar\",\"type\":\"Int\",\"dbName\":\"numero_control\"},{\"name\":\"cia\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"ciaNit\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"cia_nit\"},{\"name\":\"nit\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"proveedor\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"numeroFactura\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"numero_factura\"},{\"name\":\"fechaRadicado\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"fecha_radicado\"},{\"name\":\"fechaFactura\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"fecha_factura\"},{\"name\":\"facturaCredito\",\"kind\":\"scalar\",\"type\":\"Boolean\",\"dbName\":\"factura_credito\"},{\"name\":\"acuseReciboSCI\",\"kind\":\"scalar\",\"type\":\"Boolean\",\"dbName\":\"acuse_recibo_sci\"},{\"name\":\"entregadaA\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"entregada_a\"},{\"name\":\"fechaEntrega\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"fecha_entrega\"},{\"name\":\"fechaRecepcionCausacion\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"fecha_recepcion_causacion\"},{\"name\":\"recibidaPor\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"recibida_por\"},{\"name\":\"fechaRevisionCausacion\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"fecha_revision_causacion\"},{\"name\":\"numeroCausacion\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"numero_causacion\"},{\"name\":\"fechaCausacion\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"fecha_causacion\"},{\"name\":\"observaciones\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"creadoEn\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"created_at\"},{\"name\":\"actualizadoEn\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"updated_at\"},{\"name\":\"enProceso\",\"kind\":\"scalar\",\"type\":\"Boolean\",\"dbName\":\"en_proceso\"},{\"name\":\"finalizado\",\"kind\":\"scalar\",\"type\":\"Boolean\",\"dbName\":\"finalizado\"},{\"name\":\"causado\",\"kind\":\"scalar\",\"type\":\"Boolean\",\"dbName\":\"causado\"}],\"dbName\":\"T_Facturas\"},\"Negociador\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"negociador\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"cargo\",\"kind\":\"scalar\",\"type\":\"String\"}],\"dbName\":\"T_Negociadores\"},\"Persona\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"nombre\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"correo\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"cargo\",\"kind\":\"scalar\",\"type\":\"String\"}],\"dbName\":\"T_Personas\"}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = {
  getRuntime: () => require('./query_engine_bg.js'),
  getQueryEngineWasmModule: async () => {
    const loader = (await import('#wasm-engine-loader')).default
    const engine = (await loader).default
    return engine 
  }
}

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)


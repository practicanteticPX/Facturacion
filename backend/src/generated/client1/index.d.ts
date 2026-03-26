
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model CentroCosto
 * 
 */
export type CentroCosto = $Result.DefaultSelection<Prisma.$CentroCostoPayload>
/**
 * Model Factura
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export type Factura = $Result.DefaultSelection<Prisma.$FacturaPayload>
/**
 * Model Negociador
 * 
 */
export type Negociador = $Result.DefaultSelection<Prisma.$NegociadorPayload>
/**
 * Model Persona
 * 
 */
export type Persona = $Result.DefaultSelection<Prisma.$PersonaPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more CentroCostos
 * const centroCostos = await prisma.centroCosto.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more CentroCostos
   * const centroCostos = await prisma.centroCosto.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.centroCosto`: Exposes CRUD operations for the **CentroCosto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CentroCostos
    * const centroCostos = await prisma.centroCosto.findMany()
    * ```
    */
  get centroCosto(): Prisma.CentroCostoDelegate<ExtArgs>;

  /**
   * `prisma.factura`: Exposes CRUD operations for the **Factura** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Facturas
    * const facturas = await prisma.factura.findMany()
    * ```
    */
  get factura(): Prisma.FacturaDelegate<ExtArgs>;

  /**
   * `prisma.negociador`: Exposes CRUD operations for the **Negociador** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Negociadors
    * const negociadors = await prisma.negociador.findMany()
    * ```
    */
  get negociador(): Prisma.NegociadorDelegate<ExtArgs>;

  /**
   * `prisma.persona`: Exposes CRUD operations for the **Persona** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Personas
    * const personas = await prisma.persona.findMany()
    * ```
    */
  get persona(): Prisma.PersonaDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    CentroCosto: 'CentroCosto',
    Factura: 'Factura',
    Negociador: 'Negociador',
    Persona: 'Persona'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "centroCosto" | "factura" | "negociador" | "persona"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      CentroCosto: {
        payload: Prisma.$CentroCostoPayload<ExtArgs>
        fields: Prisma.CentroCostoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CentroCostoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CentroCostoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CentroCostoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CentroCostoPayload>
          }
          findFirst: {
            args: Prisma.CentroCostoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CentroCostoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CentroCostoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CentroCostoPayload>
          }
          findMany: {
            args: Prisma.CentroCostoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CentroCostoPayload>[]
          }
          create: {
            args: Prisma.CentroCostoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CentroCostoPayload>
          }
          createMany: {
            args: Prisma.CentroCostoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CentroCostoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CentroCostoPayload>[]
          }
          delete: {
            args: Prisma.CentroCostoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CentroCostoPayload>
          }
          update: {
            args: Prisma.CentroCostoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CentroCostoPayload>
          }
          deleteMany: {
            args: Prisma.CentroCostoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CentroCostoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CentroCostoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CentroCostoPayload>
          }
          aggregate: {
            args: Prisma.CentroCostoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCentroCosto>
          }
          groupBy: {
            args: Prisma.CentroCostoGroupByArgs<ExtArgs>
            result: $Utils.Optional<CentroCostoGroupByOutputType>[]
          }
          count: {
            args: Prisma.CentroCostoCountArgs<ExtArgs>
            result: $Utils.Optional<CentroCostoCountAggregateOutputType> | number
          }
        }
      }
      Factura: {
        payload: Prisma.$FacturaPayload<ExtArgs>
        fields: Prisma.FacturaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FacturaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacturaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FacturaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacturaPayload>
          }
          findFirst: {
            args: Prisma.FacturaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacturaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FacturaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacturaPayload>
          }
          findMany: {
            args: Prisma.FacturaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacturaPayload>[]
          }
          create: {
            args: Prisma.FacturaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacturaPayload>
          }
          createMany: {
            args: Prisma.FacturaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FacturaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacturaPayload>[]
          }
          delete: {
            args: Prisma.FacturaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacturaPayload>
          }
          update: {
            args: Prisma.FacturaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacturaPayload>
          }
          deleteMany: {
            args: Prisma.FacturaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FacturaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FacturaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacturaPayload>
          }
          aggregate: {
            args: Prisma.FacturaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFactura>
          }
          groupBy: {
            args: Prisma.FacturaGroupByArgs<ExtArgs>
            result: $Utils.Optional<FacturaGroupByOutputType>[]
          }
          count: {
            args: Prisma.FacturaCountArgs<ExtArgs>
            result: $Utils.Optional<FacturaCountAggregateOutputType> | number
          }
        }
      }
      Negociador: {
        payload: Prisma.$NegociadorPayload<ExtArgs>
        fields: Prisma.NegociadorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NegociadorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NegociadorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NegociadorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NegociadorPayload>
          }
          findFirst: {
            args: Prisma.NegociadorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NegociadorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NegociadorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NegociadorPayload>
          }
          findMany: {
            args: Prisma.NegociadorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NegociadorPayload>[]
          }
          create: {
            args: Prisma.NegociadorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NegociadorPayload>
          }
          createMany: {
            args: Prisma.NegociadorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NegociadorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NegociadorPayload>[]
          }
          delete: {
            args: Prisma.NegociadorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NegociadorPayload>
          }
          update: {
            args: Prisma.NegociadorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NegociadorPayload>
          }
          deleteMany: {
            args: Prisma.NegociadorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NegociadorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NegociadorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NegociadorPayload>
          }
          aggregate: {
            args: Prisma.NegociadorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNegociador>
          }
          groupBy: {
            args: Prisma.NegociadorGroupByArgs<ExtArgs>
            result: $Utils.Optional<NegociadorGroupByOutputType>[]
          }
          count: {
            args: Prisma.NegociadorCountArgs<ExtArgs>
            result: $Utils.Optional<NegociadorCountAggregateOutputType> | number
          }
        }
      }
      Persona: {
        payload: Prisma.$PersonaPayload<ExtArgs>
        fields: Prisma.PersonaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PersonaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PersonaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonaPayload>
          }
          findFirst: {
            args: Prisma.PersonaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PersonaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonaPayload>
          }
          findMany: {
            args: Prisma.PersonaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonaPayload>[]
          }
          create: {
            args: Prisma.PersonaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonaPayload>
          }
          createMany: {
            args: Prisma.PersonaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PersonaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonaPayload>[]
          }
          delete: {
            args: Prisma.PersonaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonaPayload>
          }
          update: {
            args: Prisma.PersonaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonaPayload>
          }
          deleteMany: {
            args: Prisma.PersonaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PersonaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PersonaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonaPayload>
          }
          aggregate: {
            args: Prisma.PersonaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePersona>
          }
          groupBy: {
            args: Prisma.PersonaGroupByArgs<ExtArgs>
            result: $Utils.Optional<PersonaGroupByOutputType>[]
          }
          count: {
            args: Prisma.PersonaCountArgs<ExtArgs>
            result: $Utils.Optional<PersonaCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.DriverAdapter | null
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model CentroCosto
   */

  export type AggregateCentroCosto = {
    _count: CentroCostoCountAggregateOutputType | null
    _avg: CentroCostoAvgAggregateOutputType | null
    _sum: CentroCostoSumAggregateOutputType | null
    _min: CentroCostoMinAggregateOutputType | null
    _max: CentroCostoMaxAggregateOutputType | null
  }

  export type CentroCostoAvgAggregateOutputType = {
    id: number | null
  }

  export type CentroCostoSumAggregateOutputType = {
    id: number | null
  }

  export type CentroCostoMinAggregateOutputType = {
    id: number | null
    centroCosto: string | null
    ciaCC: string | null
    responsable: string | null
  }

  export type CentroCostoMaxAggregateOutputType = {
    id: number | null
    centroCosto: string | null
    ciaCC: string | null
    responsable: string | null
  }

  export type CentroCostoCountAggregateOutputType = {
    id: number
    centroCosto: number
    ciaCC: number
    responsable: number
    _all: number
  }


  export type CentroCostoAvgAggregateInputType = {
    id?: true
  }

  export type CentroCostoSumAggregateInputType = {
    id?: true
  }

  export type CentroCostoMinAggregateInputType = {
    id?: true
    centroCosto?: true
    ciaCC?: true
    responsable?: true
  }

  export type CentroCostoMaxAggregateInputType = {
    id?: true
    centroCosto?: true
    ciaCC?: true
    responsable?: true
  }

  export type CentroCostoCountAggregateInputType = {
    id?: true
    centroCosto?: true
    ciaCC?: true
    responsable?: true
    _all?: true
  }

  export type CentroCostoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CentroCosto to aggregate.
     */
    where?: CentroCostoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CentroCostos to fetch.
     */
    orderBy?: CentroCostoOrderByWithRelationInput | CentroCostoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CentroCostoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CentroCostos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CentroCostos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CentroCostos
    **/
    _count?: true | CentroCostoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CentroCostoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CentroCostoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CentroCostoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CentroCostoMaxAggregateInputType
  }

  export type GetCentroCostoAggregateType<T extends CentroCostoAggregateArgs> = {
        [P in keyof T & keyof AggregateCentroCosto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCentroCosto[P]>
      : GetScalarType<T[P], AggregateCentroCosto[P]>
  }




  export type CentroCostoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CentroCostoWhereInput
    orderBy?: CentroCostoOrderByWithAggregationInput | CentroCostoOrderByWithAggregationInput[]
    by: CentroCostoScalarFieldEnum[] | CentroCostoScalarFieldEnum
    having?: CentroCostoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CentroCostoCountAggregateInputType | true
    _avg?: CentroCostoAvgAggregateInputType
    _sum?: CentroCostoSumAggregateInputType
    _min?: CentroCostoMinAggregateInputType
    _max?: CentroCostoMaxAggregateInputType
  }

  export type CentroCostoGroupByOutputType = {
    id: number
    centroCosto: string | null
    ciaCC: string | null
    responsable: string | null
    _count: CentroCostoCountAggregateOutputType | null
    _avg: CentroCostoAvgAggregateOutputType | null
    _sum: CentroCostoSumAggregateOutputType | null
    _min: CentroCostoMinAggregateOutputType | null
    _max: CentroCostoMaxAggregateOutputType | null
  }

  type GetCentroCostoGroupByPayload<T extends CentroCostoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CentroCostoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CentroCostoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CentroCostoGroupByOutputType[P]>
            : GetScalarType<T[P], CentroCostoGroupByOutputType[P]>
        }
      >
    >


  export type CentroCostoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    centroCosto?: boolean
    ciaCC?: boolean
    responsable?: boolean
  }, ExtArgs["result"]["centroCosto"]>

  export type CentroCostoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    centroCosto?: boolean
    ciaCC?: boolean
    responsable?: boolean
  }, ExtArgs["result"]["centroCosto"]>

  export type CentroCostoSelectScalar = {
    id?: boolean
    centroCosto?: boolean
    ciaCC?: boolean
    responsable?: boolean
  }


  export type $CentroCostoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CentroCosto"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      centroCosto: string | null
      ciaCC: string | null
      responsable: string | null
    }, ExtArgs["result"]["centroCosto"]>
    composites: {}
  }

  type CentroCostoGetPayload<S extends boolean | null | undefined | CentroCostoDefaultArgs> = $Result.GetResult<Prisma.$CentroCostoPayload, S>

  type CentroCostoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CentroCostoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CentroCostoCountAggregateInputType | true
    }

  export interface CentroCostoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CentroCosto'], meta: { name: 'CentroCosto' } }
    /**
     * Find zero or one CentroCosto that matches the filter.
     * @param {CentroCostoFindUniqueArgs} args - Arguments to find a CentroCosto
     * @example
     * // Get one CentroCosto
     * const centroCosto = await prisma.centroCosto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CentroCostoFindUniqueArgs>(args: SelectSubset<T, CentroCostoFindUniqueArgs<ExtArgs>>): Prisma__CentroCostoClient<$Result.GetResult<Prisma.$CentroCostoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CentroCosto that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CentroCostoFindUniqueOrThrowArgs} args - Arguments to find a CentroCosto
     * @example
     * // Get one CentroCosto
     * const centroCosto = await prisma.centroCosto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CentroCostoFindUniqueOrThrowArgs>(args: SelectSubset<T, CentroCostoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CentroCostoClient<$Result.GetResult<Prisma.$CentroCostoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CentroCosto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CentroCostoFindFirstArgs} args - Arguments to find a CentroCosto
     * @example
     * // Get one CentroCosto
     * const centroCosto = await prisma.centroCosto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CentroCostoFindFirstArgs>(args?: SelectSubset<T, CentroCostoFindFirstArgs<ExtArgs>>): Prisma__CentroCostoClient<$Result.GetResult<Prisma.$CentroCostoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CentroCosto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CentroCostoFindFirstOrThrowArgs} args - Arguments to find a CentroCosto
     * @example
     * // Get one CentroCosto
     * const centroCosto = await prisma.centroCosto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CentroCostoFindFirstOrThrowArgs>(args?: SelectSubset<T, CentroCostoFindFirstOrThrowArgs<ExtArgs>>): Prisma__CentroCostoClient<$Result.GetResult<Prisma.$CentroCostoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CentroCostos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CentroCostoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CentroCostos
     * const centroCostos = await prisma.centroCosto.findMany()
     * 
     * // Get first 10 CentroCostos
     * const centroCostos = await prisma.centroCosto.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const centroCostoWithIdOnly = await prisma.centroCosto.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CentroCostoFindManyArgs>(args?: SelectSubset<T, CentroCostoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CentroCostoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CentroCosto.
     * @param {CentroCostoCreateArgs} args - Arguments to create a CentroCosto.
     * @example
     * // Create one CentroCosto
     * const CentroCosto = await prisma.centroCosto.create({
     *   data: {
     *     // ... data to create a CentroCosto
     *   }
     * })
     * 
     */
    create<T extends CentroCostoCreateArgs>(args: SelectSubset<T, CentroCostoCreateArgs<ExtArgs>>): Prisma__CentroCostoClient<$Result.GetResult<Prisma.$CentroCostoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CentroCostos.
     * @param {CentroCostoCreateManyArgs} args - Arguments to create many CentroCostos.
     * @example
     * // Create many CentroCostos
     * const centroCosto = await prisma.centroCosto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CentroCostoCreateManyArgs>(args?: SelectSubset<T, CentroCostoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CentroCostos and returns the data saved in the database.
     * @param {CentroCostoCreateManyAndReturnArgs} args - Arguments to create many CentroCostos.
     * @example
     * // Create many CentroCostos
     * const centroCosto = await prisma.centroCosto.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CentroCostos and only return the `id`
     * const centroCostoWithIdOnly = await prisma.centroCosto.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CentroCostoCreateManyAndReturnArgs>(args?: SelectSubset<T, CentroCostoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CentroCostoPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CentroCosto.
     * @param {CentroCostoDeleteArgs} args - Arguments to delete one CentroCosto.
     * @example
     * // Delete one CentroCosto
     * const CentroCosto = await prisma.centroCosto.delete({
     *   where: {
     *     // ... filter to delete one CentroCosto
     *   }
     * })
     * 
     */
    delete<T extends CentroCostoDeleteArgs>(args: SelectSubset<T, CentroCostoDeleteArgs<ExtArgs>>): Prisma__CentroCostoClient<$Result.GetResult<Prisma.$CentroCostoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CentroCosto.
     * @param {CentroCostoUpdateArgs} args - Arguments to update one CentroCosto.
     * @example
     * // Update one CentroCosto
     * const centroCosto = await prisma.centroCosto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CentroCostoUpdateArgs>(args: SelectSubset<T, CentroCostoUpdateArgs<ExtArgs>>): Prisma__CentroCostoClient<$Result.GetResult<Prisma.$CentroCostoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CentroCostos.
     * @param {CentroCostoDeleteManyArgs} args - Arguments to filter CentroCostos to delete.
     * @example
     * // Delete a few CentroCostos
     * const { count } = await prisma.centroCosto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CentroCostoDeleteManyArgs>(args?: SelectSubset<T, CentroCostoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CentroCostos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CentroCostoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CentroCostos
     * const centroCosto = await prisma.centroCosto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CentroCostoUpdateManyArgs>(args: SelectSubset<T, CentroCostoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CentroCosto.
     * @param {CentroCostoUpsertArgs} args - Arguments to update or create a CentroCosto.
     * @example
     * // Update or create a CentroCosto
     * const centroCosto = await prisma.centroCosto.upsert({
     *   create: {
     *     // ... data to create a CentroCosto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CentroCosto we want to update
     *   }
     * })
     */
    upsert<T extends CentroCostoUpsertArgs>(args: SelectSubset<T, CentroCostoUpsertArgs<ExtArgs>>): Prisma__CentroCostoClient<$Result.GetResult<Prisma.$CentroCostoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CentroCostos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CentroCostoCountArgs} args - Arguments to filter CentroCostos to count.
     * @example
     * // Count the number of CentroCostos
     * const count = await prisma.centroCosto.count({
     *   where: {
     *     // ... the filter for the CentroCostos we want to count
     *   }
     * })
    **/
    count<T extends CentroCostoCountArgs>(
      args?: Subset<T, CentroCostoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CentroCostoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CentroCosto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CentroCostoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CentroCostoAggregateArgs>(args: Subset<T, CentroCostoAggregateArgs>): Prisma.PrismaPromise<GetCentroCostoAggregateType<T>>

    /**
     * Group by CentroCosto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CentroCostoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CentroCostoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CentroCostoGroupByArgs['orderBy'] }
        : { orderBy?: CentroCostoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CentroCostoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCentroCostoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CentroCosto model
   */
  readonly fields: CentroCostoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CentroCosto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CentroCostoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CentroCosto model
   */ 
  interface CentroCostoFieldRefs {
    readonly id: FieldRef<"CentroCosto", 'Int'>
    readonly centroCosto: FieldRef<"CentroCosto", 'String'>
    readonly ciaCC: FieldRef<"CentroCosto", 'String'>
    readonly responsable: FieldRef<"CentroCosto", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CentroCosto findUnique
   */
  export type CentroCostoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CentroCosto
     */
    select?: CentroCostoSelect<ExtArgs> | null
    /**
     * Filter, which CentroCosto to fetch.
     */
    where: CentroCostoWhereUniqueInput
  }

  /**
   * CentroCosto findUniqueOrThrow
   */
  export type CentroCostoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CentroCosto
     */
    select?: CentroCostoSelect<ExtArgs> | null
    /**
     * Filter, which CentroCosto to fetch.
     */
    where: CentroCostoWhereUniqueInput
  }

  /**
   * CentroCosto findFirst
   */
  export type CentroCostoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CentroCosto
     */
    select?: CentroCostoSelect<ExtArgs> | null
    /**
     * Filter, which CentroCosto to fetch.
     */
    where?: CentroCostoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CentroCostos to fetch.
     */
    orderBy?: CentroCostoOrderByWithRelationInput | CentroCostoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CentroCostos.
     */
    cursor?: CentroCostoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CentroCostos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CentroCostos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CentroCostos.
     */
    distinct?: CentroCostoScalarFieldEnum | CentroCostoScalarFieldEnum[]
  }

  /**
   * CentroCosto findFirstOrThrow
   */
  export type CentroCostoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CentroCosto
     */
    select?: CentroCostoSelect<ExtArgs> | null
    /**
     * Filter, which CentroCosto to fetch.
     */
    where?: CentroCostoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CentroCostos to fetch.
     */
    orderBy?: CentroCostoOrderByWithRelationInput | CentroCostoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CentroCostos.
     */
    cursor?: CentroCostoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CentroCostos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CentroCostos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CentroCostos.
     */
    distinct?: CentroCostoScalarFieldEnum | CentroCostoScalarFieldEnum[]
  }

  /**
   * CentroCosto findMany
   */
  export type CentroCostoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CentroCosto
     */
    select?: CentroCostoSelect<ExtArgs> | null
    /**
     * Filter, which CentroCostos to fetch.
     */
    where?: CentroCostoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CentroCostos to fetch.
     */
    orderBy?: CentroCostoOrderByWithRelationInput | CentroCostoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CentroCostos.
     */
    cursor?: CentroCostoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CentroCostos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CentroCostos.
     */
    skip?: number
    distinct?: CentroCostoScalarFieldEnum | CentroCostoScalarFieldEnum[]
  }

  /**
   * CentroCosto create
   */
  export type CentroCostoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CentroCosto
     */
    select?: CentroCostoSelect<ExtArgs> | null
    /**
     * The data needed to create a CentroCosto.
     */
    data?: XOR<CentroCostoCreateInput, CentroCostoUncheckedCreateInput>
  }

  /**
   * CentroCosto createMany
   */
  export type CentroCostoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CentroCostos.
     */
    data: CentroCostoCreateManyInput | CentroCostoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CentroCosto createManyAndReturn
   */
  export type CentroCostoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CentroCosto
     */
    select?: CentroCostoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CentroCostos.
     */
    data: CentroCostoCreateManyInput | CentroCostoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CentroCosto update
   */
  export type CentroCostoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CentroCosto
     */
    select?: CentroCostoSelect<ExtArgs> | null
    /**
     * The data needed to update a CentroCosto.
     */
    data: XOR<CentroCostoUpdateInput, CentroCostoUncheckedUpdateInput>
    /**
     * Choose, which CentroCosto to update.
     */
    where: CentroCostoWhereUniqueInput
  }

  /**
   * CentroCosto updateMany
   */
  export type CentroCostoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CentroCostos.
     */
    data: XOR<CentroCostoUpdateManyMutationInput, CentroCostoUncheckedUpdateManyInput>
    /**
     * Filter which CentroCostos to update
     */
    where?: CentroCostoWhereInput
  }

  /**
   * CentroCosto upsert
   */
  export type CentroCostoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CentroCosto
     */
    select?: CentroCostoSelect<ExtArgs> | null
    /**
     * The filter to search for the CentroCosto to update in case it exists.
     */
    where: CentroCostoWhereUniqueInput
    /**
     * In case the CentroCosto found by the `where` argument doesn't exist, create a new CentroCosto with this data.
     */
    create: XOR<CentroCostoCreateInput, CentroCostoUncheckedCreateInput>
    /**
     * In case the CentroCosto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CentroCostoUpdateInput, CentroCostoUncheckedUpdateInput>
  }

  /**
   * CentroCosto delete
   */
  export type CentroCostoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CentroCosto
     */
    select?: CentroCostoSelect<ExtArgs> | null
    /**
     * Filter which CentroCosto to delete.
     */
    where: CentroCostoWhereUniqueInput
  }

  /**
   * CentroCosto deleteMany
   */
  export type CentroCostoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CentroCostos to delete
     */
    where?: CentroCostoWhereInput
  }

  /**
   * CentroCosto without action
   */
  export type CentroCostoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CentroCosto
     */
    select?: CentroCostoSelect<ExtArgs> | null
  }


  /**
   * Model Factura
   */

  export type AggregateFactura = {
    _count: FacturaCountAggregateOutputType | null
    _avg: FacturaAvgAggregateOutputType | null
    _sum: FacturaSumAggregateOutputType | null
    _min: FacturaMinAggregateOutputType | null
    _max: FacturaMaxAggregateOutputType | null
  }

  export type FacturaAvgAggregateOutputType = {
    numeroControl: number | null
  }

  export type FacturaSumAggregateOutputType = {
    numeroControl: number | null
  }

  export type FacturaMinAggregateOutputType = {
    numeroControl: number | null
    cia: string | null
    ciaNit: string | null
    nit: string | null
    proveedor: string | null
    numeroFactura: string | null
    fechaRadicado: Date | null
    fechaFactura: Date | null
    facturaCredito: boolean | null
    acuseReciboSCI: boolean | null
    entregadaA: string | null
    fechaEntrega: Date | null
    fechaRecepcionCausacion: Date | null
    recibidaPor: string | null
    fechaRevisionCausacion: Date | null
    numeroCausacion: string | null
    fechaCausacion: Date | null
    observaciones: string | null
    creadoEn: Date | null
    actualizadoEn: Date | null
    enProceso: boolean | null
    finalizado: boolean | null
    causado: boolean | null
  }

  export type FacturaMaxAggregateOutputType = {
    numeroControl: number | null
    cia: string | null
    ciaNit: string | null
    nit: string | null
    proveedor: string | null
    numeroFactura: string | null
    fechaRadicado: Date | null
    fechaFactura: Date | null
    facturaCredito: boolean | null
    acuseReciboSCI: boolean | null
    entregadaA: string | null
    fechaEntrega: Date | null
    fechaRecepcionCausacion: Date | null
    recibidaPor: string | null
    fechaRevisionCausacion: Date | null
    numeroCausacion: string | null
    fechaCausacion: Date | null
    observaciones: string | null
    creadoEn: Date | null
    actualizadoEn: Date | null
    enProceso: boolean | null
    finalizado: boolean | null
    causado: boolean | null
  }

  export type FacturaCountAggregateOutputType = {
    numeroControl: number
    cia: number
    ciaNit: number
    nit: number
    proveedor: number
    numeroFactura: number
    fechaRadicado: number
    fechaFactura: number
    facturaCredito: number
    acuseReciboSCI: number
    entregadaA: number
    fechaEntrega: number
    fechaRecepcionCausacion: number
    recibidaPor: number
    fechaRevisionCausacion: number
    numeroCausacion: number
    fechaCausacion: number
    observaciones: number
    creadoEn: number
    actualizadoEn: number
    enProceso: number
    finalizado: number
    causado: number
    _all: number
  }


  export type FacturaAvgAggregateInputType = {
    numeroControl?: true
  }

  export type FacturaSumAggregateInputType = {
    numeroControl?: true
  }

  export type FacturaMinAggregateInputType = {
    numeroControl?: true
    cia?: true
    ciaNit?: true
    nit?: true
    proveedor?: true
    numeroFactura?: true
    fechaRadicado?: true
    fechaFactura?: true
    facturaCredito?: true
    acuseReciboSCI?: true
    entregadaA?: true
    fechaEntrega?: true
    fechaRecepcionCausacion?: true
    recibidaPor?: true
    fechaRevisionCausacion?: true
    numeroCausacion?: true
    fechaCausacion?: true
    observaciones?: true
    creadoEn?: true
    actualizadoEn?: true
    enProceso?: true
    finalizado?: true
    causado?: true
  }

  export type FacturaMaxAggregateInputType = {
    numeroControl?: true
    cia?: true
    ciaNit?: true
    nit?: true
    proveedor?: true
    numeroFactura?: true
    fechaRadicado?: true
    fechaFactura?: true
    facturaCredito?: true
    acuseReciboSCI?: true
    entregadaA?: true
    fechaEntrega?: true
    fechaRecepcionCausacion?: true
    recibidaPor?: true
    fechaRevisionCausacion?: true
    numeroCausacion?: true
    fechaCausacion?: true
    observaciones?: true
    creadoEn?: true
    actualizadoEn?: true
    enProceso?: true
    finalizado?: true
    causado?: true
  }

  export type FacturaCountAggregateInputType = {
    numeroControl?: true
    cia?: true
    ciaNit?: true
    nit?: true
    proveedor?: true
    numeroFactura?: true
    fechaRadicado?: true
    fechaFactura?: true
    facturaCredito?: true
    acuseReciboSCI?: true
    entregadaA?: true
    fechaEntrega?: true
    fechaRecepcionCausacion?: true
    recibidaPor?: true
    fechaRevisionCausacion?: true
    numeroCausacion?: true
    fechaCausacion?: true
    observaciones?: true
    creadoEn?: true
    actualizadoEn?: true
    enProceso?: true
    finalizado?: true
    causado?: true
    _all?: true
  }

  export type FacturaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Factura to aggregate.
     */
    where?: FacturaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Facturas to fetch.
     */
    orderBy?: FacturaOrderByWithRelationInput | FacturaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FacturaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Facturas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Facturas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Facturas
    **/
    _count?: true | FacturaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FacturaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FacturaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FacturaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FacturaMaxAggregateInputType
  }

  export type GetFacturaAggregateType<T extends FacturaAggregateArgs> = {
        [P in keyof T & keyof AggregateFactura]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFactura[P]>
      : GetScalarType<T[P], AggregateFactura[P]>
  }




  export type FacturaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FacturaWhereInput
    orderBy?: FacturaOrderByWithAggregationInput | FacturaOrderByWithAggregationInput[]
    by: FacturaScalarFieldEnum[] | FacturaScalarFieldEnum
    having?: FacturaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FacturaCountAggregateInputType | true
    _avg?: FacturaAvgAggregateInputType
    _sum?: FacturaSumAggregateInputType
    _min?: FacturaMinAggregateInputType
    _max?: FacturaMaxAggregateInputType
  }

  export type FacturaGroupByOutputType = {
    numeroControl: number
    cia: string | null
    ciaNit: string | null
    nit: string | null
    proveedor: string | null
    numeroFactura: string | null
    fechaRadicado: Date | null
    fechaFactura: Date | null
    facturaCredito: boolean | null
    acuseReciboSCI: boolean | null
    entregadaA: string | null
    fechaEntrega: Date | null
    fechaRecepcionCausacion: Date | null
    recibidaPor: string | null
    fechaRevisionCausacion: Date | null
    numeroCausacion: string | null
    fechaCausacion: Date | null
    observaciones: string | null
    creadoEn: Date | null
    actualizadoEn: Date | null
    enProceso: boolean | null
    finalizado: boolean | null
    causado: boolean | null
    _count: FacturaCountAggregateOutputType | null
    _avg: FacturaAvgAggregateOutputType | null
    _sum: FacturaSumAggregateOutputType | null
    _min: FacturaMinAggregateOutputType | null
    _max: FacturaMaxAggregateOutputType | null
  }

  type GetFacturaGroupByPayload<T extends FacturaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FacturaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FacturaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FacturaGroupByOutputType[P]>
            : GetScalarType<T[P], FacturaGroupByOutputType[P]>
        }
      >
    >


  export type FacturaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    numeroControl?: boolean
    cia?: boolean
    ciaNit?: boolean
    nit?: boolean
    proveedor?: boolean
    numeroFactura?: boolean
    fechaRadicado?: boolean
    fechaFactura?: boolean
    facturaCredito?: boolean
    acuseReciboSCI?: boolean
    entregadaA?: boolean
    fechaEntrega?: boolean
    fechaRecepcionCausacion?: boolean
    recibidaPor?: boolean
    fechaRevisionCausacion?: boolean
    numeroCausacion?: boolean
    fechaCausacion?: boolean
    observaciones?: boolean
    creadoEn?: boolean
    actualizadoEn?: boolean
    enProceso?: boolean
    finalizado?: boolean
    causado?: boolean
  }, ExtArgs["result"]["factura"]>

  export type FacturaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    numeroControl?: boolean
    cia?: boolean
    ciaNit?: boolean
    nit?: boolean
    proveedor?: boolean
    numeroFactura?: boolean
    fechaRadicado?: boolean
    fechaFactura?: boolean
    facturaCredito?: boolean
    acuseReciboSCI?: boolean
    entregadaA?: boolean
    fechaEntrega?: boolean
    fechaRecepcionCausacion?: boolean
    recibidaPor?: boolean
    fechaRevisionCausacion?: boolean
    numeroCausacion?: boolean
    fechaCausacion?: boolean
    observaciones?: boolean
    creadoEn?: boolean
    actualizadoEn?: boolean
    enProceso?: boolean
    finalizado?: boolean
    causado?: boolean
  }, ExtArgs["result"]["factura"]>

  export type FacturaSelectScalar = {
    numeroControl?: boolean
    cia?: boolean
    ciaNit?: boolean
    nit?: boolean
    proveedor?: boolean
    numeroFactura?: boolean
    fechaRadicado?: boolean
    fechaFactura?: boolean
    facturaCredito?: boolean
    acuseReciboSCI?: boolean
    entregadaA?: boolean
    fechaEntrega?: boolean
    fechaRecepcionCausacion?: boolean
    recibidaPor?: boolean
    fechaRevisionCausacion?: boolean
    numeroCausacion?: boolean
    fechaCausacion?: boolean
    observaciones?: boolean
    creadoEn?: boolean
    actualizadoEn?: boolean
    enProceso?: boolean
    finalizado?: boolean
    causado?: boolean
  }


  export type $FacturaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Factura"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      numeroControl: number
      cia: string | null
      ciaNit: string | null
      nit: string | null
      proveedor: string | null
      numeroFactura: string | null
      fechaRadicado: Date | null
      fechaFactura: Date | null
      facturaCredito: boolean | null
      acuseReciboSCI: boolean | null
      entregadaA: string | null
      fechaEntrega: Date | null
      fechaRecepcionCausacion: Date | null
      recibidaPor: string | null
      fechaRevisionCausacion: Date | null
      numeroCausacion: string | null
      fechaCausacion: Date | null
      observaciones: string | null
      creadoEn: Date | null
      actualizadoEn: Date | null
      enProceso: boolean | null
      finalizado: boolean | null
      causado: boolean | null
    }, ExtArgs["result"]["factura"]>
    composites: {}
  }

  type FacturaGetPayload<S extends boolean | null | undefined | FacturaDefaultArgs> = $Result.GetResult<Prisma.$FacturaPayload, S>

  type FacturaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FacturaFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FacturaCountAggregateInputType | true
    }

  export interface FacturaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Factura'], meta: { name: 'Factura' } }
    /**
     * Find zero or one Factura that matches the filter.
     * @param {FacturaFindUniqueArgs} args - Arguments to find a Factura
     * @example
     * // Get one Factura
     * const factura = await prisma.factura.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FacturaFindUniqueArgs>(args: SelectSubset<T, FacturaFindUniqueArgs<ExtArgs>>): Prisma__FacturaClient<$Result.GetResult<Prisma.$FacturaPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Factura that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FacturaFindUniqueOrThrowArgs} args - Arguments to find a Factura
     * @example
     * // Get one Factura
     * const factura = await prisma.factura.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FacturaFindUniqueOrThrowArgs>(args: SelectSubset<T, FacturaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FacturaClient<$Result.GetResult<Prisma.$FacturaPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Factura that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacturaFindFirstArgs} args - Arguments to find a Factura
     * @example
     * // Get one Factura
     * const factura = await prisma.factura.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FacturaFindFirstArgs>(args?: SelectSubset<T, FacturaFindFirstArgs<ExtArgs>>): Prisma__FacturaClient<$Result.GetResult<Prisma.$FacturaPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Factura that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacturaFindFirstOrThrowArgs} args - Arguments to find a Factura
     * @example
     * // Get one Factura
     * const factura = await prisma.factura.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FacturaFindFirstOrThrowArgs>(args?: SelectSubset<T, FacturaFindFirstOrThrowArgs<ExtArgs>>): Prisma__FacturaClient<$Result.GetResult<Prisma.$FacturaPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Facturas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacturaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Facturas
     * const facturas = await prisma.factura.findMany()
     * 
     * // Get first 10 Facturas
     * const facturas = await prisma.factura.findMany({ take: 10 })
     * 
     * // Only select the `numeroControl`
     * const facturaWithNumeroControlOnly = await prisma.factura.findMany({ select: { numeroControl: true } })
     * 
     */
    findMany<T extends FacturaFindManyArgs>(args?: SelectSubset<T, FacturaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FacturaPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Factura.
     * @param {FacturaCreateArgs} args - Arguments to create a Factura.
     * @example
     * // Create one Factura
     * const Factura = await prisma.factura.create({
     *   data: {
     *     // ... data to create a Factura
     *   }
     * })
     * 
     */
    create<T extends FacturaCreateArgs>(args: SelectSubset<T, FacturaCreateArgs<ExtArgs>>): Prisma__FacturaClient<$Result.GetResult<Prisma.$FacturaPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Facturas.
     * @param {FacturaCreateManyArgs} args - Arguments to create many Facturas.
     * @example
     * // Create many Facturas
     * const factura = await prisma.factura.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FacturaCreateManyArgs>(args?: SelectSubset<T, FacturaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Facturas and returns the data saved in the database.
     * @param {FacturaCreateManyAndReturnArgs} args - Arguments to create many Facturas.
     * @example
     * // Create many Facturas
     * const factura = await prisma.factura.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Facturas and only return the `numeroControl`
     * const facturaWithNumeroControlOnly = await prisma.factura.createManyAndReturn({ 
     *   select: { numeroControl: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FacturaCreateManyAndReturnArgs>(args?: SelectSubset<T, FacturaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FacturaPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Factura.
     * @param {FacturaDeleteArgs} args - Arguments to delete one Factura.
     * @example
     * // Delete one Factura
     * const Factura = await prisma.factura.delete({
     *   where: {
     *     // ... filter to delete one Factura
     *   }
     * })
     * 
     */
    delete<T extends FacturaDeleteArgs>(args: SelectSubset<T, FacturaDeleteArgs<ExtArgs>>): Prisma__FacturaClient<$Result.GetResult<Prisma.$FacturaPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Factura.
     * @param {FacturaUpdateArgs} args - Arguments to update one Factura.
     * @example
     * // Update one Factura
     * const factura = await prisma.factura.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FacturaUpdateArgs>(args: SelectSubset<T, FacturaUpdateArgs<ExtArgs>>): Prisma__FacturaClient<$Result.GetResult<Prisma.$FacturaPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Facturas.
     * @param {FacturaDeleteManyArgs} args - Arguments to filter Facturas to delete.
     * @example
     * // Delete a few Facturas
     * const { count } = await prisma.factura.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FacturaDeleteManyArgs>(args?: SelectSubset<T, FacturaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Facturas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacturaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Facturas
     * const factura = await prisma.factura.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FacturaUpdateManyArgs>(args: SelectSubset<T, FacturaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Factura.
     * @param {FacturaUpsertArgs} args - Arguments to update or create a Factura.
     * @example
     * // Update or create a Factura
     * const factura = await prisma.factura.upsert({
     *   create: {
     *     // ... data to create a Factura
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Factura we want to update
     *   }
     * })
     */
    upsert<T extends FacturaUpsertArgs>(args: SelectSubset<T, FacturaUpsertArgs<ExtArgs>>): Prisma__FacturaClient<$Result.GetResult<Prisma.$FacturaPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Facturas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacturaCountArgs} args - Arguments to filter Facturas to count.
     * @example
     * // Count the number of Facturas
     * const count = await prisma.factura.count({
     *   where: {
     *     // ... the filter for the Facturas we want to count
     *   }
     * })
    **/
    count<T extends FacturaCountArgs>(
      args?: Subset<T, FacturaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FacturaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Factura.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacturaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FacturaAggregateArgs>(args: Subset<T, FacturaAggregateArgs>): Prisma.PrismaPromise<GetFacturaAggregateType<T>>

    /**
     * Group by Factura.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacturaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FacturaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FacturaGroupByArgs['orderBy'] }
        : { orderBy?: FacturaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FacturaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFacturaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Factura model
   */
  readonly fields: FacturaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Factura.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FacturaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Factura model
   */ 
  interface FacturaFieldRefs {
    readonly numeroControl: FieldRef<"Factura", 'Int'>
    readonly cia: FieldRef<"Factura", 'String'>
    readonly ciaNit: FieldRef<"Factura", 'String'>
    readonly nit: FieldRef<"Factura", 'String'>
    readonly proveedor: FieldRef<"Factura", 'String'>
    readonly numeroFactura: FieldRef<"Factura", 'String'>
    readonly fechaRadicado: FieldRef<"Factura", 'DateTime'>
    readonly fechaFactura: FieldRef<"Factura", 'DateTime'>
    readonly facturaCredito: FieldRef<"Factura", 'Boolean'>
    readonly acuseReciboSCI: FieldRef<"Factura", 'Boolean'>
    readonly entregadaA: FieldRef<"Factura", 'String'>
    readonly fechaEntrega: FieldRef<"Factura", 'DateTime'>
    readonly fechaRecepcionCausacion: FieldRef<"Factura", 'DateTime'>
    readonly recibidaPor: FieldRef<"Factura", 'String'>
    readonly fechaRevisionCausacion: FieldRef<"Factura", 'DateTime'>
    readonly numeroCausacion: FieldRef<"Factura", 'String'>
    readonly fechaCausacion: FieldRef<"Factura", 'DateTime'>
    readonly observaciones: FieldRef<"Factura", 'String'>
    readonly creadoEn: FieldRef<"Factura", 'DateTime'>
    readonly actualizadoEn: FieldRef<"Factura", 'DateTime'>
    readonly enProceso: FieldRef<"Factura", 'Boolean'>
    readonly finalizado: FieldRef<"Factura", 'Boolean'>
    readonly causado: FieldRef<"Factura", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Factura findUnique
   */
  export type FacturaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Factura
     */
    select?: FacturaSelect<ExtArgs> | null
    /**
     * Filter, which Factura to fetch.
     */
    where: FacturaWhereUniqueInput
  }

  /**
   * Factura findUniqueOrThrow
   */
  export type FacturaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Factura
     */
    select?: FacturaSelect<ExtArgs> | null
    /**
     * Filter, which Factura to fetch.
     */
    where: FacturaWhereUniqueInput
  }

  /**
   * Factura findFirst
   */
  export type FacturaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Factura
     */
    select?: FacturaSelect<ExtArgs> | null
    /**
     * Filter, which Factura to fetch.
     */
    where?: FacturaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Facturas to fetch.
     */
    orderBy?: FacturaOrderByWithRelationInput | FacturaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Facturas.
     */
    cursor?: FacturaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Facturas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Facturas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Facturas.
     */
    distinct?: FacturaScalarFieldEnum | FacturaScalarFieldEnum[]
  }

  /**
   * Factura findFirstOrThrow
   */
  export type FacturaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Factura
     */
    select?: FacturaSelect<ExtArgs> | null
    /**
     * Filter, which Factura to fetch.
     */
    where?: FacturaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Facturas to fetch.
     */
    orderBy?: FacturaOrderByWithRelationInput | FacturaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Facturas.
     */
    cursor?: FacturaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Facturas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Facturas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Facturas.
     */
    distinct?: FacturaScalarFieldEnum | FacturaScalarFieldEnum[]
  }

  /**
   * Factura findMany
   */
  export type FacturaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Factura
     */
    select?: FacturaSelect<ExtArgs> | null
    /**
     * Filter, which Facturas to fetch.
     */
    where?: FacturaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Facturas to fetch.
     */
    orderBy?: FacturaOrderByWithRelationInput | FacturaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Facturas.
     */
    cursor?: FacturaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Facturas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Facturas.
     */
    skip?: number
    distinct?: FacturaScalarFieldEnum | FacturaScalarFieldEnum[]
  }

  /**
   * Factura create
   */
  export type FacturaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Factura
     */
    select?: FacturaSelect<ExtArgs> | null
    /**
     * The data needed to create a Factura.
     */
    data?: XOR<FacturaCreateInput, FacturaUncheckedCreateInput>
  }

  /**
   * Factura createMany
   */
  export type FacturaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Facturas.
     */
    data: FacturaCreateManyInput | FacturaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Factura createManyAndReturn
   */
  export type FacturaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Factura
     */
    select?: FacturaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Facturas.
     */
    data: FacturaCreateManyInput | FacturaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Factura update
   */
  export type FacturaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Factura
     */
    select?: FacturaSelect<ExtArgs> | null
    /**
     * The data needed to update a Factura.
     */
    data: XOR<FacturaUpdateInput, FacturaUncheckedUpdateInput>
    /**
     * Choose, which Factura to update.
     */
    where: FacturaWhereUniqueInput
  }

  /**
   * Factura updateMany
   */
  export type FacturaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Facturas.
     */
    data: XOR<FacturaUpdateManyMutationInput, FacturaUncheckedUpdateManyInput>
    /**
     * Filter which Facturas to update
     */
    where?: FacturaWhereInput
  }

  /**
   * Factura upsert
   */
  export type FacturaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Factura
     */
    select?: FacturaSelect<ExtArgs> | null
    /**
     * The filter to search for the Factura to update in case it exists.
     */
    where: FacturaWhereUniqueInput
    /**
     * In case the Factura found by the `where` argument doesn't exist, create a new Factura with this data.
     */
    create: XOR<FacturaCreateInput, FacturaUncheckedCreateInput>
    /**
     * In case the Factura was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FacturaUpdateInput, FacturaUncheckedUpdateInput>
  }

  /**
   * Factura delete
   */
  export type FacturaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Factura
     */
    select?: FacturaSelect<ExtArgs> | null
    /**
     * Filter which Factura to delete.
     */
    where: FacturaWhereUniqueInput
  }

  /**
   * Factura deleteMany
   */
  export type FacturaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Facturas to delete
     */
    where?: FacturaWhereInput
  }

  /**
   * Factura without action
   */
  export type FacturaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Factura
     */
    select?: FacturaSelect<ExtArgs> | null
  }


  /**
   * Model Negociador
   */

  export type AggregateNegociador = {
    _count: NegociadorCountAggregateOutputType | null
    _avg: NegociadorAvgAggregateOutputType | null
    _sum: NegociadorSumAggregateOutputType | null
    _min: NegociadorMinAggregateOutputType | null
    _max: NegociadorMaxAggregateOutputType | null
  }

  export type NegociadorAvgAggregateOutputType = {
    id: number | null
  }

  export type NegociadorSumAggregateOutputType = {
    id: number | null
  }

  export type NegociadorMinAggregateOutputType = {
    id: number | null
    negociador: string | null
    cargo: string | null
  }

  export type NegociadorMaxAggregateOutputType = {
    id: number | null
    negociador: string | null
    cargo: string | null
  }

  export type NegociadorCountAggregateOutputType = {
    id: number
    negociador: number
    cargo: number
    _all: number
  }


  export type NegociadorAvgAggregateInputType = {
    id?: true
  }

  export type NegociadorSumAggregateInputType = {
    id?: true
  }

  export type NegociadorMinAggregateInputType = {
    id?: true
    negociador?: true
    cargo?: true
  }

  export type NegociadorMaxAggregateInputType = {
    id?: true
    negociador?: true
    cargo?: true
  }

  export type NegociadorCountAggregateInputType = {
    id?: true
    negociador?: true
    cargo?: true
    _all?: true
  }

  export type NegociadorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Negociador to aggregate.
     */
    where?: NegociadorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Negociadors to fetch.
     */
    orderBy?: NegociadorOrderByWithRelationInput | NegociadorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NegociadorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Negociadors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Negociadors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Negociadors
    **/
    _count?: true | NegociadorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NegociadorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NegociadorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NegociadorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NegociadorMaxAggregateInputType
  }

  export type GetNegociadorAggregateType<T extends NegociadorAggregateArgs> = {
        [P in keyof T & keyof AggregateNegociador]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNegociador[P]>
      : GetScalarType<T[P], AggregateNegociador[P]>
  }




  export type NegociadorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NegociadorWhereInput
    orderBy?: NegociadorOrderByWithAggregationInput | NegociadorOrderByWithAggregationInput[]
    by: NegociadorScalarFieldEnum[] | NegociadorScalarFieldEnum
    having?: NegociadorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NegociadorCountAggregateInputType | true
    _avg?: NegociadorAvgAggregateInputType
    _sum?: NegociadorSumAggregateInputType
    _min?: NegociadorMinAggregateInputType
    _max?: NegociadorMaxAggregateInputType
  }

  export type NegociadorGroupByOutputType = {
    id: number
    negociador: string | null
    cargo: string | null
    _count: NegociadorCountAggregateOutputType | null
    _avg: NegociadorAvgAggregateOutputType | null
    _sum: NegociadorSumAggregateOutputType | null
    _min: NegociadorMinAggregateOutputType | null
    _max: NegociadorMaxAggregateOutputType | null
  }

  type GetNegociadorGroupByPayload<T extends NegociadorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NegociadorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NegociadorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NegociadorGroupByOutputType[P]>
            : GetScalarType<T[P], NegociadorGroupByOutputType[P]>
        }
      >
    >


  export type NegociadorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    negociador?: boolean
    cargo?: boolean
  }, ExtArgs["result"]["negociador"]>

  export type NegociadorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    negociador?: boolean
    cargo?: boolean
  }, ExtArgs["result"]["negociador"]>

  export type NegociadorSelectScalar = {
    id?: boolean
    negociador?: boolean
    cargo?: boolean
  }


  export type $NegociadorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Negociador"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      negociador: string | null
      cargo: string | null
    }, ExtArgs["result"]["negociador"]>
    composites: {}
  }

  type NegociadorGetPayload<S extends boolean | null | undefined | NegociadorDefaultArgs> = $Result.GetResult<Prisma.$NegociadorPayload, S>

  type NegociadorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NegociadorFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NegociadorCountAggregateInputType | true
    }

  export interface NegociadorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Negociador'], meta: { name: 'Negociador' } }
    /**
     * Find zero or one Negociador that matches the filter.
     * @param {NegociadorFindUniqueArgs} args - Arguments to find a Negociador
     * @example
     * // Get one Negociador
     * const negociador = await prisma.negociador.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NegociadorFindUniqueArgs>(args: SelectSubset<T, NegociadorFindUniqueArgs<ExtArgs>>): Prisma__NegociadorClient<$Result.GetResult<Prisma.$NegociadorPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Negociador that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NegociadorFindUniqueOrThrowArgs} args - Arguments to find a Negociador
     * @example
     * // Get one Negociador
     * const negociador = await prisma.negociador.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NegociadorFindUniqueOrThrowArgs>(args: SelectSubset<T, NegociadorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NegociadorClient<$Result.GetResult<Prisma.$NegociadorPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Negociador that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NegociadorFindFirstArgs} args - Arguments to find a Negociador
     * @example
     * // Get one Negociador
     * const negociador = await prisma.negociador.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NegociadorFindFirstArgs>(args?: SelectSubset<T, NegociadorFindFirstArgs<ExtArgs>>): Prisma__NegociadorClient<$Result.GetResult<Prisma.$NegociadorPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Negociador that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NegociadorFindFirstOrThrowArgs} args - Arguments to find a Negociador
     * @example
     * // Get one Negociador
     * const negociador = await prisma.negociador.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NegociadorFindFirstOrThrowArgs>(args?: SelectSubset<T, NegociadorFindFirstOrThrowArgs<ExtArgs>>): Prisma__NegociadorClient<$Result.GetResult<Prisma.$NegociadorPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Negociadors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NegociadorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Negociadors
     * const negociadors = await prisma.negociador.findMany()
     * 
     * // Get first 10 Negociadors
     * const negociadors = await prisma.negociador.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const negociadorWithIdOnly = await prisma.negociador.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NegociadorFindManyArgs>(args?: SelectSubset<T, NegociadorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NegociadorPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Negociador.
     * @param {NegociadorCreateArgs} args - Arguments to create a Negociador.
     * @example
     * // Create one Negociador
     * const Negociador = await prisma.negociador.create({
     *   data: {
     *     // ... data to create a Negociador
     *   }
     * })
     * 
     */
    create<T extends NegociadorCreateArgs>(args: SelectSubset<T, NegociadorCreateArgs<ExtArgs>>): Prisma__NegociadorClient<$Result.GetResult<Prisma.$NegociadorPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Negociadors.
     * @param {NegociadorCreateManyArgs} args - Arguments to create many Negociadors.
     * @example
     * // Create many Negociadors
     * const negociador = await prisma.negociador.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NegociadorCreateManyArgs>(args?: SelectSubset<T, NegociadorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Negociadors and returns the data saved in the database.
     * @param {NegociadorCreateManyAndReturnArgs} args - Arguments to create many Negociadors.
     * @example
     * // Create many Negociadors
     * const negociador = await prisma.negociador.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Negociadors and only return the `id`
     * const negociadorWithIdOnly = await prisma.negociador.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NegociadorCreateManyAndReturnArgs>(args?: SelectSubset<T, NegociadorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NegociadorPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Negociador.
     * @param {NegociadorDeleteArgs} args - Arguments to delete one Negociador.
     * @example
     * // Delete one Negociador
     * const Negociador = await prisma.negociador.delete({
     *   where: {
     *     // ... filter to delete one Negociador
     *   }
     * })
     * 
     */
    delete<T extends NegociadorDeleteArgs>(args: SelectSubset<T, NegociadorDeleteArgs<ExtArgs>>): Prisma__NegociadorClient<$Result.GetResult<Prisma.$NegociadorPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Negociador.
     * @param {NegociadorUpdateArgs} args - Arguments to update one Negociador.
     * @example
     * // Update one Negociador
     * const negociador = await prisma.negociador.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NegociadorUpdateArgs>(args: SelectSubset<T, NegociadorUpdateArgs<ExtArgs>>): Prisma__NegociadorClient<$Result.GetResult<Prisma.$NegociadorPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Negociadors.
     * @param {NegociadorDeleteManyArgs} args - Arguments to filter Negociadors to delete.
     * @example
     * // Delete a few Negociadors
     * const { count } = await prisma.negociador.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NegociadorDeleteManyArgs>(args?: SelectSubset<T, NegociadorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Negociadors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NegociadorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Negociadors
     * const negociador = await prisma.negociador.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NegociadorUpdateManyArgs>(args: SelectSubset<T, NegociadorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Negociador.
     * @param {NegociadorUpsertArgs} args - Arguments to update or create a Negociador.
     * @example
     * // Update or create a Negociador
     * const negociador = await prisma.negociador.upsert({
     *   create: {
     *     // ... data to create a Negociador
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Negociador we want to update
     *   }
     * })
     */
    upsert<T extends NegociadorUpsertArgs>(args: SelectSubset<T, NegociadorUpsertArgs<ExtArgs>>): Prisma__NegociadorClient<$Result.GetResult<Prisma.$NegociadorPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Negociadors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NegociadorCountArgs} args - Arguments to filter Negociadors to count.
     * @example
     * // Count the number of Negociadors
     * const count = await prisma.negociador.count({
     *   where: {
     *     // ... the filter for the Negociadors we want to count
     *   }
     * })
    **/
    count<T extends NegociadorCountArgs>(
      args?: Subset<T, NegociadorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NegociadorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Negociador.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NegociadorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NegociadorAggregateArgs>(args: Subset<T, NegociadorAggregateArgs>): Prisma.PrismaPromise<GetNegociadorAggregateType<T>>

    /**
     * Group by Negociador.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NegociadorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NegociadorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NegociadorGroupByArgs['orderBy'] }
        : { orderBy?: NegociadorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NegociadorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNegociadorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Negociador model
   */
  readonly fields: NegociadorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Negociador.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NegociadorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Negociador model
   */ 
  interface NegociadorFieldRefs {
    readonly id: FieldRef<"Negociador", 'Int'>
    readonly negociador: FieldRef<"Negociador", 'String'>
    readonly cargo: FieldRef<"Negociador", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Negociador findUnique
   */
  export type NegociadorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Negociador
     */
    select?: NegociadorSelect<ExtArgs> | null
    /**
     * Filter, which Negociador to fetch.
     */
    where: NegociadorWhereUniqueInput
  }

  /**
   * Negociador findUniqueOrThrow
   */
  export type NegociadorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Negociador
     */
    select?: NegociadorSelect<ExtArgs> | null
    /**
     * Filter, which Negociador to fetch.
     */
    where: NegociadorWhereUniqueInput
  }

  /**
   * Negociador findFirst
   */
  export type NegociadorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Negociador
     */
    select?: NegociadorSelect<ExtArgs> | null
    /**
     * Filter, which Negociador to fetch.
     */
    where?: NegociadorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Negociadors to fetch.
     */
    orderBy?: NegociadorOrderByWithRelationInput | NegociadorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Negociadors.
     */
    cursor?: NegociadorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Negociadors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Negociadors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Negociadors.
     */
    distinct?: NegociadorScalarFieldEnum | NegociadorScalarFieldEnum[]
  }

  /**
   * Negociador findFirstOrThrow
   */
  export type NegociadorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Negociador
     */
    select?: NegociadorSelect<ExtArgs> | null
    /**
     * Filter, which Negociador to fetch.
     */
    where?: NegociadorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Negociadors to fetch.
     */
    orderBy?: NegociadorOrderByWithRelationInput | NegociadorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Negociadors.
     */
    cursor?: NegociadorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Negociadors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Negociadors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Negociadors.
     */
    distinct?: NegociadorScalarFieldEnum | NegociadorScalarFieldEnum[]
  }

  /**
   * Negociador findMany
   */
  export type NegociadorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Negociador
     */
    select?: NegociadorSelect<ExtArgs> | null
    /**
     * Filter, which Negociadors to fetch.
     */
    where?: NegociadorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Negociadors to fetch.
     */
    orderBy?: NegociadorOrderByWithRelationInput | NegociadorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Negociadors.
     */
    cursor?: NegociadorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Negociadors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Negociadors.
     */
    skip?: number
    distinct?: NegociadorScalarFieldEnum | NegociadorScalarFieldEnum[]
  }

  /**
   * Negociador create
   */
  export type NegociadorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Negociador
     */
    select?: NegociadorSelect<ExtArgs> | null
    /**
     * The data needed to create a Negociador.
     */
    data?: XOR<NegociadorCreateInput, NegociadorUncheckedCreateInput>
  }

  /**
   * Negociador createMany
   */
  export type NegociadorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Negociadors.
     */
    data: NegociadorCreateManyInput | NegociadorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Negociador createManyAndReturn
   */
  export type NegociadorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Negociador
     */
    select?: NegociadorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Negociadors.
     */
    data: NegociadorCreateManyInput | NegociadorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Negociador update
   */
  export type NegociadorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Negociador
     */
    select?: NegociadorSelect<ExtArgs> | null
    /**
     * The data needed to update a Negociador.
     */
    data: XOR<NegociadorUpdateInput, NegociadorUncheckedUpdateInput>
    /**
     * Choose, which Negociador to update.
     */
    where: NegociadorWhereUniqueInput
  }

  /**
   * Negociador updateMany
   */
  export type NegociadorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Negociadors.
     */
    data: XOR<NegociadorUpdateManyMutationInput, NegociadorUncheckedUpdateManyInput>
    /**
     * Filter which Negociadors to update
     */
    where?: NegociadorWhereInput
  }

  /**
   * Negociador upsert
   */
  export type NegociadorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Negociador
     */
    select?: NegociadorSelect<ExtArgs> | null
    /**
     * The filter to search for the Negociador to update in case it exists.
     */
    where: NegociadorWhereUniqueInput
    /**
     * In case the Negociador found by the `where` argument doesn't exist, create a new Negociador with this data.
     */
    create: XOR<NegociadorCreateInput, NegociadorUncheckedCreateInput>
    /**
     * In case the Negociador was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NegociadorUpdateInput, NegociadorUncheckedUpdateInput>
  }

  /**
   * Negociador delete
   */
  export type NegociadorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Negociador
     */
    select?: NegociadorSelect<ExtArgs> | null
    /**
     * Filter which Negociador to delete.
     */
    where: NegociadorWhereUniqueInput
  }

  /**
   * Negociador deleteMany
   */
  export type NegociadorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Negociadors to delete
     */
    where?: NegociadorWhereInput
  }

  /**
   * Negociador without action
   */
  export type NegociadorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Negociador
     */
    select?: NegociadorSelect<ExtArgs> | null
  }


  /**
   * Model Persona
   */

  export type AggregatePersona = {
    _count: PersonaCountAggregateOutputType | null
    _avg: PersonaAvgAggregateOutputType | null
    _sum: PersonaSumAggregateOutputType | null
    _min: PersonaMinAggregateOutputType | null
    _max: PersonaMaxAggregateOutputType | null
  }

  export type PersonaAvgAggregateOutputType = {
    id: number | null
  }

  export type PersonaSumAggregateOutputType = {
    id: number | null
  }

  export type PersonaMinAggregateOutputType = {
    id: number | null
    nombre: string | null
    correo: string | null
    cargo: string | null
  }

  export type PersonaMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
    correo: string | null
    cargo: string | null
  }

  export type PersonaCountAggregateOutputType = {
    id: number
    nombre: number
    correo: number
    cargo: number
    _all: number
  }


  export type PersonaAvgAggregateInputType = {
    id?: true
  }

  export type PersonaSumAggregateInputType = {
    id?: true
  }

  export type PersonaMinAggregateInputType = {
    id?: true
    nombre?: true
    correo?: true
    cargo?: true
  }

  export type PersonaMaxAggregateInputType = {
    id?: true
    nombre?: true
    correo?: true
    cargo?: true
  }

  export type PersonaCountAggregateInputType = {
    id?: true
    nombre?: true
    correo?: true
    cargo?: true
    _all?: true
  }

  export type PersonaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Persona to aggregate.
     */
    where?: PersonaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Personas to fetch.
     */
    orderBy?: PersonaOrderByWithRelationInput | PersonaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PersonaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Personas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Personas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Personas
    **/
    _count?: true | PersonaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PersonaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PersonaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PersonaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PersonaMaxAggregateInputType
  }

  export type GetPersonaAggregateType<T extends PersonaAggregateArgs> = {
        [P in keyof T & keyof AggregatePersona]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePersona[P]>
      : GetScalarType<T[P], AggregatePersona[P]>
  }




  export type PersonaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PersonaWhereInput
    orderBy?: PersonaOrderByWithAggregationInput | PersonaOrderByWithAggregationInput[]
    by: PersonaScalarFieldEnum[] | PersonaScalarFieldEnum
    having?: PersonaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PersonaCountAggregateInputType | true
    _avg?: PersonaAvgAggregateInputType
    _sum?: PersonaSumAggregateInputType
    _min?: PersonaMinAggregateInputType
    _max?: PersonaMaxAggregateInputType
  }

  export type PersonaGroupByOutputType = {
    id: number
    nombre: string | null
    correo: string | null
    cargo: string | null
    _count: PersonaCountAggregateOutputType | null
    _avg: PersonaAvgAggregateOutputType | null
    _sum: PersonaSumAggregateOutputType | null
    _min: PersonaMinAggregateOutputType | null
    _max: PersonaMaxAggregateOutputType | null
  }

  type GetPersonaGroupByPayload<T extends PersonaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PersonaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PersonaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PersonaGroupByOutputType[P]>
            : GetScalarType<T[P], PersonaGroupByOutputType[P]>
        }
      >
    >


  export type PersonaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    correo?: boolean
    cargo?: boolean
  }, ExtArgs["result"]["persona"]>

  export type PersonaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    correo?: boolean
    cargo?: boolean
  }, ExtArgs["result"]["persona"]>

  export type PersonaSelectScalar = {
    id?: boolean
    nombre?: boolean
    correo?: boolean
    cargo?: boolean
  }


  export type $PersonaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Persona"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string | null
      correo: string | null
      cargo: string | null
    }, ExtArgs["result"]["persona"]>
    composites: {}
  }

  type PersonaGetPayload<S extends boolean | null | undefined | PersonaDefaultArgs> = $Result.GetResult<Prisma.$PersonaPayload, S>

  type PersonaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PersonaFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PersonaCountAggregateInputType | true
    }

  export interface PersonaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Persona'], meta: { name: 'Persona' } }
    /**
     * Find zero or one Persona that matches the filter.
     * @param {PersonaFindUniqueArgs} args - Arguments to find a Persona
     * @example
     * // Get one Persona
     * const persona = await prisma.persona.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PersonaFindUniqueArgs>(args: SelectSubset<T, PersonaFindUniqueArgs<ExtArgs>>): Prisma__PersonaClient<$Result.GetResult<Prisma.$PersonaPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Persona that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PersonaFindUniqueOrThrowArgs} args - Arguments to find a Persona
     * @example
     * // Get one Persona
     * const persona = await prisma.persona.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PersonaFindUniqueOrThrowArgs>(args: SelectSubset<T, PersonaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PersonaClient<$Result.GetResult<Prisma.$PersonaPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Persona that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonaFindFirstArgs} args - Arguments to find a Persona
     * @example
     * // Get one Persona
     * const persona = await prisma.persona.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PersonaFindFirstArgs>(args?: SelectSubset<T, PersonaFindFirstArgs<ExtArgs>>): Prisma__PersonaClient<$Result.GetResult<Prisma.$PersonaPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Persona that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonaFindFirstOrThrowArgs} args - Arguments to find a Persona
     * @example
     * // Get one Persona
     * const persona = await prisma.persona.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PersonaFindFirstOrThrowArgs>(args?: SelectSubset<T, PersonaFindFirstOrThrowArgs<ExtArgs>>): Prisma__PersonaClient<$Result.GetResult<Prisma.$PersonaPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Personas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Personas
     * const personas = await prisma.persona.findMany()
     * 
     * // Get first 10 Personas
     * const personas = await prisma.persona.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const personaWithIdOnly = await prisma.persona.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PersonaFindManyArgs>(args?: SelectSubset<T, PersonaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonaPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Persona.
     * @param {PersonaCreateArgs} args - Arguments to create a Persona.
     * @example
     * // Create one Persona
     * const Persona = await prisma.persona.create({
     *   data: {
     *     // ... data to create a Persona
     *   }
     * })
     * 
     */
    create<T extends PersonaCreateArgs>(args: SelectSubset<T, PersonaCreateArgs<ExtArgs>>): Prisma__PersonaClient<$Result.GetResult<Prisma.$PersonaPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Personas.
     * @param {PersonaCreateManyArgs} args - Arguments to create many Personas.
     * @example
     * // Create many Personas
     * const persona = await prisma.persona.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PersonaCreateManyArgs>(args?: SelectSubset<T, PersonaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Personas and returns the data saved in the database.
     * @param {PersonaCreateManyAndReturnArgs} args - Arguments to create many Personas.
     * @example
     * // Create many Personas
     * const persona = await prisma.persona.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Personas and only return the `id`
     * const personaWithIdOnly = await prisma.persona.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PersonaCreateManyAndReturnArgs>(args?: SelectSubset<T, PersonaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonaPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Persona.
     * @param {PersonaDeleteArgs} args - Arguments to delete one Persona.
     * @example
     * // Delete one Persona
     * const Persona = await prisma.persona.delete({
     *   where: {
     *     // ... filter to delete one Persona
     *   }
     * })
     * 
     */
    delete<T extends PersonaDeleteArgs>(args: SelectSubset<T, PersonaDeleteArgs<ExtArgs>>): Prisma__PersonaClient<$Result.GetResult<Prisma.$PersonaPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Persona.
     * @param {PersonaUpdateArgs} args - Arguments to update one Persona.
     * @example
     * // Update one Persona
     * const persona = await prisma.persona.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PersonaUpdateArgs>(args: SelectSubset<T, PersonaUpdateArgs<ExtArgs>>): Prisma__PersonaClient<$Result.GetResult<Prisma.$PersonaPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Personas.
     * @param {PersonaDeleteManyArgs} args - Arguments to filter Personas to delete.
     * @example
     * // Delete a few Personas
     * const { count } = await prisma.persona.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PersonaDeleteManyArgs>(args?: SelectSubset<T, PersonaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Personas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Personas
     * const persona = await prisma.persona.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PersonaUpdateManyArgs>(args: SelectSubset<T, PersonaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Persona.
     * @param {PersonaUpsertArgs} args - Arguments to update or create a Persona.
     * @example
     * // Update or create a Persona
     * const persona = await prisma.persona.upsert({
     *   create: {
     *     // ... data to create a Persona
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Persona we want to update
     *   }
     * })
     */
    upsert<T extends PersonaUpsertArgs>(args: SelectSubset<T, PersonaUpsertArgs<ExtArgs>>): Prisma__PersonaClient<$Result.GetResult<Prisma.$PersonaPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Personas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonaCountArgs} args - Arguments to filter Personas to count.
     * @example
     * // Count the number of Personas
     * const count = await prisma.persona.count({
     *   where: {
     *     // ... the filter for the Personas we want to count
     *   }
     * })
    **/
    count<T extends PersonaCountArgs>(
      args?: Subset<T, PersonaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PersonaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Persona.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PersonaAggregateArgs>(args: Subset<T, PersonaAggregateArgs>): Prisma.PrismaPromise<GetPersonaAggregateType<T>>

    /**
     * Group by Persona.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PersonaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PersonaGroupByArgs['orderBy'] }
        : { orderBy?: PersonaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PersonaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPersonaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Persona model
   */
  readonly fields: PersonaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Persona.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PersonaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Persona model
   */ 
  interface PersonaFieldRefs {
    readonly id: FieldRef<"Persona", 'Int'>
    readonly nombre: FieldRef<"Persona", 'String'>
    readonly correo: FieldRef<"Persona", 'String'>
    readonly cargo: FieldRef<"Persona", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Persona findUnique
   */
  export type PersonaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Persona
     */
    select?: PersonaSelect<ExtArgs> | null
    /**
     * Filter, which Persona to fetch.
     */
    where: PersonaWhereUniqueInput
  }

  /**
   * Persona findUniqueOrThrow
   */
  export type PersonaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Persona
     */
    select?: PersonaSelect<ExtArgs> | null
    /**
     * Filter, which Persona to fetch.
     */
    where: PersonaWhereUniqueInput
  }

  /**
   * Persona findFirst
   */
  export type PersonaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Persona
     */
    select?: PersonaSelect<ExtArgs> | null
    /**
     * Filter, which Persona to fetch.
     */
    where?: PersonaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Personas to fetch.
     */
    orderBy?: PersonaOrderByWithRelationInput | PersonaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Personas.
     */
    cursor?: PersonaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Personas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Personas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Personas.
     */
    distinct?: PersonaScalarFieldEnum | PersonaScalarFieldEnum[]
  }

  /**
   * Persona findFirstOrThrow
   */
  export type PersonaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Persona
     */
    select?: PersonaSelect<ExtArgs> | null
    /**
     * Filter, which Persona to fetch.
     */
    where?: PersonaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Personas to fetch.
     */
    orderBy?: PersonaOrderByWithRelationInput | PersonaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Personas.
     */
    cursor?: PersonaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Personas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Personas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Personas.
     */
    distinct?: PersonaScalarFieldEnum | PersonaScalarFieldEnum[]
  }

  /**
   * Persona findMany
   */
  export type PersonaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Persona
     */
    select?: PersonaSelect<ExtArgs> | null
    /**
     * Filter, which Personas to fetch.
     */
    where?: PersonaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Personas to fetch.
     */
    orderBy?: PersonaOrderByWithRelationInput | PersonaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Personas.
     */
    cursor?: PersonaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Personas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Personas.
     */
    skip?: number
    distinct?: PersonaScalarFieldEnum | PersonaScalarFieldEnum[]
  }

  /**
   * Persona create
   */
  export type PersonaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Persona
     */
    select?: PersonaSelect<ExtArgs> | null
    /**
     * The data needed to create a Persona.
     */
    data?: XOR<PersonaCreateInput, PersonaUncheckedCreateInput>
  }

  /**
   * Persona createMany
   */
  export type PersonaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Personas.
     */
    data: PersonaCreateManyInput | PersonaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Persona createManyAndReturn
   */
  export type PersonaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Persona
     */
    select?: PersonaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Personas.
     */
    data: PersonaCreateManyInput | PersonaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Persona update
   */
  export type PersonaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Persona
     */
    select?: PersonaSelect<ExtArgs> | null
    /**
     * The data needed to update a Persona.
     */
    data: XOR<PersonaUpdateInput, PersonaUncheckedUpdateInput>
    /**
     * Choose, which Persona to update.
     */
    where: PersonaWhereUniqueInput
  }

  /**
   * Persona updateMany
   */
  export type PersonaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Personas.
     */
    data: XOR<PersonaUpdateManyMutationInput, PersonaUncheckedUpdateManyInput>
    /**
     * Filter which Personas to update
     */
    where?: PersonaWhereInput
  }

  /**
   * Persona upsert
   */
  export type PersonaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Persona
     */
    select?: PersonaSelect<ExtArgs> | null
    /**
     * The filter to search for the Persona to update in case it exists.
     */
    where: PersonaWhereUniqueInput
    /**
     * In case the Persona found by the `where` argument doesn't exist, create a new Persona with this data.
     */
    create: XOR<PersonaCreateInput, PersonaUncheckedCreateInput>
    /**
     * In case the Persona was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PersonaUpdateInput, PersonaUncheckedUpdateInput>
  }

  /**
   * Persona delete
   */
  export type PersonaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Persona
     */
    select?: PersonaSelect<ExtArgs> | null
    /**
     * Filter which Persona to delete.
     */
    where: PersonaWhereUniqueInput
  }

  /**
   * Persona deleteMany
   */
  export type PersonaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Personas to delete
     */
    where?: PersonaWhereInput
  }

  /**
   * Persona without action
   */
  export type PersonaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Persona
     */
    select?: PersonaSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CentroCostoScalarFieldEnum: {
    id: 'id',
    centroCosto: 'centroCosto',
    ciaCC: 'ciaCC',
    responsable: 'responsable'
  };

  export type CentroCostoScalarFieldEnum = (typeof CentroCostoScalarFieldEnum)[keyof typeof CentroCostoScalarFieldEnum]


  export const FacturaScalarFieldEnum: {
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

  export type FacturaScalarFieldEnum = (typeof FacturaScalarFieldEnum)[keyof typeof FacturaScalarFieldEnum]


  export const NegociadorScalarFieldEnum: {
    id: 'id',
    negociador: 'negociador',
    cargo: 'cargo'
  };

  export type NegociadorScalarFieldEnum = (typeof NegociadorScalarFieldEnum)[keyof typeof NegociadorScalarFieldEnum]


  export const PersonaScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    correo: 'correo',
    cargo: 'cargo'
  };

  export type PersonaScalarFieldEnum = (typeof PersonaScalarFieldEnum)[keyof typeof PersonaScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type CentroCostoWhereInput = {
    AND?: CentroCostoWhereInput | CentroCostoWhereInput[]
    OR?: CentroCostoWhereInput[]
    NOT?: CentroCostoWhereInput | CentroCostoWhereInput[]
    id?: IntFilter<"CentroCosto"> | number
    centroCosto?: StringNullableFilter<"CentroCosto"> | string | null
    ciaCC?: StringNullableFilter<"CentroCosto"> | string | null
    responsable?: StringNullableFilter<"CentroCosto"> | string | null
  }

  export type CentroCostoOrderByWithRelationInput = {
    id?: SortOrder
    centroCosto?: SortOrderInput | SortOrder
    ciaCC?: SortOrderInput | SortOrder
    responsable?: SortOrderInput | SortOrder
  }

  export type CentroCostoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CentroCostoWhereInput | CentroCostoWhereInput[]
    OR?: CentroCostoWhereInput[]
    NOT?: CentroCostoWhereInput | CentroCostoWhereInput[]
    centroCosto?: StringNullableFilter<"CentroCosto"> | string | null
    ciaCC?: StringNullableFilter<"CentroCosto"> | string | null
    responsable?: StringNullableFilter<"CentroCosto"> | string | null
  }, "id">

  export type CentroCostoOrderByWithAggregationInput = {
    id?: SortOrder
    centroCosto?: SortOrderInput | SortOrder
    ciaCC?: SortOrderInput | SortOrder
    responsable?: SortOrderInput | SortOrder
    _count?: CentroCostoCountOrderByAggregateInput
    _avg?: CentroCostoAvgOrderByAggregateInput
    _max?: CentroCostoMaxOrderByAggregateInput
    _min?: CentroCostoMinOrderByAggregateInput
    _sum?: CentroCostoSumOrderByAggregateInput
  }

  export type CentroCostoScalarWhereWithAggregatesInput = {
    AND?: CentroCostoScalarWhereWithAggregatesInput | CentroCostoScalarWhereWithAggregatesInput[]
    OR?: CentroCostoScalarWhereWithAggregatesInput[]
    NOT?: CentroCostoScalarWhereWithAggregatesInput | CentroCostoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CentroCosto"> | number
    centroCosto?: StringNullableWithAggregatesFilter<"CentroCosto"> | string | null
    ciaCC?: StringNullableWithAggregatesFilter<"CentroCosto"> | string | null
    responsable?: StringNullableWithAggregatesFilter<"CentroCosto"> | string | null
  }

  export type FacturaWhereInput = {
    AND?: FacturaWhereInput | FacturaWhereInput[]
    OR?: FacturaWhereInput[]
    NOT?: FacturaWhereInput | FacturaWhereInput[]
    numeroControl?: IntFilter<"Factura"> | number
    cia?: StringNullableFilter<"Factura"> | string | null
    ciaNit?: StringNullableFilter<"Factura"> | string | null
    nit?: StringNullableFilter<"Factura"> | string | null
    proveedor?: StringNullableFilter<"Factura"> | string | null
    numeroFactura?: StringNullableFilter<"Factura"> | string | null
    fechaRadicado?: DateTimeNullableFilter<"Factura"> | Date | string | null
    fechaFactura?: DateTimeNullableFilter<"Factura"> | Date | string | null
    facturaCredito?: BoolNullableFilter<"Factura"> | boolean | null
    acuseReciboSCI?: BoolNullableFilter<"Factura"> | boolean | null
    entregadaA?: StringNullableFilter<"Factura"> | string | null
    fechaEntrega?: DateTimeNullableFilter<"Factura"> | Date | string | null
    fechaRecepcionCausacion?: DateTimeNullableFilter<"Factura"> | Date | string | null
    recibidaPor?: StringNullableFilter<"Factura"> | string | null
    fechaRevisionCausacion?: DateTimeNullableFilter<"Factura"> | Date | string | null
    numeroCausacion?: StringNullableFilter<"Factura"> | string | null
    fechaCausacion?: DateTimeNullableFilter<"Factura"> | Date | string | null
    observaciones?: StringNullableFilter<"Factura"> | string | null
    creadoEn?: DateTimeNullableFilter<"Factura"> | Date | string | null
    actualizadoEn?: DateTimeNullableFilter<"Factura"> | Date | string | null
    enProceso?: BoolNullableFilter<"Factura"> | boolean | null
    finalizado?: BoolNullableFilter<"Factura"> | boolean | null
    causado?: BoolNullableFilter<"Factura"> | boolean | null
  }

  export type FacturaOrderByWithRelationInput = {
    numeroControl?: SortOrder
    cia?: SortOrderInput | SortOrder
    ciaNit?: SortOrderInput | SortOrder
    nit?: SortOrderInput | SortOrder
    proveedor?: SortOrderInput | SortOrder
    numeroFactura?: SortOrderInput | SortOrder
    fechaRadicado?: SortOrderInput | SortOrder
    fechaFactura?: SortOrderInput | SortOrder
    facturaCredito?: SortOrderInput | SortOrder
    acuseReciboSCI?: SortOrderInput | SortOrder
    entregadaA?: SortOrderInput | SortOrder
    fechaEntrega?: SortOrderInput | SortOrder
    fechaRecepcionCausacion?: SortOrderInput | SortOrder
    recibidaPor?: SortOrderInput | SortOrder
    fechaRevisionCausacion?: SortOrderInput | SortOrder
    numeroCausacion?: SortOrderInput | SortOrder
    fechaCausacion?: SortOrderInput | SortOrder
    observaciones?: SortOrderInput | SortOrder
    creadoEn?: SortOrderInput | SortOrder
    actualizadoEn?: SortOrderInput | SortOrder
    enProceso?: SortOrderInput | SortOrder
    finalizado?: SortOrderInput | SortOrder
    causado?: SortOrderInput | SortOrder
  }

  export type FacturaWhereUniqueInput = Prisma.AtLeast<{
    numeroControl?: number
    AND?: FacturaWhereInput | FacturaWhereInput[]
    OR?: FacturaWhereInput[]
    NOT?: FacturaWhereInput | FacturaWhereInput[]
    cia?: StringNullableFilter<"Factura"> | string | null
    ciaNit?: StringNullableFilter<"Factura"> | string | null
    nit?: StringNullableFilter<"Factura"> | string | null
    proveedor?: StringNullableFilter<"Factura"> | string | null
    numeroFactura?: StringNullableFilter<"Factura"> | string | null
    fechaRadicado?: DateTimeNullableFilter<"Factura"> | Date | string | null
    fechaFactura?: DateTimeNullableFilter<"Factura"> | Date | string | null
    facturaCredito?: BoolNullableFilter<"Factura"> | boolean | null
    acuseReciboSCI?: BoolNullableFilter<"Factura"> | boolean | null
    entregadaA?: StringNullableFilter<"Factura"> | string | null
    fechaEntrega?: DateTimeNullableFilter<"Factura"> | Date | string | null
    fechaRecepcionCausacion?: DateTimeNullableFilter<"Factura"> | Date | string | null
    recibidaPor?: StringNullableFilter<"Factura"> | string | null
    fechaRevisionCausacion?: DateTimeNullableFilter<"Factura"> | Date | string | null
    numeroCausacion?: StringNullableFilter<"Factura"> | string | null
    fechaCausacion?: DateTimeNullableFilter<"Factura"> | Date | string | null
    observaciones?: StringNullableFilter<"Factura"> | string | null
    creadoEn?: DateTimeNullableFilter<"Factura"> | Date | string | null
    actualizadoEn?: DateTimeNullableFilter<"Factura"> | Date | string | null
    enProceso?: BoolNullableFilter<"Factura"> | boolean | null
    finalizado?: BoolNullableFilter<"Factura"> | boolean | null
    causado?: BoolNullableFilter<"Factura"> | boolean | null
  }, "numeroControl">

  export type FacturaOrderByWithAggregationInput = {
    numeroControl?: SortOrder
    cia?: SortOrderInput | SortOrder
    ciaNit?: SortOrderInput | SortOrder
    nit?: SortOrderInput | SortOrder
    proveedor?: SortOrderInput | SortOrder
    numeroFactura?: SortOrderInput | SortOrder
    fechaRadicado?: SortOrderInput | SortOrder
    fechaFactura?: SortOrderInput | SortOrder
    facturaCredito?: SortOrderInput | SortOrder
    acuseReciboSCI?: SortOrderInput | SortOrder
    entregadaA?: SortOrderInput | SortOrder
    fechaEntrega?: SortOrderInput | SortOrder
    fechaRecepcionCausacion?: SortOrderInput | SortOrder
    recibidaPor?: SortOrderInput | SortOrder
    fechaRevisionCausacion?: SortOrderInput | SortOrder
    numeroCausacion?: SortOrderInput | SortOrder
    fechaCausacion?: SortOrderInput | SortOrder
    observaciones?: SortOrderInput | SortOrder
    creadoEn?: SortOrderInput | SortOrder
    actualizadoEn?: SortOrderInput | SortOrder
    enProceso?: SortOrderInput | SortOrder
    finalizado?: SortOrderInput | SortOrder
    causado?: SortOrderInput | SortOrder
    _count?: FacturaCountOrderByAggregateInput
    _avg?: FacturaAvgOrderByAggregateInput
    _max?: FacturaMaxOrderByAggregateInput
    _min?: FacturaMinOrderByAggregateInput
    _sum?: FacturaSumOrderByAggregateInput
  }

  export type FacturaScalarWhereWithAggregatesInput = {
    AND?: FacturaScalarWhereWithAggregatesInput | FacturaScalarWhereWithAggregatesInput[]
    OR?: FacturaScalarWhereWithAggregatesInput[]
    NOT?: FacturaScalarWhereWithAggregatesInput | FacturaScalarWhereWithAggregatesInput[]
    numeroControl?: IntWithAggregatesFilter<"Factura"> | number
    cia?: StringNullableWithAggregatesFilter<"Factura"> | string | null
    ciaNit?: StringNullableWithAggregatesFilter<"Factura"> | string | null
    nit?: StringNullableWithAggregatesFilter<"Factura"> | string | null
    proveedor?: StringNullableWithAggregatesFilter<"Factura"> | string | null
    numeroFactura?: StringNullableWithAggregatesFilter<"Factura"> | string | null
    fechaRadicado?: DateTimeNullableWithAggregatesFilter<"Factura"> | Date | string | null
    fechaFactura?: DateTimeNullableWithAggregatesFilter<"Factura"> | Date | string | null
    facturaCredito?: BoolNullableWithAggregatesFilter<"Factura"> | boolean | null
    acuseReciboSCI?: BoolNullableWithAggregatesFilter<"Factura"> | boolean | null
    entregadaA?: StringNullableWithAggregatesFilter<"Factura"> | string | null
    fechaEntrega?: DateTimeNullableWithAggregatesFilter<"Factura"> | Date | string | null
    fechaRecepcionCausacion?: DateTimeNullableWithAggregatesFilter<"Factura"> | Date | string | null
    recibidaPor?: StringNullableWithAggregatesFilter<"Factura"> | string | null
    fechaRevisionCausacion?: DateTimeNullableWithAggregatesFilter<"Factura"> | Date | string | null
    numeroCausacion?: StringNullableWithAggregatesFilter<"Factura"> | string | null
    fechaCausacion?: DateTimeNullableWithAggregatesFilter<"Factura"> | Date | string | null
    observaciones?: StringNullableWithAggregatesFilter<"Factura"> | string | null
    creadoEn?: DateTimeNullableWithAggregatesFilter<"Factura"> | Date | string | null
    actualizadoEn?: DateTimeNullableWithAggregatesFilter<"Factura"> | Date | string | null
    enProceso?: BoolNullableWithAggregatesFilter<"Factura"> | boolean | null
    finalizado?: BoolNullableWithAggregatesFilter<"Factura"> | boolean | null
    causado?: BoolNullableWithAggregatesFilter<"Factura"> | boolean | null
  }

  export type NegociadorWhereInput = {
    AND?: NegociadorWhereInput | NegociadorWhereInput[]
    OR?: NegociadorWhereInput[]
    NOT?: NegociadorWhereInput | NegociadorWhereInput[]
    id?: IntFilter<"Negociador"> | number
    negociador?: StringNullableFilter<"Negociador"> | string | null
    cargo?: StringNullableFilter<"Negociador"> | string | null
  }

  export type NegociadorOrderByWithRelationInput = {
    id?: SortOrder
    negociador?: SortOrderInput | SortOrder
    cargo?: SortOrderInput | SortOrder
  }

  export type NegociadorWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: NegociadorWhereInput | NegociadorWhereInput[]
    OR?: NegociadorWhereInput[]
    NOT?: NegociadorWhereInput | NegociadorWhereInput[]
    negociador?: StringNullableFilter<"Negociador"> | string | null
    cargo?: StringNullableFilter<"Negociador"> | string | null
  }, "id">

  export type NegociadorOrderByWithAggregationInput = {
    id?: SortOrder
    negociador?: SortOrderInput | SortOrder
    cargo?: SortOrderInput | SortOrder
    _count?: NegociadorCountOrderByAggregateInput
    _avg?: NegociadorAvgOrderByAggregateInput
    _max?: NegociadorMaxOrderByAggregateInput
    _min?: NegociadorMinOrderByAggregateInput
    _sum?: NegociadorSumOrderByAggregateInput
  }

  export type NegociadorScalarWhereWithAggregatesInput = {
    AND?: NegociadorScalarWhereWithAggregatesInput | NegociadorScalarWhereWithAggregatesInput[]
    OR?: NegociadorScalarWhereWithAggregatesInput[]
    NOT?: NegociadorScalarWhereWithAggregatesInput | NegociadorScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Negociador"> | number
    negociador?: StringNullableWithAggregatesFilter<"Negociador"> | string | null
    cargo?: StringNullableWithAggregatesFilter<"Negociador"> | string | null
  }

  export type PersonaWhereInput = {
    AND?: PersonaWhereInput | PersonaWhereInput[]
    OR?: PersonaWhereInput[]
    NOT?: PersonaWhereInput | PersonaWhereInput[]
    id?: IntFilter<"Persona"> | number
    nombre?: StringNullableFilter<"Persona"> | string | null
    correo?: StringNullableFilter<"Persona"> | string | null
    cargo?: StringNullableFilter<"Persona"> | string | null
  }

  export type PersonaOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrderInput | SortOrder
    correo?: SortOrderInput | SortOrder
    cargo?: SortOrderInput | SortOrder
  }

  export type PersonaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PersonaWhereInput | PersonaWhereInput[]
    OR?: PersonaWhereInput[]
    NOT?: PersonaWhereInput | PersonaWhereInput[]
    nombre?: StringNullableFilter<"Persona"> | string | null
    correo?: StringNullableFilter<"Persona"> | string | null
    cargo?: StringNullableFilter<"Persona"> | string | null
  }, "id">

  export type PersonaOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrderInput | SortOrder
    correo?: SortOrderInput | SortOrder
    cargo?: SortOrderInput | SortOrder
    _count?: PersonaCountOrderByAggregateInput
    _avg?: PersonaAvgOrderByAggregateInput
    _max?: PersonaMaxOrderByAggregateInput
    _min?: PersonaMinOrderByAggregateInput
    _sum?: PersonaSumOrderByAggregateInput
  }

  export type PersonaScalarWhereWithAggregatesInput = {
    AND?: PersonaScalarWhereWithAggregatesInput | PersonaScalarWhereWithAggregatesInput[]
    OR?: PersonaScalarWhereWithAggregatesInput[]
    NOT?: PersonaScalarWhereWithAggregatesInput | PersonaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Persona"> | number
    nombre?: StringNullableWithAggregatesFilter<"Persona"> | string | null
    correo?: StringNullableWithAggregatesFilter<"Persona"> | string | null
    cargo?: StringNullableWithAggregatesFilter<"Persona"> | string | null
  }

  export type CentroCostoCreateInput = {
    centroCosto?: string | null
    ciaCC?: string | null
    responsable?: string | null
  }

  export type CentroCostoUncheckedCreateInput = {
    id?: number
    centroCosto?: string | null
    ciaCC?: string | null
    responsable?: string | null
  }

  export type CentroCostoUpdateInput = {
    centroCosto?: NullableStringFieldUpdateOperationsInput | string | null
    ciaCC?: NullableStringFieldUpdateOperationsInput | string | null
    responsable?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CentroCostoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    centroCosto?: NullableStringFieldUpdateOperationsInput | string | null
    ciaCC?: NullableStringFieldUpdateOperationsInput | string | null
    responsable?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CentroCostoCreateManyInput = {
    id?: number
    centroCosto?: string | null
    ciaCC?: string | null
    responsable?: string | null
  }

  export type CentroCostoUpdateManyMutationInput = {
    centroCosto?: NullableStringFieldUpdateOperationsInput | string | null
    ciaCC?: NullableStringFieldUpdateOperationsInput | string | null
    responsable?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CentroCostoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    centroCosto?: NullableStringFieldUpdateOperationsInput | string | null
    ciaCC?: NullableStringFieldUpdateOperationsInput | string | null
    responsable?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FacturaCreateInput = {
    cia?: string | null
    ciaNit?: string | null
    nit?: string | null
    proveedor?: string | null
    numeroFactura?: string | null
    fechaRadicado?: Date | string | null
    fechaFactura?: Date | string | null
    facturaCredito?: boolean | null
    acuseReciboSCI?: boolean | null
    entregadaA?: string | null
    fechaEntrega?: Date | string | null
    fechaRecepcionCausacion?: Date | string | null
    recibidaPor?: string | null
    fechaRevisionCausacion?: Date | string | null
    numeroCausacion?: string | null
    fechaCausacion?: Date | string | null
    observaciones?: string | null
    creadoEn?: Date | string | null
    actualizadoEn?: Date | string | null
    enProceso?: boolean | null
    finalizado?: boolean | null
    causado?: boolean | null
  }

  export type FacturaUncheckedCreateInput = {
    numeroControl?: number
    cia?: string | null
    ciaNit?: string | null
    nit?: string | null
    proveedor?: string | null
    numeroFactura?: string | null
    fechaRadicado?: Date | string | null
    fechaFactura?: Date | string | null
    facturaCredito?: boolean | null
    acuseReciboSCI?: boolean | null
    entregadaA?: string | null
    fechaEntrega?: Date | string | null
    fechaRecepcionCausacion?: Date | string | null
    recibidaPor?: string | null
    fechaRevisionCausacion?: Date | string | null
    numeroCausacion?: string | null
    fechaCausacion?: Date | string | null
    observaciones?: string | null
    creadoEn?: Date | string | null
    actualizadoEn?: Date | string | null
    enProceso?: boolean | null
    finalizado?: boolean | null
    causado?: boolean | null
  }

  export type FacturaUpdateInput = {
    cia?: NullableStringFieldUpdateOperationsInput | string | null
    ciaNit?: NullableStringFieldUpdateOperationsInput | string | null
    nit?: NullableStringFieldUpdateOperationsInput | string | null
    proveedor?: NullableStringFieldUpdateOperationsInput | string | null
    numeroFactura?: NullableStringFieldUpdateOperationsInput | string | null
    fechaRadicado?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaFactura?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    facturaCredito?: NullableBoolFieldUpdateOperationsInput | boolean | null
    acuseReciboSCI?: NullableBoolFieldUpdateOperationsInput | boolean | null
    entregadaA?: NullableStringFieldUpdateOperationsInput | string | null
    fechaEntrega?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaRecepcionCausacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recibidaPor?: NullableStringFieldUpdateOperationsInput | string | null
    fechaRevisionCausacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    numeroCausacion?: NullableStringFieldUpdateOperationsInput | string | null
    fechaCausacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualizadoEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    enProceso?: NullableBoolFieldUpdateOperationsInput | boolean | null
    finalizado?: NullableBoolFieldUpdateOperationsInput | boolean | null
    causado?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type FacturaUncheckedUpdateInput = {
    numeroControl?: IntFieldUpdateOperationsInput | number
    cia?: NullableStringFieldUpdateOperationsInput | string | null
    ciaNit?: NullableStringFieldUpdateOperationsInput | string | null
    nit?: NullableStringFieldUpdateOperationsInput | string | null
    proveedor?: NullableStringFieldUpdateOperationsInput | string | null
    numeroFactura?: NullableStringFieldUpdateOperationsInput | string | null
    fechaRadicado?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaFactura?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    facturaCredito?: NullableBoolFieldUpdateOperationsInput | boolean | null
    acuseReciboSCI?: NullableBoolFieldUpdateOperationsInput | boolean | null
    entregadaA?: NullableStringFieldUpdateOperationsInput | string | null
    fechaEntrega?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaRecepcionCausacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recibidaPor?: NullableStringFieldUpdateOperationsInput | string | null
    fechaRevisionCausacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    numeroCausacion?: NullableStringFieldUpdateOperationsInput | string | null
    fechaCausacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualizadoEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    enProceso?: NullableBoolFieldUpdateOperationsInput | boolean | null
    finalizado?: NullableBoolFieldUpdateOperationsInput | boolean | null
    causado?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type FacturaCreateManyInput = {
    numeroControl?: number
    cia?: string | null
    ciaNit?: string | null
    nit?: string | null
    proveedor?: string | null
    numeroFactura?: string | null
    fechaRadicado?: Date | string | null
    fechaFactura?: Date | string | null
    facturaCredito?: boolean | null
    acuseReciboSCI?: boolean | null
    entregadaA?: string | null
    fechaEntrega?: Date | string | null
    fechaRecepcionCausacion?: Date | string | null
    recibidaPor?: string | null
    fechaRevisionCausacion?: Date | string | null
    numeroCausacion?: string | null
    fechaCausacion?: Date | string | null
    observaciones?: string | null
    creadoEn?: Date | string | null
    actualizadoEn?: Date | string | null
    enProceso?: boolean | null
    finalizado?: boolean | null
    causado?: boolean | null
  }

  export type FacturaUpdateManyMutationInput = {
    cia?: NullableStringFieldUpdateOperationsInput | string | null
    ciaNit?: NullableStringFieldUpdateOperationsInput | string | null
    nit?: NullableStringFieldUpdateOperationsInput | string | null
    proveedor?: NullableStringFieldUpdateOperationsInput | string | null
    numeroFactura?: NullableStringFieldUpdateOperationsInput | string | null
    fechaRadicado?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaFactura?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    facturaCredito?: NullableBoolFieldUpdateOperationsInput | boolean | null
    acuseReciboSCI?: NullableBoolFieldUpdateOperationsInput | boolean | null
    entregadaA?: NullableStringFieldUpdateOperationsInput | string | null
    fechaEntrega?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaRecepcionCausacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recibidaPor?: NullableStringFieldUpdateOperationsInput | string | null
    fechaRevisionCausacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    numeroCausacion?: NullableStringFieldUpdateOperationsInput | string | null
    fechaCausacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualizadoEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    enProceso?: NullableBoolFieldUpdateOperationsInput | boolean | null
    finalizado?: NullableBoolFieldUpdateOperationsInput | boolean | null
    causado?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type FacturaUncheckedUpdateManyInput = {
    numeroControl?: IntFieldUpdateOperationsInput | number
    cia?: NullableStringFieldUpdateOperationsInput | string | null
    ciaNit?: NullableStringFieldUpdateOperationsInput | string | null
    nit?: NullableStringFieldUpdateOperationsInput | string | null
    proveedor?: NullableStringFieldUpdateOperationsInput | string | null
    numeroFactura?: NullableStringFieldUpdateOperationsInput | string | null
    fechaRadicado?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaFactura?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    facturaCredito?: NullableBoolFieldUpdateOperationsInput | boolean | null
    acuseReciboSCI?: NullableBoolFieldUpdateOperationsInput | boolean | null
    entregadaA?: NullableStringFieldUpdateOperationsInput | string | null
    fechaEntrega?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaRecepcionCausacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recibidaPor?: NullableStringFieldUpdateOperationsInput | string | null
    fechaRevisionCausacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    numeroCausacion?: NullableStringFieldUpdateOperationsInput | string | null
    fechaCausacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    creadoEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actualizadoEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    enProceso?: NullableBoolFieldUpdateOperationsInput | boolean | null
    finalizado?: NullableBoolFieldUpdateOperationsInput | boolean | null
    causado?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type NegociadorCreateInput = {
    negociador?: string | null
    cargo?: string | null
  }

  export type NegociadorUncheckedCreateInput = {
    id?: number
    negociador?: string | null
    cargo?: string | null
  }

  export type NegociadorUpdateInput = {
    negociador?: NullableStringFieldUpdateOperationsInput | string | null
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NegociadorUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    negociador?: NullableStringFieldUpdateOperationsInput | string | null
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NegociadorCreateManyInput = {
    id?: number
    negociador?: string | null
    cargo?: string | null
  }

  export type NegociadorUpdateManyMutationInput = {
    negociador?: NullableStringFieldUpdateOperationsInput | string | null
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NegociadorUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    negociador?: NullableStringFieldUpdateOperationsInput | string | null
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PersonaCreateInput = {
    nombre?: string | null
    correo?: string | null
    cargo?: string | null
  }

  export type PersonaUncheckedCreateInput = {
    id?: number
    nombre?: string | null
    correo?: string | null
    cargo?: string | null
  }

  export type PersonaUpdateInput = {
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    correo?: NullableStringFieldUpdateOperationsInput | string | null
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PersonaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    correo?: NullableStringFieldUpdateOperationsInput | string | null
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PersonaCreateManyInput = {
    id?: number
    nombre?: string | null
    correo?: string | null
    cargo?: string | null
  }

  export type PersonaUpdateManyMutationInput = {
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    correo?: NullableStringFieldUpdateOperationsInput | string | null
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PersonaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: NullableStringFieldUpdateOperationsInput | string | null
    correo?: NullableStringFieldUpdateOperationsInput | string | null
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CentroCostoCountOrderByAggregateInput = {
    id?: SortOrder
    centroCosto?: SortOrder
    ciaCC?: SortOrder
    responsable?: SortOrder
  }

  export type CentroCostoAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CentroCostoMaxOrderByAggregateInput = {
    id?: SortOrder
    centroCosto?: SortOrder
    ciaCC?: SortOrder
    responsable?: SortOrder
  }

  export type CentroCostoMinOrderByAggregateInput = {
    id?: SortOrder
    centroCosto?: SortOrder
    ciaCC?: SortOrder
    responsable?: SortOrder
  }

  export type CentroCostoSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type FacturaCountOrderByAggregateInput = {
    numeroControl?: SortOrder
    cia?: SortOrder
    ciaNit?: SortOrder
    nit?: SortOrder
    proveedor?: SortOrder
    numeroFactura?: SortOrder
    fechaRadicado?: SortOrder
    fechaFactura?: SortOrder
    facturaCredito?: SortOrder
    acuseReciboSCI?: SortOrder
    entregadaA?: SortOrder
    fechaEntrega?: SortOrder
    fechaRecepcionCausacion?: SortOrder
    recibidaPor?: SortOrder
    fechaRevisionCausacion?: SortOrder
    numeroCausacion?: SortOrder
    fechaCausacion?: SortOrder
    observaciones?: SortOrder
    creadoEn?: SortOrder
    actualizadoEn?: SortOrder
    enProceso?: SortOrder
    finalizado?: SortOrder
    causado?: SortOrder
  }

  export type FacturaAvgOrderByAggregateInput = {
    numeroControl?: SortOrder
  }

  export type FacturaMaxOrderByAggregateInput = {
    numeroControl?: SortOrder
    cia?: SortOrder
    ciaNit?: SortOrder
    nit?: SortOrder
    proveedor?: SortOrder
    numeroFactura?: SortOrder
    fechaRadicado?: SortOrder
    fechaFactura?: SortOrder
    facturaCredito?: SortOrder
    acuseReciboSCI?: SortOrder
    entregadaA?: SortOrder
    fechaEntrega?: SortOrder
    fechaRecepcionCausacion?: SortOrder
    recibidaPor?: SortOrder
    fechaRevisionCausacion?: SortOrder
    numeroCausacion?: SortOrder
    fechaCausacion?: SortOrder
    observaciones?: SortOrder
    creadoEn?: SortOrder
    actualizadoEn?: SortOrder
    enProceso?: SortOrder
    finalizado?: SortOrder
    causado?: SortOrder
  }

  export type FacturaMinOrderByAggregateInput = {
    numeroControl?: SortOrder
    cia?: SortOrder
    ciaNit?: SortOrder
    nit?: SortOrder
    proveedor?: SortOrder
    numeroFactura?: SortOrder
    fechaRadicado?: SortOrder
    fechaFactura?: SortOrder
    facturaCredito?: SortOrder
    acuseReciboSCI?: SortOrder
    entregadaA?: SortOrder
    fechaEntrega?: SortOrder
    fechaRecepcionCausacion?: SortOrder
    recibidaPor?: SortOrder
    fechaRevisionCausacion?: SortOrder
    numeroCausacion?: SortOrder
    fechaCausacion?: SortOrder
    observaciones?: SortOrder
    creadoEn?: SortOrder
    actualizadoEn?: SortOrder
    enProceso?: SortOrder
    finalizado?: SortOrder
    causado?: SortOrder
  }

  export type FacturaSumOrderByAggregateInput = {
    numeroControl?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NegociadorCountOrderByAggregateInput = {
    id?: SortOrder
    negociador?: SortOrder
    cargo?: SortOrder
  }

  export type NegociadorAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type NegociadorMaxOrderByAggregateInput = {
    id?: SortOrder
    negociador?: SortOrder
    cargo?: SortOrder
  }

  export type NegociadorMinOrderByAggregateInput = {
    id?: SortOrder
    negociador?: SortOrder
    cargo?: SortOrder
  }

  export type NegociadorSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PersonaCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    correo?: SortOrder
    cargo?: SortOrder
  }

  export type PersonaAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PersonaMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    correo?: SortOrder
    cargo?: SortOrder
  }

  export type PersonaMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    correo?: SortOrder
    cargo?: SortOrder
  }

  export type PersonaSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use CentroCostoDefaultArgs instead
     */
    export type CentroCostoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CentroCostoDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FacturaDefaultArgs instead
     */
    export type FacturaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FacturaDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NegociadorDefaultArgs instead
     */
    export type NegociadorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NegociadorDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PersonaDefaultArgs instead
     */
    export type PersonaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PersonaDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
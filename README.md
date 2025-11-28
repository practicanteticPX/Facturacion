# Sistema de Control de Facturas

Sistema web para migrar el proceso manual de inscripción de facturas de Excel a una aplicación web CRUD empresarial.

## Stack Tecnológico

- **Backend**: Node.js + Apollo Server (GraphQL) + Prisma ORM
- **Frontend**: React + Apollo Client
- **Base de Datos**: PostgreSQL (2 bases de datos externas)
- **Contenedores**: Docker + Docker Compose

## Arquitectura

El proyecto sigue los principios de **Clean Architecture**:

- **Controllers/Resolvers**: Manejan las peticiones GraphQL
- **Services**: Contienen toda la lógica de negocio (validaciones, cálculos)
- **Repositories**: Gestión de datos mediante Prisma ORM

## Estructura del Proyecto

```
crud_2/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Schema para SERV_QPREX (escritura)
│   │   └── schema2.prisma         # Schema para DB_QPREX (solo lectura)
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js        # Configuración de conexiones
│   │   ├── services/
│   │   │   ├── facturaService.js  # Lógica de negocio de facturas
│   │   │   ├── proveedorService.js # Validación de proveedores
│   │   │   └── personaService.js   # Gestión de colaboradores
│   │   ├── graphql/
│   │   │   ├── schema.js          # Definición del schema GraphQL
│   │   │   └── resolvers.js       # Resolvers de GraphQL
│   │   ├── utils/
│   │   │   ├── constants.js       # Constantes del sistema
│   │   │   └── validators.js      # Validadores
│   │   └── index.js               # Punto de entrada
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── apollo/
│   │   │   ├── client.js          # Cliente Apollo
│   │   │   └── queries.js         # Queries y Mutations
│   │   ├── components/
│   │   │   ├── InscripcionFactura.js
│   │   │   ├── ListaFacturas.js
│   │   │   └── EditarFactura.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── .env.example
├── CLAUDE.md                      # Directrices del proyecto
└── README.md
```

## Configuración Inicial

### 1. Crear Base de Datos

Antes de ejecutar la aplicación, necesitas crear la tabla de facturas en la base de datos SERV_QPREX:

```sql
-- Conectarse a SERV_QPREX
CREATE SCHEMA IF NOT EXISTS crud_facturas;

-- Crear tabla de facturas
CREATE TABLE crud_facturas.facturas (
    id SERIAL PRIMARY KEY,
    numero_control VARCHAR(50) NOT NULL,
    cia VARCHAR(2) NOT NULL,
    nit VARCHAR(50) NOT NULL,
    numero_factura VARCHAR(100) NOT NULL,
    fecha_radicado DATE NOT NULL,
    fecha_factura DATE NOT NULL,
    factura_credito BOOLEAN DEFAULT FALSE,
    acuse_recibo_sci BOOLEAN DEFAULT FALSE,
    entregada_a VARCHAR(100),
    fecha_entrega DATE,
    elaboro_plantilla VARCHAR(10),
    fecha_recepcion_causacion DATE,
    recibida_por VARCHAR(100),
    fecha_revision_causacion DATE,
    numero_causacion VARCHAR(100),
    fecha_causacion DATE,
    observaciones VARCHAR(100),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_facturas_cia ON crud_facturas.facturas(cia);
CREATE INDEX idx_facturas_nit ON crud_facturas.facturas(nit);
CREATE INDEX idx_facturas_numero_control ON crud_facturas.facturas(numero_control);
```

**NOTA**: Verifica que las siguientes tablas ya existan:
- `crud_facturas.T_Personas` (en SERV_QPREX) - Lista de colaboradores
- `crud_facturas.T_Cias` (en SERV_QPREX) - Lista de compañías
- `public.T_Dim_Cedulas_Nits` (en DB_QPREX) - Proveedores

### 2. Configurar Variables de Entorno

Copia el archivo `.env.example` a `.env` y ajusta las credenciales si es necesario:

```bash
cp .env.example .env
```

El archivo `.env` ya contiene las conexiones correctas:

```env
DATABASE_URL="postgresql://admin:$40M1n*!!2023@192.168.0.254:5432/SERV_QPREX"
DATABASE_URL_2="postgresql://admin:$40M1n*!!2023@192.168.0.254:5432/DB_QPREX"
PORT=4000
FRONTEND_URL=http://localhost:3000
```

### 3. Instalar Dependencias y Generar Clientes Prisma

#### Backend

```bash
cd backend
npm install
npx prisma generate --schema=./prisma/schema.prisma
npx prisma generate --schema=./prisma/schema2.prisma
```

#### Frontend

```bash
cd frontend
npm install
```

## Ejecución

### Modo Desarrollo (sin Docker)

#### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

El servidor GraphQL estará disponible en: `http://localhost:4000/graphql`

#### Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

La aplicación web estará disponible en: `http://localhost:3000`

### Modo Producción (con Docker)

```bash
# Desde la raíz del proyecto
docker-compose up --build
```

Esto levantará ambos servicios:
- Backend: `http://localhost:4000/graphql`
- Frontend: `http://localhost:3000`

Para detener los contenedores:
```bash
docker-compose down
```

## Funcionalidades

### 1. Inscripción de Facturas

Permite crear nuevas facturas con los siguientes campos:

**Campos Básicos (Obligatorios):**
- Nº. Control
- Compañía (lista obtenida desde SERV_QPREX.crud_facturas.T_Cias)
- NIT (con validación contra DB_QPREX.public.T_Dim_Cedulas_Nits)
- No. Factura
- Fecha Radicado
- Fecha Factura

**Campos Opcionales:**
- Factura a Crédito (Sí/No)
- Acuse Recibo SCI (Sí/No)
- Entregada a (lista obtenida desde SERV_QPREX.crud_facturas.T_Personas)
- Fecha de Entrega
- Elaboró Plantilla (vacío o "OK")

**Campos Calculados Automáticamente:**
- Compañía + NIT (concatenación)
- Proveedor (nombre obtenido desde DB_QPREX)

### 2. Visualización y Edición de Facturas

- Lista todas las facturas con filtros por Compañía, NIT y Nº. Control
- Permite editar cualquier factura
- Incluye campos adicionales solo editables después de la creación:
  - Fecha Recepción Causación
  - Recibida por
  - Fecha Revisión Causación
  - No. Causación
  - Fecha Causación
  - Observaciones (4 opciones predefinidas)

**NOTA**: NO existe funcionalidad de eliminación de facturas.

## Validaciones Implementadas

1. **Validación de Proveedor**: El NIT debe existir en `DB_QPREX.public.T_Dim_Cedulas_Nits`
2. **Validación de Compañía**: El código de compañía debe existir en `SERV_QPREX.crud_facturas.T_Cias`
3. **Validación de Personas**: Los nombres deben existir en `SERV_QPREX.crud_facturas.T_Personas`
4. **Validación de Plantilla**: Solo valores vacíos o "OK"
5. **Validación de Observaciones**: Solo las 4 opciones predefinidas

## GraphQL API

### Queries

```graphql
# Obtener todas las facturas (con filtros opcionales)
query {
  facturas(filtros: { cia: "PX" }) {
    id
    numeroControl
    cia
    ciaNit
    proveedor
    # ... más campos
  }
}

# Obtener una factura por ID
query {
  factura(id: 1) {
    id
    numeroControl
    # ...
  }
}

# Obtener lista de personas
query {
  personas {
    id
    nombre
  }
}

# Buscar proveedor por NIT
query {
  proveedor(nit: "801002775") {
    Codigo
    Nombre
  }
}

# Opciones de listas
query {
  companias
  opcionesPlantilla
  opcionesObservaciones
}
```

### Mutations

```graphql
# Crear factura
mutation {
  crearFactura(input: {
    numeroControl: "001"
    cia: "PX"
    nit: "801002775"
    numeroFactura: "FAC-001"
    fechaRadicado: "2024-01-15"
    fechaFactura: "2024-01-14"
    facturaCredito: true
  }) {
    id
    numeroControl
    proveedor
  }
}

# Actualizar factura
mutation {
  actualizarFactura(id: 1, input: {
    observaciones: "Factura Anulada"
    numeroCausacion: "CAUS-001"
  }) {
    id
    observaciones
  }
}
```

## Mantenimiento

### Regenerar Clientes Prisma

Si cambias los schemas de Prisma, regenera los clientes:

```bash
cd backend
npx prisma generate --schema=./prisma/schema.prisma
npx prisma generate --schema=./prisma/schema2.prisma
```

### Actualizar Modelos desde BD Existente

Para reflejar cambios en las tablas existentes:

```bash
# Para SERV_QPREX
npx prisma db pull --schema=./prisma/schema.prisma

# Para DB_QPREX
npx prisma db pull --schema=./prisma/schema2.prisma
```

## Solución de Problemas

### Error de Conexión a Base de Datos

Verifica:
1. Que las credenciales en `.env` sean correctas
2. Que el servidor PostgreSQL esté accesible desde tu máquina
3. Que los esquemas `crud_facturas` (SERV_QPREX) y `public` (DB_QPREX) existan

### Proveedor no encontrado

Asegúrate de que el NIT existe en la tabla `DB_QPREX.public.T_Dim_Cedulas_Nits`

### Lista de personas vacía

Verifica que la tabla `SERV_QPREX.crud_facturas.T_Personas` tenga datos.

### Error de Prisma multiSchema

Si ves errores como "@@schema is only available with the `multiSchema` preview feature", asegúrate de que:
1. Los schemas de Prisma tienen `previewFeatures = ["multiSchema"]` en el generador
2. Estás ejecutando los comandos con el flag `--schema` correcto

### Error de OpenSSL en Docker

El Dockerfile ya incluye la instalación de OpenSSL (`apk add --no-cache openssl`) para evitar errores de libssl. Si aún tienes problemas:
1. Limpia las imágenes Docker: `docker-compose down --rmi all`
2. Reconstruye: `docker-compose up --build`

## Mejoras Futuras

- [ ] Exportación a Excel
- [ ] Reportes y estadísticas
- [ ] Notificaciones de facturas próximas a vencer
- [ ] Búsqueda avanzada con múltiples filtros
- [ ] Historial de cambios (auditoría)
- [ ] Autenticación y autorización de usuarios

## Licencia

Uso interno empresarial.

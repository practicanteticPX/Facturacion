# Scripts SQL - Tabla T_Facturas

## Descripción General
Este directorio contiene scripts SQL para configurar y actualizar la base de datos del sistema de control de facturas.

## Scripts Disponibles

### 1. `init_complete_database.sql` ✅ RECOMENDADO (Base de datos nueva)
**Usar cuando:** Estás creando la base de datos por primera vez o necesitas reconstruir todo desde cero.

**Incluye:**
- Creación del schema `crud_facturas`
- Tabla `T_Cias` (Compañías)
- Tabla `T_Personas` (Colaboradores)
- Tabla `T_Facturas` (Registro principal) con TODOS los campos actualizados
- Índices de optimización
- Comentarios descriptivos

**Ejecución:**
```bash
psql -h 192.168.0.254 -U admin -d SERV_QPREX -f init_complete_database.sql
```

---

### 2. `alter_t_facturas_add_legaliza_anticipo.sql` ✅ RECOMENDADO (Si ya tienes datos)
**Usar cuando:** Ya tienes la tabla `T_Facturas` con datos y solo necesitas agregar el campo `legaliza_anticipo`.

**Incluye:**
- Verificación si la columna ya existe
- Agregado seguro de la columna `legaliza_anticipo`
- NO elimina datos existentes

**Ejecución:**
```bash
psql -h 192.168.0.254 -U admin -d SERV_QPREX -f alter_t_facturas_add_legaliza_anticipo.sql
```

---

### 3. `recreate_t_facturas.sql` ⚠️ CUIDADO (Elimina datos)
**Usar cuando:** Necesitas reconstruir SOLO la tabla `T_Facturas` (no otras tablas).

**ADVERTENCIA:** Este script incluye un `DROP TABLE` comentado. Si lo descomentas, **PERDERÁS TODOS LOS DATOS** de la tabla.

**Ejecución:**
```bash
psql -h 192.168.0.254 -U admin -d SERV_QPREX -f recreate_t_facturas.sql
```

---

### 4. `20251201095403_add_legaliza_anticipo_field/migration.sql`
**Uso:** Migración de Prisma (se ejecuta automáticamente con `npx prisma migrate deploy`).

**Ejecución:**
```bash
cd /d/CRUD/backend
npx prisma migrate deploy
```

---

## Recomendación según tu caso

### Caso 1: Base de datos nueva (sin datos)
```bash
# Ejecutar:
psql -h 192.168.0.254 -U admin -d SERV_QPREX -f init_complete_database.sql

# Luego sincronizar Prisma:
cd /d/CRUD/backend
npx prisma db pull
npx prisma generate
```

### Caso 2: Base de datos existente con datos
```bash
# Ejecutar solo:
psql -h 192.168.0.254 -U admin -d SERV_QPREX -f alter_t_facturas_add_legaliza_anticipo.sql

# Luego sincronizar Prisma:
cd /d/CRUD/backend
npx prisma db pull
npx prisma generate
```

### Caso 3: Desarrollo local con Docker
```bash
# Si tienes un contenedor PostgreSQL local, Prisma puede manejar las migraciones:
cd /d/CRUD/backend
npx prisma migrate deploy
npx prisma generate
```

---

## Estructura de la Tabla T_Facturas (Actualizada)

| Campo | Tipo | Obligatorio | Default | Descripción |
|-------|------|-------------|---------|-------------|
| `id` | SERIAL | Sí | AUTO | ID autoincremental |
| `numero_control` | VARCHAR(50) | Sí | - | Número único autoincremental (generado por backend) |
| `cia` | VARCHAR(2) | Sí | - | Código de compañía |
| `cia_nit` | VARCHAR(50) | Sí | - | Concatenación Cia + NIT |
| `nit` | VARCHAR(20) | Sí | - | NIT del proveedor |
| `proveedor` | VARCHAR(255) | Sí | - | Nombre del proveedor |
| `numero_factura` | VARCHAR(50) | Sí | - | Número de la factura |
| `fecha_radicado` | DATE | Sí | - | Fecha de radicado |
| `fecha_factura` | DATE | Sí | - | Fecha de emisión |
| `factura_credito` | VARCHAR(2) | Sí | - | Si/No |
| `acuse_recibo_sci` | VARCHAR(2) | Sí | - | Si/No |
| `legaliza_anticipo` | VARCHAR(2) | Sí | 'No' | **NUEVO** Si/No |
| `entregada_a` | VARCHAR(255) | Sí | - | Persona que recibe |
| `fecha_entrega` | DATE | Sí | - | Fecha de entrega |
| `elaboro_plantilla` | VARCHAR(10) | No | '' | Opciones plantilla |
| `fecha_recepcion_causacion` | DATE | No | NULL | Fecha recepción |
| `recibida_por` | VARCHAR(255) | No | NULL | Recibida por |
| `fecha_revision_causacion` | DATE | No | NULL | Fecha revisión |
| `numero_causacion` | VARCHAR(50) | No | NULL | Número de causación |
| `fecha_causacion` | DATE | No | NULL | Fecha de causación |
| `observaciones` | VARCHAR(50) | No | NULL | Observaciones |
| `created_at` | TIMESTAMPTZ | Auto | NOW() | Fecha de creación |
| `updated_at` | TIMESTAMPTZ | Auto | NOW() | Fecha de actualización |

---

## Notas Importantes

1. **Backup:** Siempre haz un backup antes de ejecutar scripts SQL en producción:
   ```bash
   pg_dump -h 192.168.0.254 -U admin -d SERV_QPREX -t crud_facturas.T_Facturas > backup_facturas.sql
   ```

2. **Campo numero_control:** Ya NO se envía desde el frontend. El backend lo genera automáticamente.

3. **Campo legaliza_anticipo:** Nuevo campo tipo checkbox (Si/No).

4. **Campo elaboro_plantilla:** Aunque está en el schema, ya NO se usa en el formulario de inscripción.

---

## Contacto
Para más información, consultar el archivo `CLAUDE.md` en la raíz del proyecto.

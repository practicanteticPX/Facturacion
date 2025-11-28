# DIRECTRICES DEL PROYECTO: Sistema Web de Registro de Facturas (Migración Excel -> CRUD)

## 1. CONTEXTO Y OBJETIVO
El proyecto consiste en reemplazar un proceso manual de inscripción de facturas (actualmente en una hoja de Excel "Control de Facturas") por una aplicación web empresarial (CRUD).
* **El Problema:** Actualmente se usa Excel con fórmulas (concatenaciones y BUSCARV) para validar datos.
* **La Solución:** Un sistema Web donde el usuario diligencia el formulario y el Backend se encarga de la lógica de validación contra una **Base de Datos PostgreSQL YA EXISTENTE**.
* **Infraestructura:** Despliegue en Docker (Contenedores para Backend y Frontend). La Base de Datos es un servicio externo, NO un contenedor.

## 2. ESTÁNDARES DE INGENIERÍA (MANDATORIOS)
Actúa como un **Arquitecto de Software Senior**.
* **Clean Architecture:** Estricta separación de capas:
    * `Controllers`: Manejan HTTP.
    * `Services`: Contienen TODA la lógica de negocio (aquí se recrean las fórmulas de Excel).
    * `Repositories`: Solo conexión y consultas a la BD existente.
* **Clean Code:** Código autodocumentado. Prohibido dejar código muerto, comentado o "deprecated". Si se cambia algo, se borra lo viejo.
* **Variables:** No repetir valores. Usa constantes o ENUMs.
* **Manejo de Errores:** Robusto. Todo fallo debe ser capturado y logueado, devolviendo mensajes claros al frontend.

## 3. INFRAESTRUCTURA Y BASE DE DATOS
* **Base de Datos (EXTERNA):**
    * Nos conectamos a un PostgreSQL existente.
    * **PROHIBIDO:** Crear scripts `init.sql`, crear tablas nuevas (DDL) o añadir un servicio `db` en el `docker-compose.yml`.
    * **ACCIÓN:** Usa un ORM o Query Builder para mapear/reflejar las tablas existentes.
* **Docker Compose:**
    * Solo debe orquestar la App (Backend) y la Web (Frontend).
    * La configuración de conexión a BD se inyecta vía variables de entorno (`.env`).

## 4. ESTRATEGIA DE MIGRACIÓN DE LÓGICA (EL RETO)
Tu tarea principal es traducir las columnas del Excel a lógica de aplicación:

### A. Columnas de Entrada (Input Usuario)
Estos datos se reciben del Frontend y se guardan directamente:
* `Numero de Control`, `Compañía`, `NIT Proveedor`, `Numero Factura`, `Fechas`, `Observaciones`.

### B. Columnas Calculadas (Lógica de Servicio)
Lo que antes eran fórmulas, ahora son reglas de negocio en la capa de `Services`:
1.  **Validación de Proveedor (Antiguo BUSCARV):**
    * *Excel:* Buscaba el NIT en otra hoja.
    * *Backend:* Al recibir el NIT, el servicio debe consultar la tabla maestra de proveedores (existente). Si no existe, lanza error. No guardes el "Nombre del Proveedor" en la tabla de facturas, recupéralo con un `JOIN` al consultar.
2.  **Concatenaciones (Antiguo `&`):**
    * Si el Excel unía columnas (ej: Cia + Nit), el Backend debe hacer esto al vuelo al devolver datos al Frontend (DTOs), no guardarlo duplicado en la BD.

## 5. ESTRUCTURA DE ARCHIVOS
Mantén el orden profesional.

```text
/
├── .env.example          # Configuración de conexión (Host BD externa, etc)
├── CLAUDE.md             # Estas reglas
├── docker-compose.yml    # Orquestador (Solo Apps)
├── /backend              # API
│   ├── /src
│   │   ├── /config       # Conexión a BD Externa
│   │   ├── /controllers  # Endpoints
│   │   ├── /services     # Lógica de negocio (Reemplazo de fórmulas)
│   │   ├── /models       # Mapeo de tablas existentes
│   │   └── /utils        # Validadores
└── /frontend             # Cliente Web
# Guía Rápida: Acceso desde Red Local

## Problema Común

Si ves el error: `Failed to load resource: net::ERR_CONNECTION_REFUSED` en `localhost:4000/graphql`

**Causa:** El frontend está intentando conectarse a `localhost`, pero desde otro equipo, "localhost" se refiere a su propia máquina, no al servidor.

## Solución Rápida

### 1. En el Equipo SERVIDOR (donde corre el backend)

#### Opción A: Usando Docker

```bash
# 1. Detén los contenedores si están corriendo
docker-compose down

# 2. Inicia los servicios
docker-compose up --build
```

#### Opción B: Sin Docker (Modo Desarrollo)

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

### 2. En Equipos CLIENTES (otros equipos en la red)

Abre tu navegador y accede a:

```
http://192.168.0.98:3000
```

**Reemplaza `192.168.0.98` con la IP real del servidor** (puedes verla ejecutando `ipconfig` en el servidor)

## Verificación

Una vez que los servicios estén corriendo, verifica:

### Desde el Servidor:
- Frontend: http://localhost:3000 ✓
- Backend: http://localhost:4000/graphql ✓

### Desde Otros Equipos:
- Frontend: http://192.168.0.98:3000 ✓
- Backend: http://192.168.0.98:4000/graphql ✓

## Configuración de Firewall (Solo si es necesario)

Si aún no funciona, permite el tráfico en los puertos 3000 y 4000:

**Windows (PowerShell como Administrador):**
```powershell
New-NetFirewallRule -DisplayName "React App" -Direction Inbound -LocalPort 3000 -Protocol TCP -Action Allow
New-NetFirewallRule -DisplayName "GraphQL Backend" -Direction Inbound -LocalPort 4000 -Protocol TCP -Action Allow
```

**Linux:**
```bash
sudo ufw allow 3000/tcp
sudo ufw allow 4000/tcp
```

## Resumen de Configuración Actual

El archivo `.env` está configurado con:
- `REACT_APP_GRAPHQL_URL=http://192.168.0.98:4000/graphql`
- `FRONTEND_URL=http://192.168.0.98:3000`

Esto permite:
- ✅ Acceso desde el mismo servidor (localhost)
- ✅ Acceso desde otros equipos en la red local
- ✅ CORS configurado para redes privadas

## Preguntas Frecuentes

### ¿Por qué veo "localhost:4000" en el error?

Porque el frontend fue compilado/iniciado con la configuración anterior. Necesitas **reiniciar el frontend** después de cambiar el archivo `.env`.

### ¿Necesito cambiar algo en el código?

No. El código ya está configurado para leer la variable de entorno `REACT_APP_GRAPHQL_URL`. Solo necesitas:
1. Actualizar el archivo `.env` con la IP correcta
2. Reiniciar los servicios

### ¿Qué IP debo usar?

La IP de la interfaz de red local (no WSL, no VirtualBox):
- Ejecuta `ipconfig` en Windows
- Busca "Dirección IPv4" que comience con `192.168.x.x` o `10.x.x.x`

### ¿Funciona con Docker?

Sí. Docker Compose lee el archivo `.env` automáticamente. Solo necesitas:
```bash
docker-compose down
docker-compose up --build
```

### ¿Y si la IP del servidor cambia?

Si la IP cambia (DHCP), necesitas:
1. Obtener la nueva IP con `ipconfig`
2. Actualizar el archivo `.env`
3. Reiniciar los servicios

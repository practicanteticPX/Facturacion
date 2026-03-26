# Configuración Dinámica de URLs

La aplicación ahora soporta **configuración automática y dinámica** de URLs, funcionando con:
- ✅ HTTP o HTTPS
- ✅ Direcciones IP (192.168.x.x, 10.x.x.x, etc.)
- ✅ Dominios (ejemplo.com, miapp.local, etc.)
- ✅ Localhost
- ✅ Con o sin puertos personalizados

## Cómo Funciona

### Frontend (Detección Automática)

El frontend detecta automáticamente la URL del backend basándose en `window.location`:

```javascript
// Si accedes desde: http://192.168.0.30:3001
// Frontend se conecta a: http://192.168.0.30:4001/graphql

// Si accedes desde: https://midominio.com:3001
// Frontend se conecta a: https://midominio.com:4001/graphql

// Si accedes desde: http://localhost:3001
// Frontend se conecta a: http://localhost:4001/graphql
```

**Ubicación del código:** `frontend/src/apollo/client.js` - función `getGraphQLUrl()`

### Backend (CORS Flexible)

El backend acepta peticiones desde cualquier origen que use HTTP o HTTPS, incluyendo:
- localhost (cualquier puerto)
- IPs de red local (192.168.x.x, 10.x.x.x, 172.16-31.x.x)
- Cualquier dominio válido

**Ubicación del código:** `backend/src/index.js` - configuración de CORS

## Escenarios de Uso

### 1. Desarrollo Local (localhost)

```bash
# Frontend en http://localhost:3001
# Backend en http://localhost:4001
# ✅ Funciona automáticamente
```

### 2. Red Local con IP

```bash
# Frontend en http://192.168.0.30:3001
# Backend en http://192.168.0.30:4001
# ✅ Funciona automáticamente
```

### 3. Dominio con HTTP

```bash
# Frontend en http://facturas.miempresa.local:3001
# Backend en http://facturas.miempresa.local:4001
# ✅ Funciona automáticamente
```

### 4. Dominio con HTTPS (Configuración Especial)

```bash
# Frontend en https://facturas.miempresa.com:3001
# Backend en http://facturas.miempresa.com:4001 (por defecto usa HTTP)
# ⚠️ Requiere configuración de variable de entorno si el backend está en HTTPS

# Para backend en HTTPS, define:
REACT_APP_GRAPHQL_URL=https://facturas.miempresa.com:4001/graphql
```

**Nota Importante:** Por defecto, el frontend usa HTTP para conectarse al backend, incluso si el frontend está en HTTPS. Esto evita errores de "mixed content". Si tu backend soporta HTTPS, debes configurar explícitamente `REACT_APP_GRAPHQL_URL`.

### 5. Frontend y Backend en Servidores Diferentes

Si el backend está en un servidor diferente al frontend, puedes usar la variable de entorno:

```env
# En .env o docker-compose.yml
REACT_APP_GRAPHQL_URL=https://api.miempresa.com:4001/graphql
```

## Variables de Entorno (Opcionales)

### Frontend

```env
# Solo necesaria si el backend está en un servidor diferente
REACT_APP_GRAPHQL_URL=http://backend-server:4001/graphql
```

### Backend

```env
# Ya no es necesaria - CORS acepta cualquier origen HTTP/HTTPS
# FRONTEND_URL=http://192.168.0.30:3001
```

## Configuración de Docker

### Puertos en docker-compose.yml

```yaml
services:
  backend:
    ports:
      - "192.168.0.30:4001:4001"  # Cambiar IP según tu red
      # O usar: "4001:4001" para escuchar en todas las interfaces

  frontend:
    ports:
      - "192.168.0.30:3001:3001"  # Cambiar IP según tu red
      # O usar: "3001:3001" para escuchar en todas las interfaces
```

### Para Acceso Desde Cualquier IP

Si quieres que la aplicación sea accesible desde cualquier IP de la red:

```yaml
services:
  backend:
    ports:
      - "4001:4001"  # Accesible desde cualquier IP

  frontend:
    ports:
      - "3001:3001"  # Accesible desde cualquier IP
```

## Configuración con HTTPS

### Opción 1: Reverse Proxy (Recomendado)

Usa un reverse proxy como Nginx o Caddy:

```nginx
server {
    listen 443 ssl;
    server_name facturas.miempresa.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3001;
    }

    location /graphql {
        proxy_pass http://localhost:4001;
    }
}
```

### Opción 2: Certificados Directos

1. Configura certificados SSL en el backend (Express)
2. Actualiza los puertos en docker-compose.yml
3. La detección automática funcionará con HTTPS

## Verificación

### Consola del Navegador

Abre las DevTools del navegador y verás:

```
🔗 Apollo Client conectándose a: http://192.168.0.30:4001/graphql
```

Este mensaje te indica a qué URL se está conectando el frontend.

### Logs del Backend

En los logs del backend verás cuando acepta peticiones CORS:

```
✅ CORS permitido desde: http://192.168.0.30:3001
```

O advertencias si algo falla:

```
⚠️ CORS: Origen no permitido: http://origen-desconocido.com
```

## Solución de Problemas

### Error: "No permitido por CORS"

**Causa:** El origen no coincide con los patrones permitidos.

**Solución:** Verifica que el origen use HTTP o HTTPS válido.

### Frontend no se conecta al backend

**Causa:** El puerto del backend no es 4001 o está en otro servidor.

**Solución:** Define `REACT_APP_GRAPHQL_URL` en `.env`:

```env
REACT_APP_GRAPHQL_URL=http://otro-servidor:puerto/graphql
```

### Mixed Content Error (HTTPS → HTTP)

**Causa:** Frontend en HTTPS intenta conectarse a backend en HTTP.

**Solución:** Ambos deben usar el mismo protocolo. Configura HTTPS en el backend o usa HTTP en ambos.

## Cambios Realizados

### Archivos Modificados

1. **frontend/src/apollo/client.js**
   - Función `getGraphQLUrl()` para detección automática
   - Prioriza variable de entorno, luego detecta desde `window.location`

2. **backend/src/index.js**
   - CORS flexible que acepta HTTP/HTTPS
   - Soporta localhost, IPs locales y dominios

3. **docker-compose.yml**
   - Variables `REACT_APP_GRAPHQL_URL` y `FRONTEND_URL` comentadas (ya no necesarias)
   - Documentación de cuándo usarlas

4. **.env**
   - Variables marcadas como OPCIONALES
   - Documentación de comportamiento automático

## Ventajas

✅ **Plug & Play:** Funciona sin configuración en la mayoría de casos
✅ **Flexible:** Soporta HTTP, HTTPS, IPs y dominios
✅ **Fácil desarrollo:** Funciona en localhost sin cambios
✅ **Fácil despliegue:** Funciona en producción sin reconfigurar
✅ **Multi-entorno:** Mismo código funciona en dev, staging y prod

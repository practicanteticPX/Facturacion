# ✅ Verificación de Configuración NPM

## 1️⃣ Verifica que NPM esté configurado correctamente

### En Nginx Proxy Manager (http://tu-ip:81):

#### A. Tab "Proxy Hosts"
Debe haber **UN SOLO** proxy host:
- **Domain Names:** `recepcion-facturacion.com`
- **Forward Hostname:** `192.168.0.30`
- **Forward Port:** `3001`
- **Estado:** ✅ Enabled (verde)

#### B. Haz clic en los tres puntos → "Edit"

**Tab "Details":**
```
Domain Names: recepcion-facturacion.com
Scheme: http
Forward Hostname: 192.168.0.30
Forward Port: 3001
✅ Block Common Exploits
✅ Websockets Support
```

**Tab "SSL":**
```
SSL Certificate: (Tu certificado)
✅ Force SSL
✅ HTTP/2 Support
✅ HSTS Enabled
```

**Tab "Advanced":**
Debe tener esta configuración completa:

```nginx
# ============================================
# BACKEND API - /graphql
# ============================================
location /graphql {
    proxy_pass http://192.168.0.30:4001/graphql;
    proxy_http_version 1.1;

    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Host $host;

    proxy_connect_timeout 600;
    proxy_send_timeout 600;
    proxy_read_timeout 600;

    client_max_body_size 10M;

    proxy_no_cache 1;
    proxy_cache_bypass 1;

    add_header 'Access-Control-Allow-Origin' '$http_origin' always;
    add_header 'Access-Control-Allow-Credentials' 'true' always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
    add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization,apollo-require-preflight' always;

    if ($request_method = 'OPTIONS') {
        return 204;
    }
}

# ============================================
# FRONTEND - / (raíz y todas las demás rutas)
# ============================================
location / {
    proxy_pass http://192.168.0.30:3001;
    proxy_http_version 1.1;

    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    proxy_connect_timeout 60;
    proxy_send_timeout 60;
    proxy_read_timeout 60;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

## 2️⃣ Prueba Manual

### A. Test Backend Directo (debe funcionar):
```bash
curl -X POST http://192.168.0.30:4001/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ __typename }"}'
```

Debe responder con JSON de GraphQL.

### B. Test Backend a través de NPM (debe funcionar):
```bash
curl -k -X POST https://recepcion-facturacion.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ __typename }"}'
```

Debe responder con JSON de GraphQL.

### C. Test Frontend Directo (debe funcionar):
```
http://192.168.0.30:3001
```

Debe cargar la aplicación.

### D. Test Frontend a través de NPM (debe funcionar):
```
https://recepcion-facturacion.com
```

Debe cargar la aplicación con HTTPS.

## 3️⃣ Inspección de Red en el Navegador

1. Abre Chrome/Firefox
2. Ve a `https://recepcion-facturacion.com`
3. Presiona `F12` (DevTools)
4. Tab "Console" → Busca:
   ```
   🔗 Apollo Client conectándose a: https://recepcion-facturacion.com/graphql
   ```

5. Tab "Network" → Filtra por "graphql"
   - Debes ver peticiones a: `https://recepcion-facturacion.com/graphql`
   - **NO debe aparecer** `:3001` ni `:4001` en ninguna URL

## 4️⃣ Si Encuentras Errores

### ❌ Caso 1: Aparecen puertos en las URLs
**Problema:** El frontend no está usando la variable de entorno.
**Solución:** Necesitamos reconstruir el frontend (te ayudaré con esto).

### ❌ Caso 2: "502 Bad Gateway" en /graphql
**Problema:** NPM no puede conectarse al backend.
**Soluciones:**
- Verifica que el backend esté corriendo: `docker-compose ps`
- Verifica logs: `docker-compose logs backend`
- Verifica conectividad: `curl http://192.168.0.30:4001/graphql`

### ❌ Caso 3: "404 Not Found" en /graphql
**Problema:** La configuración de locations en NPM no está guardada o activa.
**Solución:**
- Edita el proxy host en NPM
- Ve al tab "Advanced"
- Copia/pega la configuración completa de arriba
- **IMPORTANTE:** Haz clic en "Save" (guardar)
- Espera 10 segundos para que NPM recargue la configuración

### ❌ Caso 4: Frontend carga pero login falla
**Problema:** CORS o conexión al backend.
**Solución:** Revisa la consola del navegador (F12) para ver el error exacto.

## 5️⃣ Información a Reportar

Si algo falla, envíame:

1. **Captura del tab "Advanced" en NPM** (para ver si la configuración está guardada)
2. **Resultado del test B** (curl a /graphql)
3. **Captura de DevTools → Console** cuando abres `https://recepcion-facturacion.com`
4. **Captura de DevTools → Network** filtrado por "graphql"

---

## ⚠️ Importante

**El frontend DEBE ser reconstruido** para que tome la variable de entorno `REACT_APP_GRAPHQL_URL`.

Si las pruebas 2A y 2B funcionan pero 2D falla, entonces necesitamos reconstruir el frontend.

Primero verifica la configuración de NPM, luego reporta los resultados.

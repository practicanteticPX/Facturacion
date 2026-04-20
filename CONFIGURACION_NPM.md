# Configuración de Nginx Proxy Manager para Recepción Facturación

Esta guía explica cómo configurar Nginx Proxy Manager (NPM) para servir tanto el frontend como el backend con HTTPS usando certificados autofirmados.

## 📋 Requisitos Previos

- Nginx Proxy Manager instalado y funcionando
- Certificado SSL (autofirmado o válido)
- Acceso a NPM en http://tu-ip:81
- Dominio configurado: `recepcion-facturacion.com` apuntando a tu servidor

## 🌐 Arquitectura de la Solución

```
Internet/Red Local
        ↓
Nginx Proxy Manager (Puerto 80/443)
        ↓
   recepcion-facturacion.com (HTTPS)
        ↓
        ├─→ / (raíz) → Frontend (10.50.8.10:3001)
        └─→ /graphql  → Backend (10.50.8.10:4001)
```

## 🔧 Configuración Paso a Paso

### UN SOLO Proxy Host con Locations

**Accede a NPM → Proxy Hosts → Add Proxy Host**

#### Tab: Details
- **Domain Names:** `recepcion-facturacion.com`
- **Scheme:** `http`
- **Forward Hostname / IP:** `10.50.8.10`
- **Forward Port:** `3001` (Frontend por defecto)
- **Cache Assets:** ✅ (opcional, solo aplica al frontend)
- **Block Common Exploits:** ✅
- **Websockets Support:** ✅
- **Access List:** Ninguno (o según tu seguridad)

#### Tab: SSL
- **SSL Certificate:** Selecciona tu certificado (o crea uno nuevo autofirmado)
- **Force SSL:** ✅
- **HTTP/2 Support:** ✅
- **HSTS Enabled:** ✅
- **HSTS Subdomains:** ❌

#### Tab: Advanced (**IMPORTANTE - Configuración de locations**)

Pega esta configuración que maneja tanto frontend como backend:

```nginx
# ============================================
# BACKEND API - /graphql
# ============================================
location /graphql {
    # Proxy al contenedor backend
    proxy_pass http://10.50.8.10:4001/graphql;
    proxy_http_version 1.1;

    # WebSockets para GraphQL subscriptions
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    # Cabeceras estándar
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Host $host;

    # Timeouts para GraphQL (queries largas, uploads)
    proxy_connect_timeout 600;
    proxy_send_timeout 600;
    proxy_read_timeout 600;

    # Tamaño máximo para uploads de archivos (10MB)
    client_max_body_size 10M;

    # Deshabilitar caché para API
    proxy_no_cache 1;
    proxy_cache_bypass 1;

    # CORS headers (si son necesarios además de los del backend)
    add_header 'Access-Control-Allow-Origin' '$http_origin' always;
    add_header 'Access-Control-Allow-Credentials' 'true' always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
    add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization,apollo-require-preflight' always;

    # Manejar peticiones OPTIONS (preflight CORS)
    if ($request_method = 'OPTIONS') {
        return 204;
    }
}

# ============================================
# FRONTEND - / (raíz y todas las demás rutas)
# ============================================
location / {
    # Proxy al contenedor frontend
    proxy_pass http://10.50.8.10:3001;
    proxy_http_version 1.1;

    # WebSockets para hot reload en desarrollo
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    # Cabeceras estándar
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    # Timeouts estándar
    proxy_connect_timeout 60;
    proxy_send_timeout 60;
    proxy_read_timeout 60;

    # Cabeceras de seguridad
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

**Guarda** la configuración.

---

## 🔐 Crear Certificado Autofirmado (Opcional)

Si no tienes un certificado, puedes crear uno autofirmado en NPM:

1. **NPM → SSL Certificates → Add SSL Certificate**
2. Selecciona **"Custom"**
3. **Certificate Name:** `recepcion-facturacion.com`
4. **Certificate Key:** Genera o pega tu clave privada
5. **Certificate:** Pega tu certificado
6. **Intermediate Certificate(s):** Deja en blanco para autofirmado

### Generar Certificado Autofirmado con OpenSSL

```bash
# Generar certificado autofirmado válido por 1 año
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout recepcion-facturacion.key \
  -out recepcion-facturacion.crt \
  -subj "/C=CO/ST=Estado/L=Ciudad/O=Organizacion/CN=recepcion-facturacion.com" \
  -addext "subjectAltName=DNS:recepcion-facturacion.com,DNS:api.recepcion-facturacion.com,DNS:*.recepcion-facturacion.com"

# Ver el contenido de los archivos generados
cat recepcion-facturacion.key  # Este va en "Certificate Key"
cat recepcion-facturacion.crt  # Este va en "Certificate"
```

---

## 🌍 Configuración de DNS (Archivo hosts o DNS local)

### Opción 1: Archivo hosts (Desarrollo/Testing)

**Windows:** `C:\Windows\System32\drivers\etc\hosts`
**Linux/Mac:** `/etc/hosts`

```
10.50.8.10  recepcion-facturacion.com
```

### Opción 2: DNS Local (Pi-hole, Router, etc.)

Configura en tu servidor DNS local:
```
recepcion-facturacion.com  → 10.50.8.10
```

---

## ⚙️ Configuración de la Aplicación

### Actualizar docker-compose.yml

El archivo ya está actualizado con:

```yaml
frontend:
  environment:
    - REACT_APP_GRAPHQL_URL=https://recepcion-facturacion.com/graphql
```

### Reiniciar el Frontend

```bash
docker-compose restart frontend
```

---

## ✅ Verificación

### 1. Verificar NPM

- Frontend: `https://recepcion-facturacion.com` → Debe cargar la aplicación
- Backend API: `https://recepcion-facturacion.com/graphql` → Debe mostrar GraphQL Playground o error de método (es normal)

### 2. Verificar Consola del Navegador

Abre `https://recepcion-facturacion.com` y verifica en la consola del navegador (F12):

```
🔗 Apollo Client conectándose a: https://recepcion-facturacion.com/graphql
```

### 3. Test Manual del Backend

Prueba el backend directamente con curl:

```bash
# Debe responder con la respuesta de GraphQL
curl -X POST https://recepcion-facturacion.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ __typename }"}'
```

### 4. Test de Login

Prueba hacer login en la aplicación. Si funciona sin errores SSL o CORS, ¡todo está configurado correctamente!

---

## 🐛 Solución de Problemas

### Error: "net::ERR_SSL_PROTOCOL_ERROR"

**Causa:** El certificado no está correctamente configurado o el navegador no confía en él.

**Solución:**
1. Verifica que el certificado SSL esté correctamente asignado en NPM
2. Si es autofirmado, acepta el certificado en el navegador:
   - Visita `https://recepcion-facturacion.com`
   - Click en "Avanzado" → "Continuar de todas formas"
   - Acepta el riesgo de seguridad

### Error: "Mixed Content Blocked"

**Causa:** El frontend intenta conectarse al backend por HTTP.

**Solución:**
- Verifica que `REACT_APP_GRAPHQL_URL` use `https://`
- Reinicia el contenedor: `docker-compose restart frontend`

### Error: "502 Bad Gateway"

**Causa:** NPM no puede conectarse al contenedor backend.

**Solución:**
1. Verifica que el backend esté corriendo: `docker-compose ps`
2. Prueba acceder directamente: `curl http://10.50.8.10:4001/graphql`
3. Verifica los logs: `docker-compose logs backend`

### Error: "CORS"

**Causa:** El backend no permite peticiones desde el dominio.

**Solución:**
- El backend ya está configurado para aceptar cualquier origen HTTP/HTTPS
- Verifica los logs del backend: `docker-compose logs backend | grep CORS`

---

## 📝 Notas Importantes

1. **Certificados Autofirmados:** Los navegadores mostrarán advertencias de seguridad. Para producción, usa Let's Encrypt o certificados válidos.

2. **Rendimiento:** NPM añade una capa adicional. Para máximo rendimiento en producción, considera configurar Nginx directamente.

3. **Seguridad:** Si expones a Internet, configura:
   - Firewall (solo puertos 80/443)
   - Access Lists en NPM
   - Rate Limiting
   - Fail2ban

4. **Backup:** Exporta regularmente la configuración de NPM desde su interfaz.

---

## 🚀 Resultado Final

URLs finales:
- **Frontend:** `https://recepcion-facturacion.com`
- **Backend API:** `https://recepcion-facturacion.com/graphql`
- **Todo con HTTPS** ✅
- **Un solo dominio, diferentes rutas** ✅
- **Sin errores de mixed content** ✅
- **Certificado funcionando** ✅

### Flujo Completo
1. Usuario accede a `https://recepcion-facturacion.com`
2. NPM recibe la petición en puerto 443 (HTTPS)
3. NPM verifica el certificado SSL
4. NPM redirige a:
   - `10.50.8.10:3001` para rutas del frontend (/, /login, /facturas, etc.)
   - `10.50.8.10:4001` para `/graphql` (API GraphQL)
5. La aplicación funciona completamente en HTTPS sin errores

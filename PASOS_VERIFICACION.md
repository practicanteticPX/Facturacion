# 🔍 Pasos de Verificación - Configuración NPM con HTTPS

## ✅ PASO 1: Verificar Configuración de NPM

### A. Accede a Nginx Proxy Manager
```
http://tu-ip:81
```

### B. Verifica el Proxy Host
1. Ve a **"Proxy Hosts"**
2. Debe haber **UN SOLO** proxy host para `recepcion-facturacion.com`
3. Haz clic en los **tres puntos (⋮)** → **"Edit"**

### C. Verifica el Tab "Advanced"
**IMPORTANTE:** El tab "Advanced" debe contener **EXACTAMENTE** esta configuración:

```nginx
# ============================================
# BACKEND API - /graphql
# ============================================
location /graphql {
    proxy_pass http://10.50.8.10:4001/graphql;
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
    proxy_pass http://10.50.8.10:3001;
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

**Si NO está esta configuración:**
1. Copia TODO el bloque de arriba
2. Pégalo en el tab "Advanced"
3. Haz clic en **"Save"** (guardar)
4. Espera 10 segundos para que NPM recargue

---

## ✅ PASO 2: Verificar Conectividad Backend

Abre una terminal y ejecuta:

```bash
curl -k -X POST https://recepcion-facturacion.com/graphql \
  -H "Content-Type: application/json" \
  -d "{\"query\":\"{ __typename }\"}"
```

**Resultado Esperado:**
```json
{"data":{"__typename":"Query"}}
```

**Si falla:** El problema está en la configuración de NPM o el backend no está corriendo.

---

## ✅ PASO 3: Verificar en el Navegador

### A. Abre el navegador

```
https://recepcion-facturacion.com
```

1. **Acepta el certificado autofirmado** (si aparece advertencia)
   - Click en "Avanzado" → "Continuar de todas formas"

### B. Abre DevTools (F12)

### C. Tab "Console"

**Busca este mensaje:**
```
🔗 Apollo Client conectándose a: https://recepcion-facturacion.com/graphql
```

**✅ CORRECTO:** Si ves esta URL **SIN puerto** (sin :3001 ni :4001)

**❌ INCORRECTO:** Si ves algo como:
- `https://recepcion-facturacion.com:4001/graphql` (con puerto)
- `http://10.50.8.10:4001/graphql` (con IP y puerto)

### D. Tab "Network"

1. Filtra por "graphql"
2. Intenta hacer **login** en la aplicación
3. Verifica que las peticiones vayan a:
   ```
   https://recepcion-facturacion.com/graphql
   ```
   **SIN ningún puerto** en la URL

---

## ✅ PASO 4: Probar Funcionalidad

1. Abre `https://recepcion-facturacion.com`
2. Intenta **iniciar sesión**
3. Si todo funciona, **¡SUCCESS! 🎉**

---

## ⚠️ Resolución de Problemas

### ❌ Caso 1: En Console aparece URL con puerto (ej: :4001)

**Problema:** La variable de entorno NO se compiló en el build.

**Solución:**
```bash
# Detener contenedor
docker-compose down frontend

# Reconstruir SIN caché
docker-compose build --no-cache frontend

# Levantar de nuevo
docker-compose up -d frontend

# Espera 30 segundos y vuelve a verificar en el navegador
```

---

### ❌ Caso 2: "502 Bad Gateway" en /graphql

**Problema:** NPM no puede conectarse al backend.

**Verificaciones:**
```bash
# 1. Backend está corriendo?
docker-compose ps

# 2. Backend responde directamente?
curl -X POST http://10.50.8.10:4001/graphql \
  -H "Content-Type: application/json" \
  -d "{\"query\":\"{ __typename }\"}"

# 3. Ver logs del backend
docker-compose logs backend --tail=50
```

---

### ❌ Caso 3: "Failed to fetch" al hacer login

**Problema:** Hay un error de conectividad o CORS.

**Solución:**
1. Abre DevTools → Console
2. Busca mensajes de error en rojo
3. Abre DevTools → Network
4. Click en la petición a "graphql" que falló
5. Ve al tab "Response" para ver el error exacto

**Envíame captura de ese error** para ayudarte mejor.

---

### ❌ Caso 4: "ERR_SSL_PROTOCOL_ERROR"

**Problema:** Está intentando conectarse directamente a puertos 3001 o 4001 con HTTPS.

**Solución:** Esto confirma que la variable de entorno NO se compiló.

```bash
# Reconstruir completamente
docker-compose down
docker-compose build --no-cache frontend
docker-compose up -d
```

---

## 📊 Checklist Final

Marca cada item cuando lo completes:

- [ ] NPM tiene configuración de locations en tab "Advanced"
- [ ] Curl a `https://recepcion-facturacion.com/graphql` funciona
- [ ] En Console del navegador aparece: `🔗 Apollo Client conectándose a: https://recepcion-facturacion.com/graphql` (SIN puerto)
- [ ] En Network del navegador, peticiones van a `https://recepcion-facturacion.com/graphql` (SIN puerto)
- [ ] Login funciona correctamente
- [ ] Puedo ver las facturas

---

## 🎯 Resultado Esperado Final

**Cuando todo funcione correctamente:**

1. Accedes a: `https://recepcion-facturacion.com`
2. Navegador acepta el certificado (solo una vez)
3. Aplicación carga normalmente
4. Login funciona
5. Facturas se cargan
6. **TODO en HTTPS con un solo dominio** ✅

---

## 📞 Reportar Problemas

Si algo falla, envíame:

1. **Captura del tab "Advanced" en NPM**
2. **Resultado del curl a /graphql**
3. **Captura de DevTools → Console** (mensaje de Apollo Client)
4. **Captura de DevTools → Network** (peticiones a graphql)
5. **Mensaje de error exacto** que aparece

¡Con esa información podré ayudarte mejor! 🚀

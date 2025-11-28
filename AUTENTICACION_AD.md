# Autenticación con Active Directory

## Descripción

El sistema implementa autenticación mediante Active Directory (LDAP) con un **filtro estricto de acceso**.

## Filtro de Acceso

**SOLO** los usuarios que tengan en el campo `Descripción` de Active Directory el valor exacto:

```
Ad y Finan
```

Podrán autenticarse en el sistema. Cualquier otro usuario será rechazado.

## Configuración

### Variables de Entorno

En el archivo [.env](.env) se encuentran las credenciales de Active Directory:

```env
AD_PROTOCOL=ldap
AD_HOSTNAME=192.168.0.253
AD_PORT=389
AD_BASE_DN=DC=prexxa,DC=local
AD_SEARCH_BASE=DC=prexxa,DC=local
AD_BIND_USER=glpi.sync@prexxa.local
AD_BIND_PASS=adminPre8909
```

### JWT (JSON Web Tokens)

Los tokens de autenticación tienen una validez de **8 horas** por defecto.

```env
JWT_SECRET=prexxa-facturas-secret-2024-change-in-production
JWT_EXPIRES_IN=8h
```

## Flujo de Autenticación

1. **Usuario ingresa credenciales** en el formulario de login
2. **Backend se conecta a Active Directory** usando el usuario de servicio
3. **Busca el usuario** por su `sAMAccountName` (nombre de usuario)
4. **Verifica el campo Descripción**:
   - ✅ Si es "Ad y Finan" → Continúa
   - ❌ Si NO es "Ad y Finan" → Rechaza con mensaje de error
5. **Valida la contraseña** del usuario contra AD
6. **Genera un JWT** con los datos del usuario
7. **Retorna el token** al frontend
8. **Frontend almacena el token** en localStorage
9. **Todas las peticiones posteriores** incluyen el token

## Arquitectura

### Backend

#### Servicio de Autenticación
**Archivo:** [backend/src/services/authService.js](backend/src/services/authService.js)

Métodos principales:
- `authenticateWithAD(username, password)` - Autentica contra Active Directory
- `generateToken(userData)` - Genera JWT
- `verifyToken(token)` - Verifica validez del JWT
- `login(username, password)` - Método principal de login

#### Schema GraphQL
**Archivo:** [backend/src/graphql/schema.js](backend/src/graphql/schema.js)

```graphql
type User {
  username: String!
  displayName: String!
  email: String
  description: String!
}

type AuthResponse {
  success: Boolean!
  token: String!
  user: User!
}

input LoginInput {
  username: String!
  password: String!
}

type Mutation {
  login(input: LoginInput!): AuthResponse!
}
```

#### Resolvers
**Archivo:** [backend/src/graphql/resolvers.js](backend/src/graphql/resolvers.js)

```javascript
Mutation: {
  login: async (_, { input }) => {
    const result = await authService.login(input.username, input.password);
    return result;
  }
}
```

### Frontend

#### Componente Login
**Archivo:** [frontend/src/components/Login.js](frontend/src/components/Login.js)

- Formulario de inicio de sesión
- Manejo de errores
- Almacenamiento de token y datos de usuario

#### App.js
**Archivo:** [frontend/src/App.js](frontend/src/App.js)

- Control de autenticación
- Protección de rutas
- Persistencia de sesión
- Botón de cerrar sesión

## Configurar Usuarios en Active Directory

Para que un usuario pueda acceder al sistema:

1. Abrir **Active Directory Users and Computers**
2. Buscar el usuario
3. Click derecho → **Propiedades**
4. Pestaña **General**
5. En el campo **Descripción**, escribir exactamente: `Ad y Finan`
6. Click **Aceptar**

## Mensajes de Error

### "Usuario o contraseña incorrectos"
Este mensaje aparece cuando:
- El nombre de usuario no existe en AD
- La contraseña es incorrecta

**Nota de seguridad:** Por razones de seguridad, no se distingue entre "usuario no existe" y "contraseña incorrecta" para evitar revelar información sobre qué usuarios existen en el sistema.

### "No estas autorizado para acceder a este sistema"
El usuario existe y la contraseña es correcta, pero NO tiene "Ad y Finan" en el campo Descripción de Active Directory.

### "Error al conectar con Active Directory"
Problemas de conexión con el servidor LDAP. Verificar:
- IP del servidor AD (192.168.0.253)
- Puerto (389)
- Credenciales del usuario de servicio

## Seguridad

### Mejores Prácticas Implementadas

1. ✅ **No se almacenan contraseñas** - La validación es contra AD
2. ✅ **Tokens JWT con expiración** - 8 horas de validez
3. ✅ **Filtro estricto de acceso** - Solo usuarios autorizados
4. ✅ **Conexión segura LDAP** - Usuario de servicio con permisos limitados
5. ✅ **Validación en backend** - El filtro se aplica en el servidor, no en el cliente

### Recomendaciones Adicionales

Para producción, considerar:

1. **Cambiar JWT_SECRET** a un valor aleatorio fuerte
2. **Usar LDAPS (LDAP sobre SSL)** en lugar de LDAP
3. **Implementar rate limiting** para prevenir ataques de fuerza bruta
4. **Agregar logs de auditoría** para intentos de login
5. **Configurar timeout de sesión** en el frontend

## Testing

### Probar Autenticación

1. Ejecutar el backend:
```bash
cd backend
npm run dev
```

2. Ejecutar el frontend:
```bash
cd frontend
npm start
```

3. Abrir `http://192.168.0.98:3000` (o tu IP local)

4. Ingresar credenciales de un usuario con "Ad y Finan" en Descripción

### Verificar en GraphQL Playground

Acceder a `http://192.168.0.98:4000/graphql` y ejecutar:

```graphql
mutation {
  login(input: {
    username: "tu.usuario"
    password: "tu.contraseña"
  }) {
    success
    token
    user {
      username
      displayName
      email
      description
    }
  }
}
```

## Troubleshooting

### Error: "deprecated ldapjs"
Es solo una advertencia. El paquete sigue funcionando correctamente.

### No se puede conectar a AD
Verificar:
```bash
# Ping al servidor AD
ping 192.168.0.253

# Verificar puerto abierto (desde Windows)
Test-NetConnection -ComputerName 192.168.0.253 -Port 389
```

### Token expirado
El usuario debe volver a iniciar sesión. El token dura 8 horas.

### Usuario autorizado no puede entrar
Verificar en AD que el campo Descripción tiene **exactamente** el texto:
- ✅ Correcto: `Ad y Finan`
- ❌ Incorrecto: `ad y finan` (minúsculas)
- ❌ Incorrecto: `Ad y Finan ` (espacio al final)
- ❌ Incorrecto: `Ad y  Finan` (doble espacio)

## Integración con Docker

El sistema funciona tanto en modo desarrollo como en Docker. Las variables de entorno se leen automáticamente del archivo `.env`:

```bash
docker-compose up --build
```

Docker Compose pasa las variables de entorno al contenedor del backend, incluyendo las credenciales de AD.

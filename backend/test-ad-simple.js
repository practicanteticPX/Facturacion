import ldap from 'ldapjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

const AD_CONFIG = {
  protocol: process.env.AD_PROTOCOL || 'ldap',
  hostname: process.env.AD_HOSTNAME,
  port: parseInt(process.env.AD_PORT || '389'),
  bindUser: process.env.AD_BIND_USER,
  bindPass: process.env.AD_BIND_PASS,
};

console.log('========================================');
console.log('TEST SIMPLE DE CONEXIÓN AD');
console.log('========================================\n');

console.log('Intentando conectar a:');
console.log(`  ${AD_CONFIG.protocol}://${AD_CONFIG.hostname}:${AD_CONFIG.port}`);
console.log(`  Usuario: ${AD_CONFIG.bindUser}\n`);

const url = `${AD_CONFIG.protocol}://${AD_CONFIG.hostname}:${AD_CONFIG.port}`;
const client = ldap.createClient({
  url,
  timeout: 5000,
  connectTimeout: 10000,
});

let connected = false;

client.on('connect', () => {
  console.log('✓ Socket conectado al servidor LDAP');
  connected = true;
});

client.on('error', (err) => {
  console.error('❌ Error de conexión:', err.message);
  console.error('   Código:', err.code);
  process.exit(1);
});

setTimeout(() => {
  if (!connected) {
    console.error('❌ Timeout - No se pudo conectar al servidor LDAP');
    console.error('   Verifica:');
    console.error('   - El servidor AD está encendido');
    console.error('   - La IP es correcta:', AD_CONFIG.hostname);
    console.error('   - El puerto está abierto:', AD_CONFIG.port);
    console.error('   - No hay firewall bloqueando la conexión');
    process.exit(1);
  }
}, 5000);

console.log('Autenticando con usuario de servicio...\n');

client.bind(AD_CONFIG.bindUser, AD_CONFIG.bindPass, (bindErr) => {
  if (bindErr) {
    console.error('❌ Error de autenticación:', bindErr.message);
    console.error('   Verifica:');
    console.error('   - Usuario de servicio:', AD_CONFIG.bindUser);
    console.error('   - La contraseña es correcta');
    console.error('   - El usuario tiene permisos de lectura en AD');
    client.unbind();
    process.exit(1);
  }

  console.log('========================================');
  console.log('✓✓✓ CONEXIÓN EXITOSA ✓✓✓');
  console.log('========================================');
  console.log('El servidor puede conectarse a Active Directory correctamente.\n');

  client.unbind(() => {
    process.exit(0);
  });
});

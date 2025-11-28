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
  baseDN: process.env.AD_BASE_DN,
  searchBase: process.env.AD_SEARCH_BASE,
  bindUser: process.env.AD_BIND_USER,
  bindPass: process.env.AD_BIND_PASS,
};

console.log('========================================');
console.log('TEST DE CONEXIÓN A ACTIVE DIRECTORY');
console.log('========================================\n');

console.log('Configuración:');
console.log(`  Servidor: ${AD_CONFIG.protocol}://${AD_CONFIG.hostname}:${AD_CONFIG.port}`);
console.log(`  Base DN: ${AD_CONFIG.baseDN}`);
console.log(`  Usuario de servicio: ${AD_CONFIG.bindUser}`);
console.log(`  Search Base: ${AD_CONFIG.searchBase}\n`);

const url = `${AD_CONFIG.protocol}://${AD_CONFIG.hostname}:${AD_CONFIG.port}`;
const client = ldap.createClient({
  url,
  timeout: 5000,
  connectTimeout: 10000,
});

client.on('error', (err) => {
  console.error('❌ Error de conexión LDAP:', err.message);
  process.exit(1);
});

console.log('Conectando a Active Directory...\n');

client.bind(AD_CONFIG.bindUser, AD_CONFIG.bindPass, (bindErr) => {
  if (bindErr) {
    console.error('❌ Error en bind con usuario de servicio:', bindErr.message);
    client.unbind();
    process.exit(1);
  }

  console.log('✓ Conexión exitosa con usuario de servicio\n');

  // Pedir usuario a buscar
  const username = process.argv[2];

  if (!username) {
    console.log('Uso: node test-ad-connection.js <nombre_usuario>');
    console.log('Ejemplo: node test-ad-connection.js juan.perez\n');
    client.unbind();
    process.exit(0);
  }

  console.log(`Buscando usuario: ${username}\n`);

  const searchFilter = `(sAMAccountName=${username})`;
  const searchOptions = {
    filter: searchFilter,
    scope: 'sub',
    attributes: ['cn', 'sAMAccountName', 'mail', 'description', 'displayName', 'distinguishedName'],
  };

  client.search(AD_CONFIG.searchBase, searchOptions, (searchErr, searchRes) => {
    if (searchErr) {
      console.error('❌ Error en búsqueda:', searchErr.message);
      client.unbind();
      process.exit(1);
    }

    let found = false;

    searchRes.on('searchEntry', (entry) => {
      found = true;
      const pojo = entry.pojo;

      console.log('========================================');
      console.log('✓ USUARIO ENCONTRADO');
      console.log('========================================\n');

      pojo.attributes.forEach(attr => {
        const value = attr.values[0];
        console.log(`${attr.type}:`);
        console.log(`  Valor: "${value}"`);
        console.log(`  Longitud: ${value?.length || 0}`);
        console.log(`  Tipo: ${typeof value}`);

        if (attr.type === 'description') {
          console.log(`  JSON: ${JSON.stringify(value)}`);
          console.log(`  Bytes: ${Buffer.from(value || '', 'utf8').toString('hex')}`);
          console.log(`  ¿Es "Ad y Finan"?: ${value === 'Ad y Finan'}`);
        }
        console.log('');
      });

      const description = pojo.attributes.find(a => a.type === 'description')?.values[0] || '';

      console.log('========================================');
      console.log('VALIDACIÓN DE ACCESO');
      console.log('========================================');
      console.log(`Descripción en AD: "${description}"`);
      console.log(`Descripción esperada: "Ad y Finan"`);
      console.log(`¿Coinciden?: ${description === 'Ad y Finan' ? '✓ SÍ' : '❌ NO'}`);

      if (description !== 'Ad y Finan') {
        console.log('\n⚠️  ACCESO DENEGADO - Descripción no coincide');
      } else {
        console.log('\n✓ ACCESO PERMITIDO');
      }
    });

    searchRes.on('error', (err) => {
      console.error('❌ Error en resultado de búsqueda:', err.message);
    });

    searchRes.on('end', () => {
      if (!found) {
        console.log('❌ Usuario no encontrado en Active Directory');
      }
      client.unbind();
      process.exit(0);
    });
  });
});

import ldap from 'ldapjs';
import jwt from 'jsonwebtoken';

const AD_CONFIG = {
  protocol: process.env.AD_PROTOCOL || 'ldap',
  hostname: process.env.AD_HOSTNAME,
  port: parseInt(process.env.AD_PORT || '389'),
  baseDN: process.env.AD_BASE_DN,
  searchBase: process.env.AD_SEARCH_BASE,
  bindUser: process.env.AD_BIND_USER,
  bindPass: process.env.AD_BIND_PASS,
};

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '8h';

const ALLOWED_DESCRIPTION = 'Ad y Finan';

class AuthService {
  createLdapClient() {
    const url = `${AD_CONFIG.protocol}://${AD_CONFIG.hostname}:${AD_CONFIG.port}`;
    return ldap.createClient({
      url,
      timeout: 5000,
      connectTimeout: 10000,
    });
  }

  async authenticateWithAD(username, password) {
    return new Promise((resolve, reject) => {
      const client = this.createLdapClient();

      client.on('error', (err) => {
        console.error('Error de conexión LDAP:', err);
        reject(new Error('Error al conectar con Active Directory'));
      });

      client.bind(AD_CONFIG.bindUser, AD_CONFIG.bindPass, (bindErr) => {
        if (bindErr) {
          console.error('Error en bind con usuario de servicio:', bindErr);
          client.unbind();
          reject(new Error('Error al conectar con Active Directory'));
          return;
        }

        const searchFilter = `(sAMAccountName=${username})`;
        const searchOptions = {
          filter: searchFilter,
          scope: 'sub',
          attributes: ['cn', 'sAMAccountName', 'mail', 'description', 'displayName', 'distinguishedName'],
        };

        client.search(AD_CONFIG.searchBase, searchOptions, (searchErr, searchRes) => {
          if (searchErr) {
            console.error('Error en búsqueda LDAP:', searchErr);
            client.unbind();
            reject(new Error('Error al buscar usuario en Active Directory'));
            return;
          }

          let userEntry = null;

          searchRes.on('searchEntry', (entry) => {
            userEntry = entry.pojo;
            console.log('✓ Usuario encontrado en AD:', username);
            console.log('  Atributos recibidos:', userEntry.attributes.map(a => a.type).join(', '));
          });

          searchRes.on('error', (err) => {
            console.error('Error en resultado de búsqueda:', err);
            client.unbind();
            reject(new Error('Error al buscar usuario'));
          });

          searchRes.on('end', (result) => {
            if (!userEntry) {
              client.unbind();
              reject(new Error('Usuario no encontrado en Active Directory'));
              return;
            }

            const description = userEntry.attributes.find(attr => attr.type === 'description')?.values[0] || '';

            console.log('  Descripción en AD:', JSON.stringify(description));
            console.log('  Descripción esperada:', JSON.stringify(ALLOWED_DESCRIPTION));
            console.log('  ¿Coinciden?:', description === ALLOWED_DESCRIPTION);
            console.log('  Longitud descripción AD:', description.length);
            console.log('  Longitud descripción esperada:', ALLOWED_DESCRIPTION.length);

            if (description !== ALLOWED_DESCRIPTION) {
              console.warn(`❌ Usuario ${username} intentó autenticarse pero no tiene el permiso adecuado.`);
              console.warn(`   Descripción encontrada: "${description}"`);
              console.warn(`   Descripción esperada: "${ALLOWED_DESCRIPTION}"`);
              client.unbind();
              reject(new Error('No tiene permisos para acceder a este sistema. Contacte al administrador.'));
              return;
            }

            console.log('✓ Usuario autorizado - Descripción correcta');

            const userDN = userEntry.attributes.find(attr => attr.type === 'distinguishedName')?.values[0];

            const userClient = this.createLdapClient();

            userClient.bind(userDN, password, (userBindErr) => {
              client.unbind();
              userClient.unbind();

              if (userBindErr) {
                console.error('Credenciales incorrectas para usuario:', username);
                reject(new Error('Usuario o contraseña incorrectos'));
                return;
              }

              const cn = userEntry.attributes.find(attr => attr.type === 'cn')?.values[0] || username;
              const displayName = userEntry.attributes.find(attr => attr.type === 'displayName')?.values[0] || cn;
              const email = userEntry.attributes.find(attr => attr.type === 'mail')?.values[0] || '';

              const userData = {
                username,
                displayName,
                email,
                description,
              };

              resolve(userData);
            });
          });
        });
      });
    });
  }

  generateToken(userData) {
    const payload = {
      username: userData.username,
      displayName: userData.displayName,
      email: userData.email,
      description: userData.description,
    };

    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error('Token inválido o expirado');
    }
  }

  async login(username, password) {
    if (!username || !password) {
      throw new Error('Usuario y contraseña son requeridos');
    }

    if (!AD_CONFIG.hostname) {
      throw new Error('Active Directory no está configurado correctamente');
    }

    try {
      const userData = await this.authenticateWithAD(username, password);

      const token = this.generateToken(userData);

      return {
        success: true,
        token,
        user: userData,
      };
    } catch (error) {
      console.error('Error en login:', error.message);
      throw error;
    }
  }
}

export default new AuthService();

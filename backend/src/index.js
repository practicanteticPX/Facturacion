import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';
import { typeDefs } from './graphql/schema.js';
import { resolvers } from './graphql/resolvers.js';
import { connectDatabases, disconnectDatabases } from './config/database.js';
import emailService from './services/emailService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    console.error('GraphQL Error:', error);
    return {
      message: error.message,
      extensions: {
        code: error.extensions?.code || 'INTERNAL_SERVER_ERROR'
      }
    };
  }
});

const startServer = async () => {
  try {
    await connectDatabases();

    // Verificar conexión SMTP
    await emailService.verificarConexion();

    await server.start();

    app.use(
      '/graphql',
      cors({
        origin: (origin, callback) => {
          // Si no hay origin (request directo), permitir
          if (!origin) {
            return callback(null, true);
          }

          // Permitir cualquier origen que use HTTP o HTTPS
          // Esto incluye: localhost, IPs (192.168.x.x, 10.x.x.x, 172.x.x.x), dominios
          const allowedPatterns = [
            /^https?:\/\/localhost(:\d+)?$/,                                    // localhost con cualquier puerto
            /^https?:\/\/127\.0\.0\.1(:\d+)?$/,                                // loopback
            /^https?:\/\/192\.168\.\d{1,3}\.\d{1,3}(:\d+)?$/,                 // Red local 192.168.x.x
            /^https?:\/\/10\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/,              // Red local 10.x.x.x
            /^https?:\/\/172\.(1[6-9]|2[0-9]|3[0-1])\.\d{1,3}\.\d{1,3}(:\d+)?$/, // Red local 172.16-31.x.x
            /^https?:\/\/[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*(:\d+)?$/ // Cualquier dominio
          ];

          const isAllowed = allowedPatterns.some(pattern => pattern.test(origin));

          if (isAllowed) {
            callback(null, true);
          } else {
            console.warn(`⚠️ CORS: Origen no permitido: ${origin}`);
            callback(new Error('No permitido por CORS'));
          }
        },
        credentials: true
      }),
      graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
      bodyParser.json(),
      expressMiddleware(server, {
        context: async ({ req }) => {
          return { req };
        }
      })
    );

    app.get('/health', (req, res) => {
      res.json({ status: 'OK', message: 'Backend operativo' });
    });

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Servidor GraphQL corriendo en http://0.0.0.0:${PORT}/graphql`);
      console.log(`📡 Accesible desde la red local en http://<TU_IP>:${PORT}/graphql`);
    });

    process.on('SIGINT', async () => {
      await disconnectDatabases();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      await disconnectDatabases();
      process.exit(0);
    });

  } catch (error) {
    console.error('Error iniciando el servidor:', error);
    process.exit(1);
  }
};

startServer();

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
          const isLocalNetwork = !origin ||
            origin.includes('192.168.0.30') ||
            origin.match(/^http:\/\/192\.168\.\d{1,3}\.\d{1,3}:\d+$/) ||
            origin.match(/^http:\/\/10\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+$/) ||
            origin.match(/^http:\/\/172\.(1[6-9]|2[0-9]|3[0-1])\.\d{1,3}\.\d{1,3}:\d+$/);

          callback(null, isLocalNetwork);
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

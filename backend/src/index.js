import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { typeDefs } from './graphql/schema.js';
import { resolvers } from './graphql/resolvers.js';
import { connectDatabases, disconnectDatabases } from './config/database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

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

    await server.start();

    app.use(
      '/graphql',
      cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials: true
      }),
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

    app.listen(PORT, () => {
      console.log(`🚀 Servidor GraphQL corriendo en http://localhost:${PORT}/graphql`);
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

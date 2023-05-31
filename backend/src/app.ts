/* eslint-disable no-console */
import Nodemailer from 'nodemailer';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import { graphqlUploadExpress } from 'graphql-upload';
import { buildSchema } from 'type-graphql';
import { Payload, verifyToken } from './utils/auth';
import authChecker from './config/auth-checker';
import restRoutes from './routes';

const PORT = process.env.SERVER_PORT || 4000;
const graphQLPath = '/graphql';

export async function initServer(): Promise<void> {
  try {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer<Payload>({
      schema: await buildSchema({
        resolvers: [`${__dirname}/graphql/resolvers/**/*.{ts,js}`],
        emitSchemaFile: true,
        authChecker,
      }),
    });
    await server.start();
    app.use(
      graphQLPath,
      cors<cors.CorsRequest>(),
      json(),
      expressMiddleware(server, {
        context: async ({ req }): Promise<Payload> => {
          const token = req.headers.authorization || '';
          return verifyToken(token);
        },
      }),
    );
    await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
    app.use(graphqlUploadExpress({
      maxFileSize: 30000000,
      maxFiles: 5,
    }));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use('/webhooks', restRoutes);

    console.log(`🚀 Server ready at http://localhost:${PORT}${graphQLPath}`);
  } catch (err) {
    console.log(`❌ Error during server starting : ${err}`);
  }
}

export async function initMailer(): Promise<void> {
  Nodemailer.createTransport({
    host: 'ssl0.ovh.net',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'contact@olivet-tt.fr',
      pass: 'TimoBoll45160!',
    },
    logger: true,
  });
}

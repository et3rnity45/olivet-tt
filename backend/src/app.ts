/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import { buildSchema } from 'type-graphql';
import Nodemailer from 'nodemailer';
import { Payload, verifyToken } from './utils/auth';
import authChecker from './config/auth-checker';
import restRoutes from './routes';

const PORT = process.env.SERVER_PORT || 4000;

export default async function initServer(): Promise<void> {
  try {
    const server = new ApolloServer({
      schema: await buildSchema({
        resolvers: [`${__dirname}/graphql/resolvers/**/*.{ts,js}`],
        emitSchemaFile: true,
        authChecker,
      }),
      context: ({ req }): Payload => {
        const token = req.headers.authorization;
        if (token) {
          try {
            return verifyToken(token);
          } catch (err) {
            return {};
          }
        }
        return {};
      },
    });
    await server.start();

    const transporter = Nodemailer.createTransport({
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

    const app = express();

    app.use(cors());
    app.use(graphqlUploadExpress({
      maxFileSize: 30000000,
      maxFiles: 5,
    }));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use('/webhooks', restRoutes);
    server.applyMiddleware({ app });

    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (err) {
    console.log(`❌ Error during server starting : ${err}`);
  }
}

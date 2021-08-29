/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import { buildSchema } from 'type-graphql';
import { Payload, verifyToken } from './utils/auth';
import authChecker from './config/auth-checker';

export default async function initServer(): Promise<void> {
  try {
    const app = express();
    const PORT = process.env.PORT || 4000;
    const server = new ApolloServer({
      uploads: false,
      playground: process.env.NODE_ENV === 'development',
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
    const path = server.graphqlPath;
    await server.start();

    app.use(cors());
    app.use(graphqlUploadExpress({
      maxFileSize: 30000000,
      maxFiles: 10,
    }));
    server.applyMiddleware({ app, path });

    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}${path}`);
    });
  } catch (err) {
    console.log(`❌ Error during server starting : ${err}`);
  }
}

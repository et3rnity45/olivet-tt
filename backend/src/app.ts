/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import { buildSchema } from 'type-graphql';

export default async function initServer(): Promise<void> {
  try {
    const app = express();
    const PORT = process.env.PORT || 4000;
    const schema = await buildSchema({
      resolvers: [`${__dirname}/graphql/resolvers/**/*.{ts,js}`],
      emitSchemaFile: true,
      validate: false,
    });
    const server = new ApolloServer({
      uploads: false,
      schema,
      playground: process.env.NODE_ENV === 'development',
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

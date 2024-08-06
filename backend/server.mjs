// npm install @apollo/server express graphql cors body-parser graphql-upload
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
//import { typeDefs, resolvers } from "./schema.mjs";
import dotenvx from '@dotenvx/dotenvx';
import colors from 'colors';
import expressPlayground from 'graphql-playground-middleware-express';
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import connectDB from './config/db.mjs';
import typeDefs from "./schema/typeDefs.mjs";
import resolvers from "./schema/resolvers.mjs";
import { dirname } from 'path';

dotenvx.config();

await connectDB();

const port = process.env.PORT || 5000;

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
//  uploads: false,
});
await server.start();

app.use(express.static(dirname('./') + '/static_content'));

app.use(
  "/",
  cors(),
  bodyParser.json(),
  graphqlUploadExpress(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
);


//const graphQLPlayground = expressPlayground.default;
//if (process.env.NODE_ENV === 'development') {
//    app.get('/playground', graphQLPlayground({ endpoint: '/graphql' }));
//}

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port }, resolve));
console.log(`Server running on port ${port}`)
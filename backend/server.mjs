// npm install @apollo/server express graphql cors body-parser graphql-upload
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import session from "express-session";
import { default as connectMongoDBSession } from "connect-mongodb-session";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import dotenvx from '@dotenvx/dotenvx';
import colors from 'colors';
import expressPlayground from 'graphql-playground-middleware-express';
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import connectDB from './config/db.mjs';
import typeDefs from "./schema/typeDefs.mjs";
import resolvers from "./schema/resolvers.mjs";
import { dirname } from 'path';

// parse config from .env file
dotenvx.config();

// Connect to MongoDB
await connectDB();

// Create Express server
const port = process.env.PORT || 5000;
const app = express();
const httpServer = http.createServer(app);

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
//  uploads: false,
});
await server.start();

// Configure static serving. Used for images
app.use(express.static(dirname('./') + '/static_content'));


// Configure session management
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  maxage: 1000 * 60 * 60 * 24, // 1 day
};
if (process.env.NODE_ENV === 'production') {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: 'none',
    secure: true,   // only send cookies over https
    domain: process.env.BACKEND_URL,
  }
};

// Configure session store using MongoDB
const MongoDBStore = connectMongoDBSession(session);
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'sessions',
});
store.on('error', function(error) {
  console.log(error);
});
sessionOptions.store = store;

app.use(
  "/",
  cors({  // handle cross-origin requests for multi-user access
    credentials: true,
    origin: process.env.FRONTEND_URL || 
            "http://localhost:3000",
  }),
  session(sessionOptions),  // handle session management && cookies
  bodyParser.json(),
  graphqlUploadExpress(),   // This is the middleware for handling file uploads
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
);

// set session user to user from cookie
app.post('/setUser', async (req, res) => {
  try {
    req.session.user = req.body.user;
    res.send({ message: "created user session" }).status(201);  // 201 Created
  } catch (error) {
    console.log(error);
  }
});

// configure dev playground
//const graphQLPlayground = expressPlayground.default;
//if (process.env.NODE_ENV === 'development') {
//    app.get('/playground', graphQLPlayground({ endpoint: '/graphql' }));
//}

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port }, resolve));
console.log(`Server running on port ${port}`)
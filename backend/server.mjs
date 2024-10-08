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
import path, { dirname } from 'path';
import jwt from 'jsonwebtoken';
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import admin from "firebase-admin";
import serviceAccountKey from "./config/serviceAccountKey.json" assert { type: "json" };

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
  introspection: true,
  playground: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();


// Configure & Init Firebase
const firebaseApp = initializeApp({
  credential: admin.credential.cert(serviceAccountKey)
});
const auth = getAuth(firebaseApp);


// Configure session management
const sessionOptions = {
  name: 'sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    rolling: true,
  },
  maxage: 1000 * 60 * 60 * 24, // 1 day
};
// configure session options for production
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
store.on('success', function(success) {
  console.log(success);
});
sessionOptions.store = store;


// Tell Express to use the session
app.use(session(sessionOptions));


// Listen for session login requests from frontend
// needs to be a separate endpoint because all connections
// to graphql must be authenticated
app.post('/sessionLogin', cors(), bodyParser.json(), (req, res) => {
  const idToken = req.body.idToken;

  // verify the id token against Firebase
  // then set the session user based on the decoded uid
  getAuth().verifyIdToken(idToken)
  .then((decodedToken) => {
    req.session.regenerate((err) => {
      if (err) next(err);
      req.session.uid = decodedToken.uid;
      req.session.save((err) => {
        if (err) return next(err);
        console.log(req.session.uid);

        // cookie automatically tacked onto response 
        // by express-session middleware
        // send response to frontend
        res.send({ message: "Sign In Successful" })
      });
    })
  })
});


// Listen for session login requests from frontend
app.post('/sessionLogout', cors(), bodyParser.json(), (req, res) => {

    // clear session data associated
    // with the current session
    req.session.uid = null;
    req.session.save();
    console.log(req.session.uid);
    res.send({ message: "Sign Out Successful" })

});


// Configure static serving. Used for images
app.use(express.static(dirname('./') + '/static_content'));


// Configure Express to use Apollo Server
// with its various required middlewares
app.use(
  "/",  // use for all paths from here on

  // handle cross-origin requests for multi-user access
  // this was a nightmare because of the session data
  // ENSURE THAT CREDENTIALS ARE SET TO TRUE OR COOKIES WILL NOT WORK
  cors({
    credentials: true, // allowed headers cookies
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
  }),

  bodyParser.json(),  // parse json

  // uncomment to watch console log data for sessions
  ///////////////////////////////////////////////////
  //(req, _, next) => {
  //  console.log(req.session);
  //  return next();
  //},
  ///////////////////////////////////////////////////

  graphqlUploadExpress(),   // This is the middleware for handling file uploads

  // instruct server to make the request available to resolvers
  // session data is tacked onto the request object
  // so it must be exposed to the resolvers
  expressMiddleware(server, { 
    context: async ({req, res}) => {
      return { req };
    },
  })
);  

/* ONLY AUTHENTICATED GRAPHQL REQUESTS FROM HERE ON         */
/* All middleware below will be processed by Apollo Server  */
/* NOT by Express                                           */

// configure dev playground if in development
const graphQLPlayground = expressPlayground.default;
if (process.env.NODE_ENV === 'development') {
    app.get('/playground', graphQLPlayground({ endpoint: '/graphql' }));
}

// Start the server
await new Promise((resolve) => httpServer.listen({ port }, resolve));
console.log(`Server running on port ${port}`)
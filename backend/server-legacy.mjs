import express, { application } from 'express';
import path, {dirname} from 'path';

import colors from 'colors';       // for coloring console.log output
import cors from 'cors';

// This package allows command substitution in .env files,
// dotenv does not
import dotenvx from '@dotenvx/dotenvx';
dotenvx.config();

// for handling file uploads
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';
import finished from 'stream/promises'; 
import { createHandler } from 'graphql-http/lib/use/express'

import schema from './schema/schema.mjs';
import connectDB from './config/db.mjs';

import expressPlayground from 'graphql-playground-middleware-express';







import { ApolloServer } from 'apollo-server-express';
//import { ApolloServer } from '@apollo/server';
//import { expressMiddleware } from '@apollo/server/express4';

const app = express();

//const server = new ApolloServer({   
//    schema,
//    uploads: false
//});
//await server.start();

// Connect to database
await connectDB();

const graphQLPlayground = expressPlayground.default;

const port = process.env.PORT || 5000;



//server.applyMiddleware({ app, path: '/graphql' });



// Configure Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Configure static content serving 
// e.g. http://localhost:5000/images/hamstrings2.png
app.use(express.static(dirname('./') + '/static_content'));

// Configure listening for file uploads
// TODO: investigate security implications of this
app.use(graphqlUploadExpress());

//app.use('/graphql', cors(), express.json(), expressMiddleware(server));

app.use('/graphql', createHandler({ schema }));

if (process.env.NODE_ENV === 'development') {
    app.get('/playground', graphQLPlayground({ endpoint: '/graphql' }));
}

app.listen(port, console.log(`Server running on port ${port}`));

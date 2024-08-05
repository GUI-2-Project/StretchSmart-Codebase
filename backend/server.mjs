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
//import graphqlHTTP from 'express-graphql';
import { createHandler } from 'graphql-http/lib/use/express'

import schema from './schema/schema.mjs';
import connectDB from './config/db.js';

const port = process.env.PORT || 5000;

const app = express();

// Connect to database
connectDB();

// Configure Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Configure static content serving 
// e.g. http://localhost:5000/images/hamstrings2.png
app.use(express.static(dirname('./') + '/static_content'));


console.log(dirname('./') + '/static_content');
console.log(new URL("../static_content/", import.meta.url).toString());


// Configure listening for file uploads
// TODO: investigate security implications of this
app.use(graphqlUploadExpress());

// Configure graphiql endpoint
//app.use('/graphql', graphqlHTTP.graphqlHTTP({
//    schema,
//    graphiql: process.env.NODE_ENV === 'development'
//}));

app.all('/graphql', createHandler({ schema, graphiql: process.env.NODE_ENV === 'development' }));

app.listen(port, console.log(`Server running on port ${port}`));
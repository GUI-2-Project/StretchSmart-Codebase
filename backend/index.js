const express = require('express');
const colors = require('colors');       // for coloring console.log output
const cors = require('cors');
require('@dotenvx/dotenvx').config()    // This package allows command substitution in .env files
const { graphqlHTTP } = require('express-graphql');

// for handling file uploads
//const { GraphQLUpload, graphQlUploadExpress } = require('graphql-upload');
//const { finished } = require('stream/promises'); 

const schema = require('./schema/schema');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

const app = express();

// Connect to database
connectDB();

// Configure Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Configure static content serving 
// e.g. http://localhost:5000/images/hamstrings2.png
app.use(express.static(__dirname + '/static_content'));

// Configure graphiql endpoint
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}));

app.listen(port, console.log(`Server running on port ${port}`));
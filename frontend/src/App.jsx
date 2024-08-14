import React from 'react';
import './app.css';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import ContentWrapper from './components/ContentWrapper';

const client = new ApolloClient({
  link: createUploadLink({
    // Ran out of time to figure out how to use .env variables in the
    //uri: 'https://api.stretchsmart.xyz/graphql',  // for production
    uri: 'http://localhost:5000/graphql',           // for local development
    headers: {
      "apollo-require-preflight": "true"
    },
    credentials: 'include',
    //credentials: 'same-origin',
  }),
  cache: new InMemoryCache(),
});

const App = () => {
    return (
        <ApolloProvider client={client}>
            <ContentWrapper/>
        </ApolloProvider>
    );
}

export default App;

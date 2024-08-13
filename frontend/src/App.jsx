import React, { useState, useEffect, useContext, createContext, useDeferredValue } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './app.css';
import Login from './components/login/Login';
import Signup from "./components/signup/Signup";
import AboutUs from './components/AboutUs';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import QuestionsPage from './components/QuestionsPage';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import StretchOverview from './components/stretch_overview/StretchOverview';
import StretchRoutine from './components/stretch_overview/StretchRoutine';
import Stretches from './components/admin/Stretches';
import Questions from './components/admin/Questions';
import MuscleGroups from './components/admin/MuscleGroups';
import DBContent from './components/admin/DBContent';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import axios from 'axios';
import { SET_SESSION_USER } from './mutations/userMutations';
import { auth } from './firebase/FireBase';
import ContentWrapper from './components/ContentWrapper';

const client = new ApolloClient({
  link: createUploadLink({
    //uri: 'https://api.stretchsmart.xyz/graphql',
    uri: 'http://localhost:5000/graphql',
    headers: {
      "apollo-require-preflight": "true"
    },
    credentials: 'include',
    //credentials: 'same-origin',
  }),
  cache: new InMemoryCache(),
});

export const UserContext = createContext();

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogout = () => {
        signOut(auth).then(() => {
            console.log('User signed out');
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: "http://localhost:5000/sessionLogout",
                headers: { 
                  'Content-Type': 'application/json', 
                },
                //credentials: 'include',
                data : {}
            };
            return axios.request(config)
              .then((response) => {
                setIsAuthenticated(false);
                setShowMainContent(true);
            })
              .catch((error) => {
                console.log(error);
            });

        }).catch((error) => {
            console.log('Error signing out: ', error);
        });

    };

    return (
        <ApolloProvider client={client}>
            <ContentWrapper/>
        </ApolloProvider>
    );
}

export default App;

import React, { useState, useEffect } from 'react';
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
import { CookiesProvider, useCookies } from 'react-cookie';

const client = new ApolloClient({
  link: createUploadLink({
    //uri: 'https://api.stretchsmart.xyz/graphql',
    uri: 'http://localhost:5000/graphql',
    headers: {
      "apollo-require-preflight": "true"
    },
    //credentials: 'include',
    credentials: 'same-origin',
  }),
  cache: new InMemoryCache(),
});

const App = () => {
    const [cookies, setCookie] = useCookies(['userToken']);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showMainContent, setShowMainContent] = useState(true);
    const [user, setUser] = useState(null);
    const [userToken, setUserToken] = useState(null);


    // check if user is already logged in
    // fixes logout on refresh
    const auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                console.log('User is signed in');
                setUser(firebaseUser);
                firebaseUser.getIdToken().then((token) => {
                    setUserToken(token);
                });
                handleLogin();
            } else {
                console.log('User is signed out');
            }
        });
    });

    const handleLogin = () => {
        // check valid auth

        // set user in cookie for all pages
        // (all children of the root path '/')
        setCookie('userToken', userToken, { path: '/' });
        setShowMainContent(false);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setShowMainContent(true);
        signOut(auth).then(() => {
            console.log('User signed out');
        }).catch((error) => {
            console.log('Error signing out: ', error);
        });
    };

    const PrivateRoute = ({ element }) => {
        return isAuthenticated ? element : <Navigate to="/" />;
    };

    return (
        <Router>
            <ApolloProvider client={client}>
                <Header
                    isAuthenticated={isAuthenticated}
                    onLogin={handleLogin}
                    onLogout={handleLogout}
                    user={"USER"} // TODO:
                />
                <Routes>
                    <Route path="/" element={showMainContent ? <Login onLogin={handleLogin} /> : <Navigate to="/landing" />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/landing" element={<PrivateRoute element={<LandingPage />} />} />
                    <Route path="/questionnaire" element={<PrivateRoute element={<QuestionsPage />} />} />
                    <Route path="/muscle-overview" element={<PrivateRoute element={<StretchOverview />} />} />
                    <Route path="/aboutus" element={<AboutUs />} />
                    <Route path="/ADMIN" element={<PrivateRoute element={<DBContent />} />} />
                </Routes>
                {showMainContent && <Footer />}
            </ApolloProvider>
        </Router>
    );
}

export default App;

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
    //const [showMainContent, setShowMainContent] = useState(true);
    //const [firebaseUser, setFirebaseUser] = useState(null);
    //const [checkPersistence, setCheckPersistence] = useState(false);
    //const [currentUser, setCurrentUser] = useState(null);
    //const session = {currentUser, setCurrentUser}; 


    //const [setSessionUser] = useMutation(SET_SESSION_USER);
    //const getSessionUser = useQuery(GET_SESSION_USER);

    // check if user is already logged in
    // fixes logout on refresh
    //const auth = getAuth();
    //useEffect( () => {
    //    onAuthStateChanged(auth, (newFirebaseUser) => {
    //        handleAuthChange();
    //    }), [];
    //});
//
    //const handleAuthChange = () => {
    //    // set session user
    //    handleLogin();
    //}
    
    const handleLogin = () => {
        //const { loading, error, data } = useQuery(GET_SESSION_USER);
        //if (loading) return 'Loading...';
        //if (error) return `Error! ${error.message}`;
        //setUser(data);
        setShowMainContent(false);
        setIsAuthenticated(true);
    };

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


        //let data = JSON.stringify({
        //    "idToken": idToken
        //  });
      


    };

    //const PrivateRoute = ({ element }) => {
    //    return isAuthenticated ? element : <Navigate to="/" />;
    //};


    return (
        <ApolloProvider client={client}>
            <ContentWrapper/>
        </ApolloProvider>
    );

    //return (
    //    <UserContext.Provider value={session}>
    //        <Router>
    //                <ApolloProvider client={client}>
    //                    <Header
    //                        isAuthenticated={isAuthenticated}
    //                        onLogout={handleLogout}
    //                    />
    //                    <Routes>
    //                        <Route path="/" element={showMainContent ? <Login onLogin={handleLogin} /> : <Navigate to="/landing" />} />
    //                        <Route path="/signup" element={<Signup />} />
    //                        <Route path="/landing" element={<PrivateRoute element={<LandingPage />} />} />
    //                        <Route path="/questionnaire" element={<PrivateRoute element={<QuestionsPage />} />} />
    //                        <Route path="/muscle-overview" element={<PrivateRoute element={<StretchOverview />} />} />
    //                        <Route path="/aboutus" element={<AboutUs />} />
    //                        <Route path="/ADMIN" element={<PrivateRoute element={<DBContent />} />} />
    //                    </Routes>
    //                    </ApolloProvider>
    //                    {showMainContent && <Footer />}
    //        </Router>
    //        </UserContext.Provider>
    //);
}

export default App;

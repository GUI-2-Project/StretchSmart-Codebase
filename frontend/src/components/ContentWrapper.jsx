import React, { useState, useEffect, createContext, } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './login/Login';
import Signup from "./signup/Signup";
import AboutUs from './AboutUs';
import Header from './Header';
import Footer from './Footer';
import LandingPage from './LandingPage';
import QuestionsPage from './QuestionsPage';
import StretchOverview from './stretch_overview/StretchOverview';
import DBContent from './admin/DBContent';
import { getAuth, signOut } from "firebase/auth";
import axios from 'axios';
import { useMutation, } from '@apollo/client';
import { SET_SESSION_USER } from '../mutations/userMutations';




export const UserContext = createContext();

const ContentWrapper = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showMainContent, setShowMainContent] = useState(true);
    const [sessionUser, setCurrentUser] = useState(null);
    const session = {currentUser: sessionUser, setCurrentUser}; 
    const [setSessionUser] = useMutation(SET_SESSION_USER);

    // check if user is already logged in
    // fixes logout on refresh
    const auth = getAuth();
    useEffect( () => {
        auth.onAuthStateChanged((newFirebaseUser) => {
            if (newFirebaseUser) {
                handleLogin();
            }
        });
    }, []);

    const handleLogin = () => {
        // see Login.jsx for 
        // cookie and session info
        const user = getAuth().currentUser;
        async function fetchSessionUser() {
            return await setSessionUser({ variables: { _id: user.uid } });
        }
        fetchSessionUser().then((data) => {
            setCurrentUser(data.data.setSessionUser);
        })
        
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
                data : {}
            };
            return axios.request(config)
              .then((response) => {
                  setShowMainContent(true);
                  setIsAuthenticated(false);
            })
              .catch((error) => {
                console.log(error);
            });

        }).catch((error) => {
            console.log('Error signing out: ', error);
        });
    };

    const PrivateRoute = ({ element }) => {
        return isAuthenticated ? element : <Navigate to="/" />;
    };

    return (
        <UserContext.Provider value={session}>
            <Router>
                <Header
                    isAuthenticated={isAuthenticated}
                    onLogin={handleLogin}
                    onLogout={handleLogout}
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
            </Router>
        </UserContext.Provider>
    );
}

export default ContentWrapper;

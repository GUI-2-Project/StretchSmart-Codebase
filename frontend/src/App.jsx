import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './app.css';
import Login from './components/login/Login';
import Signup from "./components/signup/Signup";
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import QuestionsPage from './components/QuestionsPage';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import StretchOverview from './components/stretch_overview/StretchOverview';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',   // TODO: replace hardcoded value with env variable
  cache: new InMemoryCache(),
});

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showMainContent, setShowMainContent] = useState(true);

    const handleLogin = () => {
        setIsAuthenticated(true);
        setShowMainContent(false);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setShowMainContent(true);
    };

    // const handleMuscleSelect = (muscle) =>{
    //   setSelectedMuscle(muscle);
    //   return isAuthenticated ? element : <Navigate to="/questionnaire" />;
    // };  

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
                    user="USER"
                />
                <Routes>
                    <Route path="/" element={showMainContent ? <Login onLogin={handleLogin} /> : <Navigate to="/landing" />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/landing" element={<PrivateRoute element={<LandingPage />} />} />
                    <Route path="/questionnaire" element={<PrivateRoute element={<QuestionsPage />} />} />
                </Routes>
                {showMainContent && <Footer />}
            </ApolloProvider>
        </Router>
    );
}

export default App;

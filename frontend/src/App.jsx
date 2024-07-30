import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './app.css'
import Login from './components/login/Login';
import Signup from "./components/signup/Signup";
import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import StretchCard from './components/StretchCard'
import QuestionsPage from './components/QuestionsPage'
import { setPersistence } from 'firebase/auth';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import LandingPage from './components/LandingPage';


const client = new ApolloClient({
  uri: 'http://127.0.0.1:5000/graphql',   // TODO: replace hardcoded value with env variable
  cache: new InMemoryCache()
});

const App = () => {
  // this authentication code is just a place holder
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [showMainContent, setShowMainContent] = useState(true);
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  // mock login authentication
  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowMainContent(false);
  };

  // mock logout authentication
  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowMainContent(true);
  };

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/" />;
  };
  const handleMuscleSelect = (muscle) =>{
    setSelectedMuscle(muscle);
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
              {/* login page goes to questionnare when signing in */}
              <Route path="/" element={showMainContent ? <Login onLogin={handleLogin} /> : <Navigate to="/questionnaire" />} />
              <Route element={<Signup />} />
              <Route path="/questionnaire" element={<PrivateRoute element={<QuestionsPage />} />} />
              <Route path="/landingPage" element={<PrivateRoute element={<LandingPage onMuscleSelect={handleMuscleSelect} />} />} />
          </Routes>
          {selectedMuscle && <StretchCard muscleName={selectedMuscle} />}
          {showMainContent}
          <Footer />
        </ApolloProvider>
      </Router>
  )
}
export default App

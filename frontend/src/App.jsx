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


const App = () => {
  // this authentication code is just a place holder
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showMainContent, setShowMainContent] = useState(true);

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

  return (
      <Router>
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
        </Routes>
        {showMainContent} 
        <Footer />
      </Router>
  )
}

export default App

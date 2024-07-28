import React, { useState } from 'react'
import './app.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Signup from "./components/signup/Signup.jsx";
import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import StretchCard from './components/StretchCard'
import QuestionsPage from './components/QuestionsPage'


const App = () => {
  // this authentication code is just a place holder
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // mock login authentication
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // mock logout authentication
  const handleLogout = () => {
    setIsAuthenticated(false);
  }

  return (
      <Router>
        <Header 
          isAuthenticated={isAuthenticated}
          onLogin={handleLogin}
          onLogout={handleLogout}
          user="USER"
        />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* <Route path="/questionnaire" element={<QuestionsPage />} /> */}
            </Routes>
        <Footer />
      </Router>
  )
    {/*
    <div className='App'>
      <Header 
        isAuthenticated={isAuthenticated}
        onLogin={handleLogin}
        onLogout={handleLogout}
        user="USER"
      />
      {isAuthenticated && <QuestionsPage />
      }
      */}
      {/* <Sidebar muscleGroup="MUSCLEGROUP" /> */}
      {/* <StretchCard /> */}
      {/* <Footer /> */}
    {/*
    </div>
    */}
  );
}

export default App
import React from 'react'
import './app.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Signup from "./components/signup/Signup.jsx";
import Header from './components/Header'
import Footer from './components/Footer'


const App = () => {
  return (
      <Router>
      <Header user="USER" />
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
          </Routes>
      <Footer />
      </Router>
  )
}

export default App
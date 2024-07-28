import React, { useState } from 'react'
import './app.css'
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
    <div className='App'>
      <Header 
        isAuthenticated={isAuthenticated}
        onLogin={handleLogin}
        onLogout={handleLogout}
        user="USER"
      />
      {isAuthenticated && <QuestionsPage />
      }
      {/* <Sidebar muscleGroup="MUSCLEGROUP" /> */}
      {/* <StretchCard /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default App
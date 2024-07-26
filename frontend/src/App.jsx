import React from 'react'
import './app.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'

const App = () => {
  return (
    <>
      <Header user="USER" />
      <Sidebar muscleGroup="MUSCLEGROUP" />
      <Footer />
    </>
  )
}

export default App
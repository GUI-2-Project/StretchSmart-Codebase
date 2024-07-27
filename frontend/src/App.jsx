import React from 'react'
import './app.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import StretchCard from './components/StretchCard'

const App = () => {
  return (
    <>
      <Header user="USER" />
      <Sidebar muscleGroup="MUSCLEGROUP" />
      <StretchCard title="TITLE" info="INFO"/>
      <Footer />
    </>
  )
}

export default App
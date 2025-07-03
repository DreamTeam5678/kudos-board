import './theme.css'

import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import BoardPage from './components/BoardPage/BoardPage'
import './App.css'

// Import ThemeContext
import { ThemeContext } from './context/ThemeContext'

function App() {
  const { theme } = useContext(ThemeContext)

  // Apply theme class to body when theme changes
  useEffect(() => {
    document.body.className = theme
  }, [theme])

  return (
    <div className="app-wrapper">
      <BrowserRouter>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/board/:id" element={<BoardPage />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App

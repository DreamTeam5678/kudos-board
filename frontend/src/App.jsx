import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/Home/Home"
import Footer from "./components/Footer/Footer" 
import BoardPage from "./components/BoardPage/BoardPage"
import "./App.css" 

function App() {
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

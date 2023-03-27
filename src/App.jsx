import React from 'react'
import { BrowserRouter, Route , Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

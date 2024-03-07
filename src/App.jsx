import Form from './components/Form'
import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import ContextHolder from './Context/ContextHolder';
function App() {

  return (
    <ContextHolder>
      <div className="App">

        <BrowserRouter>
          <Routes>
            <Route path='/register' element={<Form />} />
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ContextHolder>
  );
}

export default App;

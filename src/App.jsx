import Display from './components/Display';
import Header from './components/Header'
import Form from './components/Form'
import Delete from './components/Delete'
import React, { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Update from './components/Update';
import Login from './components/Login';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import ContextHolder from './Context/ContextHolder';
// import './App.css';
function App() {
  // const [openMod, setOpenmod] = useState(false);
  // const [updateMod, setUpdate] = useState(false)
  // const [id,setId] = useState('')
  // const f = (val) => {
  //   // console.log(val)
  //   setId(val)
  // }
  // // console.log(id)
  // const [openModal, setModal] = useState(false);
  return (
    <ContextHolder>
      <div className="App">
        {/* {!updateMod && !openMod && <Header closeModal={setOpenmod} />}
      {!updateMod && !openMod && !openModal && <Display setModal={setModal}  seId={f} setUpdatemod={setUpdate}/>}
      {openModal && <Delete setModal={setModal}  ids={id} />}
      {openMod && <Form closeModal={setOpenmod} />}
    {updateMod && <Update closeModal={setUpdate} ids={id}/>} */}
        <BrowserRouter>
          <Routes>
            <Route path='/register' element={<Form />} />
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ContextHolder>
  );
}

export default App;

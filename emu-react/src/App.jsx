import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import Form from './pages/home'
//import Home from './components/login';
//import Form from './components/form';
import Formhd from './components/form.jsx';
import Setprovider from './components/setprovider';
import Home from './components/home.jsx';
import Secrect from './components/secrect.jsx';
function App() {
  return (
 <>
 <Setprovider>
  <BrowserRouter>
 <Routes> 
  <Route path="/login" element={<Formhd/>}></Route>
  <Route path="/home" element={<Home/>}></Route>
    <Route path="/secrect" element={<Secrect/>}></Route>
  </Routes>
 </BrowserRouter>
 </Setprovider>
 </>
  );
}



export default App;
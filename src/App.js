import React from "react";
import { Routes, Route } from 'react-router-dom';
import Tiny from './components/Tiny'
import Messy from './components/Messy'
import Redirect from './components/Redirect'
import Privacy from './components/Privacy'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Messy/>}/>
      <Route path='/:h' element={<Redirect/>}/>
      <Route path='/tiny/:h' element={<Tiny/>}/>
      <Route path='/prywatnosc' element={<Privacy/>}/>
    </Routes>
    </>
  );
}

export default App;

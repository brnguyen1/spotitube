import React from 'react';
import {Routes, Route} from 'react-router-dom'
import logo from './logo.svg';
import Callback from './components/Callback'
import Authorize from './components/Authorize';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Authorize />}/>
      <Route path='/callback' element={<Callback />}/>
    </Routes>
  )
}


export default App;

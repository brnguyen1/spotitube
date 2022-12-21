import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Playlists from './components/Playlists';
import Authorize from './components/Authorize';
import Token from './components/Token';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Authorize />} />
      <Route path='/playlists' element={<Playlists />} />
      <Route path='/callback' element={<Token />} />
    </Routes>
  )
}
export default App

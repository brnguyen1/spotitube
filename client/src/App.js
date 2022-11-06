import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Playlists from './components/Playlists';
import Authorize from './components/Authorize';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Authorize />}/>
      <Route path='/playlists' element={<Playlists />}/>
    </Routes>
  )
}


export default App;

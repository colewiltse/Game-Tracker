import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, { useState } from 'react';


import HomePage from './pages/home_page';
import LoginPage from './pages/login_page';
import GameListPage from './pages/game_list_page';


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage isLoggedIn={isLoggedIn}/>} />
          <Route path="login" element={<LoginPage setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="game_list" element={<GameListPage isLoggedIn={isLoggedIn}/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

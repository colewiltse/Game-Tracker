import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, { useState } from 'react';

import MainLayout from './pages/main_layout';
import PlainLayout from './plain_layout';

import HomePage from './pages/home_page';
import LoginPage from './pages/login_page';
import GameListPage from './pages/game_list_page';
import GameDetailPage from './pages/game_detail_page';


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <Routes>

        {/* Routes WITHOUT navbar */}
        <Route element={<PlainLayout />}>
          <Route path="/" element={<HomePage isLoggedIn={isLoggedIn}/>} />
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn}/>} />
        </Route>

        {/* Routes WITH navbar */}
        <Route element={<MainLayout />}>
          <Route path="/game_list" element={<GameListPage isLoggedIn={isLoggedIn}/>} />
          <Route path="games/:id/" element={<GameDetailPage isLoggedIn={isLoggedIn}/>}/>
        </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;

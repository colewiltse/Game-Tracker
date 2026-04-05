import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, { useState } from 'react';

import MainLayout from './pages/main_layout';
import PlainLayout from './pages/plain_layout';

import HomePage from './pages/home_page';
import LoginPage from './pages/login_page';
import GameListPage from './pages/game_list_page';
import GameDetailPage from './pages/game_detail_page';
import CreateAccountPage from './pages/create_account_page';
import GameCreate from './pages/game_create_page';
import GameUpdate from './pages/game_update_page';
import AccountInfo from './pages/account_info_page';
import AccountEditPage from './pages/account_edit_page';


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <Routes>

        {/* Routes WITHOUT navbar */}
        <Route element={<PlainLayout />}>
          <Route path="/" element={<HomePage isLoggedIn={isLoggedIn}/>} />
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/create_account" element={<CreateAccountPage setIsLoggedIn={setIsLoggedIn}/>}/>
        </Route>

        {/* Routes WITH navbar */}
        <Route element={<MainLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}>
          <Route path="/game_list" element={<GameListPage isLoggedIn={isLoggedIn}/>} />
          <Route path="games/:id/" element={<GameDetailPage isLoggedIn={isLoggedIn}/>}/>
          <Route path="/game_create" element={<GameCreate isLoggedIn={isLoggedIn}/>} />
          <Route path="game_update/:id/" element={<GameUpdate isLoggedIn={isLoggedIn}/>}/>
          <Route path="/account_info" element={<AccountInfo isLoggedIn={isLoggedIn}/>} />
          <Route path="/account_edit" element={<AccountEditPage isLoggedIn={isLoggedIn}/>} />
        </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;

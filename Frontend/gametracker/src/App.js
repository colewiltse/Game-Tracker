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
  return (
    <BrowserRouter>
      <Routes>

        {/* Routes WITHOUT navbar */}
        <Route element={<PlainLayout />}>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/create_account" element={<CreateAccountPage/>}/>
        </Route>

        {/* Routes WITH navbar */}
        <Route element={<MainLayout/>}>
          <Route path="/game_list" element={<GameListPage/>} />
          <Route path="games/:id/" element={<GameDetailPage/>}/>
          <Route path="/game_create" element={<GameCreate/>} />
          <Route path="game_update/:id/" element={<GameUpdate/>}/>
          <Route path="/account_info" element={<AccountInfo/>} />
          <Route path="/account_edit" element={<AccountEditPage/>} />
        </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;

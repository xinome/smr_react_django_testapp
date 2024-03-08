import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import logo from './logo.svg';

import './BaseApp.css';
import { Routes, Route, Link } from 'react-router-dom';

// Material UI(MUI) components
import { Avatar, Box, Container, Grid } from '@mui/material';

// コンポーネント
import BaseHeader from "./components/BaseHeader";
import BaseSideMenu from "./components/BaseSideMenu";

// ページ
import DashBoard from './pages/DashBoard';
import MypageIndex from './pages/mypage/MypageIndex';
import EditProfile from "./pages/mypage/EditProfile";

import TipsIndex from "./pages/tips/TipsIndex";
import TipsCategorize from "./pages/tips/TipsCategorize";
import TipsDetail from "./pages/tips/TipsDetail";
import TipsCreate from "./pages/tips/TipsCreate";
import TipsEdit from "./pages/tips/TipsEdit";

const BaseApp = () => {

  const pathname = useLocation().pathname.replaceAll('/', '');
  console.log("useLocation.pathname: ", pathname);

  // 仮置き: ログインユーザID
  const current_user_id = 1;

  return (
    <div className="app">
      <BaseHeader user_id={current_user_id} />
      <Box className='app-container'>
        <BaseSideMenu path={pathname} />

        <Routes>
          <Route path="/dashboard/" element={<DashBoard />} /> 
          <Route path="/mypage/" element={<MypageIndex user_id={current_user_id} />} />
          <Route path="/mypage/edit_profile/" element={<EditProfile user_id={current_user_id} />} />
          <Route path="/tips/" element={<TipsIndex />} />
          <Route path="/tips/create/" element={<TipsCreate />} />
          <Route path="/tips/edit/:tips_id" element={<TipsEdit />} />
          <Route path="/tips/:tips_category" element={<TipsCategorize />} />
          <Route path="/tips/:tips_category/:tips_id" element={<TipsDetail />} />
        </Routes>

      </Box>
    </div>
  );
}

export default BaseApp;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import logo from './logo.svg';

import store from "./store";
import { useSelector, useDispatch } from 'react-redux';

import './BaseApp.css';
import { Routes, Route, Link } from 'react-router-dom';

// import { fetchAuth, accountLogout } from './features/account/authSlice';

// Material UI(MUI) components
import { Avatar, Box, Container, Grid } from '@mui/material';

// コンポーネント
import Login from "./pages/Login";

import Layout from "./pages/Layout";
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

  const userAuth = useSelector((state) => state.authReducer);
  const usersList = useSelector((state) => state.authReducer.items);

  const navigate = useNavigate();

  // ローカルストレージからアクセストークンを取得
  const access_token = localStorage.getItem('access_token');
  const current_user_id = localStorage.getItem('current_user_id');

  useEffect(() => {
    if (!access_token) {
      navigate('/login/');
    }
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path="/login/" element={<Login />} />

        {/* ログイン時のレイアウト */}
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard/" element={<DashBoard />} /> 
          <Route path="/mypage/" element={<MypageIndex user_id={current_user_id} />} />
          <Route path="/mypage/edit_profile/" element={<EditProfile user_id={current_user_id} />} />
          <Route path="/tips/" element={<TipsIndex />} />
          <Route path="/tips/create/" element={<TipsCreate />} />
          <Route path="/tips/edit/:tips_id" element={<TipsEdit />} />
          <Route path="/tips/:tips_category" element={<TipsCategorize />} />
          <Route path="/tips/:tips_category/:tips_id" element={<TipsDetail />} />
        </Route>
        {/* <Route path="*" element={<p>Path not resolved</p>} /> */}
      </Routes>

    </div>
  );
}

export default BaseApp;

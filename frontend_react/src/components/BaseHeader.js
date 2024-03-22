import React, { useState, useEffect } from 'react';
// import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Box, Grid, Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

import { bgcolor_header } from '../utils/ColorUtils';

import { fetchAuth, accountLogout } from '../features/account/authSlice';

const BaseHeader = (props) => {

  const user_id = props.user_id;

  const userAuth = useSelector((state) => state.authReducer);
  const usersList = useSelector((state) => state.authReducer.items);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stringAvater = (name) => {
    return {
      sx: {
        bgcolor: deepPurple[500]
      },
      // children: name ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}` : '',
      children: name ? name.slice(0, 1) : '',
    };
  }

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(accountLogout());

    // ログアウト成功時のリダイレクト
    const access_token = localStorage.getItem('access_token');
    console.log('access_token: ', access_token);
    if (!access_token) {
      navigate('/login/');
    }
  }

  return (
    <header className="app-header" style={{ backgroundColor: bgcolor_header }}>
      <Box className='header-logo'>
        <Link to='/'>ロゴ</Link>
      </Box>
      <Grid container className='header-menu' sx={{ alignItems: 'center' }}>
        <Grid item className='header-menu-item' sx={{ marginLeft: '1em' }}>
          {/* アカウント画像アイコン */}
          {/* <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar> */}
          <Avatar {...stringAvater(usersList.account_id)}></Avatar>
        </Grid>
        <Grid item className='header-menu-item' sx={{ marginLeft: '1em' }}>
          <Link to='/mypage/'>マイページ</Link>
        </Grid>
        <Grid item className='header-menu-item' sx={{ marginLeft: '1em' }}>
          <Link to='/password/'>パスワード変更</Link>
        </Grid>
        <Grid item className='header-menu-item' sx={{ marginLeft: '1em' }}>
          <span onClick={handleLogout}>ログアウト</span>
        </Grid>
      </Grid>
    </header>
  );
}

export default BaseHeader;

import React, { useState, useEffect } from 'react';
// import Axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import { Box, Grid, Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

import { bgcolor_header } from '../utils/ColorUtils';

import { fetchAuth, getAuth, login, logout } from '../features/account/authSlice';

const BaseHeader = (props) => {

  const user_id = props.user_id;

  // const BASE_API_URL = "http://localhost:8000/api";
  // テスト用: JSONPlaceholderを使用
  // const BASE_API_URL = "https://jsonplaceholder.typicode.com";

  const usersList = useSelector((state) => state.authReducer.items);
  const dispatch = useDispatch();

  // JSONデータを取得する
  // const [usersList, setUsersList] = useState([]);

  // useEffect(() => {
  //   const fetchUsersList = async (id) => {
  //     try {
  //       const response = await Axios.get(`${BASE_API_URL}/users/${id}`);
  //       console.log("fetchUsersList: ", response);
  //       setUsersList(response.data);
  //       console.log("fetchUsersList > usersList: ", usersList);

  //     }
  //     catch (error) {
  //       console.log("fetchUsersList: ", error);
  //     }
  //   }

  //   fetchUsersList(user_id);
  // }, [user_id]);

  useEffect(() => {
    dispatch(fetchAuth(user_id));
  }, [dispatch, user_id]);


  const stringAvater = (name) => {
    return {
      sx: {
        bgcolor: deepPurple[500]
      },
      children: name ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}` : '',
    };
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
          <Avatar {...stringAvater(usersList.name)}></Avatar>
        </Grid>
        <Grid item className='header-menu-item' sx={{ marginLeft: '1em' }}>
          <Link to='/mypage/'>マイページ</Link>
        </Grid>
        <Grid item className='header-menu-item' sx={{ marginLeft: '1em' }}>
          <Link to='/password/'>パスワード変更</Link>
        </Grid>
        <Grid item className='header-menu-item' sx={{ marginLeft: '1em' }}>
          <Link to='/logout/'>ログアウト</Link>
        </Grid>
      </Grid>
    </header>
  );
}

export default BaseHeader;

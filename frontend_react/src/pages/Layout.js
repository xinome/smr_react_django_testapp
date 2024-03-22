import { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

// Material UI(MUI) components
import { Avatar, Box, Container, Grid } from '@mui/material';

import { fetchAuth, accountLogout } from '../features/account/authSlice';

// レイアウト
import BaseHeader from "../components/BaseHeader";
import BaseSideMenu from "../components/BaseSideMenu";

const Layout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pathname = useLocation().pathname.replaceAll('/', '');
  console.log("useLocation.pathname: ", pathname);

  // ローカルストレージからアクセストークンを取得
  const access_token = localStorage.getItem('access_token');
  const current_user_id = localStorage.getItem('current_user_id');

  useEffect(() => {
    dispatch(fetchAuth(current_user_id));
  }, []);

  useEffect(() => {
    // ログアウト処理: リダイレクト
    if(!access_token) {
      navigate('/login/');
    }
  }, [access_token]);

  return (
    <div className="app">
      <BaseHeader user_id={current_user_id} />
      <Box className='app-container'>
        <BaseSideMenu path={pathname} />

        <Outlet />

      </Box>
    </div>
  );
}

export default Layout;
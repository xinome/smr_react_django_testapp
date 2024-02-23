import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import logo from './logo.svg';
import Axios from 'axios';

import './BaseApp.css';
import { Routes, Route, Link } from 'react-router-dom';

import {
  bgcolor_header, bgcolor_sidemenu,
  category_project, category_portfolio, category_activity,
} from './utils/ColorUtils';

// Material UI(MUI) components
import { Avatar, Box, Container, Grid } from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';

import { List, ListItemText, ListItemButton, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";


import { createTheme } from '@mui/material/styles';

// コンポーネント
import BaseHeader from "./components/BaseHeader";
import BaseSideMenu from "./components/BaseSideMenu";
import DashBoardCarousel from './components/DashBoardCarousel';

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

  // // const isLoggedIn = false;
  // const BASE_API_URL = "http://localhost:8000/api";

  // // JSONデータを取得する
  // const [projectList, setProjectList] = useState([]);
  // const [portfolioList, setPortfolioList] = useState([]);
  // const [activityList, setActivityList] = useState([]);

  // const fetchProjectList = async () => {
  //   try {
  //     const response = await Axios.get(`${BASE_API_URL}/project_topics`);
  //     console.log("fetchProjectList: ", response);
  //     setProjectList(response.data);
  //   }
  //   catch (error) {
  //     console.log("fetchProjectList: ", error);
  //   }
  // }

  // const fetchPortfolioList = async () => {
  //   try {
  //     const response = await Axios.get(`${BASE_API_URL}/portfolio_topics`);
  //     console.log("fetchPortfolioList: ", response);
  //     setPortfolioList(response.data);
  //   }
  //   catch (error) {
  //     console.log("fetchPortfolioList: ", error);
  //   }
  // }

  // const fetchActivityList = async () => {
  //   try {
  //     const response = await Axios.get(`${BASE_API_URL}/activity_topics`);
  //     console.log("fetchActivityList: ", response);
  //     setActivityList(response.data);
  //   }
  //   catch (error) {
  //     console.log("fetchActivityList: ", error);
  //   }
  // }

  // useEffect(() => {
  //   fetchProjectList();
  //   fetchPortfolioList();
  //   fetchActivityList();
  // }, []);

  // const filteredProjectList = projectList.filter((item) => {
  //   return item.id <= 3;
  // });
  // const filteredPortfolioList = portfolioList.filter((item) => {
  //   return item.id <= 3;
  // });
  // const filteredActivityList = activityList.filter((item) => {
  //   return item.id <= 3;
  // });

  // const getCategoryTags = (category_id) => {
  //   switch (category_id) {
  //     case 1:
  //       return category_project;
  //     case 2:
  //       return category_portfolio;
  //     case 3:
  //       return category_activity;
  //     default:
  //       return null;
  //   }
  // };

  // const menuItemStyle = {
  //   padding: '.5em 1em',
  //   margin: '0',
  //   borderBottom: '1px solid #ccc',
  // };

  // const [open, setOpen] = useState(false);
  // const [open2, setOpen2] = useState(false);

  const pathname = useLocation().pathname.replaceAll('/', '');

  console.log("useLocation.pathname: ", pathname);

  // 仮置き: ログインユーザID
  const current_user_id = 1;

  return (
    <div className="app">
      {/* <header className="app-header" style={{ backgroundColor: bgcolor_header }}>
        <Box className='header-logo'>
          <Link to='/'>ロゴ</Link>
        </Box>
        <Grid container className='header-menu' sx={{ alignItems: 'center' }}>
          <Grid item className='header-menu-item' sx={{ marginLeft: '1em' }}>
            <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
          </Grid>
          <Grid item className='header-menu-item' sx={{ marginLeft: '1em' }}>
            <Link to='/mypage'>マイページ</Link>
          </Grid>
          <Grid item className='header-menu-item' sx={{ marginLeft: '1em' }}>
            <Link to='/password'>パスワード変更</Link>
          </Grid>
          <Grid item className='header-menu-item' sx={{ marginLeft: '1em' }}>
            <Link to='/logout'>ログアウト</Link>
          </Grid>
        </Grid>
      </header> */}
      <BaseHeader user_id={current_user_id} />
      <Box className='app-container'>
        <BaseSideMenu path={pathname} />
        {/* <Box className='side-menu' style={{ backgroundColor: bgcolor_sidemenu }}>
          <List>
            <ListItemButton sx={menuItemStyle} onClick={() => setOpen(!open)}>
              <ListItemText primary="ポートフォリオ管理" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to='/portfolio/list/'>
                  <ListItemButton sx={{ ...menuItemStyle, pl: 4 }}>
                    <ListItemText primary="ポートフォリオ一覧" />
                  </ListItemButton>
                </Link>
                <Link to='/portfolio/create/'>
                  <ListItemButton sx={{ ...menuItemStyle, pl: 4 }}>
                    <ListItemText primary="ポートフォリオ作成" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>

            <Link to='/mypage/edit/'>
              <ListItemButton sx={menuItemStyle}>ユーザ基本情報変更</ListItemButton>
            </Link>

            <ListItemButton sx={menuItemStyle} onClick={() => setOpen2(!open2)}>
              <ListItemText primary="プロジェクト管理" />
              {open2 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to='/project/list/'>
                  <ListItemButton sx={{ ...menuItemStyle, pl: 4 }}>
                    <ListItemText primary="プロジェクト一覧" />
                  </ListItemButton>
                </Link>
                <Link to='/project/create/'>
                  <ListItemButton sx={{ ...menuItemStyle, pl: 4 }}>
                    <ListItemText primary="プロジェクト作成" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>

            <Link to='/searchproject/'>
              <ListItemButton sx={menuItemStyle}>プロジェクト検索</ListItemButton>
            </Link>
            <Link to='/scout/'>
              <ListItemButton sx={menuItemStyle}>スカウト管理</ListItemButton>
            </Link>
            <Link to='/tips/'>
              <ListItemButton sx={menuItemStyle}>開発Tips</ListItemButton>
            </Link>
            <Link to='/activity/'>
              <ListItemButton sx={menuItemStyle}>活動記録</ListItemButton>
            </Link>
          </List>
        </Box> */}

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

        {/* <Container className='page-maincontents'>
          <Container className='dashboard-carousel section-wrapper'>
            <DashBoardCarousel />
          </Container>

          <Box className='section-wrapper'>
            <Grid container className='section-header'>
              <Grid item className='section-wrapper-title'>参加プロジェクト</Grid>
              <Grid item>
                <Link to='/project/list'>詳細を見る</Link>
              </Grid>
            </Grid>
            <Box className='section-contents'>
              {filteredProjectList.map((item) => (
                <dl key={item.id}>
                  <dt>{item.date}</dt>
                  <dd>
                    <span className="tag_category" style={{ backgroundColor: getCategoryTags(item.category.id) }}>
                      {item.category.category_name}
                    </span>
                    {item.content}
                  </dd>
                </dl>
              ))}
            </Box>
          </Box>

          <Box className='section-wrapper'>
            <Grid container className='section-header'>
              <Grid item className='section-wrapper-title'>ポートフォリオ</Grid>
              <Grid item>
                <Link to='/portfolio/list'>詳細を見る</Link>
              </Grid>
            </Grid>
            <Box className='section-contents'>
              {filteredPortfolioList.map((item) => (
                <dl key={item.id}>
                  <dt>{item.date}</dt>
                  <dd>{item.content}</dd>
                </dl>
              ))}
            </Box>
          </Box>

          <Box className='section-wrapper'>
            <Grid container className='section-header'>
              <Grid item className='section-wrapper-title'>活動記録</Grid>
              <Grid item>
                <Link to='/activity'>詳細を見る</Link>
              </Grid>
            </Grid>
            <Box className='section-contents'>
              {filteredActivityList.map((item) => (
                <dl key={item.id}>
                  <dt>{item.date}</dt>
                  <dd>
                    <span className="tag_category" style={{ backgroundColor: getCategoryTags(item.category.id) }}>
                      {item.category.category_name}
                    </span>
                    {item.content}
                  </dd>
                </dl>
              ))}
            </Box>
          </Box>

          <Box className='section-wrapper'>
            <Grid container className='section-header'>
              <Grid item className='section-wrapper-title'>活動記録</Grid>
              <Grid item>
                <Link to='/activity'>詳細を見る</Link>
              </Grid>
            </Grid>
            <Box className='section-contents'>
              {filteredActivityList.map((item) => (
                <dl key={item.id}>
                  <dt>{item.date}</dt>
                  <dd>
                    <span className="tag_category" style={{ backgroundColor: getCategoryTags(item.category.id) }}>
                      {item.category.category_name}
                    </span>
                    {item.content}
                  </dd>
                </dl>
                ))}
            </Box>
          </Box>
          <Box className='section-wrapper'>
            <Grid container className='section-header'>
              <Grid item className='section-wrapper-title'>活動記録</Grid>
              <Grid item>
                <Link to='/activity'>詳細を見る</Link>
              </Grid>
            </Grid>
            <Box className='section-contents'>
              {filteredActivityList.map((item) => (
                <dl key={item.id}>
                  <dt>{item.date}</dt>
                  <dd>
                    <span className="tag_category" style={{ backgroundColor: getCategoryTags(item.category.id) }}>
                      {item.category.category_name}
                    </span>
                    {item.content}
                  </dd>
                </dl>
                ))}
            </Box>
          </Box>

        </Container> */}
      </Box>
    </div>
  );
}

export default BaseApp;

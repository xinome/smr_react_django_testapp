import React, { useState, useEffect } from "react";
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

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { createTheme } from '@mui/material/styles';

// コンポーネント
import DashBoardCarousel from './components/DashBoardCarousel';

const BaseApp = () => {

  // const isLoggedIn = false;
  const BASE_API_URL = "http://localhost:8000/api";

  // JSONデータを取得する
  const [projectList, setProjectList] = useState([]);
  const [portfolioList, setPortfolioList] = useState([]);
  const [activityList, setActivityList] = useState([]);

  const fetchProjectList = async () => {
    try {
      const response = await Axios.get(`${BASE_API_URL}/project_topics`);
      console.log("fetchProjectList: ", response);
      setProjectList(response.data);
    }
    catch (error) {
      console.log("fetchProjectList: ", error);
    }
  }

  const fetchPortfolioList = async () => {
    try {
      const response = await Axios.get(`${BASE_API_URL}/portfolio_topics`);
      console.log("fetchPortfolioList: ", response);
      setPortfolioList(response.data);
    }
    catch (error) {
      console.log("fetchPortfolioList: ", error);
    }
  }

  const fetchActivityList = async () => {
    try {
      const response = await Axios.get(`${BASE_API_URL}/activity_topics`);
      console.log("fetchActivityList: ", response);
      setActivityList(response.data);
    }
    catch (error) {
      console.log("fetchActivityList: ", error);
    }
  }

  useEffect(() => {
    fetchProjectList();
    fetchPortfolioList();
    fetchActivityList();
  }, []);

  const filteredProjectList = projectList.filter((item) => {
    return item.id <= 3;
  });
  const filteredPortfolioList = portfolioList.filter((item) => {
    return item.id <= 3;
  });
  const filteredActivityList = activityList.filter((item) => {
    return item.id <= 3;
  });

  const getCategoryTags = (category_id) => {
    switch (category_id) {
      case 1:
        return category_project;
      case 2:
        return category_portfolio;
      case 3:
        return category_activity;
      default:
        return null;
    }
  };

  const menuAccordionStyle = {
    backgroundColor: bgcolor_sidemenu,
    color: '#fff',
    padding: '.5em',
    borderRadius: '0',
    borderBottom: '1px solid #ccc',
    boxShadow: 'none',
  };

  const menuItemStyle = {
    padding: '.5em 1em',
    margin: '0',
    borderBottom: '1px solid #ccc',
  };

  const menuNestedItemStyle = {
    padding: '.5em 1em',
    margin: '0',
    borderBottom: '1px solid #ccc',
  };

  const themeAccordion = createTheme({
    components: {
      MuiAccordion: {
        styleOverrides: {
          root: {
            '&.MuiAccordion-root': {
              padding: '0',
            },
            '&.MuiAccordion-root.Mui-expanded': {
              margin: '0px',
              borderBottom: 'none',
            },
          },
        },
      },
      // MuiAccordionSummary: {
      //   styleOverrides: {
      //     root: {
      //       '&.MuiAccordionSummary-root': {
      //         margin: '0',
      //       },
      //     },
      //   },
      // },
      // MuiAccordionDetails: {
      //   styleOverrides: {
      //     root: {
      //       '&.MuiAccordionDetails-root': {
      //         padding: '0',
      //       },
      //     },
      //   },
      // },
    },
  });
  
  return (
    <div className="app">
      <header className="app-header" style={{ backgroundColor: bgcolor_header }}>
        <Box className='header-logo'>
          <Link to='/'>ロゴ</Link>
        </Box>
        <Grid container className='header-menu' sx={{ alignItems: 'center' }}>
          <Grid item className='header-menu-item' sx={{ marginLeft: '1em' }}>
            {/* アカウント画像アイコン */}
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
      </header>
      <Box className='app-container'>
        <Box className='side-menu' style={{ backgroundColor: bgcolor_sidemenu }}>
          <ul>
            {/* <li>
              ポートフォリオ
              <ul>
                <li>ポートフォリオ一覧</li>
                <li>ポートフォリオ作成</li>
              </ul>
            </li> */}
            <Accordion theme={themeAccordion} sx={menuAccordionStyle}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon sx={{ color: '#fff' }} />}
              >
                <Typography>ポートフォリオ</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{
                padding: '0',
                margin: '0',
              }}>
                <Link to='/portfolio/list/'>
                  <Box sx={menuNestedItemStyle}>ポートフォリオ一覧</Box>
                </Link>
                <Link to='/portfolio/create/'>
                  <Box sx={menuNestedItemStyle}>ポートフォリオ作成</Box>
                </Link>
              </AccordionDetails>
            </Accordion>
            <Link to='/mypage/edit/'>
              <Box sx={menuItemStyle}>ユーザ基本情報変更</Box>
            </Link>
            <Accordion theme={themeAccordion} sx={menuAccordionStyle}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon sx={{ color: '#fff' }} />}
              >
                <Typography>プロジェクト管理</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{
                padding: '0',
                margin: '0',
              }}>
                <Link to='/project/list/'>
                  <Box sx={menuItemStyle}>プロジェクト一覧</Box>
                </Link>
                <Link to='/project/list/'>
                  <Box sx={menuItemStyle}>プロジェクト作成</Box>
                </Link>
              </AccordionDetails>
            </Accordion>
            <Link to='/searchproject/'>
              <Box sx={menuItemStyle}>プロジェクト検索</Box>
            </Link>
            <Link to='/scout/'>
              <Box sx={menuItemStyle}>スカウト管理</Box>
            </Link>
            <Link to='/tips/'>
              <Box sx={menuItemStyle}>開発Tips</Box>
            </Link>
            <Link to='/activity/'>
              <Box sx={menuItemStyle}>活動記録</Box>
            </Link>
          </ul>
        </Box>
        <Container className='page-maincontents'>
          {/* カルーセル */}
          <Container className='dashboard-carousel section-wrapper'>
            <DashBoardCarousel />
          </Container>

          <Box className='section-wrapper'>
            <Grid container className='section-wrapper-header'>
              <Grid item className='section-wrapper-title'>参加プロジェクト</Grid>
              <Grid item>
                <Link to='/project/list'>詳細を見る</Link>
              </Grid>
            </Grid>
            <Box className='section-wrapper-contents'>
              {/* <dl>
                <dt>2022.10.01</dt>
                <dd>[プロジェクト]「プロジェクト名」デプロイされました。</dd>
              </dl>
              <dl>
                <dt>2022.10.01</dt>
                <dd>[プロジェクト]「プロジェクト名」デプロイされました。</dd>
              </dl>
              <dl>
                <dt>2022.10.01</dt>
                <dd>[プロジェクト]「プロジェクト名」デプロイされました。</dd>
              </dl> */}
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
            <Grid container className='section-wrapper-header'>
              <Grid item className='section-wrapper-title'>ポートフォリオ</Grid>
              <Grid item>
                <Link to='/portfolio/list'>詳細を見る</Link>
              </Grid>
            </Grid>
            <Box className='section-wrapper-contents'>
              {/* <dl>
                <dt>2022.10.05</dt>
                <dd>「ポートフォリオ1」html / css / wordpress</dd>
              </dl>
              <dl>
                <dt>2022.10.05</dt>
                <dd>「ポートフォリオ2」php / laravel / docker</dd>
              </dl>
              <dl>
                <dt>2022.10.05</dt>
                <dd>「ポートフォリオ3」vue.js / vuetify / node.js / bootstrap</dd>
              </dl> */}
              {filteredPortfolioList.map((item) => (
                <dl key={item.id}>
                  <dt>{item.date}</dt>
                  <dd>{item.content}</dd>
                </dl>
              ))}
            </Box>
          </Box>

          <Box className='section-wrapper'>
            <Grid container className='section-wrapper-header'>
              <Grid item className='section-wrapper-title'>活動記録</Grid>
              <Grid item>
                <Link to='/activity'>詳細を見る</Link>
              </Grid>
            </Grid>
            <Box className='section-wrapper-contents'>
              {/* <dl>
                <dt>2022.10.01</dt>
                <dd>[プロジェクト]「プロジェクト名1」デプロイされました。</dd>
              </dl>
              <dl>
                <dt>2022.10.05</dt>
                <dd>[ポートフォリオ]「ポートフォリオ名2」いいねがつきました。</dd>
              </dl>
              <dl>
                <dt>2022.10.11</dt>
                <dd>[スカウト]「社名3」からメッセージが届きました。</dd>
              </dl> */}
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
            <Grid container className='section-wrapper-header'>
              <Grid item className='section-wrapper-title'>活動記録</Grid>
              <Grid item>
                <Link to='/activity'>詳細を見る</Link>
              </Grid>
            </Grid>
            <Box className='section-wrapper-contents'>
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
            <Grid container className='section-wrapper-header'>
              <Grid item className='section-wrapper-title'>活動記録</Grid>
              <Grid item>
                <Link to='/activity'>詳細を見る</Link>
              </Grid>
            </Grid>
            <Box className='section-wrapper-contents'>
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

        </Container>
      </Box>
    </div>
  );
}

export default BaseApp;

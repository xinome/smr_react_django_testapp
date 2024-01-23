import React, { useState, useEffect } from 'react'
import Axios from 'axios'

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box, Container, Grid } from '@mui/material'

import DashBoardCarousel from '../components/DashBoardCarousel'
import { category_project, category_portfolio, category_activity } from '../utils/ColorUtils'

const DashBoard = () => {

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

  return (
    <Container className='page-maincontents'>
      {/* カルーセル */}
      <Container className='dashboard-carousel section-wrapper'>
        <DashBoardCarousel />
      </Container>

      <Box className='section-wrapper'>
        <Grid container className='section-header'>
          <Grid item className='section-title'>参加プロジェクト</Grid>
          <Grid item>
            <Link to='/project/list'>詳細を見る</Link>
          </Grid>
        </Grid>
        <Box className='section-contents'>
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
        <Grid container className='section-header'>
          <Grid item className='section-title'>ポートフォリオ</Grid>
          <Grid item>
            <Link to='/portfolio/list'>詳細を見る</Link>
          </Grid>
        </Grid>
        <Box className='section-contents'>
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
        <Grid container className='section-header'>
          <Grid item className='section-title'>活動記録</Grid>
          <Grid item>
            <Link to='/activity'>詳細を見る</Link>
          </Grid>
        </Grid>
        <Box className='section-contents'>
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
        <Grid container className='section-header'>
          <Grid item className='section-title'>活動記録</Grid>
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
          <Grid item className='section-title'>活動記録</Grid>
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

    </Container>
  )
}

export default DashBoard

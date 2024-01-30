import React, { useState, useEffect } from 'react'
import Axios from 'axios'

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Container, Grid } from '@mui/material'

import DashBoardCarousel from '../components/DashBoardCarousel'
import { category_project, category_portfolio, category_activity } from '../utils/ColorUtils'

import { fetchProjectTopics } from '../features/topics/projectTopicsSlice'
import { fetchPortfolioTopics } from '../features/topics/portfolioTopicsSlice'
import { fetchActivityTopics } from '../features/topics/activityTopicsSlice'

const DashBoard = () => {

  // state, dispatch, useSelectorを使う
  const projectList = useSelector((state) => state.projectTopicsReducer.items);
  const portfolioList = useSelector((state) => state.portfolioTopicsReducer.items);
  const activityList = useSelector((state) => state.activityTopicsReducer.items);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjectTopics());
    dispatch(fetchPortfolioTopics());
    dispatch(fetchActivityTopics());
  }, [dispatch]);

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
            <Link to='/project/list/'>詳細を見る</Link>
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
            <Link to='/portfolio/list/'>詳細を見る</Link>
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
            <Link to='/activity/'>詳細を見る</Link>
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
            <Link to='/activity/'>詳細を見る</Link>
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
            <Link to='/activity/'>詳細を見る</Link>
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

import React, { useState, useEffect } from 'react'
import Axios from 'axios'

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Container, Grid, Typography, Breadcrumbs, Button } from '@mui/material'
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CircularProgress from '@mui/material/CircularProgress';

import { category_project, category_portfolio, category_activity, category_tips } from '../../utils/ColorUtils'

import { fetchTipsList } from '../../features/tips/tipsSlice'

const TipsList = () => {

  const tipsList = useSelector((state) => state.tipsReducer.items);
  const isLoading = useSelector((state) => state.tipsReducer.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTipsList());
  }, []);

  console.log("tipsList: ", tipsList);

  const getCategoryTags = (category_id) => {
    switch (category_id) {
      case 1:
        return category_project;
      case 2:
        return category_portfolio;
      case 3:
        return category_activity;
      case 4:
        return category_tips;
      default:
        return null;
    }
  };
  
  const breadcrumbs = [
    { name: 'ホーム', href: '/dashboard/' },
    { name: '開発Tips' },
  ];    

  return (
    <Container className='page-maincontents'>

      <Grid container className='page-title-header'>
        <Grid item className='page-title-item'>
          <Typography variant='h2' className='page-title'>開発Tips</Typography>
        </Grid>
        <Grid item className='page-title-item'>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs.map((item, index) => (
              index < breadcrumbs.length - 1 ? (
                <Link key={index} color="inherit" to={item.href}>
                  {item.name}
                </Link>
              ) : (
                <Typography key={index} color="textPrimary">
                  {item.name}
                </Typography>
              )
            ))}
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Box className='section-wrapper'>
        <Grid container className='section-header'>
          {/* <Grid item className='section-title'></Grid> */}
          <Grid item>
            <Button variant="contained" color="primary">
              <Link to='/tips/create/'>Tips新規作成</Link>
            </Button>
          </Grid>
        </Grid>
      </Box>


      {tipsList.length !== 0 && !isLoading ? (
        <>
          <Box className='section-wrapper'>
            <Grid container className='section-header'>
              <Grid item className='section-title'>プロジェクト進行</Grid>
              <Grid item>
                <Link to='/tips/project/'>一覧を見る</Link>
              </Grid>
            </Grid>
            <Box className='section-contents'>
              {Object.keys(tipsList).filter(
                (key) => tipsList[key].category?.id === 1
              ).map((key) => (
                <dl key={tipsList[key].id}>
                  <dt>{tipsList[key].date}</dt>
                  <dd>
                    <span className="tag_category" style={{ backgroundColor: getCategoryTags(tipsList[key].category?.id) }}>
                      {tipsList[key].category?.tips_name}
                    </span>
                    <Link to={`/tips/project/${tipsList[key].id}`}>{tipsList[key].title}</Link>
                    <br />
                    {tipsList[key].content?.length > 100 ? tipsList[key].content.slice(0, 100) + '...' : tipsList[key].content}
                  </dd>
                </dl>
              ))}
            </Box>
          </Box>

          <Box className='section-wrapper'>
            <Grid container className='section-header'>
              <Grid item className='section-title'>開発言語</Grid>
              <Grid item>
                <Link to='/tips/language/'>一覧を見る</Link>
              </Grid>
            </Grid>
            <Box className='section-contents'>
              {Object.keys(tipsList).filter(
                (key) => tipsList[key].category?.id === 2
              ).map((key) => (
                <dl key={tipsList[key].id}>
                  <dt>{tipsList[key].date}</dt>
                  <dd>
                    <span className="tag_category" style={{ backgroundColor: getCategoryTags(tipsList[key].category?.id) }}>
                      {tipsList[key].category?.tips_name}
                    </span>
                    <Link to={`/tips/language/${tipsList[key].id}`}>{tipsList[key].title}</Link>
                    <br />
                    {tipsList[key].content?.length > 100 ? tipsList[key].content.slice(0, 100) + '...' : tipsList[key].content}
                  </dd>
                </dl>
              ))}
            </Box>
          </Box>

          <Box className='section-wrapper'>
            <Grid container className='section-header'>
              <Grid item className='section-title'>フレームワーク</Grid>
              <Grid item>
                <Link to='/tips/framework/'>一覧を見る</Link>
              </Grid>
            </Grid>
            <Box className='section-contents'>
              {Object.keys(tipsList).filter(
                (key) => tipsList[key].category?.id === 3
              ).map((key) => (
                <dl key={tipsList[key].id}>
                  <dt>{tipsList[key].date}</dt>
                  <dd>
                    <span className="tag_category" style={{ backgroundColor: getCategoryTags(tipsList[key].category?.id) }}>
                      {tipsList[key].category?.tips_name}
                    </span>
                    <Link to={`/tips/framework/${tipsList[key].id}`}>{tipsList[key].title}</Link>
                    <br />
                    {tipsList[key].content?.length > 100 ? tipsList[key].content.slice(0, 100) + '...' : tipsList[key].content}
                  </dd>
                </dl>
              ))}
            </Box>
          </Box>

          <Box className='section-wrapper'>
            <Grid container className='section-header'>
              <Grid item className='section-title'>インフラ</Grid>
              <Grid item>
                <Link to='/tips/infra/'>一覧を見る</Link>
              </Grid>
            </Grid>
            <Box className='section-contents'>
              {Object.keys(tipsList).filter(
                (key) => tipsList[key].category?.id === 4
              ).map((key) => (
                <dl key={tipsList[key].id}>
                  <dt>{tipsList[key].date}</dt>
                  <dd>
                    <span className="tag_category" style={{ backgroundColor: getCategoryTags(tipsList[key].category?.id) }}>
                      {tipsList[key].category?.tips_name}
                    </span>
                    <Link to={`/tips/infra/${tipsList[key].id}`}>{tipsList[key].title}</Link>
                    <br />
                    {tipsList[key].content?.length > 100 ? tipsList[key].content.slice(0, 100) + '...' : tipsList[key].content}
                  </dd>
                </dl>
              ))}
            </Box>
          </Box>
        </>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}

    </Container>
  )
}

export default TipsList

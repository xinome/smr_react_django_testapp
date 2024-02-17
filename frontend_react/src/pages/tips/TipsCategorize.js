import React, { useState, useEffect } from 'react'
import Axios from 'axios'

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Container, Grid, Typography, Breadcrumbs, Button } from '@mui/material'
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CircularProgress from '@mui/material/CircularProgress';

import { category_project, category_portfolio, category_activity, category_tips } from '../../utils/ColorUtils'

import { useParams } from 'react-router-dom';

import { fetchTipsCategorizeList } from '../../features/tips/tipsCategorizeSlice'

const TipsCategorize = () => {

  console.log("useParams: ", useParams());
  console.log("tips_category: ", useParams().tips_category);

  const params = useParams();
  
  const tipsList = useSelector((state) => state.tipsCategorizeReducer.items);
  const isLoading = useSelector((state) => state.tipsCategorizeReducer.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTipsCategorizeList(params));
  }, [dispatch, params]);

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
    { name: '開発Tips', href: '/tips/' },
    { name: params.tips_category },
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
          <Grid item className='section-title'>{params.tips_category}</Grid>
          <Grid item>
          </Grid>
        </Grid>

        {tipsList.length !== 0 && !isLoading ? (
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
            {tipsList.map((item) => (
              <dl key={item.id}>
                <dt>{item.date}</dt>
                <dd>
                  <span className="tag_category" style={{ backgroundColor: getCategoryTags(item.category.id) }}>
                    {item.category.tips_name}
                  </span>
                  <Link to={`/tips/${params.tips_category}/${item.id}`}>{item.title}</Link>
                  <br />
                  {item.content|item.content.length > 100 ? item.content.slice(0, 100) + '...' : item.content}
                </dd>
              </dl>
            ))}
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        )}
        

      </Box>

    </Container>
  )
}

export default TipsCategorize

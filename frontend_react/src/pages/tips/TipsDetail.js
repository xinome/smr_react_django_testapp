import React, { useState, useEffect } from 'react'
import Axios from 'axios'

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Container, Grid, Typography, Breadcrumbs, Button } from '@mui/material'
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CircularProgress from '@mui/material/CircularProgress';

import { category_project, category_portfolio, category_activity, category_tips } from '../../utils/ColorUtils'

import { useParams } from 'react-router-dom'

import { fetchTipsDetail } from '../../features/tips/tipsDetailSlice'

const TipsCategorize = () => {

  const tipsDetail = useSelector((state) => state.tipsDetailReducer.items);
  const isLoading = useSelector((state) => state.tipsDetailReducer.isLoading);
  const dispatch = useDispatch();

  const params = useParams();

  useEffect(() => {
    dispatch(fetchTipsDetail(params));
  }, [dispatch, params]);

  console.log("tipsDetail: ", tipsDetail);

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
    { name: params.tips_category, href: `/tips/${params.tips_category}/` },
    { name: params.tips_id },
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

      {tipsDetail.length !== 0 && !isLoading ? (
        <Box className='section-wrapper'>
          <Grid container className='section-header'>
            <Grid item className='section-title'>{params.tips_category}</Grid>
            <Grid item>
            </Grid>
          </Grid>
          <Box className='section-contents'>
            <p>
              {tipsDetail.title}
            </p>
            <p>
              カテゴリー: {tipsDetail.category.tips_name}
            </p>
            <p>
              {tipsDetail.content}
            </p>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}

    </Container>
  )
}

export default TipsCategorize

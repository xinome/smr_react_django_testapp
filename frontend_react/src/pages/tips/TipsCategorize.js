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

  console.log("params: ", params);
  
  const tipsList = useSelector((state) => state.tipsCategorizeReducer.items);
  const isLoading = useSelector((state) => state.tipsCategorizeReducer.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTipsCategorizeList(params));
  }, []);

  // object keysで表示
  console.log("tipsList: ", tipsList);
  // console.log("typeof tipsList: ", typeof tipsList);
  // console.log("keys: ", Object.keys(tipsList));
  // console.log("values: ", Object.values(tipsList));

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

  let current_category;
  switch (params.tips_category) {
    case 'project':
      current_category = "プロジェクト";
      break;
    case 'language':
      current_category = "開発言語";
      break;
    case 'framework':
      current_category = "フレームワーク";
      break;
    case 'infra':
      current_category = "インフラ";
      break;
    default:
      current_category = null;
  }
  
  const breadcrumbs = [
    { name: 'ホーム', href: '/dashboard/' },
    { name: '開発Tips', href: '/tips/' },
    { name: current_category },
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
          <Grid item className='section-title'>{current_category}</Grid>
          <Grid item>
          </Grid>
        </Grid>

        {tipsList.length !== 0 && !isLoading ? (
          <Box className='section-contents'>

            {/* オブジェクトの入れ子は取得前にレンダリングされる可能性があるため、?(オプショナルチェーン)を使用 */}
            {Object.keys(tipsList).map((key) => (
              <dl key={tipsList[key].id}>
                <dt>{tipsList[key].date}</dt>
                <dd>
                  <span className="tag_category" style={{ backgroundColor: getCategoryTags(tipsList[key].category?.id) }}>
                    {tipsList[key].category?.tips_name}
                  </span>
                  <Link to={`/tips/${params.tips_category}/${tipsList[key].id}`}>{tipsList[key].title}</Link>
                  <br />
                  {tipsList[key].content?.length > 100 ? tipsList[key].content.slice(0, 100) + '...' : tipsList[key].content}
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

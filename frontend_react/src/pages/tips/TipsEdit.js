import React, { useState, useEffect } from 'react'
import Axios from 'axios'

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Container, Grid, Typography, Breadcrumbs, Button } from '@mui/material'
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material'
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
// date picker
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CircularProgress from '@mui/material/CircularProgress';

import { category_project, category_portfolio, category_activity, category_tips } from '../../utils/ColorUtils'

import { useParams } from 'react-router-dom'

import { fetchGetTipsToEdit, fetchUpdateTips } from '../../features/tips/tipsEditSlice'
import { fetchCategoryList } from '../../features/tips/tipsCategoryListSlice'

const TipsEdit = () => {

  const currentTipsDetail = useSelector((state) => state.tipsDetailReducer.items);
  const isLoading = useSelector((state) => state.tipsDetailReducer.isLoading);
  const categoryList = useSelector((state) => state.tipsCategoryListReducer.items);

  const dispatch = useDispatch();

  const params = useParams();

  console.log("params: ", params);

  const [tipsState, setTipsState] = useState(currentTipsDetail);

  useEffect(() => {
    // 並列にされる
    dispatch(fetchGetTipsToEdit(params));
    dispatch(fetchCategoryList());

    console.log("categoryList: ", categoryList);
  }, []);

  useEffect(() => {
    setTipsState(currentTipsDetail);
  }, [currentTipsDetail]);

  const handleSubmit = (e, tipsState) => {
    e.preventDefault();

    console.log("currentTipsDetail: ", currentTipsDetail);
    console.log("tipsState: ", tipsState);

    console.log("is_same: ", currentTipsDetail === tipsState);
    
    if(currentTipsDetail !== tipsState) {
      dispatch(fetchUpdateTips(tipsState));
    }

  }

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
    { name: '編集' },
  ];    

  // TestareaのみBase UIを使用
  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
      box-sizing: border-box;
      width: 320px;
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.5;
      padding: 8px 12px;
      border-radius: 8px;
    `,
  );

  return (
    <Container className='page-maincontents'>

      <Grid container className='page-title-header'>
        <Grid item className='page-title-item'>
          <Typography variant='h2' className='page-title'>Tips 編集</Typography>
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

          <form method='POST' onSubmit={e => {handleSubmit(e, tipsState)}}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  <TableRow >
                    <TableCell component="th" scope="row">
                      タイトル
                    </TableCell>
                    <TableCell align="right">
                      <TextField required id="outlined-basic" label="Required" variant="outlined"
                        sx={{ minWidth: '100%' }}
                        value={tipsState.title}
                        onChange={e => setTipsState({...tipsState, title: e.target.value})}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow >
                    <TableCell component="th" scope="row">
                      Tipsカテゴリー
                    </TableCell>
                    <TableCell align="right">
                      <FormControl variant="standard" sx={{ m: 1, minWidth: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Tips Category</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={categoryList.findIndex(category => category.id === tipsState.category?.id) + 1}
                          onChange={e => {
                            e.preventDefault();
                            setTipsState({
                              ...tipsState,
                              category: {
                                id: e.target.value,
                                tips_name: categoryList[e.target.value - 1] ? categoryList[e.target.value - 1].tips_name : '',
                                tips_path: categoryList[e.target.value - 1] ? categoryList[e.target.value - 1].tips_path : '',
                              }
                            });
                          }}
                          label="Category"
                        >
                          <MenuItem value="0">
                            <em>None</em>
                          </MenuItem>
                          {categoryList.map((category, index) => (
                            <MenuItem key={index} value={category.id}>{category.tips_name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                  <TableRow >
                    <TableCell component="th" scope="row">
                      作成日
                    </TableCell>
                    <TableCell align="right">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                          <DatePicker
                            label="date"
                            sx={{ minWidth: '100%' }}
                            value={dayjs(tipsState.date)}
                            onChange={(newValue) => {
                              setTipsState({...tipsState, date: dayjs(newValue).format('YYYY-MM-DD')})
                            }}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </TableCell>
                  </TableRow>
                  <TableRow >
                    <TableCell component="th" scope="row">
                      文面
                    </TableCell>
                    <TableCell align="right">
                      <Textarea
                        className="CustomTextareaIntrocudtion"
                        aria-label="empty textarea"
                        placeholder="Empty"
                        value={tipsState.content}
                        onChange={e => setTipsState({...tipsState, content: e.target.value})}
                        sx={{ minWidth: '100%' }}
                      />
                    </TableCell>
                  </TableRow>

                </TableBody>
              </Table>
            </TableContainer>

            <Box className='section-footer'>
              <Button variant="contained" color="primary" type='submit'>
                Tipsを更新する
              </Button>
            </Box>
          </form>
        </Box>

    </Container>
  )
}

export default TipsEdit

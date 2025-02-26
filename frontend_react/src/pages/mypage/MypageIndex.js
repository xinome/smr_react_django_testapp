import React, { useState, useEffect } from 'react'
import Axios from 'axios'

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Container, Grid, Typography, Breadcrumbs, Button } from '@mui/material'
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CircularProgress from '@mui/material/CircularProgress';

import { category_project, category_portfolio, category_activity } from '../../utils/ColorUtils'

import { fetchMypageAccountList } from '../../features/mypage/mypageSlice'

const MypageIndex = (props) => {

  const user_id = props.user_id;
  
  const usersList = useSelector((state) => state.mypageReducer.items);
  const isLoading = useSelector((state) => state.mypageReducer.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMypageAccountList(user_id));
  }, [dispatch, user_id]);

  console.log("usersList: ", usersList);
  console.log("memberType: ", usersList.member_type);
  
  const breadcrumbs = [
    { name: 'ホーム', href: '/dashboard/' },
    { name: 'マイページ' },
  ];    

  return (
    <Container className='page-maincontents'>

      <Box className='page-title-wrapper'>
        <Grid container className='page-title-header'>
          <Grid item className='page-title-item'>
            <Typography variant='h2' className='page-title'>マイページ</Typography>
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
      </Box>

      { isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          { usersList.member_type && (
            <Box className='section-wrapper'>
              <Grid container className='section-header'>
                <Grid item className='section-title'>
                  契約プラン: {usersList.member_type.plan_name}
                </Grid>
              </Grid>
              <Box className='section-contents' sx={{ marginBottom: '1em' }}>
                {usersList.member_type.description}
              </Box>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableBody>
                    <TableRow >
                      <TableCell component="th" scope="row">
                        プロジェクト作成権限
                      </TableCell>
                      <TableCell align="right">
                        {usersList.member_type.has_creatable_project ? '有効' : '無効'}
                      </TableCell>
                    </TableRow>
                    <TableRow >
                      <TableCell component="th" scope="row">
                      プロジェクト管理数上限
                      </TableCell>
                      <TableCell align="right">{usersList.member_type.cnt_project_limit}</TableCell>
                    </TableRow>
                    <TableRow >
                      <TableCell component="th" scope="row">
                        プロジェクト作成数
                      </TableCell>
                      <TableCell align="right">{usersList.member_type.cnt_project}</TableCell>
                    </TableRow>
                    <TableRow >
                      <TableCell component="th" scope="row">
                        料金
                      </TableCell>
                      <TableCell align="right">¥{usersList.member_type.price} / 月</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Box className='section-footer'>
                <Button variant="contained" color="primary">プラン変更</Button>
              </Box>
            </Box>
          )}

          <Box className='section-wrapper'>
            <Grid container className='section-header'>
              <Grid item className='section-title'>
                ユーザープロフィール
              </Grid>
            </Grid>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                {/* <TableHead>
                  <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell align="right">Calories</TableCell>
                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                  </TableRow>
                </TableHead> */}
                <TableBody>
                  <TableRow >
                    <TableCell component="th" scope="row">
                      ID
                    </TableCell>
                    <TableCell align="right">{usersList.id}</TableCell>
                  </TableRow>
                  <TableRow >
                    <TableCell component="th" scope="row">
                      氏名
                    </TableCell>
                    <TableCell align="right">{usersList.name}</TableCell>
                  </TableRow>
                  <TableRow >
                    <TableCell component="th" scope="row">
                      アカウントID
                    </TableCell>
                    <TableCell align="right">{usersList.account_id}</TableCell>
                  </TableRow>
                  <TableRow >
                    <TableCell component="th" scope="row">
                      パスワード
                    </TableCell>
                    <TableCell align="right">**********</TableCell>
                  </TableRow>
                  <TableRow >
                    <TableCell component="th" scope="row">
                      メールアドレス
                    </TableCell>
                    <TableCell align="right">{usersList.email}</TableCell>
                  </TableRow>
                  <TableRow >
                    <TableCell component="th" scope="row">
                      郵便番号
                    </TableCell>
                    <TableCell align="right">{usersList.zip}</TableCell>
                  </TableRow>
                  <TableRow >
                    <TableCell component="th" scope="row">
                      住所
                    </TableCell>
                    <TableCell align="right">{usersList.address}</TableCell>
                  </TableRow>
                  {/* <TableRow >
                    <TableCell component="th" scope="row">
                      会員タイプ
                    </TableCell>
                    <TableCell align="right">{usersList.member_type}</TableCell>
                  </TableRow> */}
                  <TableRow >
                    <TableCell component="th" scope="row">
                      電話番号
                    </TableCell>
                    <TableCell align="right">{usersList.phone}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Box className='section-footer'>
              <Button variant="contained" color="primary">
                <Link className="buttonLink" to='/mypage/edit_profile/'>プロフィール変更</Link>
              </Button>
            </Box>
          </Box>

          <Box className='section-wrapper'>
            <Grid container className='section-header'>
              <Grid item className='section-title'>
                スキルセット
              </Grid>
            </Grid>
            <Box className='section-contents'>
              説明が入ります。説明が入ります。説明が入ります。説明が入ります。説明が入ります。説明が入ります。説明が入ります。説明が入ります。説明が入ります。
              説明が入ります。説明が入ります。説明が入ります。説明が入ります。
            </Box>
            <Box className='section-footer'>
              <Button variant="contained" color="primary">
                <Link to='/mypage/edit_skill/'>スキルセット変更</Link>
              </Button>
            </Box>
          </Box>
        </>
      )}

    </Container>
  )
}

export default MypageIndex

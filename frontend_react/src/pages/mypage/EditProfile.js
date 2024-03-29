import React, { useState, useEffect } from 'react'
import Axios from 'axios'

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Container, Grid, Typography, Breadcrumbs, Button } from '@mui/material'
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material'
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { fetchGetMypageProfile, fetchUpdateMypageProfile } from '../../features/mypage/mypageProfileSlice'

const EditProfile = (props) => {

  const user_id = props.user_id;

  const breadcrumbs = [
    { name: 'ホーム', href: '/dashboard/' },
    { name: 'マイページ', href: '/mypage/' },
    { name: 'プロフィール変更' },
  ];

  const currentUserList = useSelector((state) => state.mypageProfileReducer.items);
  const isLoading = useSelector((state) => state.mypageProfileReducer.isLoading);
  const dispatch = useDispatch();

  const [userList, setUserList] = useState(currentUserList);
  const [snackOpen, setSnackOpen] = useState(false);

  // 初回のみ実行
  useEffect(() => {
    dispatch(fetchGetMypageProfile(user_id));
  }, [dispatch, user_id]);

  useEffect(() => {
    setUserList(currentUserList);
  }, [currentUserList]);

  const handleSubmit = (e, newUserList) => {
    e.preventDefault();

    console.log("currentUserList: ", currentUserList);
    console.log("newUserList: ", newUserList);

    console.log("is_same: ", currentUserList === newUserList);

    if(currentUserList !== newUserList) {
      dispatch(fetchUpdateMypageProfile(newUserList));
      setSnackOpen(true);
    }
  }
  
  return (
    <Container className='page-maincontents'>

      <Box className='page-title-wrapper'>
        <Grid container className='page-title-header'>
          <Grid item className='page-title-item'>
            <Typography variant='h2' className='page-title'>プロフィール変更</Typography>
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
        <Box className='section-wrapper'>

          <form method='POST' onSubmit={e => {handleSubmit(e, userList)}}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  <TableRow >
                    <TableCell component="th" scope="row">
                      ID
                    </TableCell>
                    <TableCell align="right">{userList.id}</TableCell>
                  </TableRow>
                  <TableRow >
                    <TableCell component="th" scope="row">
                      氏名
                    </TableCell>
                    <TableCell align="right">
                      <TextField required id="outlined-basic" label="Required" variant="outlined"
                        value={userList.name}
                        onChange={e => setUserList({...userList, name: e.target.value})}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow >
                    <TableCell component="th" scope="row">
                      アカウントID
                    </TableCell>
                    <TableCell align="right">
                      <TextField required id="outlined-basic" label="Required" variant="outlined"
                        value={userList.account_id}
                        onChange={e => setUserList({...userList, account_id: e.target.value})}
                      />
                    </TableCell>
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
                    <TableCell align="right">
                      <TextField required id="outlined-basic" label="Required" variant="outlined"
                        value={userList.email}
                        onChange={e => setUserList({...userList, email: e.target.value})}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow >
                    <TableCell component="th" scope="row">
                      郵便番号
                    </TableCell>
                    <TableCell align="right">
                      <TextField required id="outlined-basic" label="Required" variant="outlined"
                        value={userList.zip}
                        onChange={e => setUserList({...userList, zip: e.target.value})}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow >
                    <TableCell component="th" scope="row">
                      住所
                    </TableCell>
                    <TableCell align="right">
                      <TextField required fullWidth id="outlined-basic" label="Required" variant="outlined"
                        value={userList.address}
                        onChange={e => setUserList({...userList, address: e.target.value})}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow >
                    <TableCell component="th" scope="row">
                      電話番号
                    </TableCell>
                    <TableCell align="right">
                      <TextField required id="outlined-basic" label="Required" variant="outlined"
                        value={userList.phone}
                        onChange={e => setUserList({...userList, phone: e.target.value})}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Box className='section-footer'>
              <Button variant="contained" color="primary" type='submit'>
                プロフィールを更新する
              </Button>
            </Box>
          </form>
        </Box>
      )}

      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={() => setSnackOpen(false)}
      >
        <Alert onClose={() => setSnackOpen(false)} severity="success" variant='filled' sx={{ width: '100%' }}>
          プロフィールを更新しました
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default EditProfile

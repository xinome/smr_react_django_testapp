import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { bgcolor_sidemenu } from '../utils/ColorUtils';

import { List, ListItemButton, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import '../BaseApp.css';

const BaseSideMenu = () => {
  
  const menuItemStyle = {
    padding: '.5em 1em',
    margin: '0',
    borderBottom: '1px solid #ccc',
  };

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  
  return (
    <Box className='side-menu' style={{ backgroundColor: bgcolor_sidemenu }}>
      <List>
        {/* <li>
          ポートフォリオ
          <ul>
            <li>ポートフォリオ一覧</li>
            <li>ポートフォリオ作成</li>
          </ul>
        </li> */}

        <ListItemButton sx={menuItemStyle} onClick={() => setOpen(!open)}>
          {/* <ListItemIcon>
            <InboxIcon />
          </ListItemIcon> */}
          <ListItemText primary="ポートフォリオ管理" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to='/portfolio/list/'>
              <ListItemButton sx={{ ...menuItemStyle, pl: 4 }}>
                <ListItemText primary="ポートフォリオ一覧" />
              </ListItemButton>
            </Link>
            <Link to='/portfolio/create/'>
              <ListItemButton sx={{ ...menuItemStyle, pl: 4 }}>
                <ListItemText primary="ポートフォリオ作成" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>

        <Link to='/mypage/edit/'>
          <ListItemButton sx={menuItemStyle}>ユーザ基本情報変更</ListItemButton>
        </Link>

        <ListItemButton sx={menuItemStyle} onClick={() => setOpen2(!open2)}>
          <ListItemText primary="プロジェクト管理" />
          {open2 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open2} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to='/project/list/'>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="プロジェクト一覧" />
              </ListItemButton>
            </Link>
            <Link to='/project/create/'>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="プロジェクト作成" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>

        <Link to='/searchproject/'>
          <ListItemButton sx={menuItemStyle}>プロジェクト検索</ListItemButton>
        </Link>
        <Link to='/scout/'>
          <ListItemButton sx={menuItemStyle}>スカウト管理</ListItemButton>
        </Link>
        <Link to='/tips/'>
          <ListItemButton sx={menuItemStyle}>開発Tips</ListItemButton>
        </Link>
        <Link to='/activity/'>
          <ListItemButton sx={menuItemStyle}>活動記録</ListItemButton>
        </Link>
      </List>
    </Box>
  );
}

export default BaseSideMenu;

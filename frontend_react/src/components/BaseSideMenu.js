import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { bgcolor_sidemenu, bgcolor_sidemenu_active } from '../utils/ColorUtils';

import { List, ListItemButton, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import '../BaseApp.css';

const BaseSideMenu = (props) => {

  const pathname = props.pathname;
  
  const menuItemStyle = {
    padding: '.5em 1em',
    margin: '0',
    borderBottom: '1px solid #ccc',
  };

  const [openFlg, setOpenFlg] = useState(
    {
      "portfolio": false,
      "project": false,
      "tips": false,
    }
  );

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

        <ListItemButton sx={menuItemStyle}
          onClick={() => setOpenFlg({ ...openFlg, portfolio: !openFlg["portfolio"]})}
        >
          {/* <ListItemIcon>
            <InboxIcon />
          </ListItemIcon> */}
          <ListItemText primary="ポートフォリオ管理" />
          {openFlg["portfolio"] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openFlg["portfolio"]} timeout="auto" unmountOnExit>
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

        <ListItemButton sx={menuItemStyle}
          onClick={() => setOpenFlg({ ...openFlg, project: !openFlg["project"]})}
        >
          <ListItemText primary="プロジェクト管理" />
          {openFlg["project"] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openFlg["project"]} timeout="auto" unmountOnExit>
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

        <ListItemButton sx={menuItemStyle}
          onClick={() => setOpenFlg({ ...openFlg, tips: !openFlg["tips"]})}
        >
          <ListItemText primary="開発tips" />
          {openFlg["tips"] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openFlg["tips"]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to='/tips/list/'>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="開発tips一覧" />
              </ListItemButton>
            </Link>
            <Link to='/tips/create/'>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="開発tips作成" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>

        <Link to='/activity/'>
          <ListItemButton
            sx={{
              ...menuItemStyle,
              backgroundColor: pathname === 'activity' ? bgcolor_sidemenu_active : bgcolor_sidemenu,
            }}
          >
            活動記録
          </ListItemButton>
        </Link>
      </List>
    </Box>
  );
}

export default BaseSideMenu;

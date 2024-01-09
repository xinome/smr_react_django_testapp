import React, { useState, useEffect } from "react";
// import logo from './logo.svg';
import Axios from 'axios';

import './BaseApp.css';
import { Routes, Route, Link } from 'react-router-dom';
import { bgcolor_header, bgcolor_sidemenu } from './utils/ColorUtils';

// コンポーネント
import DashBoardCarousel from './components/DashBoardCarousel';
import { Avatar, Box, Container } from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';

const BaseApp = () => {

  // const isLoggedIn = false;
  const BASE_API_URL = "http://localhost:8000/api";

  // JSONデータを取得する
  const [projectList, setProjectList] = useState([]);
  const [portfolioList, setPortfolioList] = useState([]);
  const [activityList, setActivityList] = useState([]);

  const fetchProjectList = async () => {
    const response = await Axios.get(`${BASE_API_URL}/project_topics`);
    console.log(response);
    setProjectList(response.data);
  }

  const fetchPortfolioList = async () => {
    const response = await Axios.get("http://localhost:8000/api/portfolio_topics");
    console.log(response);
    setPortfolioList(response.data);
  }

  const fetchActivityList = async () => {
    const response = await Axios.get("http://localhost:8000/api/activity_topics");
    console.log(response);
    setActivityList(response.data);
  }

  useEffect(() => {
    fetchProjectList();
    fetchPortfolioList();
    fetchActivityList();
  }, []);

  const filteredProjectList = projectList.filter((item) => {
    return item.id <= 3;
  });
  const filteredPortfolioList = portfolioList.filter((item) => {
    return item.id <= 3;
  });
  const filteredActivityList = activityList.filter((item) => {
    return item.id <= 3;
  });
  
  return (
    <div className="app">
      <Box>
        <header className="app-header" style={{ backgroundColor: bgcolor_header }}>
          <div className='header-logo'>
            <Link to='/'>ロゴ</Link>
          </div>
          <div className='header-menu'>
            <div className='header-menu-item'>
              {/* アカウント画像アイコン */}
              <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
            </div>
            <div className='header-menu-item'>
              <Link to='/mypage'>マイページ</Link>
            </div>
            <div className='header-menu-item'>
              <Link to='/password'>パスワード変更</Link>
            </div>
            <div className='header-menu-item'>
              <Link to='/logout'>ログアウト</Link>
            </div>
          </div>
        </header>
      </Box>
      <div className='app-container'>
        <div className='side-menu' style={{ backgroundColor: bgcolor_sidemenu }}>
          <ul>
            <li>ポートフォリオ</li>
            <li>ユーザ基本情報変更</li>
            <li>プロジェクト管理</li>
            <li>プロジェクト作成</li>
            <li>プロジェクト検索</li>
            <li>スカウト管理</li>
            <li>開発Tips</li>
            <li>活動記録</li>
          </ul>
        </div>
        <div className='page-maincontents'>
          {/* カルーセル */}
          <div className='dashboard-carousel section-wrapper'>
            <DashBoardCarousel />
          </div>

          <div className='section-wrapper'>
            <div className='section-wrapper-header'>
              <div className='section-wrapper-title'>参加プロジェクト</div>
              <div>
                <Link to='/project'>詳細を見る</Link>
              </div>
            </div>
            <div className='section-wrapper-contents'>
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
                  <dd>{item.content}</dd>
                </dl>
              ))}
            </div>
          </div>

          <div className='section-wrapper'>
            <div className='section-wrapper-header'>
              <div className='section-wrapper-title'>ポートフォリオ</div>
              <div>
                <Link to='/portfolio'>詳細を見る</Link>
              </div>
            </div>
            <div className='section-wrapper-contents'>
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
            </div>
          </div>

          <div className='section-wrapper'>
            <div className='section-wrapper-header'>
              <div className='section-wrapper-title'>活動記録</div>
              <div>
                <Link to='/activity'>詳細を見る</Link>
              </div>
            </div>
            <div className='section-wrapper-contents'>
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
                  <dd>{item.content}</dd>
                </dl>
              ))}
            </div>
          </div>

          <div className='section-wrapper'>
            <div className='section-wrapper-header'>
              <div className='section-wrapper-title'>活動記録</div>
              <div>
                <Link to='/activity'>詳細を見る</Link>
              </div>
            </div>
            <div className='section-wrapper-contents'>
              {filteredActivityList.map((item) => (
                <dl key={item.id}>
                  <dt>{item.date}</dt>
                  <dd>{item.content}</dd>
                </dl>
              ))}
            </div>
          </div>
          <div className='section-wrapper'>
            <div className='section-wrapper-header'>
              <div className='section-wrapper-title'>活動記録</div>
              <div>
                <Link to='/activity'>詳細を見る</Link>
              </div>
            </div>
            <div className='section-wrapper-contents'>
              {filteredActivityList.map((item) => (
                <dl key={item.id}>
                  <dt>{item.date}</dt>
                  <dd>{item.content}</dd>
                </dl>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default BaseApp;

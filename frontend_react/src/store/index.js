import { combineReducers } from 'redux';

import { configureStore } from "@reduxjs/toolkit";

// Reducers
import authReducer from '../features/account/authSlice';

import mypageReducer from '../features/mypage/mypageSlice';
import mypageProfileReducer from '../features/mypage/mypageProfileSlice';

import projectTopicsReducer from '../features/topics/projectTopicsSlice';
import portfolioTopicsReducer from '../features/topics/portfolioTopicsSlice';
import activityTopicsReducer from '../features/topics/activityTopicsSlice';

import tipsReducer from '../features/tips/tipsSlice';
import tipsCategorizeReducer from '../features/tips/tipsCategorizeSlice';
import tipsDetailReducer from '../features/tips/tipsDetailSlice';

const rootReducer = combineReducers({
  // ここに作成したReducerを記述する

  // account
  authReducer,

  // mypage
  mypageReducer,
  mypageProfileReducer,

  // dashboard: topics
  projectTopicsReducer,
  portfolioTopicsReducer,
  activityTopicsReducer,

  // Tips
  tipsReducer,
  tipsCategorizeReducer,
  tipsDetailReducer,
  
});

// Store
const store = configureStore({
  reducer: rootReducer,
});

export default store;

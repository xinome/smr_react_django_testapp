import { combineReducers } from 'redux';

import { configureStore } from "@reduxjs/toolkit";

// Reducers
import authReducer from '../features/account/authSlice';

import mypageReducer from '../features/mypage/mypageSlice';
import mypageProfileReducer from '../features/mypage/mypageProfileSlice';

import projectTopicsReducer from '../features/topics/projectTopicsSlice';
import portfolioTopicsReducer from '../features/topics/portfolioTopicsSlice';
import activityTopicsReducer from '../features/topics/activityTopicsSlice';

const rootReducer = combineReducers({
  // ここに作成したReducerを記述する

  // account
  authReducer,
  mypageReducer,
  mypageProfileReducer,

  // topics
  projectTopicsReducer,
  portfolioTopicsReducer,
  activityTopicsReducer,
});

// Store
const store = configureStore({
  reducer: rootReducer,
});

export default store;

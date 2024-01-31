import { combineReducers } from 'redux';

import { configureStore } from "@reduxjs/toolkit";

// Reducers
import accountReducer from '../features/account/mypageSlice';
import authReducer from '../features/account/authSlice';

import projectTopicsReducer from '../features/topics/projectTopicsSlice';
import portfolioTopicsReducer from '../features/topics/portfolioTopicsSlice';
import activityTopicsReducer from '../features/topics/activityTopicsSlice';

const rootReducer = combineReducers({
  // ここに作成したReducerを記述する

  // account
  accountReducer,
  authReducer,

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

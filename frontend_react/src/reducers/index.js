import { combineReducers } from 'redux';
// import { INCREMENT, DECREMENT } from './actionTypes';

import accountReducer from '../features/account/mypageSlice';
import authReducer from '../features/account/authSlice';

import projectTopicsReducer from '../features/topics/projectTopicsSlice';
import portfolioTopicsReducer from '../features/topics/portfolioTopicsSlice';
import activityTopicsReducer from '../features/topics/activityTopicsSlice';

// initialState, reducerは後ほど別ファイルに分ける
// const initialState = {
//   count: 0,
//   isLoggedIn: true,
// };

// const loginReducer = (state = initialState, action) => {
//   switch (action.type) {
//     // case "INCREMENT":
//     //   return { count: state.count + action.payload.num };
//     // case "DECREMENT":
//     //   return { count: state.count - action.payload.num };
//     default:
//       return state;
//   }
// };

const rootReducer = combineReducers({
  // ここに作成したReducerを記述する
  // loginReducer,
  // INCREMENT,
  // DECREMENT,

  // account
  accountReducer,
  authReducer,

  // topics
  projectTopicsReducer,
  portfolioTopicsReducer,
  activityTopicsReducer,
});

export default rootReducer;

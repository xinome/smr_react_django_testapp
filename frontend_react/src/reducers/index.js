import { combineReducers } from 'redux';
// import { INCREMENT, DECREMENT } from './actionTypes';

// initialState, reducerは後ほど別ファイルに分ける
const initialState = {
  count: 0,
  isLoggedIn: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + action.payload.num };
    case "DECREMENT":
      return { count: state.count - action.payload.num };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  // ここに作成したReducerを記述する
  reducer,
  // INCREMENT,
  // DECREMENT,
});

export default rootReducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  items: [],
};

// const BASE_API_URL = "https://jsonplaceholder.typicode.com";
const BASE_API_URL = "http://localhost:8000/api";

/** データ取得非同期処理 */
export const fetchAccountList = createAsyncThunk(
  "account/getAccountList",  // type: 内部処理名、一意でないとだめ
  async (id) => {
    // const response = await axios.get(`${BASE_API_URL}/users/${id}`);
    const response = await axios.get(`${BASE_API_URL}/mypage/user_profile/${id}/`);
    return response.data[0];
  }
);

// Slices
export const accountSlice = createSlice({
  name: "mypage_account",  // sliceの名前
  initialState: initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    // 内部処理名: (state, action) => { return 処理結果 }
  },

  // 外部からのデータ取得
  extraReducers: (builder) => {
    // TODO: エラー発生時の処理も追加する
    builder
      .addCase(fetchAccountList.pending, (state) => {
        console.log("pending..");
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(fetchAccountList.fulfilled, (state, action) => {
        console.log("fulfilled: ", action.payload);
        return {
          ...state,
          items: action.payload,
          isLoading: false,
        };
      })
      .addCase(fetchAccountList.rejected, (state) => {
        console.log("pending..");
        return {
          ...state,
          isLoading: false,
        };
      });
  },
});

// 各コンポーネントからstateを参照できるようにエクスポートをしておく
export const { getAccountList } = accountSlice.actions;
export default accountSlice.reducer;

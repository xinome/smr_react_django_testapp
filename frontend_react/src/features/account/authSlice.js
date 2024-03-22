import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// isLoggedInでログイン状態を管理、最後に実装予定
const initialState = {
  isLoading: false,
  isLoggedIn: true,
  items: [],
};

// const BASE_API_URL = "https://jsonplaceholder.typicode.com";
const BASE_API_URL = "http://localhost:8000/api";

/** データ取得非同期処理 */
export const fetchAuth = createAsyncThunk(
  "account/manageAuth",
  async (id) => {
    const response = await axios.get(`${BASE_API_URL}/auth_account/${id}`);
    console.log("fetchAuth: ", response);
    return response.data;
  }
);

// ログイン処理
export const accountLogin = createAsyncThunk(
  "account/login",
  async (data) => {
    const response = await axios.post(`${BASE_API_URL}/auth_account/login/`, data);
    console.log("response.data: ", response.data);

    // ログイン成功時の処理: ローカルストレージにアクセストークンを保存
    if (response.data.access) {
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('current_user_id', response.data.user.id);
      return response.data;
    } else {
      // handle error
      console.log("error: ", response.data);
    }
  }
);

// ログアウト処理
export const accountLogout = createAsyncThunk(
  "account/logout",
  async () => {
    const response = await axios.post(`${BASE_API_URL}/auth_account/logout/`);
    localStorage.removeItem('access_token');
    localStorage.removeItem('current_user_id');
    console.log("logout: ", response);
    console.log("localStorage: ", localStorage);

    return response.data;
  }
);

// Slices
export const authSlice = createSlice({
  name: "auth",  // sliceの名前
  initialState: initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    // 内部処理名: (state, action) => { return 処理結果 }
  },
  
  // 外部からのデータ取得
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        console.log("pending..");
        return {
          ...state,
          isLoading: true,
          isLoggedIn: false,
        };
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        console.log("fulfilled: ", action.payload);
        return {
          ...state,
          items: action.payload,
          isLoading: false,
          isLoggedIn: true,
        };
      })
      .addCase(fetchAuth.rejected, (state) => {
        console.log("rejected..");
        return {
          ...state,
          isLoading: false,
          isLoggedIn: false,
        };
      });

    builder
      .addCase(accountLogin.pending, (state) => {
        console.log("login pending..");
        return {
          ...state,
          isLoading: true,
          isLoggedIn: false,
        };
      })
      .addCase(accountLogin.fulfilled, (state, action) => {
        console.log("login fulfilled: ", action.payload);
        return {
          ...state,
          items: action.payload,
          isLoading: false,
          isLoggedIn: true,
          access_token: action.payload.access,
        };
      })
      .addCase(accountLogin.rejected, (state) => {
        console.log("login rejected..");
        return {
          ...state,
          isLoading: false,
          isLoggedIn: false,
        };
      });

    builder
      .addCase(accountLogout.pending, (state) => {
        console.log("logout pending..");
        return {
          ...state,
          isLoading: true,
          isLoggedIn: true,
        };
      })
      .addCase(accountLogout.fulfilled, (state, action) => {
        console.log("logout fulfilled: ", action.payload);
        return {
          ...state,
          items: action.payload,
          isLoading: false,
          isLoggedIn: false,
        };
      })
      .addCase(accountLogout.rejected, (state) => {
        console.log("logout rejected..");
        return {
          ...state,
          isLoading: false,
          isLoggedIn: true,
        };
      });
  },
});

// 各コンポーネントからstateを参照できるようにエクスポートをしておく
// export const { getAuth } = authSlice.actions;
export default authSlice.reducer;

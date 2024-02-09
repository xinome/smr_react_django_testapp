import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  items: [],
  status: "",
};

const BASE_API_URL = "http://localhost:8000/api";

/** データ取得非同期処理 */
// データ取得、不要かも
export const fetchGetMypageProfile = createAsyncThunk(
  "get_mypage_profile",  // type: 内部処理名、一意でないとだめ
  async (id) => {
    console.log("id: ", id);
    const response = await axios.get(`${BASE_API_URL}/mypage/user_profile/${id}`);
    return response.data;
  }
);

// 更新
export const fetchUpdateMypageProfile = createAsyncThunk(
  "update_mypage_profile",
  async (data) => {
    console.log("data: ", data);
    console.log("id: ", data.id);

    try {
      const response = await axios.post(`${BASE_API_URL}/mypage/user_profile/${data.id}`, data);
      console.log("updateMypageProfile: ", response);
      return response.data;
    }
    catch (error) {
      console.log("updateMypageProfile_error: ", error);
    }
  }
);

// Slices
export const mypageProfileSlice = createSlice({
  name: "mypage_profile",  // sliceの名前
  initialState: initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    // 内部処理名: (state, action) => { return 処理結果 }    
  },

  // 外部からのデータ取得
  extraReducers: (builder) => {
    // TODO: エラー発生時の処理も追加する
    builder
      .addCase(fetchGetMypageProfile.pending, (state) => {
        console.log("pending..");
        return {
          ...state,
          isLoading: true,
          status: "loading",
        };
      })
      .addCase(fetchGetMypageProfile.fulfilled, (state, action) => {
        console.log("fulfilled: ", action.payload);
        return {
          ...state,
          items: action.payload,
          isLoading: false,
          status: "success",
        };
      })
      .addCase(fetchGetMypageProfile.rejected, (state) => {
        console.log("rejected..");
        return {
          ...state,
          isLoading: false,
          status: "failed",
        };
      });

    builder
      .addCase(fetchUpdateMypageProfile.pending, (state) => {
        console.log("pending..");
        return {
          ...state,
          isLoading: true,
          status: "loading",
        };
      })
      .addCase(fetchUpdateMypageProfile.fulfilled, (state, action) => {
        console.log("fulfilled: ", action.payload);
        return {
          ...state,
          items: action.payload,
          isLoading: false,
          status: "success",
        };
      })
      .addCase(fetchUpdateMypageProfile.rejected, (state, error) => {
        console.log("rejected..", error);
        return {
          ...state,
          isLoading: false,
          status: "failed",
        };
      });
  },
});

// 各コンポーネントからstateを参照できるようにエクスポートをしておく
// export const { updateMypageProfile } = mypageProfileSlice.actions;
export default mypageProfileSlice.reducer;

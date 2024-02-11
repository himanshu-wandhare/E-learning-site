import { /*createAsyncThunk,*/ createSlice } from "@reduxjs/toolkit";
// import axiosClient from "../../apis/axiosClient";
import { authApi } from "../../app/api";

export interface Credential {
  email: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  mobile: string;
}

interface InitialState {
  token: string | null;
  user: User | null;
}

const initialState: InitialState = {
  token: localStorage.getItem("TOKEN"),
  user: JSON.parse(localStorage.getItem("USER") as string) as User,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = "";
      state.user = null;
      localStorage.removeItem("TOKEN");
      localStorage.removeItem("USER");
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        localStorage.setItem("TOKEN", action.payload.token);
        localStorage.setItem("USER", JSON.stringify(action.payload.user));
        state.token = action.payload.token;
        state.user = action.payload.user;
      }
    );
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;

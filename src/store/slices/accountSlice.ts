import { createSlice, current } from "@reduxjs/toolkit";
import { Account, Auth } from "../../common/interfaces/store";

const initialState = {
  account: {
    uid: 0,
    userName: "user",
    email: "",
    createdDt: new Date(),
  } as Account,
  auth: {
    accessToken: "",
    refreshToken: "",
  } as Auth,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.account = { ...current(state).account, ...action.payload };
      console.log(state.account.email);
    },
    setAuth: (state, action) => {
      state.auth = { ...current(state).auth, ...action.payload };
    },
    removeAccount: (state, action) => {
      state.account = initialState.account;
    },
    removeAuth: (state, action) => {
      state.auth = initialState.auth;
    },
  },
});

export const { setAccount, setAuth, removeAccount, removeAuth } = accountSlice.actions;
export default accountSlice.reducer;

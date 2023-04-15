import { createSlice } from "@reduxjs/toolkit";
import { User, AccountStatus, Auth, AuthInitialState } from "../../common/types/interfaces/store";
import { fetchLogin, fetchToken } from "../apis/authRequest";
import { normalFail, normalSuccess } from "../../common/utils/alert";
import { RouteParam } from "../../common/types/types/common";

const initialState: AuthInitialState = {
  user: {
    uid: 0,
    uuid: "",
    userName: "user",
    email: "",
    image: "",
    createdDt: new Date(),
  } as User,
  auth: {
    accessToken: "",
    refreshToken: "",
  } as Auth,
  status: {
    isLoggedin: false,
  } as AccountStatus,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    login: (state, action) => {
      const user: User = {
        uid: action.payload.uid,
        uuid: action.payload.uuid,
        userName: action.payload.userName,
        email: action.payload.email,
        image: action.payload.image,
        createdDt: action.payload.createdDt,
      };

      const auth: Auth = {
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };

      const status: AccountStatus = {
        isLoggedin: true,
      };

      state.user = user;
      state.auth = auth;
      state.status = status;

      normalSuccess(`Welcome, ${state.user.userName}!`).then((res) => {
        window.location.href = `home`;
      });
    },
    logout: (state, action) => {
      state.user = initialState.user;
      state.auth = initialState.auth;
      state.status = initialState.status;

      normalSuccess("Seeya!").then((res) => {
        window.location.href = RouteParam.home;
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.status = { isLoggedin: true };
      state.user = action.payload.user;
      state.auth = action.payload.auth;

      normalSuccess(`Welcome, ${state.user.userName}!`).then((res) => {
        window.location.href = RouteParam.home;
      });
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      normalFail("Oops!", "Invalid user");
    });
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      state.auth.accessToken = action.payload.accessToken;
      state.auth.refreshToken = action.payload.refreshToken;
    });
    builder.addCase(fetchToken.rejected, (state, action) => {
      state.user = initialState.user;
      state.auth = initialState.auth;
      state.status = initialState.status;

      normalFail("Oops!", "Session expired. Please log in").then((res) => {
        window.location.href = "/signin";
      });
    });
  },
});

export const { login, logout } = accountSlice.actions;
export default accountSlice.reducer;

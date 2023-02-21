import { createSlice } from "@reduxjs/toolkit";
import { Account, AccountStatus, Auth } from "../../common/interfaces/store";
import { fetchLogin, fetchToken } from "../axios/authRequest";
import Swal from "sweetalert2";
import { normalFail, normalSuccess } from "../../common/utils/alert";

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
  status: {
    loading: false,
    error: false,
    isLoggedin: false,
  } as AccountStatus,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.account = initialState.account;
      state.auth = initialState.auth;
      state.status = initialState.status;
      Swal.fire({ icon: "success", title: "Seeya!", showCancelButton: false, confirmButtonText: "confirm" }).then((res) => {
        window.location.href = "/";
        return;
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchLogin.pending, (state, action) => {
      state.status = { loading: true, error: false, isLoggedin: false };
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      if (!action.payload.auth.refreshToken) {
        normalFail("Oops!", "Refresh token does not exist");
        return;
      }

      state.status = { loading: false, error: false, isLoggedin: true };
      state.account = action.payload.account;
      state.auth = action.payload.auth;
      normalSuccess(`Welcome, ${state.account.userName}!`).then((res) => {
        window.location.href = "/main/home";
      });
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.status = { loading: false, error: true, isLoggedin: false };
      normalFail("Oops!", "Invalid user");
    });
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      state.account.email = action.payload.email;
      state.auth.accessToken = action.payload.accessToken;
      state.auth.refreshToken = action.payload.refreshToken;
    });
    builder.addCase(fetchToken.rejected, (state, action) => {
      state.account = initialState.account;
      state.auth = initialState.auth;
      state.status = initialState.status;
      normalFail("Oops!", "Session expired. Please log in").then((res) => {
        window.location.href = "/";
      });
    });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;

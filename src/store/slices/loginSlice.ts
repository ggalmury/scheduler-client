import { createSlice } from "@reduxjs/toolkit";
import { Account, AccountStatus, Auth } from "../../common/interfaces/store";
import { fetchLogin, fetchToken } from "../axios/authRequest";
import Swal from "sweetalert2";

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
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchLogin.pending, (state, action) => {
      state.status = { loading: true, error: false, isLoggedin: false };
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      if (!action.payload.auth.refreshToken) {
        Swal.fire({ icon: "error", title: "Oops!", text: "Refresh token does not exist", showCancelButton: false, confirmButtonText: "confirm" });
        return;
      }

      state.status = { loading: false, error: false, isLoggedin: true };
      state.account = action.payload.account;
      state.auth = action.payload.auth;
      Swal.fire({ icon: "success", title: `Welcome, ${state.account.userName}!`, showCancelButton: false, confirmButtonText: "confirm" }).then((res) => {
        window.location.href = "/main/home";
      });
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.status = { loading: false, error: true, isLoggedin: false };
      Swal.fire({ icon: "error", title: "Oops!", text: "Invalid user", showCancelButton: false, confirmButtonText: "confirm" });
    });
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      state.account.email = action.payload.email;
      state.auth.accessToken = action.payload.accessToken;
      state.auth.refreshToken = action.payload.refreshToken;
      console.log("Token saved");
    });
    builder.addCase(fetchToken.rejected, (state, action) => {
      state.account = initialState.account;
      state.auth = initialState.auth;
      state.status = initialState.status;
      console.log(state);
      Swal.fire({ icon: "error", title: "Oops!", text: "Session expired. Please log in", showCancelButton: false, confirmButtonText: "confirm" }).then((res) => {
        window.location.href = "/";
        return;
      });
    });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;

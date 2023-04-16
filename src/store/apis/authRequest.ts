import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { store } from "../..";
import { LoginRequest, DefaultUser, TokenResponse } from "../../common/types/interfaces/auth";
import { User, Auth } from "../../common/types/interfaces/store";
import { getServerEnv } from "../../config/envConfig";
import { RootState } from "../rootReducer";

interface fetchLoginParam {
  user: User;
  auth: Auth;
}

export const fetchLogin = createAsyncThunk("auth/signin", async ({ email, credential }: LoginRequest): Promise<fetchLoginParam> => {
  const response: AxiosResponse = await axios.post(`${getServerEnv()}/auth/signin`, { email, credential });
  const data: DefaultUser = response.data;

  const user: User = {
    uid: data.uid,
    uuid: data.uuid,
    userName: data.userName,
    email: data.email,
    image: data.image,
    createdDt: data.createdDt,
  };

  const auth: Auth = {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  };

  return { user, auth };
});

export const fetchToken = createAsyncThunk("auth/token", async (_, thunkApi): Promise<TokenResponse> => {
  const state = store.getState() as RootState;

  const { uuid, email } = state.account.user;
  const { accessToken, refreshToken } = state.account.auth;

  const response: AxiosResponse = await axios.post(`${getServerEnv()}/auth/token`, { uuid, email, accessToken, refreshToken });
  const data: TokenResponse = response.data;

  return data;
});

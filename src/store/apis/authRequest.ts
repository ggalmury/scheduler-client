import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { store } from "../..";
import { LoginRequest, DefaultUser, TokenResponse } from "../../common/types/interfaces/auth";
import { User, Auth } from "../../common/types/interfaces/store";
import { setServerEnv } from "../../config/envConfig";
import { RootState } from "../rootReducer";

export const fetchLogin = createAsyncThunk("auth/signin", async ({ email, credential }: LoginRequest): Promise<{ user: User; auth: Auth }> => {
  const response: AxiosResponse = await axios.post(`${setServerEnv()}/auth/signin`, { email, credential });
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

export const fetchToken = createAsyncThunk("auth/token", async (_, thunkApi) => {
  const state = store.getState() as RootState;

  const { uuid, email } = state.account.user;
  const { accessToken, refreshToken } = state.account.auth;

  const response: AxiosResponse = await axios.post(`${setServerEnv()}/auth/token`, { uuid, email, accessToken, refreshToken });
  const data: TokenResponse = response.data;

  return data;
});

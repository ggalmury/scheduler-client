import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { LoginRequest, RegisterRequest } from "../../common/interfaces/requestData";
import { LoginResponse, RegisterResponse } from "../../common/interfaces/responseData";
import { Account, Auth } from "../../common/interfaces/store";
import { setServerEnv } from "../../config/envConfig";

export const fetchLogin = createAsyncThunk("auth/signin", async ({ email, credential }: LoginRequest): Promise<{ account: Account; auth: Auth }> => {
  const response: AxiosResponse = await axios.post(`${setServerEnv()}/auth/signin`, { email, credential });
  const data: LoginResponse = response.data;

  const account: Account = {
    uid: data.uid,
    userName: data.userName,
    email: data.email,
    createdDt: data.createdDt,
  };

  const auth: Auth = {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  };

  return { account, auth };
});

export const fetchRegister = createAsyncThunk("auth/signup", async ({ userName, email, credential }: RegisterRequest): Promise<RegisterResponse> => {
  const response: AxiosResponse = await axios.post(`${setServerEnv()}/auth/signup`, { userName, email, credential });
  const data: RegisterResponse = response.data;

  return data;
});

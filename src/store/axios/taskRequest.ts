import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { setServerEnv } from "../../config/envConfig";
import { RootState } from "../rootReducer";

export const axiosTaskInstance = (accessToken: string): AxiosInstance => {
  return axios.create({
    baseURL: `${setServerEnv}/task`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const fetchTaskCreate = createAsyncThunk("task/create", async (_, { getState }): Promise<any> => {
  // TODO: implement interface contains informations about created task(title, description, etc..)

  const state = getState() as RootState;
  const accessToken: string = state.login.auth.accessToken;

  const response: AxiosResponse = await axiosTaskInstance(accessToken).post(`${setServerEnv()}/task/create`);
  const data = response.data;

  return data;
});

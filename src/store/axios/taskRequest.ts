import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { customAxiosRequest } from "../../config/axiosInterceptor";
import { setServerEnv } from "../../config/envConfig";

export const fetchTaskCreate = createAsyncThunk("task/create", async (_, thunkApi): Promise<any> => {
  // TODO: implement interface contains informations about created task(title, description, etc..)

  const response: AxiosResponse = await customAxiosRequest.post(`${setServerEnv()}/task/create`);
  const data = response.data;

  return data;
});

import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { TaskRequest } from "../../common/interfaces/requestData";
import { customAxiosRequest } from "../../config/axiosInterceptor";
import { setServerEnv } from "../../config/envConfig";

export const fetchTaskCreate = createAsyncThunk("task/create", async (taskRequest: TaskRequest, thunkApi): Promise<any> => {
  // TODO: implement interface contains informations about created task(title, description, etc..)
  const response: AxiosResponse = await customAxiosRequest.post(`${setServerEnv()}/task/create`, taskRequest);
  const data = response.data;

  return data;
});

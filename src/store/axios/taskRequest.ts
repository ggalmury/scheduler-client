import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { TaskCreateRequest, TaskDeleteRequest, TaskSearchRequest } from "../../common/interfaces/requestData";
import { TaskResponse } from "../../common/interfaces/responseData";
import { customAxiosRequest } from "../../config/axiosInterceptor";
import { setServerEnv } from "../../config/envConfig";

export const fetchTaskCreate = createAsyncThunk("task/create", async (taskCreateRequest: TaskCreateRequest, thunkApi): Promise<any> => {
  const response: AxiosResponse = await customAxiosRequest.post(`${setServerEnv()}/task/create`, taskCreateRequest);
  const data: TaskResponse = response.data;

  return data;
});

export const fetchTaskList = createAsyncThunk("task/list", async (taskSearchRequest: TaskSearchRequest) => {
  const response: AxiosResponse = await customAxiosRequest.post(`${setServerEnv()}/task/list`, taskSearchRequest);
  const data: TaskResponse[] = response.data;

  return data;
});

export const fetchTaskDelete = createAsyncThunk("task/delete", async (taskDeleteRequest: TaskDeleteRequest) => {
  const response: AxiosResponse = await customAxiosRequest.post(`${setServerEnv()}/task/delete`, taskDeleteRequest);
  const data: TaskResponse = response.data;

  return data;
});

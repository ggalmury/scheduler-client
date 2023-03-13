import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { TaskCreateRequest, TaskDeleteOrDoneRequest, TaskListRequest, TodoCreateRequest, TodoDeleteRequest } from "../../common/types/interfaces/requestData";
import { TaskResponse, TodoResponse } from "../../common/types/interfaces/responseData";
import { customAxiosRequest } from "../../config/axiosInterceptor";
import { setServerEnv } from "../../config/envConfig";

export const fetchTaskCreate = createAsyncThunk("task/create", async (taskCreateRequest: TaskCreateRequest, thunkApi): Promise<any> => {
  const response: AxiosResponse = await customAxiosRequest.post(`${setServerEnv()}/task/create`, taskCreateRequest);
  const data: TaskResponse = response.data;

  return data;
});

export const fetchTaskList = createAsyncThunk("task/list", async (taskListRequest: TaskListRequest) => {
  const response: AxiosResponse = await customAxiosRequest.post(`${setServerEnv()}/task/list`, taskListRequest);
  const data: TaskResponse[] = response.data;

  return data;
});

export const fetchTaskDelete = createAsyncThunk("task/delete", async (taskDeleteOrDoneRequest: TaskDeleteOrDoneRequest) => {
  const response: AxiosResponse = await customAxiosRequest.post(`${setServerEnv()}/task/delete`, taskDeleteOrDoneRequest);
  const data: TaskResponse = response.data;

  return data;
});

export const fetchTaskDone = createAsyncThunk("task/done", async (taskDeleteOrDoneRequest: TaskDeleteOrDoneRequest) => {
  const response: AxiosResponse = await customAxiosRequest.post(`${setServerEnv()}/task/done`, taskDeleteOrDoneRequest);
  const data: TaskResponse = response.data;

  return data;
});

export const fetchTodoCreate = createAsyncThunk("todo/create", async (todoCreateRequest: TodoCreateRequest) => {
  const response: AxiosResponse = await customAxiosRequest.post(`${setServerEnv()}/todo/create`, todoCreateRequest);
  const data: TodoResponse = response.data;

  return data;
});

export const fetchTodoDelete = createAsyncThunk("todo/delete", async (todoDeleteRequest: TodoDeleteRequest) => {
  const response: AxiosResponse = await customAxiosRequest.post(`${setServerEnv()}/todo/delete`, todoDeleteRequest);
  const data: TodoResponse = response.data;

  return data;
});

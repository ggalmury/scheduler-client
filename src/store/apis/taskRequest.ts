import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { DailyTaskCreateRequest, DailyTaskDeleteOrDoneRequest, DailyTaskListRequest, DefaultDailyTask } from "../../common/types/interfaces/task";
import { TodoCreateRequest, TodoDeleteRequest, TodoResponse } from "../../common/types/interfaces/todo";
import { customAxiosRequest } from "../../config/axiosInterceptor";
import { setServerEnv } from "../../config/envConfig";

export const fetchTaskCreate = createAsyncThunk("task/create", async (taskCreateRequest: DailyTaskCreateRequest): Promise<any> => {
  const response: AxiosResponse = await customAxiosRequest.post(`${setServerEnv()}/task/create`, taskCreateRequest);
  const data: DefaultDailyTask = response.data;

  return data;
});

export const fetchTaskList = createAsyncThunk("task/list", async (taskListRequest: DailyTaskListRequest) => {
  const response: AxiosResponse = await customAxiosRequest.post(`${setServerEnv()}/task/list`, taskListRequest);
  const data: DefaultDailyTask[] = response.data;

  return data;
});

export const fetchTaskDelete = createAsyncThunk("task/delete", async (taskDeleteOrDoneRequest: DailyTaskDeleteOrDoneRequest) => {
  const response: AxiosResponse = await customAxiosRequest.post(`${setServerEnv()}/task/delete`, taskDeleteOrDoneRequest);
  const data: DefaultDailyTask = response.data;

  return data;
});

export const fetchTaskDone = createAsyncThunk("task/done", async (taskDeleteOrDoneRequest: DailyTaskDeleteOrDoneRequest) => {
  const response: AxiosResponse = await customAxiosRequest.post(`${setServerEnv()}/task/done`, taskDeleteOrDoneRequest);
  const data: DefaultDailyTask = response.data;

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

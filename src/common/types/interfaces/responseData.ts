import { Types } from "../types/common";
import { TaskPrivacy, TaskType } from "../types/task";
import { TaskTime } from "./common";

export interface LoginResponse {
  uid: number;
  userName: string;
  email: string;
  createdDt: Date;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResponse {
  uid: number;
  userName: string;
  email: string;
  createDt: Date;
}

export interface TokenResponse {
  email: string;
  accessToken: string;
  refreshToken: string;
}

export interface TaskResponse {
  taskId: number;
  uid: number;
  userName: string;
  email: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: TaskTime;
  color: string;
  privacy: Types<typeof TaskPrivacy>;
  type: Types<typeof TaskType>;
  createdDt: Date;
  state: boolean;
  createdTodo: TodoData[];
}

export interface TodoResponse {
  todoId: number;
  uid: number;
  description: string;
  date: string;
  createdTask: { taskId: number };
}

export interface TodoData {
  taskId: number;
  todoId: number;
  uid: number;
  description: string;
}

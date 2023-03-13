import { DateMatrix, TaskPrivacy, TaskType, Types } from "../types";
import { TaskTime } from "./global";

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
  date: Date;
  time: TaskTime;
  color: string;
  privacy: Types<typeof TaskPrivacy>;
  type: Types<typeof TaskType>;
  createdDt: Date;
  state: boolean;
  dateMatrix: DateMatrix;
  createdTodo: TodoData[];
}

export interface TodoResponse {
  todoId: number;
  uid: number;
  description: string;
  date: Date;
  createdTask: { taskId: number };
}

export interface TodoData {
  taskId: number;
  todoId: number;
  uid: number;
  description: string;
}

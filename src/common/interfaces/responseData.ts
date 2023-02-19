import { TaskColor, TaskPrivacy, TaskType } from "../enums/task";
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
  color: TaskColor;
  location: string;
  date: Date;
  time: TaskTime;
  privacy: TaskPrivacy;
  type: TaskType;
  createdDt: Date;
}

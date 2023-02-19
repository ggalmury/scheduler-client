import { TaskColor, TaskPrivacy, TaskType } from "../enums/task";
import { TaskTime } from "./global";

export interface LoginRequest {
  email: string;
  credential: string;
}

export interface RegisterRequest {
  userName: string;
  email: string;
  credential: string;
}

export interface TaskCreateRequest {
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
}

export interface TaskSearchRequest {
  uid: number;
  email: string;
}

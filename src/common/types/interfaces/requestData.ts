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
  title: string;
  description: string;
  color: TaskColor;
  location: string;
  date: Date;
  time: TaskTime;
  privacy: TaskPrivacy;
  type: TaskType;
}

export interface TaskListRequest {
  startOfWeek: Date;
  endOfWeek: Date;
}

export interface TaskDeleteOrDoneRequest {
  taskId: number;
}

export interface TodoCreateRequest {
  taskId: number;
  description: string;
  date: Date;
}

export interface TodoDeleteRequest {
  todoId: number;
}

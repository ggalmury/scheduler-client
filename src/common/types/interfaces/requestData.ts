import { DateMatrix, TaskPrivacy, TaskType, Types } from "../types";
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
  location: string;
  date: Date;
  time: TaskTime;
  privacy: Types<typeof TaskPrivacy>;
  type: Types<typeof TaskType>;
  dateMatrix: DateMatrix;
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

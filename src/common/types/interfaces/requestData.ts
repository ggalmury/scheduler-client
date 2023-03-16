import { Types } from "../types/common";
import { TaskPrivacy, TaskType } from "../types/task";
import { TaskTime } from "./common";

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
  date: string;
  time: TaskTime;
  privacy: Types<typeof TaskPrivacy>;
  type: Types<typeof TaskType>;
}

export interface TaskListRequest {
  startOfWeek: Date;
  endOfWeek: Date;
  selectedDate: moment.Moment;
}

export interface TaskDeleteOrDoneRequest {
  taskId: number;
}

export interface TodoCreateRequest {
  taskId: number;
  description: string;
  date: string;
}

export interface TodoDeleteRequest {
  todoId: number;
}

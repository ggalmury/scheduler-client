import { TaskGroupType, TaskPrivacy, TaskPrivacyType } from "../types/task";
import { DefaultTodo } from "./todo";

export interface TaskTimeDetail {
  hour: number;
  minute: number;
}

export interface TaskTime {
  startAt: TaskTimeDetail;
  endAt: TaskTimeDetail;
}

export interface DailyTaskCreateRequest {
  title: string;
  description: string;
  location: string;
  date: string;
  time: TaskTime;
  privacy: TaskPrivacyType;
  type: TaskGroupType;
}

export interface DailyTaskListRequest {
  startOfWeek: Date;
  endOfWeek: Date;
}

export interface DailyTaskDeleteOrDoneRequest {
  taskId: number;
}

export interface DefaultDailyTask extends DailyTaskCreateRequest {
  taskId: number;
  uid: number;
  userName: string;
  email: string;
  color: string;
  createdDt: Date;
  state: boolean;
  createdTodo: DefaultTodo[];
}

export interface DailyTodayTask {
  basic: DefaultDailyTask[];
  work: DefaultDailyTask[];
  meeting: DefaultDailyTask[];
  personal: DefaultDailyTask[];
}

import { TaskResponse } from "./responseData";

export interface TaskTimeDetail {
  hour: number;
  minute: number;
}

export interface TaskTime {
  startAt: TaskTimeDetail;
  endAt: TaskTimeDetail;
}

export interface TodayTask {
  basic: TaskResponse[];
  work: TaskResponse[];
  meeting: TaskResponse[];
  personal: TaskResponse[];
}

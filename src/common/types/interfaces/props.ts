import { CalendarType } from "../../utils/enums";
import { TodayTask } from "./global";
import { TaskResponse } from "./responseData";

export interface CalendarProp {
  size: CalendarType;
}

export interface TaskChartProp {
  idx: number;
}

export interface TodayTasksProp {
  todayTasks: TodayTask;
}

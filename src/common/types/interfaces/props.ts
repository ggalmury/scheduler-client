import { CalendarType } from "../../utils/enums";
import { TaskTimeDetail, TodayTask } from "./global";

export interface CalendarProp {
  size: CalendarType;
}

export interface TaskChartProp {
  idx: number;
}

export interface TodayTasksProp {
  todayTasks: TodayTask;
}

export interface TimePickerProp {
  setTime: React.Dispatch<React.SetStateAction<TaskTimeDetail>>;
}

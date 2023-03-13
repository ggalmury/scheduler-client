import { CalendarType } from "../../utils/enums";
import { TaskTimeDetail, TodayTask } from "./global";
import { TaskResponse } from "./responseData";

export interface CalendarProp {
  size: CalendarType;
}

export interface WeelkyTaskProp {
  weeklyTask: Map<number, TaskResponse[]>;
}

export interface TimePickerProp {
  setTime: React.Dispatch<React.SetStateAction<TaskTimeDetail>>;
}

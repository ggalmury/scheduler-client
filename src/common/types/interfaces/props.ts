import { CalendarType, Types } from "../types/common";
import { TaskTimeDetail, TodayTask } from "./common";

export interface CalendarProp {
  size: Types<typeof CalendarType>;
}

export interface TimePickerProp {
  setTime: React.Dispatch<React.SetStateAction<TaskTimeDetail>>;
}

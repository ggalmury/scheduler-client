import { CalendarType } from "../../utils/enums";
import { TaskTimeDetail, TodayTask } from "./common";
import { TaskResponse } from "./responseData";

export interface CalendarProp {
  size: CalendarType;
}

export interface TimePickerProp {
  setTime: React.Dispatch<React.SetStateAction<TaskTimeDetail>>;
}

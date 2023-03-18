import Types, { CalendarType } from "../types/common";
import { TaskCreatorType } from "../types/task";
import { TaskTimeDetail } from "./task";

export interface CalendarProp {
  size: Types<typeof CalendarType>;
}

export interface TimePickerProp {
  setTime: React.Dispatch<React.SetStateAction<TaskTimeDetail>>;
}

export interface TaskCreatorTypeProp {
  creatorType: Types<typeof TaskCreatorType>;
}

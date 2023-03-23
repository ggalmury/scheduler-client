import Types from "../types/common";
import { TaskCreatorType } from "../types/task";
import { TaskTimeDetail } from "./task";

export interface TimePickerProp {
  setTime: React.Dispatch<React.SetStateAction<TaskTimeDetail>>;
}

export interface DailyTaskDetailProp {
  idx: number;
}

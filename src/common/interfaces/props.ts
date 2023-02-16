import moment from "moment";
import { CalendarType } from "../utils/enums";

export interface CalendarProp {
  size: CalendarType;
}

export interface TaskChartProp {
  idx: number;
  pos: number;
}

export interface CreateTaskToggleProp {
  createTaskModal: boolean;
  setCreateTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
}

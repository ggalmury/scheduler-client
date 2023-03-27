import { Dispatch } from "react";
import Types from "../types/common";
import { TaskCreatorType } from "../types/task";
import { DefaultDailyTask, TaskTimeDetail } from "./task";

export interface TimePickerProp {
  setTime: React.Dispatch<React.SetStateAction<TaskTimeDetail>>;
  setTimePickerOn: Dispatch<React.SetStateAction<boolean>>;
}

export interface DailyTaskListProp {
  idx: number;
  selectedDayTasks: DefaultDailyTask[] | undefined;
  taskDetailOn: boolean;
  setTaskDetailOn: Dispatch<React.SetStateAction<boolean>>;
}

export interface TaskDetailProp {
  selectedTask: DefaultDailyTask | null;
  setTaskDetail: Dispatch<React.SetStateAction<boolean>>;
}

export interface TaskCreateProp {
  setTaskCreate: Dispatch<React.SetStateAction<boolean>>;
}

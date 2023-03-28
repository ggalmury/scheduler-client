import React, { Dispatch } from "react";
import { DefaultDailyTask, TaskTimeDetail } from "./task";

export interface TimePickerProp {
  setTime: React.Dispatch<React.SetStateAction<TaskTimeDetail>>;
  setTimePickerOn: Dispatch<React.SetStateAction<boolean>>;
}

export interface DailyTaskListProp {
  idx: number;
  selectedDayDailyTasks: DefaultDailyTask[] | undefined;
  dailyTaskListOn: boolean;
  setDailyTaskListOn: Dispatch<React.SetStateAction<boolean>>;
}

export interface TaskDetailProp {
  selectedTask: DefaultDailyTask | null;
  setTaskDetail: Dispatch<React.SetStateAction<boolean>>;
}

export interface TaskCreateProp {
  setTaskCreate: Dispatch<React.SetStateAction<boolean>>;
}

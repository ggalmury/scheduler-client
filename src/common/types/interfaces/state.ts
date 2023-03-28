import moment from "moment/moment";
import { TaskTimeDetail } from "./task";
import { TaskPrivacy, TaskType } from "../types/task";
import Types, { RouteName } from "../types/common";

export interface DailyTaskState {
  routeName: Types<typeof RouteName>;
  isDailyDataFetched: boolean;
  selectedDate: moment.Moment;
  dailyTaskListOn: boolean;
}

export interface DailyTaskListState {
  taskCreate: boolean;
  taskDetail: boolean;
  selectedTask: number | null;
}

export interface TaskCreateState {
  title: string;
  description: string;
  location: string;
  startTime: TaskTimeDetail;
  endTime: TaskTimeDetail;
  privacy: Types<typeof TaskPrivacy>;
  type: Types<typeof TaskType>;
  startTimePickerOn: boolean;
  endTimePickerOn: boolean;
  typeSelectBtn: string | null;
}

export interface TaskDetailState {
  createTodo: boolean;
  todoDescription: string;
}

import { StoredTask } from "../types/common";

export interface Account {
  uid: number;
  uuid: string;
  userName: string;
  email: string;
  createdDt: Date;
}

export interface Auth {
  accessToken: string;
  refreshToken: string;
}

export interface AccountStatus {
  loading: boolean;
  error: boolean;
  isLoggedin: boolean;
}

export interface TaskInitialState {
  dailyTasks: StoredTask;
}

export interface SelectedDate {
  moment: moment.Moment;
  year: string;
  month: string;
  date: string;
}

export interface TimeInitialState {
  selectedDate: SelectedDate;
}

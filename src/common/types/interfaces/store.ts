import { StoredTask } from "../types/common";

export interface User {
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

export interface AuthInitialState {
  user: User;
  auth: Auth;
  status: AccountStatus;
}

export interface TimeInitialState {
  selectedDate: SelectedDate;
}

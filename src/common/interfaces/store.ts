import { TaskPrivacy } from "../enums/task";

export interface Account {
  uid: number;
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

export interface TaskDetail {
  uid: number;
  userName: string;
  email: string;
  title: string;
  description: string;
  color: string;
  location: string;
  date: Date;
  time: { startAt: { hour: number; minute: number }; endAt: { hour: number; minute: number } };
  privacy: TaskPrivacy;
}

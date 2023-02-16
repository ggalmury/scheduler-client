import { TaskTime } from "./global";

export interface LoginRequest {
  email: string;
  credential: string;
}

export interface RegisterRequest {
  userName: string;
  email: string;
  credential: string;
}

export interface TaskCreateRequest {
  uid: number;
  userName: string;
  email: string;
  title: string;
  description: string;
  color: string;
  location: string;
  date: Date;
  time: TaskTime;
  privacy: string;
}

export interface TaskSearchRequest {
  uid: number;
  email: string;
}

import { TaskResponse } from "./responseData";

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

export interface TaskInitialState {
  tasks: Map<number, TaskResponse[]>;
}

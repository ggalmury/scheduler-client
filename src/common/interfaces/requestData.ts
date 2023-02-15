export interface LoginRequest {
  email: string;
  credential: string;
}

export interface RegisterRequest {
  userName: string;
  email: string;
  credential: string;
}

export interface TaskRequest {
  uid: number;
  userName: string;
  email: string;
  title: string;
  description: string;
  color: string;
  location: string;
  date: Date;
  time: { startAt: { hour: number; minute: number }; endAt: { hour: number; minute: number } };
  privacy: string;
}

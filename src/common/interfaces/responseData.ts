export interface LoginResponse {
  uid: number;
  userName: string;
  email: string;
  createdDt: Date;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResponse {
  uid: number;
  userName: string;
  email: string;
  createDt: Date;
}

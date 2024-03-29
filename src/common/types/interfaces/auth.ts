export interface LoginRequest {
  email: string;
  credential: string;
}

export interface RegisterRequest {
  userName: string;
  email: string;
  credential: string;
}

export interface DefaultUser {
  uid: number;
  uuid: string;
  userName: string;
  email: string;
  image: string;
  createdDt: Date;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResponse {
  uid: number;
  uuid: string;
  userName: string;
  email: string;
  createDt: Date;
  success: boolean;
}

export interface TokenResponse {
  email: string;
  accessToken: string;
  refreshToken: string;
}

import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { store } from "..";
import { RootState } from "../store/rootReducer";
import { setServerEnv } from "./envConfig";

export const customAxiosRequest = axios.create({ baseURL: `${setServerEnv()}` });

customAxiosRequest.interceptors.request.use((req: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const state = store.getState() as RootState;
  const accessToken: string = state.login.auth.accessToken;

  req.headers.Authorization = `Bearer ${accessToken}`;
  return req;
});

customAxiosRequest.interceptors.response.use(
  (res: AxiosResponse): AxiosResponse => {
    console.log(res);
    console.log("1234");

    return res;
  },
  (err: any) => {
    if (err instanceof AxiosError) {
      // TODO: implement token regenerate logic
      // access token expire(401) -> request both tokens -> if 401 then refresh token expired(user logout)
    }

    return Promise.reject(err);
  }
);

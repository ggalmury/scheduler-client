import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { store } from "..";
import { fetchToken } from "../store/axios/authRequest";
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
    console.log("success request first");

    return res;
  },
  async (err: any) => {
    if (err instanceof AxiosError) {
      console.log("fail request first");
      await store.dispatch(fetchToken() as any);

      return Promise.reject(err);
    }
  }
);

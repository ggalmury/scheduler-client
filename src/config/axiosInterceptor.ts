import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { store } from "..";
import { fetchToken } from "../store/axios/authRequest";
import { RootState } from "../store/rootReducer";
import { setServerEnv } from "./envConfig";
import { AxiosErrorMessage, CustomErrorMessage } from "../common/enums/errorCode";

export const customAxiosRequest = axios.create({ baseURL: `${setServerEnv()}` });

customAxiosRequest.interceptors.request.use((req: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const state = store.getState() as RootState;
  const accessToken: string = state.login.auth.accessToken;

  req.headers.Authorization = `Bearer ${accessToken}`;
  return req;
});

customAxiosRequest.interceptors.response.use(
  (res: AxiosResponse): AxiosResponse => {
    return res;
  },
  async (err: any) => {
    if (err instanceof AxiosError) {
      if (err.message === AxiosErrorMessage.UNAUTHORIZED) {
        const url: string | undefined = err.config?.url;
        const data: string | undefined = JSON.parse(err.config?.data);

        if (url && data) {
          const test = await store.dispatch(fetchToken() as any);
          console.log(test);

          if (fetchToken.rejected.match(test)) {
            console.log("session expired");
            throw new Error(CustomErrorMessage.SESSION_EXPIRED);
          }

          console.log("재요청 전");
          const result: AxiosResponse = await customAxiosRequest.post(url, data);
          console.log("재요청 후");
          return Promise.resolve(result);
        }
      }
    }

    return Promise.reject(err);
  }
);

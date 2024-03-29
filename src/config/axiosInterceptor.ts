import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { store } from "..";
import { AxiosErrorMessage, CustomErrorMessage } from "../common/types/types/errorMsg";
import { fetchToken } from "../store/apis/authRequest";
import { RootState } from "../store/rootReducer";
import { getServerEnv } from "./envConfig";

export const customAxiosRequest: AxiosInstance = axios.create({ baseURL: `${getServerEnv()}` });

customAxiosRequest.interceptors.request.use((req: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const state: RootState = store.getState();
  const accessToken: string = state.account.auth.accessToken;

  req.headers.Authorization = `Bearer ${accessToken}`;
  return req;
});

customAxiosRequest.interceptors.response.use(
  (res: AxiosResponse): AxiosResponse => {
    return res;
  },
  async (err: any) => {
    if (err instanceof AxiosError) {
      if (err.message === AxiosErrorMessage.unauthorized) {
        const url: string | undefined = err.config?.url;
        const data: string | undefined = err.config?.data ? JSON.parse(err.config?.data) : undefined;

        if (url) {
          const test = await store.dispatch(fetchToken() as any);

          if (fetchToken.rejected.match(test)) {
            console.log("session expired");
            throw new Error(CustomErrorMessage.sessionExpired);
          }

          const result: AxiosResponse = await customAxiosRequest.post(url, data);
          return Promise.resolve(result);
        }
      }
    }

    return Promise.reject(err);
  },
);

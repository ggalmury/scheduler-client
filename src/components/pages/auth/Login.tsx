import React, { Dispatch, ReactElement, useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios, { AxiosResponse } from "axios";
import { AnyAction } from "@reduxjs/toolkit";
import { LoginRequest } from "../../../common/types/interfaces/auth";
import { fetchLogin } from "../../../store/apis/authRequest";
import { User } from "../../../common/types/interfaces/store";
import { login } from "../../../store/slices/accountSlice";
import { useInput } from "../../../hooks/useInput";
import { RouteParam } from "../../../common/types/types/common";
import { setClientEnv, setServerEnv } from "../../../config/envConfig";

const Login = (): ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch: Dispatch<AnyAction> = useDispatch();

  const [email, setEmail, resetEmail] = useInput<string>("");
  const [credential, setCredential, resetCredential] = useInput<string>("");

  useEffect(() => {
    window.addEventListener("message", messageHandler);
    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, []);

  const messageHandler = (event: MessageEvent) => {
    const origin: string = event.origin;
    const data: User = event.data;

    if (origin !== setClientEnv()) return;
    if (data.uuid) {
      dispatch(login(data));
    }
  };

  const attemptLogin = async (): Promise<void> => {
    const loginRequest: LoginRequest = { email, credential };

    dispatch(fetchLogin(loginRequest) as any);
  };

  const goTosignUp = (): void => {
    navigate(RouteParam.signup);
  };

  const googleoAuth2Login = async (): Promise<void> => {
    const url: AxiosResponse = await axios.get(`${setServerEnv()}/google/entry`);
    const width: number = 500;
    const height: number = 600;
    const left: number = (window.screen.width - width) / 2;
    const top: number = (window.screen.height - height) / 2;
    const features: string = `width=${width},height=${height},left=${left},top=${top}`;

    window.open(url.data, "Google", features);
  };

  return (
    <div className="auth">
      <div className="auth__box">
        <div className="auth__header">HELLO!</div>
        <div className="auth__content">
          <div className="auth__form">
            <input className="auth__input auth__input--email" type="email" placeholder="email" value={email} onChange={setEmail}></input>
            <input className="auth__input auth__input--credential" type="password" placeholder="password" value={credential} onChange={setCredential}></input>
          </div>
          <div className="auth__login-option">
            <div className="auth__save">
              <input className="user-save-check" type="checkbox"></input>
              <label className="auth__save-label" htmlFor="user-save-check">
                Remember Me!
              </label>
            </div>
            <div className="auth__findpw">Forgot password?</div>
          </div>
          <div className="auth__signin">
            <button className="btn-submit" onClick={attemptLogin}>
              LOG IN
            </button>
          </div>
        </div>
        <div className="auth__footer">
          <div>Don't have an account?</div>
          <div className="auth__route" onClick={goTosignUp}>
            Sign Up
          </div>
          <div className="nav__logout" onClick={googleoAuth2Login}>
            <div className="nav__content">oAuth2 url test</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

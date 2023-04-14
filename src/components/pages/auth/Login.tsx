import React, { Dispatch, ReactElement, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios, { AxiosResponse } from "axios";
import { AnyAction } from "@reduxjs/toolkit";
import { LoginRequest, RegisterRequest } from "../../../common/types/interfaces/auth";
import { fetchLogin, fetchRegister } from "../../../store/apis/authRequest";
import { User } from "../../../common/types/interfaces/store";
import { login } from "../../../store/slices/accountSlice";
import { useInput } from "../../../hooks/useInput";
import { RouteParam } from "../../../common/types/types/common";
import { setClientEnv, setServerEnv } from "../../../config/envConfig";
import InputAuth from "../../molecules/input/InputAuth";
import BtnSubmitAuth from "../../molecules/button/BtnSubmitAuth";
import AuthFormChanger from "../../../common/modals/AuthFormChanger";

const Login = (): ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch: Dispatch<AnyAction> = useDispatch();

  const [email, setEmail, resetEmail] = useInput<string>("");
  const [credential, setCredential, resetCredential] = useInput<string>("");
  const [userName, setUserName, resetUserName] = useInput<string>("");
  const [registerEmail, setRegisterEmail, resetRegisterEmail] = useInput<string>("");
  const [registerCredential, setRegisterCredential, resetRegisterCredential] = useInput<string>("");

  const [isLoginWindow, setIsLoginWindow] = useState<boolean>(false);

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

  const attemptRegister = async (): Promise<void> => {
    const registerRequest: RegisterRequest = { userName, email: registerEmail, credential: registerCredential };

    dispatch(fetchRegister(registerRequest) as any);
  };

  const changeWindow = (): void => {
    setIsLoginWindow(!isLoginWindow);
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
      <div className="auth__content">
        <div className="auth__box">
          <div className="auth__header">Schedy</div>
          <div className="auth__body">
            <div className="auth__form">
              <InputAuth type="email" placeholder="email" value={email} onChange={setEmail} />
              <InputAuth type="password" placeholder="password" value={credential} onChange={setCredential} />
            </div>
            <div className="auth__find-pw">
              <div className="auth__findpw">Forgot password?</div>
            </div>
            <div className="auth__submit">
              <BtnSubmitAuth text="Login" onClick={attemptLogin} />
            </div>
          </div>
          <div className="auth__footer">
            <div className="auth__option">
              <div>Don't have an account?</div>
              <div className="auth__route" onClick={changeWindow}>
                Sign Up
              </div>
            </div>
          </div>
        </div>
        <div className="auth__box">
          <div className="auth__header">BE OUR MEMBER!</div>
          <div className="auth__body">
            <div className="auth__form ">
              <InputAuth placeholder="name" value={userName} onChange={setUserName} />
              <InputAuth type="email" placeholder="email" value={registerEmail} onChange={setRegisterEmail} />
              <InputAuth type="password" placeholder="password" value={registerCredential} onChange={setRegisterCredential} />
            </div>
            <div className="auth__submit">
              <BtnSubmitAuth text="Join" onClick={attemptRegister} />
            </div>
          </div>
          <div className="auth__footer">
            <div className="auth__option">
              <div>Already have an account?</div>
              <div className="auth__route" onClick={changeWindow}>
                Sign In
              </div>
            </div>
          </div>
        </div>
        <AuthFormChanger isLoginWindow={isLoginWindow} onClick={googleoAuth2Login} />
      </div>
    </div>
  );
};

export default Login;

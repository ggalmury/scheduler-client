import React, { Dispatch, ReactElement, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { LoginRequest, RegisterRequest, RegisterResponse } from "../../../common/types/interfaces/auth";
import { fetchLogin } from "../../../store/apis/authRequest";
import { User } from "../../../common/types/interfaces/store";
import { login } from "../../../store/slices/accountSlice";
import { useInput } from "../../../hooks/useInput";
import { setClientEnv, setServerEnv } from "../../../config/envConfig";
import InputAuth from "../../molecules/input/InputAuth";
import BtnSubmitAuth from "../../molecules/button/BtnSubmitAuth";
import AuthFormChanger from "../../../common/modals/AuthFormChanger";
import { normalFail, normalSuccess } from "../../../common/utils/alert";
import { AxiosErrorMessage } from "../../../common/types/types/errorMsg";

const Login = (): ReactElement => {
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

  const messageHandler = (event: MessageEvent): void => {
    const origin: string = event.origin;
    const data: User = event.data;

    if (origin !== setClientEnv()) return;
    if (data.uuid) {
      dispatch(login(data));
    }
  };

  const resetInput = (): void => {
    resetEmail();
    resetCredential();
    resetUserName();
    resetRegisterEmail();
    resetRegisterCredential();
  };

  const attemptLogin = async (): Promise<void> => {
    const loginRequest: LoginRequest = { email, credential };

    dispatch(fetchLogin(loginRequest) as any);
  };

  const attemptRegister = async (): Promise<void> => {
    const url: string = `${setServerEnv()}/auth/signup`;
    const registerRequest: RegisterRequest = { userName, email: registerEmail, credential: registerCredential };

    try {
      const registeredUserRaw: AxiosResponse = await axios.post(url, registerRequest);
      const registeredUser: RegisterResponse = registeredUserRaw.data;

      registeredUser.success ? normalSuccess("Hooray!", "User successfully created") : normalFail("Oops!", "User not created");
    } catch (err: any) {
      if (err instanceof AxiosError) {
        err.message === AxiosErrorMessage.conflict && normalFail("Oops!", "Account already exist");
        return;
      }

      normalFail("Oops!", "Something went wrong");
    }
  };

  const changeWindow = (): void => {
    resetInput();
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
              <h4>Forgot password?</h4>
            </div>
            <div className="auth__submit">
              <BtnSubmitAuth text="Login" onClick={attemptLogin} />
            </div>
          </div>
          <div className="auth__footer">
            <div className="auth__option">
              <h4>Don't have an account?</h4>
              <div className="auth__route" onClick={changeWindow}>
                Sign Up
              </div>
            </div>
          </div>
        </div>
        <div className="auth__box">
          <div className="auth__header">Join Us!</div>
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
              <h4>Already have an account?</h4>
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

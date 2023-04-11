import React, { Dispatch, ReactElement, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { LoginRequest } from "../../../common/types/interfaces/auth";
import { fetchLogin } from "../../../store/apis/authRequest";
import axios, { AxiosResponse } from "axios";
import { AnyAction } from "@reduxjs/toolkit";
import { Account, AccountStatus } from "../../../common/types/interfaces/store";
import { login } from "../../../store/slices/loginSlice";

const Login = (): ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch: Dispatch<AnyAction> = useDispatch();

  const userAccount: Account = useSelector((state: RootState) => state.login.account);
  const userStatus: AccountStatus = useSelector((state: RootState) => state.login.status);

  const [email, setEmail] = useState<string>("");
  const [credential, setCredential] = useState<string>("");
  const [childWindow, setChildWindow] = useState<Window | null>(null);

  useEffect(() => {
    window.addEventListener("message", messageHandler);
    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, [childWindow]);

  const messageHandler = (event: MessageEvent) => {
    if (event.origin !== "http://localhost:3000") return;
    if (event.data) {
      dispatch(login(event.data));
      childWindow && childWindow.close();
      setChildWindow(null);
    }
  };

  const attemptLogin = async (): Promise<void> => {
    const loginRequest: LoginRequest = { email, credential };

    dispatch(fetchLogin(loginRequest) as any);
  };

  const inputEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const inputCredential = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCredential(event.target.value);
  };

  const resetPassword = (): void => {
    // TODO: implememt password reset page
    // alert("reset password!");
    console.log(userAccount);
  };

  const goTosignUp = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    navigate(`/signup`);
  };

  const googleOAuth2UrlTest = async (): Promise<void> => {
    const url: AxiosResponse = await axios.get("http://localhost:3500/google/entry");
    const child: Window | null = window.open(url.data, "Google", "width=400,height=600");
    setChildWindow(child);
  };

  return (
    <div className="auth">
      <div className="auth__box">
        <div className="auth__header">HELLO!</div>
        <div className="auth__content">
          <div className="auth__form">
            <input className="auth__input auth__input--email" type="email" placeholder="email" value={email} onChange={inputEmail}></input>
            <input className="auth__input auth__input--credential" type="password" placeholder="password" value={credential} onChange={inputCredential}></input>
          </div>
          <div className="auth__login-option">
            <div className="auth__save">
              <input className="user-save-check" type="checkbox"></input>
              <label className="auth__save-label" htmlFor="user-save-check">
                Remember Me!
              </label>
            </div>
            <div className="auth__findpw" onClick={resetPassword}>
              Forgot password?
            </div>
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
          <div className="nav__logout" onClick={googleOAuth2UrlTest}>
            <div className="nav__content">oAuth2 url test</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

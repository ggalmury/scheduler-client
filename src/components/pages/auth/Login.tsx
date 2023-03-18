import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { LoginRequest } from "../../../common/types/interfaces/auth";
import { fetchLogin } from "../../../store/apis/authRequest";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userAccount = useSelector((state: RootState) => state.login.account);

  const [email, setEmail] = useState<string>("");
  const [credential, setCredential] = useState<string>("");

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
        </div>
      </div>
    </div>
  );
};

export default Login;

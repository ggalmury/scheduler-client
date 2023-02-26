import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { LoginRequest } from "../../../common/interfaces/requestData";
import { fetchLogin } from "../../../store/axios/authRequest";
import { logout } from "../../../store/slices/loginSlice";

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

  const logouttest = (): void => {
    // TODO: move logout to nav
    dispatch(logout(null));
  };

  const goTosignUp = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    navigate(`/signup`);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <div className="auth-header">HELLO!</div>
        <div className="auth-content">
          <div className="auth-form">
            <input className="login-email" type="email" placeholder="email" value={email} onChange={inputEmail}></input>
            <input className="login-credential" type="password" placeholder="password" value={credential} onChange={inputCredential}></input>
          </div>
          <div id="login-option">
            <div id="user-save">
              <input id="user-save-check" type="checkbox" onClick={logouttest}></input>
              <label id="user-save-label" htmlFor="user-save-check">
                Remember Me!
              </label>
            </div>
            <div id="find-pw" onClick={resetPassword}>
              Forgot password?
            </div>
          </div>
          <div className="signin-box">
            <button className="btn-submit" onClick={attemptLogin}>
              LOG IN
            </button>
          </div>
        </div>
        <div className="auth-footer">
          <div>Don't have an account?</div>
          <div className="signup-or-signin" onClick={goTosignUp}>
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

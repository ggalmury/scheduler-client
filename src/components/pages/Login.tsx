import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { setEnv } from "../../common/util/envConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [credential, setCredential] = useState<string>("");

  const attemptLogin = async () => {
    try {
      const result: AxiosResponse = await axios.post(`${setEnv()}/auth/signin`, { email, credential });

      alert("hi");
    } catch (err) {
      alert("Invalid user");
      console.log(err);
    }
  };

  const inputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const inputCredential = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredential(event.target.value);
  };

  const resetPassword = (): any => {
    // TODO: implememt password reset page
    alert("reset password!");
  };

  const goTosignUp = (event: React.MouseEvent<HTMLElement>) => {
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
              <input id="user-save-check" type="checkbox"></input>
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

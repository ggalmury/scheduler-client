import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterRequest } from "../../../common/interfaces/requestData";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister } from "../../../store/axios/authRequest";
import { RootState } from "../../../store/rootReducer";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [credential, setCredential] = useState<string>("");

  const userStatus = useSelector((state: RootState) => state.login.status);

  useEffect(() => {});

  const attemptRegister = async () => {
    const registerRequest: RegisterRequest = { userName, email, credential };

    dispatch(fetchRegister(registerRequest) as any);
  };

  const inputUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const inputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const inputCredential = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredential(event.target.value);
  };

  const goTosignIn = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate(`/`);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <div className="auth-header">BE OUR MEMBER!</div>
        <div className="auth-content">
          <div className="auth-form signup-form">
            <input className="register-input" placeholder="user name" value={userName} onChange={inputUserName}></input>
            <input className="register-input" type="email" placeholder="email" value={email} onChange={inputEmail}></input>
            <input className="register-input" type="password" placeholder="password" value={credential} onChange={inputCredential}></input>
          </div>
          <div className="signin-box">
            <button className="btn-submit" onClick={attemptRegister}>
              JOIN
            </button>
          </div>
        </div>
        <div className="auth-footer">
          <div>Already have an account?</div>
          <div className="signup-or-signin" onClick={goTosignIn}>
            Sign In
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

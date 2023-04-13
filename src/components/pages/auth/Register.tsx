import React, { Dispatch, ReactElement } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { RegisterRequest } from "../../../common/types/interfaces/auth";
import { useDispatch } from "react-redux";
import { fetchRegister } from "../../../store/apis/authRequest";
import { AnyAction } from "@reduxjs/toolkit";
import { useInput } from "../../../hooks/useInput";
import { RouteParam } from "../../../common/types/types/common";

const Register = (): ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch: Dispatch<AnyAction> = useDispatch();

  const [userName, setUserName, resetUserName] = useInput<string>("");
  const [email, setEmail, resetEmail] = useInput<string>("");
  const [credential, setCredential, resetCredential] = useInput<string>("");

  const attemptRegister = async (): Promise<void> => {
    const registerRequest: RegisterRequest = { userName, email, credential };

    dispatch(fetchRegister(registerRequest) as any);
  };

  const goTosignIn = (): void => {
    navigate(RouteParam.index);
  };

  return (
    <div className="auth">
      <div className="auth__box">
        <div className="auth__header">BE OUR MEMBER!</div>
        <div className="auth__content">
          <div className="auth__form signup-form">
            <input className="auth__input auth__input--register" placeholder="user name" value={userName} onChange={setUserName}></input>
            <input className="auth__input auth__input--register" type="email" placeholder="email" value={email} onChange={setEmail}></input>
            <input className="auth__input auth__input--register" type="password" placeholder="password" value={credential} onChange={setCredential}></input>
          </div>
          <div className="auth__signin">
            <button className="btn-submit" onClick={attemptRegister}>
              JOIN
            </button>
          </div>
        </div>
        <div className="auth__footer">
          <div>Already have an account?</div>
          <div className="auth__route" onClick={goTosignIn}>
            Sign In
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

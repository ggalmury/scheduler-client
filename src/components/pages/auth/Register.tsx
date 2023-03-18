import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterRequest } from "../../../common/types/interfaces/auth";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister } from "../../../store/apis/authRequest";
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
    <div className="auth">
      <div className="auth__box">
        <div className="auth__header">BE OUR MEMBER!</div>
        <div className="auth__content">
          <div className="auth__form signup-form">
            <input className="auth__input auth__input--register" placeholder="user name" value={userName} onChange={inputUserName}></input>
            <input className="auth__input auth__input--register" type="email" placeholder="email" value={email} onChange={inputEmail}></input>
            <input className="auth__input auth__input--register" type="password" placeholder="password" value={credential} onChange={inputCredential}></input>
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

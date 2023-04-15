import React, { MouseEventHandler, ReactElement } from "react";
import BtnLoginOAuth2 from "../../components/molecules/button/BtnLoginOAuth2";

interface Props {
  isLoginWindow: boolean;
  onClick?: MouseEventHandler | undefined;
}

const AuthFormChanger = ({ isLoginWindow, onClick }: Props): ReactElement => {
  // TODO: separate into different files
  const googleDraw: ReactElement = (
    <path
      d="M21.4166 10.3333C21.5166 10.9417 21.575 11.5667 21.575 12.225C21.575 15.2667 20.4916 17.8333 18.6083 19.575C16.9583 21.1 14.7 22 12 22C8.09164 22 4.71664 19.75 3.07497 16.4833C2.39164 15.1333 1.99997 13.6167 1.99997 12C1.99997 10.3833 2.39164 8.86667 3.07497 7.51667C4.71664 4.25 8.09164 2 12 2C14.7 2 16.9583 2.99167 18.6833 4.60833L15.8333 7.45834C14.7916 6.46667 13.475 5.95833 12 5.95833C9.39164 5.95833 7.1833 7.71667 6.39164 10.0917C6.19164 10.6917 6.07497 11.3333 6.07497 12C6.07497 12.6667 6.1833 13.3083 6.39164 13.9083C7.1833 16.2833 9.39164 18.0417 12 18.0417C13.35 18.0417 14.4916 17.675 15.3916 17.075C16.4416 16.3667 17.15 15.325 17.3916 14.0917H12V10.3333H21.4166Z"
      stroke="#000000"
      strokeLinejoin="round"
    />
  );

  const facebookDraw: ReactElement = (
    <path
      d="M22 12C22 6.47714 17.5229 1.99999 12 1.99999C6.47715 1.99999 2 6.47714 2 12C2 16.9913 5.65686 21.1283 10.4375 21.8785V14.8906H7.89844V12H10.4375V9.79687C10.4375 7.29062 11.9304 5.90624 14.2146 5.90624C15.3087 5.90624 16.4531 6.10155 16.4531 6.10155V8.56249H15.1921C13.9499 8.56249 13.5625 9.33333 13.5625 10.1242V12H16.3359L15.8926 14.8906H13.5625V21.8785C18.3431 21.1283 22 16.9913 22 12Z"
      stroke="#000000"
      strokeLinejoin="round"
    />
  );

  return (
    <div className={`authchanger ${!isLoginWindow && "authchanger--right"}`}>
      <div>dummy</div>
      <div className="authchanger__oAuth2-box">
        <BtnLoginOAuth2 text="Google" fill="#ffffff" draw={googleDraw} onClick={onClick} />
        <BtnLoginOAuth2 text="Facebook" fill="#ffffff" draw={facebookDraw} />
      </div>
    </div>
  );
};

export default AuthFormChanger;

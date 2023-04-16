import React, { MouseEventHandler, ReactElement } from "react";
import BtnLoginOAuth2 from "../../components/molecules/button/BtnLoginOAuth2";
import { facebookDraw, googleDraw } from "../utils/svgSources";

interface Props {
  isLoginWindow: boolean;
  onClick?: MouseEventHandler | undefined;
}

const AuthFormChanger = ({ isLoginWindow, onClick }: Props): ReactElement => {
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

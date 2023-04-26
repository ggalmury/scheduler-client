import React, { CSSProperties, MouseEventHandler, ReactElement } from "react";
import Svg from "../../shared/Svg";

interface Props {
  text?: string | undefined;
  draw: ReactElement;
  fill?: string;
  onClick?: MouseEventHandler | undefined;
}

const BtnLoginOAuth2 = ({ text, draw, fill, onClick }: Props): ReactElement => {
  const textLower: string | undefined = text?.toLowerCase();
  const style: CSSProperties = {
    position: "absolute",
    left: 10,
  };

  return (
    <button className={`btn__login-oAuth2 btn__login-oAuth2--${textLower}`} onClick={onClick}>
      <Svg width={24} fill={fill} draw={draw} style={style} />
      <h3>{text}</h3>
    </button>
  );
};

export default BtnLoginOAuth2;

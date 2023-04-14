import React, { MouseEventHandler, ReactElement } from "react";

interface Props {
  text?: string | undefined;
  onClick?: MouseEventHandler | undefined;
}

const BtnSubmitAuth = ({ text, onClick }: Props): ReactElement => {
  return (
    <button className="btn__submit-auth" onClick={onClick}>
      <h3>{text}</h3>
    </button>
  );
};

export default BtnSubmitAuth;

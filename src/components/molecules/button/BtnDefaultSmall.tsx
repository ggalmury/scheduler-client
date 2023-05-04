import React, { ReactElement } from "react";

interface Props {
  name?: string;
  onClick?: () => void;
}

const BtnDefaultSmall = ({ name, onClick }: Props): ReactElement => {
  return (
    <button className="btn-submit-small" onClick={onClick}>
      {name}
    </button>
  );
};

export default BtnDefaultSmall;

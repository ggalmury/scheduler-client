import React, { ChangeEventHandler, HTMLInputTypeAttribute, ReactElement } from "react";

interface Props {
  type?: HTMLInputTypeAttribute | undefined;
  placeholder?: string | undefined;
  value?: string | ReadonlyArray<string> | number | undefined;
  onChange?: ChangeEventHandler | undefined;
}

const InputAuth = ({ type, placeholder, value, onChange }: Props): ReactElement => {
  return <input className="input__auth" type={type} placeholder={placeholder} value={value} onChange={onChange} />;
};

export default InputAuth;

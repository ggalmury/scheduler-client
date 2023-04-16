import React, { ChangeEventHandler, HTMLInputTypeAttribute, MouseEventHandler } from "react";
import Svg from "../../shared/Svg";
import { searchDraw } from "../../../common/utils/svgSources";

interface Props {
  type?: HTMLInputTypeAttribute | undefined;
  placeholder?: string | undefined;
  value?: string | ReadonlyArray<string> | number | undefined;
  onChange?: ChangeEventHandler | undefined;
  onClick?: MouseEventHandler | undefined;
}

const InputTaskSearch = ({ type, placeholder, value, onChange, onClick }: Props) => {
  return (
    <div className="input__task-search">
      <div onClick={onClick}>
        <Svg width={20} fill="none" draw={searchDraw} />
      </div>
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
};

export default InputTaskSearch;

import React, { ChangeEventHandler, ReactElement } from "react";
import Svg from "../../shared/Svg";

interface Props {
  placeholder?: string | undefined;
  value?: string | undefined;
  onChange?: ChangeEventHandler | undefined;
  draw: ReactElement;
}

const InputTaskForm = ({ placeholder, value, onChange, draw }: Props): ReactElement => {
  return (
    <div className="task-create__input">
      <div className="task-create__svg">
        <Svg width={20} draw={draw} />
      </div>
      <input className="task-create__textarea task-create__textarea--extra" value={value} placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export default InputTaskForm;

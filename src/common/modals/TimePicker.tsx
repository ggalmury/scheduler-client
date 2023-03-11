import { Fragment, useState } from "react";
import { TimePickerProp } from "../types/interfaces/props";

const TimePicker = ({ setTime }: TimePickerProp) => {
  const [isAm, setIsAm] = useState<boolean>(true);

  const setAm = (): void => {
    setIsAm(true);
  };

  const setPm = (): void => {
    setIsAm(false);
  };

  const getHour = (hour: number): void => {
    const newHour: number = isAm ? hour : hour + 12;

    setTime((prevStartTime) => {
      return { ...prevStartTime, hour: newHour };
    });
  };

  const getMinute = (minute: number): void => {
    setTime((prevStartTime) => {
      return { ...prevStartTime, minute };
    });
  };

  return (
    <Fragment>
      <div className="timepicker__selector">
        <div className="timepicker__options"></div>
        <div className="timepicker__options" onClick={setAm}>
          AM
        </div>
        <div className="timepicker__options" onClick={setPm}>
          PM
        </div>
        <div className="timepicker__options"></div>
      </div>
      <div className="timepicker__selector">
        <div className="timepicker__options"></div>
        {Array(12)
          .fill(0)
          .map((value, idx) => {
            return (
              <div key={idx} className="timepicker__options" onClick={() => getHour(idx)}>
                {idx}
              </div>
            );
          })}
        <div className="timepicker__options"></div>
      </div>
      <div className="timepicker__selector">
        <div className="timepicker__options"></div>
        {Array(4)
          .fill(0)
          .map((value, idx) => {
            const newIdx: number = idx * 15;
            return (
              <div key={idx} className="timepicker__options" onClick={() => getMinute(newIdx)}>
                {newIdx}
              </div>
            );
          })}
        <div className="timepicker__options"></div>
      </div>
    </Fragment>
  );
};

export default TimePicker;

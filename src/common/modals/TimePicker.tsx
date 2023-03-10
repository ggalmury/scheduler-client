import { Fragment, useEffect, useState } from "react";
import { Meridiem } from "../types/enums/task";
import { TimePickerProp } from "../types/interfaces/props";

const TimePicker = ({ setTime }: TimePickerProp) => {
  const [meridiem, setMeridiem] = useState<Meridiem>(Meridiem.AM);

  const getMeridiem = (meridiem: Meridiem) => {
    setMeridiem(meridiem);
  };

  const getHour = (hour: number) => {
    const newHour: number = meridiem === Meridiem.AM ? hour : hour + 12;

    setTime((prevStartTime) => {
      return { ...prevStartTime, hour: newHour };
    });
  };

  const getMinute = (minute: number) => {
    setTime((prevStartTime) => {
      return { ...prevStartTime, minute };
    });
  };

  return (
    <Fragment>
      <div className="timepicker__selector">
        <div className="timepicker__options" onClick={() => getMeridiem(Meridiem.AM)}>
          {Meridiem.AM}
        </div>
        <div className="timepicker__options" onClick={() => getMeridiem(Meridiem.PM)}>
          {Meridiem.PM}
        </div>
      </div>
      <div className="timepicker__selector">
        {Array(12)
          .fill(0)
          .map((value, idx) => {
            return (
              <div key={idx} className="timepicker__options" onClick={() => getHour(idx)}>
                {idx}
              </div>
            );
          })}
      </div>
      <div className="timepicker__selector">
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
      </div>
    </Fragment>
  );
};

export default TimePicker;

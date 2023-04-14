import { Dispatch, Fragment, useMemo } from "react";
import { TaskTimeDetail } from "../types/interfaces/task";

interface TimePickerProp {
  setTime: React.Dispatch<React.SetStateAction<TaskTimeDetail>>;
  setTimePickerOn: Dispatch<React.SetStateAction<boolean>>;
}

const TimePicker = ({ setTime, setTimePickerOn }: TimePickerProp): JSX.Element => {
  const hourArr = useMemo((): number[] => {
    let result: number[] = [];

    for (let i = 0; i < 24; i++) {
      result.push(i);
    }

    return result;
  }, []);

  const minuteArr = useMemo((): number[] => {
    let result: number[] = [];

    for (let i = 0; i < 4; i++) {
      result.push(i * 15);
    }

    return result;
  }, []);

  const getHour = (hour: number): void => {
    setTime((prevStartTime) => {
      return { ...prevStartTime, hour };
    });
  };

  const getMinute = (minute: number): void => {
    setTime((prevStartTime) => {
      return { ...prevStartTime, minute };
    });
  };

  const timePickerOff = (): void => {
    setTimePickerOn(false);
  };

  return (
    <Fragment>
      <div className="timepicker__selector">
        {hourArr.map((hour) => {
          return minuteArr.map((minute, idx) => {
            return (
              <div
                key={idx}
                className="timepicker__options"
                onClick={() => {
                  getHour(hour);
                  getMinute(minute);
                  timePickerOff();
                }}
              >
                {hour} : {minute} {hour < 12 ? "AM" : "PM"}
              </div>
            );
          });
        })}
      </div>
    </Fragment>
  );
};

export default TimePicker;

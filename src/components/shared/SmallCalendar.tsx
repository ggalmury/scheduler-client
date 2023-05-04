import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { setDate } from "../../store/slices/dateSlice";
import Svg from "./Svg";
import { nextDraw, prevDraw } from "../../common/utils/svgSources";

const SmallCalendar = () => {
  const dispatch = useDispatch();

  const date = useSelector((state: RootState) => state.date.selectedDate);

  const [getMoment, setMoment] = useState<moment.Moment>(moment());

  const today: moment.Moment = getMoment;
  const firstWeek: number = today.clone().startOf("month").week();
  const lastWeek: number = today.clone().endOf("month").week() === 1 ? 53 : today.clone().endOf("month").week();

  const prevMonth = () => {
    setMoment(getMoment.clone().subtract(1, "month"));
  };

  const nextMonth = () => {
    setMoment(getMoment.clone().add(1, "month"));
  };

  const returnToday = () => {
    setMoment(moment());
    dispatch(setDate(moment()));
  };

  const calendarArr = () => {
    let result: any[] = [];
    let week: number = firstWeek;

    for (week; week <= lastWeek; week++) {
      result.push(
        <tr key={week}>
          {Array(7)
            .fill(0)
            .map((value, idx) => {
              const days: moment.Moment = today.clone().week(week).startOf("week").add(idx, "day");

              if (moment().format("YYYYMMDD") === days.format("YYYYMMDD")) {
                return (
                  <td
                    className="small-cal__today"
                    key={idx}
                    onClick={() => {
                      dispatch(setDate(days));
                    }}
                  >
                    <span>{days.format("D")}</span>
                  </td>
                );
              } else if (days.format("MM") !== today.format("MM")) {
                return (
                  <td className="small-cal__except" key={idx}>
                    <span>{days.format("D")}</span>
                  </td>
                );
              } else {
                return (
                  <td
                    key={idx}
                    className={date.date === days.format("D") ? "small-cal__selected selected-day" : ""}
                    onClick={() => {
                      dispatch(setDate(days));
                    }}
                  >
                    <span>{days.format("D")}</span>
                  </td>
                );
              }
            })}
        </tr>,
      );
    }

    return result;
  };

  return (
    <div className="small-cal">
      <div className="small-cal__caption">
        <span onClick={returnToday}>{today.format("MMM, YYYY")}</span>
        <div className="small-cal__month-select">
          <div className="small-cal__svg" onClick={prevMonth}>
            <Svg width={24} draw={prevDraw} />
          </div>
          <div className="small-cal__svg" onClick={nextMonth}>
            <Svg width={24} draw={nextDraw} />
          </div>
        </div>
      </div>
      <table className="small-cal__table">
        <thead>
          <tr>
            <th>Su</th>
            <th>Mo</th>
            <th>Tu</th>
            <th>We</th>
            <th>Th</th>
            <th>Fr</th>
            <th>Sa</th>
          </tr>
        </thead>
        <tbody>{calendarArr()}</tbody>
      </table>
    </div>
  );
};

export default SmallCalendar;

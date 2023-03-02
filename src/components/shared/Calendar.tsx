import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CalendarProp } from "../../common/interfaces/props";
import { CalendarType } from "../../common/utils/enums";
import { RootState } from "../../store/rootReducer";
import { setDate } from "../../store/slices/dateSlice";

const Calendar = ({ size }: CalendarProp) => {
  const dispatch = useDispatch();

  const date = useSelector((state: RootState) => state.date.selectedDate);

  const [getMoment, setMoment] = useState<moment.Moment>(moment());
  const calendarClass: CalendarType = size;

  const today: moment.Moment = getMoment;
  const firstWeek: number = today.clone().startOf("month").week();
  const lastWeek: number = today.clone().endOf("month").week() === 1 ? 53 : today.clone().endOf("month").week();

  useEffect(() => {}, [getMoment]);

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
            .map((data, index) => {
              const days: moment.Moment = today.clone().week(week).startOf("week").add(index, "day");

              if (moment().format("YYYYMMDD") === days.format("YYYYMMDD")) {
                // TODO: change background color (today or not this month case)
                return (
                  <td
                    className={`${calendarClass}__today`}
                    key={index}
                    onClick={() => {
                      dispatch(setDate(days));
                    }}
                  >
                    <span>{days.format("D")}</span>
                  </td>
                );
              } else if (days.format("MM") !== today.format("MM")) {
                return (
                  <td className={`${calendarClass}__except`} key={index}>
                    <span>{days.format("D")}</span>
                  </td>
                );
              } else {
                return (
                  <td
                    key={index}
                    className={date.date === days.format("D") ? `${calendarClass}__selected` : ""}
                    onClick={() => {
                      dispatch(setDate(days));
                    }}
                  >
                    <span>{days.format("D")}</span>
                  </td>
                );
              }
            })}
        </tr>
      );
    }

    return result;
  };

  return (
    <div className={`${calendarClass}`}>
      <div className={`${calendarClass}__caption`}>
        <button className={`${calendarClass}__btn-changeMonth`} onClick={prevMonth}>
          &lt;
        </button>
        <span onClick={returnToday}>{today.format("MMM, YYYY")}</span>
        <button className={`${calendarClass}__btn-changeMonth`} onClick={nextMonth}>
          &gt;
        </button>
      </div>
      <table className={`${calendarClass}__table`}>
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

export default Calendar;

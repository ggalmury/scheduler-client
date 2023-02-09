import moment from "moment";
import { useState } from "react";
import { CalendarProp } from "../../common/interfaces/props";
import { CalendarType } from "../../common/utils/enums";

const Calendar = ({ size }: CalendarProp) => {
  const [getMoment, setMoment] = useState<moment.Moment>(moment());
  const calendarClass: CalendarType = size;

  const today: moment.Moment = getMoment;
  const firstWeek: number = today.clone().startOf("month").week();
  const lastWeek: number = today.clone().endOf("month").week() === 1 ? 53 : today.clone().endOf("month").week();

  const prevMonth = () => {
    setMoment(getMoment.clone().subtract(1, "month"));
  };

  const nextMonth = () => {
    setMoment(getMoment.clone().add(1, "month"));
  };

  const returnToday = () => setMoment(moment());

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
                  <td id={`${calendarClass}-today`} key={index}>
                    <span>{days.format("D")}</span>
                  </td>
                );
              } else if (days.format("MM") !== today.format("MM")) {
                return (
                  <td className={`${calendarClass}-except`} key={index}>
                    <span>{days.format("D")}</span>
                  </td>
                );
              } else {
                return (
                  <td key={index}>
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
    <div id={`${calendarClass}`}>
      <div id={`${calendarClass}-caption`}>
        <button className={`${calendarClass}-btn`} onClick={prevMonth}>
          &lt;
        </button>
        <span onClick={returnToday}>{today.format("MMM, YYYY")}</span>
        <button className={`${calendarClass}-btn`} onClick={nextMonth}>
          &gt;
        </button>
      </div>
      <table id={`${calendarClass}-tb`}>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>{calendarArr()}</tbody>
      </table>
    </div>
  );
};

export default Calendar;

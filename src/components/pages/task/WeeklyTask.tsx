import { useMemo } from "react";
import { useSelector } from "react-redux";
import { DateFormat } from "../../../common/types/types/common";
import { weekCountOfMonth } from "../../../common/utils/dateUtil";
import { RootState } from "../../../store/rootReducer";

const WeeklyTask = () => {
  const date = useSelector((state: RootState) => state.date.selectedDate);

  const weekCount: number[] = new Array(weekCountOfMonth(date.moment)).fill(0);

  const dateArr = useMemo((): string[] => {
    const firstDay: moment.Moment = date.moment.clone().startOf("week");

    const dateArr: string[] = [];

    for (let i = 0; i < 7; i++) {
      const newMoment: moment.Moment = firstDay.clone().add(i, "day");
      const newDay: string = newMoment.format(DateFormat.day4);

      dateArr.push(newDay);
    }

    return dateArr;
  }, [date.moment]);

  return (
    <div className="task-table">
      <div className="task-table__header">
        <div className="task-table__time"></div>
        {dateArr.map((dt, idx) => {
          return (
            <div key={idx} className="task-table__date">
              <div className="task-table__date--day">{dt}</div>
            </div>
          );
        })}
      </div>
      <div className="task-table__body">
        {weekCount.map((value, day) => {
          return (
            <div key={day}>
              <div className="task-table__row task-table__row--day">
                <div className="task-table__time">week {day + 1}</div>
                {Array(7)
                  .fill(0)
                  .map((value, date) => {
                    return <div key={date} className="task-table__elem"></div>;
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyTask;

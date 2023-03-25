import { AnyAction } from "@reduxjs/toolkit";
import moment from "moment";
import { useState, useEffect, Fragment, Dispatch, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import DailyTaskList from "../../../common/modals/DailyTaskList";
import { DailyTaskListRequest, DefaultDailyTask } from "../../../common/types/interfaces/task";
import { StoredTask } from "../../../common/types/types/common";
import { fullDateFormat } from "../../../common/utils/dateUtil";
import { fetchTaskList } from "../../../store/apis/taskRequest";
import { RootState } from "../../../store/rootReducer";
import { setDate } from "../../../store/slices/dateSlice";

const DailyTask = (): JSX.Element => {
  const dispatch: Dispatch<AnyAction> = useDispatch();

  const userTask: StoredTask = useSelector((state: RootState) => state.task.dailyTasks);
  const date = useSelector((state: RootState) => state.date.selectedDate);

  const initialState = {
    isDataFetched: false as boolean,
    taskDetailOn: false as boolean,
    selectedDate: moment() as moment.Moment,
  } as any;

  const [isDataFetched, setIsDataFetched] = useState<boolean>(initialState.isDataFetched);
  const [taskDetailOn, setTaskDetailOn] = useState<boolean>(initialState.taskDetailOn);
  const [selectedDate, setSelectedDate] = useState<moment.Moment>(initialState.selectedDate);

  const selectedDayTasks = useMemo((): DefaultDailyTask[] | undefined => {
    return userTask.get(fullDateFormat(date.moment));
  }, [date.moment, userTask]);

  useEffect(() => {
    console.log("trigger fetch data per month");
    setIsDataFetched(false);
  }, [date.month]);

  useEffect(() => {
    if (!isDataFetched) {
      console.log("fetch data");
      const startWeek: number = date.moment.clone().startOf("month").week();
      const endWeek: number = date.moment.clone().endOf("month").week();

      const startOfWeek: Date = date.moment.clone().week(startWeek).startOf("week").toDate();
      const endOfWeek: Date = date.moment.clone().week(endWeek).endOf("week").toDate();

      const param: DailyTaskListRequest = { startOfWeek, endOfWeek };

      dispatch(fetchTaskList(param) as any);
      setIsDataFetched(true);
    }
  }, [isDataFetched]);

  const taskDetailToggle = (day: moment.Moment): void => {
    if (taskDetailOn) {
      setTaskDetailOn(false);
      return;
    }

    dispatch(setDate(day));
    setTaskDetailOn(!taskDetailOn);
    setSelectedDate(day);
  };

  const stopEventBubbling = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
  };

  const taskCalendar = (): JSX.Element[] => {
    const today: moment.Moment = moment();
    const firstWeek: number = today.clone().startOf("month").week();
    const lastWeek: number = today.clone().endOf("month").week() === 1 ? 53 : today.clone().endOf("month").week();

    const isToday = (days: moment.Moment): boolean => {
      return moment().format("YYYYMMDD") === days.format("YYYYMMDD");
    };

    const isNotThisMonth = (days: moment.Moment): boolean => {
      return days.format("MM") !== today.format("MM");
    };

    let result: JSX.Element[] = [];
    let week: number = firstWeek;

    for (week; week <= lastWeek; week++) {
      result.push(
        <tr key={week}>
          {Array(7)
            .fill(0)
            .map((value, idx) => {
              const day: moment.Moment = today.clone().week(week).startOf("week").add(idx, "day");
              const formattedDay: string = day.format("D");
              const weekCount: number = week - firstWeek;

              return (
                <Fragment key={idx}>
                  <td
                    className={isToday(day) ? "" : isNotThisMonth(day) ? "" : ""}
                    onClick={() => {
                      taskDetailToggle(day);
                    }}
                  >
                    <span>{formattedDay}</span>
                    <div className="daily-task__summ invisible-scroll">
                      {userTask.get(fullDateFormat(day))?.map((task, idx) => {
                        return <hr key={idx} style={{ backgroundColor: task.color }} />;
                      })}
                    </div>
                    {fullDateFormat(selectedDate) === fullDateFormat(day) ? (
                      <div
                        className={`task-modal task-modal__daily  ${
                          taskDetailOn ? (idx < 3 ? "task-detail-appear-left" : "task-detail-appear-right") : taskDetailOn === null ? "" : idx < 3 ? "task-detail-disappear-left" : "task-detail-disappear-right"
                        }`}
                        style={{ top: `${weekCount * -120}px` }}
                        onClick={stopEventBubbling}
                      >
                        <DailyTaskList idx={idx} selectedDayTasks={selectedDayTasks} taskDetailOn={taskDetailOn} setTaskDetailOn={setTaskDetailOn} />
                      </div>
                    ) : null}
                  </td>
                </Fragment>
              );
            })}
        </tr>
      );
    }

    return result;
  };

  return (
    <Fragment>
      <table>
        <thead>
          <tr>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
          </tr>
        </thead>
        <tbody>{taskCalendar()}</tbody>
      </table>
    </Fragment>
  );
};

export default DailyTask;

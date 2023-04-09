import React, { Dispatch, Fragment, ReactElement, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Types, { DateFormat, RouteName, StoredTask } from "../../../common/types/types/common";
import { RootState } from "../../../store/rootReducer";
import { NextSvg, PrevSvg } from "../../../common/svg";
import { AnyAction } from "@reduxjs/toolkit";
import { setDate } from "../../../store/slices/dateSlice";
import moment from "moment";
import { DailyTaskState } from "../../../common/types/interfaces/state";
import { DailyTaskListRequest, DefaultDailyTask } from "../../../common/types/interfaces/task";
import { fullDateFormat } from "../../../common/utils/dateUtil";
import { fetchTaskList } from "../../../store/apis/taskRequest";
import DailyTaskList from "../../../common/modals/DailyTaskList";
import { NavigateFunction, Route, useNavigate, useParams } from "react-router-dom";
import { SelectedDate } from "../../../common/types/interfaces/store";

const TaskContent = (): ReactElement => {
  const navigate: NavigateFunction = useNavigate();

  const dispatch: Dispatch<AnyAction> = useDispatch();

  const { type } = useParams();

  const userTask: StoredTask = useSelector((state: RootState) => state.task.dailyTasks);
  const date: SelectedDate = useSelector((state: RootState) => state.date.selectedDate);

  const initialState: DailyTaskState = {
    routeName: RouteName.daily,
    isDailyDataFetched: false,
    selectedDate: moment(),
    dailyTaskListOn: false,
  };

  const [routeName, setRouteName] = useState<Types<typeof RouteName>>(initialState.routeName);
  const [isDailyDataFetched, setIsDailyDataFetched] = useState<boolean>(initialState.isDailyDataFetched);
  const [selectedDate, setSelectedDate] = useState<moment.Moment>(initialState.selectedDate);
  const [dailyTaskListOn, setDailyTaskListOn] = useState<boolean>(initialState.dailyTaskListOn);

  const selectedDayDailyTasks = useMemo((): DefaultDailyTask[] | undefined => {
    return userTask.get(fullDateFormat(date.moment));
  }, [date.moment, userTask]);

  useEffect(() => {
    if (type !== RouteName.daily && type !== RouteName.weekly) {
      console.log("access to wrong path");

      navigate("/main/home");
      return;
    }

    setRouteName(type);
  }, [type]);

  useEffect(() => {
    console.log("trigger fetch data per month");
    setIsDailyDataFetched(false);
  }, [date.month]);

  useEffect(() => {
    if (!isDailyDataFetched) {
      console.log("fetch data");
      const startWeek: number = date.moment.clone().startOf("month").week();
      const endWeek: number = date.moment.clone().endOf("month").week();

      const startOfWeek: Date = date.moment.clone().week(startWeek).startOf("week").toDate();
      const endOfWeek: Date = date.moment.clone().week(endWeek).endOf("week").toDate();

      const param: DailyTaskListRequest = { startOfWeek, endOfWeek };

      dispatch(fetchTaskList(param) as any);
      setIsDailyDataFetched(true);
    }
  }, [isDailyDataFetched]);

  const stopEventBubbling = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
  };

  const prevMonth = (): void => {
    dispatch(setDate(date.moment.clone().subtract(1, "month")));
  };

  const nextMonth = (): void => {
    dispatch(setDate(date.moment.clone().add(1, "month")));
  };

  const currentMonth = (): void => {
    dispatch(setDate(moment()));
  };

  const taskCalendar = (): JSX.Element[] => {
    const today: moment.Moment = date.moment.clone();
    const firstWeek: number = today.clone().startOf("month").week();
    const lastWeek: number = today.clone().endOf("month").week() === 1 ? 53 : today.clone().endOf("month").week();

    let result: JSX.Element[] = [];
    let week: number = firstWeek;

    const isToday = (days: moment.Moment): boolean => {
      return moment().format("YYYYMMDD") === days.format("YYYYMMDD");
    };

    const isThisMonth = (days: moment.Moment): boolean => {
      return days.format("MM") === today.format("MM");
    };

    const taskDetailToggle = (day: moment.Moment): void => {
      if (dailyTaskListOn) {
        setDailyTaskListOn(false);
        return;
      }

      dispatch(setDate(day));
      setDailyTaskListOn(!dailyTaskListOn);
      setSelectedDate(day);
    };

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
                    {fullDateFormat(selectedDate) === fullDateFormat(day) && (
                      <div
                        className={`task-modal task-modal__daily  ${
                          dailyTaskListOn
                            ? idx < 3
                              ? "task-detail-appear-left"
                              : "task-detail-appear-right"
                            : dailyTaskListOn === null
                            ? ""
                            : idx < 3
                            ? "task-detail-disappear-left"
                            : "task-detail-disappear-right"
                        }`}
                        style={{ top: `${weekCount * -120}px` }}
                        onClick={stopEventBubbling}
                      >
                        <DailyTaskList idx={idx} selectedDayDailyTasks={selectedDayDailyTasks} dailyTaskListOn={dailyTaskListOn} setDailyTaskListOn={setDailyTaskListOn} />
                      </div>
                    )}
                  </td>
                </Fragment>
              );
            })}
        </tr>,
      );
    }

    return result;
  };

  return (
    <Fragment>
      <div className="task-content">
        <div className="task-content__header">
          <div className="task-content__datebox">
            <span className="task-content__date" onClick={currentMonth}>
              {date.moment.format(DateFormat.month4)}, {date.moment.format(DateFormat.year4)}
            </span>
          </div>
          <div className="task-content__pickerbox">
            <div className="task-content__monthpicker">
              <div className="task-content__monthpicker--btn" onClick={prevMonth}>
                <PrevSvg />
              </div>
              <div className="task-content__monthpicker--btn" onClick={nextMonth}>
                <NextSvg />
              </div>
            </div>
          </div>
        </div>
        <div className="task-content__body">
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
        </div>
      </div>
    </Fragment>
  );
};

export default TaskContent;

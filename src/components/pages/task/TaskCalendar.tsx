import React, { Dispatch, Fragment, ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import moment from "moment";
import { RouteName, StoredTask } from "../../../common/types/types/common";
import { SelectedDate } from "../../../common/types/interfaces/store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { fullDateFormat } from "../../../common/utils/dateUtil";
import DailyTaskList from "../../../common/modals/DailyTaskList";
import { DefaultDailyTask } from "../../../common/types/interfaces/task";
import { setDate } from "../../../store/slices/dateSlice";

interface Props {
  routeName: string;
}

interface DailyTaskState {
  selectedDate: moment.Moment | null;
  dailyTaskListOn: boolean;
}

interface CalendarDrawCondition {
  today: moment.Moment;
  firstWeek: number;
  lastWeek: number;
  weekArr: number[];
}

const TaskCalendar = ({ routeName }: Props): ReactElement => {
  const dispatch: Dispatch<AnyAction> = useDispatch();

  const userTask: StoredTask = useSelector((state: RootState) => state.task.dailyTasks);
  const date: SelectedDate = useSelector((state: RootState) => state.date.selectedDate);

  const tableRef = useRef<HTMLTableElement>(null);

  const initialState: DailyTaskState = {
    selectedDate: null,
    dailyTaskListOn: false,
  };

  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(initialState.selectedDate);
  const [dailyTaskListOn, setDailyTaskListOn] = useState<boolean>(initialState.dailyTaskListOn);

  const calendarDrawCondition = useMemo((): CalendarDrawCondition => {
    const today: moment.Moment = date.moment.clone();
    const firstWeek: number = today.clone().startOf("month").week();
    const lastWeek: number = today.clone().endOf("month").week() === 1 ? 53 : today.clone().endOf("month").week();
    const weekArr: number[] = Array(lastWeek - firstWeek + 1)
      .fill(0)
      .map((_, idx) => {
        return idx + firstWeek;
      });

    return { today, firstWeek, lastWeek, weekArr };
  }, [date]);

  const selectedDayDailyTasks = useMemo((): DefaultDailyTask[] | undefined => {
    return userTask.get(fullDateFormat(date.moment));
  }, [date.moment, userTask]);

  useEffect((): void => {
    if (tableRef.current) {
      tableRef.current.style.opacity = dailyTaskListOn ? "30%" : "100%";
    }
  }, [dailyTaskListOn]);

  const taskDetailToggle = (day: moment.Moment): void => {
    if (dailyTaskListOn) {
      setDailyTaskListOn(false);
    } else {
      dispatch(setDate(day));
      setDailyTaskListOn(true);
      setSelectedDate(day);
    }
  };

  return (
    <Fragment>
      <table ref={tableRef}>
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
        <tbody>
          {calendarDrawCondition.weekArr.map((week, weekIdx) => {
            return (
              <tr key={weekIdx}>
                {Array(7)
                  .fill(0)
                  .map((_, dayIdx) => {
                    const day: moment.Moment = calendarDrawCondition.today.clone().week(week).startOf("week").add(dayIdx, "day");
                    const formattedDay: string = day.format("D");

                    return (
                      <Fragment key={dayIdx}>
                        {routeName === RouteName.daily ? (
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
                          </td>
                        ) : (
                          <td key={dayIdx}>
                            <span>{formattedDay}</span>
                          </td>
                        )}
                      </Fragment>
                    );
                  })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <DailyTaskList tasks={selectedDayDailyTasks} toggle={dailyTaskListOn} setToggle={setDailyTaskListOn} />
    </Fragment>
  );
};

export default TaskCalendar;

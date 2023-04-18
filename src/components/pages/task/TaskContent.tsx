import React, { Dispatch, Fragment, ReactElement, useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import moment from "moment";
import { DateFormat, RouteName, RouteNameType, RouteParam } from "../../../common/types/types/common";
import { RootState } from "../../../store/rootReducer";
import { setDate } from "../../../store/slices/dateSlice";
import { SelectedDate } from "../../../common/types/interfaces/store";
import Svg from "../../shared/Svg";
import { nextDraw, prevDraw } from "../../../common/utils/svgSources";
import TaskCalendar from "./TaskCalendar";

interface DailyTaskState {
  routeName: RouteNameType;
}

const TaskContent = (): ReactElement => {
  const navigate: NavigateFunction = useNavigate();

  const dispatch: Dispatch<AnyAction> = useDispatch();

  const { type } = useParams();

  const date: SelectedDate = useSelector((state: RootState) => state.date.selectedDate);

  const initialState: DailyTaskState = {
    routeName: RouteName.daily,
  };

  const [routeName, setRouteName] = useState<RouteNameType>(initialState.routeName);

  useEffect(() => {
    if (type !== RouteName.daily && type !== RouteName.weekly) {
      console.log("access to wrong path");

      navigate(RouteParam.home);
      return;
    }

    setRouteName(type);
  }, [type]);

  const prevMonth = (): void => {
    dispatch(setDate(date.moment.clone().subtract(1, "month")));
  };

  const nextMonth = (): void => {
    dispatch(setDate(date.moment.clone().add(1, "month")));
  };

  const currentMonth = (): void => {
    dispatch(setDate(moment()));
  };

  return (
    <Fragment>
      <div className="task-content">
        <div className="task-content__header">
          <div className="task-content__datebox">
            <span onClick={currentMonth}>
              {date.moment.format(DateFormat.month4)}, {date.moment.format(DateFormat.year4)}
            </span>
          </div>
          <div className="task-content__pickerbox">
            <div className="task-content__monthpicker">
              <div className="task-content__monthpicker--btn" onClick={prevMonth}>
                <Svg width={24} draw={prevDraw} />
              </div>
              <div className="task-content__monthpicker--btn" onClick={nextMonth}>
                <Svg width={24} draw={nextDraw} />
              </div>
            </div>
          </div>
        </div>
        <div className="task-content__body">
          <TaskCalendar routeName={routeName} />
        </div>
      </div>
    </Fragment>
  );
};

export default TaskContent;

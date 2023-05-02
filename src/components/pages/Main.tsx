import { Dispatch, Fragment, ReactElement, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import Header from "../layouts/Header";
import Nav from "../layouts/Nav";
import useAuth from "../../hooks/useAuth";
import { RootState } from "../../store/rootReducer";
import { SelectedDate } from "../../common/types/interfaces/store";
import { DailyTaskListRequest } from "../../common/types/interfaces/task";
import { fetchTaskList } from "../../store/apis/taskRequest";

interface MainState {
  isDailyDataFetched: boolean;
}

const Main = (): ReactElement => {
  useAuth();
  const dispatch: Dispatch<AnyAction> = useDispatch();

  const date: SelectedDate = useSelector((state: RootState) => state.date.selectedDate);

  const initialState: MainState = {
    isDailyDataFetched: false,
  };

  const [isDailyDataFetched, setIsDailyDataFetched] = useState<boolean>(initialState.isDailyDataFetched);

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

  return (
    <Fragment>
      <div id="content">
        <Header></Header>
        <div id="article">
          <Nav></Nav>
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
};

export default Main;

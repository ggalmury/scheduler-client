import { Dispatch, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import useAuth from "../../../hooks/useAuth";
import { SelectedDate } from "../../../common/types/interfaces/store";
import { RootState } from "../../../store/rootReducer";
import { DailyTaskListRequest } from "../../../common/types/interfaces/task";
import { fetchTaskList } from "../../../store/apis/taskRequest";

interface HomeState {
  isDailyDataFetched: boolean;
}

const Home = (): ReactElement => {
  useAuth();
  const dispatch: Dispatch<AnyAction> = useDispatch();

  const date: SelectedDate = useSelector((state: RootState) => state.date.selectedDate);

  const initialState: HomeState = {
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
    <div className="home-content">
      <div className="home-content__left">
        <div className="task-counter">
          <div className="task-counter__container">
            <div className="task-counter__header">
              <span>Task Count</span>
            </div>
            <div className="task-counter__content"></div>
          </div>
        </div>
        <div className="task-productivity"></div>
        <div className="task-summary"></div>
      </div>
      <div className="home-content__right"></div>
    </div>
  );
};

export default Home;

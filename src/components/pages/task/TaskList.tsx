import { Fragment, useMemo } from "react";
import { useSelector } from "react-redux";
import { Location, Outlet, useLocation } from "react-router-dom";
import Types, { CalendarType, DateFormat } from "../../../common/types/types/common";
import { TaskCreatorType } from "../../../common/types/types/task";
import { RootState } from "../../../store/rootReducer";
import Calendar from "../../shared/Calendar";
import TaskCreate from "./TaskCreate";

const TaskList = () => {
  const location: Location = useLocation();
  const date = useSelector((state: RootState) => state.date.selectedDate);

  const creatorType = useMemo((): Types<typeof TaskCreatorType> => {
    return location.pathname === "/main/task/daily" ? TaskCreatorType.daily : TaskCreatorType.weekly;
  }, [location.pathname]);

  return (
    <Fragment>
      <div className="task-content">
        <div className="task-timestamp">
          <div className="task-timestamp__header">
            <div className="task-timestamp__date">
              <div className="task-timestamp__date task-timestamp__date--month">{date.moment.format(DateFormat.month4)}</div>
              <div className="task-timestamp__date task-timestamp__date--today">{date.moment.format("dddd, MM Do, YYYY")}</div>
            </div>
          </div>
          <div className="task-timestamp__body">
            <Outlet />
          </div>
        </div>
        <div className="task-option">
          <Calendar size={CalendarType.small}></Calendar>
          <TaskCreate creatorType={creatorType}></TaskCreate>
        </div>
      </div>
    </Fragment>
  );
};

export default TaskList;

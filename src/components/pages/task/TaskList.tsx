import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { CalendarType, DateFormat } from "../../../common/types/types/common";
import { RootState } from "../../../store/rootReducer";
import Calendar from "../../shared/Calendar";
import TaskCreate from "./TaskCreate";

const TaskList = () => {
  const date = useSelector((state: RootState) => state.date.selectedDate);

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
          <TaskCreate></TaskCreate>
        </div>
      </div>
    </Fragment>
  );
};

export default TaskList;

import { Fragment, useMemo } from "react";
import { useSelector } from "react-redux";
import { Location, Outlet, useLocation } from "react-router-dom";
import { DateFormat } from "../../../common/types/types/common";
import { RootState } from "../../../store/rootReducer";

const TaskList = () => {
  const location: Location = useLocation();
  const date = useSelector((state: RootState) => state.date.selectedDate);

  return (
    <Fragment>
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
        {/* <div className="task-option">
          <Calendar size={CalendarType.small}></Calendar>
          <TaskCreate creatorType={creatorType}></TaskCreate>
        </div> */}
      </div>
    </Fragment>
  );
};

export default TaskList;

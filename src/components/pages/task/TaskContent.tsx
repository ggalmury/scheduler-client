import { Fragment, useMemo } from "react";
import { useSelector } from "react-redux";
import { Location, Outlet, useLocation } from "react-router-dom";
import { SelectedDate } from "../../../common/types/interfaces/store";
import { DateFormat } from "../../../common/types/types/common";
import { RootState } from "../../../store/rootReducer";

const TaskContent = (): JSX.Element => {
  const date: SelectedDate = useSelector((state: RootState) => state.date.selectedDate);

  return (
    <Fragment>
      <div className="task-content">
        <div className="task-content__header">
          <div className="task-content__date">
            <span className="task-content__date task-content__date--month">{`${date.moment.format(DateFormat.month4)}`}</span>
            <span className="task-content__date task-content__date--today">{date.moment.format(DateFormat.year4)}</span>
          </div>
        </div>
        <div className="task-content__body">
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
};

export default TaskContent;

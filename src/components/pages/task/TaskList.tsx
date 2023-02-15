import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Auth } from "../../../common/interfaces/store";
import { getDate } from "../../../common/utils/dateUtil";
import { CalendarType, DateFormat } from "../../../common/utils/enums";
import { RootState } from "../../../store/rootReducer";
import Calendar from "../../shared/Calendar";
import TaskChartModal from "../modal/TaskChartModal";
import TaskCreateModal from "../modal/TaskCreateModal";

const TaskList = () => {
  const dispatch = useDispatch();
  const userAuth: Auth = useSelector((state: RootState) => state.login.auth);
  const [hourCount, setHourCount] = useState<number[]>(new Array(24).fill(0));
  const [createTaskModal, setCreateTaskModal] = useState<boolean>(false);

  useEffect(() => {
    const modal: HTMLElement | null = document.getElementById("task-create");
    if (modal) {
      if (createTaskModal) {
        modal.style.display = "flex";
      } else {
        modal.style.display = "none";
      }
    }

    const startHour: number = 1;
    const startMinute: number = 0;
    const startTotal = startHour * 60 + startMinute;

    const endHour: number = 1;
    const endMinute: number = 0;
    const endTotal = endHour * 60 + endMinute;

    const borderHeight: number = endHour - 1;

    const pos: number = 1;

    const tester: HTMLElement | null = document.getElementById(`task-${startHour}`);
    if (tester) {
      const tester2: HTMLElement | null = document.getElementById(`task-${startHour}-${pos}`);
      if (tester2) {
        tester2.style.display = "block";
        tester2.style.height = `${(endTotal - startTotal) * 2 + borderHeight}px`;
        tester2.style.marginTop = `${startMinute * 2}px`;
      }
    }
  }, [createTaskModal]);

  const modalAppear = () => {
    setCreateTaskModal(!createTaskModal);
  };

  const taskBox = () => {
    return hourCount.map((value, idx) => {
      return (
        <div id={`task-${idx}`} key={idx}>
          <div className="task-box">
            <div className="task-box-timestamp">
              {idx} : 00 {idx < 12 ? "AM" : "PM"}
            </div>
            <div className="task-box-data">
              <div className="task-box-data-chart">
                <TaskChartModal idx={idx} pos={1}></TaskChartModal>
              </div>
              <div className="task-box-data-chart">
                <TaskChartModal idx={idx} pos={2}></TaskChartModal>
              </div>
              <div className="task-box-data-chart">
                <TaskChartModal idx={idx} pos={3}></TaskChartModal>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <Fragment>
      <TaskCreateModal></TaskCreateModal>
      <div id="task-content">
        <div id="task-detail">
          <div id="task-detail-header">
            <div id="task-detail-header-left">
              <div id="task-month">{getDate(DateFormat.MONTH_4)}</div>
              <div id="task-today">Today is {getDate("dddd, MM Do, YYYY")}</div>
            </div>
            <div id="task-detail-header-right">
              <button className="btn-create" onClick={modalAppear}>
                + Create task
              </button>
            </div>
          </div>
          <div id="task-detail-body">{taskBox()}</div>
        </div>
        <div id="task-stat">
          <Calendar size={CalendarType.SMALL_CALENDAR}></Calendar>
        </div>
      </div>
    </Fragment>
  );
};

export default TaskList;

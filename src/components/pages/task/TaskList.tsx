import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../..";
import { TaskSearchRequest } from "../../../common/interfaces/requestData";
import { TaskResponse } from "../../../common/interfaces/responseData";
import { Account } from "../../../common/interfaces/store";
import { getDate } from "../../../common/utils/dateUtil";
import { CalendarType, DateFormat } from "../../../common/utils/enums";
import { fetchTaskList } from "../../../store/axios/taskRequest";
import { RootState } from "../../../store/rootReducer";
import Calendar from "../../shared/Calendar";
import TaskChartModal from "../modal/TaskChartModal";
import TaskCreateModal from "../modal/TaskCreateModal";

const TaskList = () => {
  const dispatch = useDispatch();
  const userAccount: Account = useSelector((state: RootState) => state.login.account);
  const date = useSelector((state: RootState) => state.date.selectedDate);

  const [hourCount, setHourCount] = useState<number[]>(new Array(24).fill(0));
  const [createTaskModal, setCreateTaskModal] = useState<boolean>(false);
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  useEffect(() => {
    const modal: HTMLElement | null = document.getElementById("task-create");
    if (modal) {
      if (createTaskModal) {
        modal.style.display = "flex";
      } else {
        modal.style.display = "none";
      }
    }

    fetchData();
  }, [date, createTaskModal]);

  const fetchData = async () => {
    // TODO: visualize task charts differently from day to day
    if (!isDataFetched) {
      const taskSearchRequest: TaskSearchRequest = { uid: userAccount.uid, email: userAccount.email };

      await dispatch(fetchTaskList(taskSearchRequest) as any);
      setIsDataFetched(true);
    }

    const state = store.getState() as RootState;
    const tasks: Map<number, TaskResponse[]> = state.task.tasks;

    const thisDayTasks: TaskResponse[] | undefined = tasks.get(parseInt(date.date));

    if (thisDayTasks) {
      thisDayTasks.map((task, idx) => {
        const today = new Date(task.date).getDate();
        const startHour: number = task.time.startAt.hour;
        const startMinute: number = task.time.startAt.minute;
        const startTotal = startHour * 60 + startMinute;
        const endHour: number = task.time.endAt.hour;
        const endMinute: number = task.time.endAt.minute;
        const endTotal = endHour * 60 + endMinute;
        const borderHeight: number = endHour - 1;
        const pos: number = idx + 1;

        if (today === parseInt(date.date)) {
          const tester: HTMLElement | null = document.getElementById(`task-${startHour}`);
          if (tester) {
            const tester2: HTMLElement | null = document.getElementById(`task-${startHour}-${pos}`);
            if (tester2) {
              tester2.style.display = "block";
              tester2.style.height = `${(endTotal - startTotal) * 2 + borderHeight}px`;
              tester2.style.marginTop = `${startMinute * 2}px`;
              tester2.style.backgroundColor = `${task.color}`;
            }
          }
        }
      });
    }
  };

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
      <TaskCreateModal createTaskModal={createTaskModal} setCreateTaskModal={setCreateTaskModal}></TaskCreateModal>
      <div id="task-content">
        <div id="task-detail">
          <div id="task-detail-header">
            <div id="task-detail-header-left">
              <div id="task-month">{date.moment.format(DateFormat.MONTH_4)}</div>
              <div id="task-today">{date.moment.format("dddd, MM Do, YYYY")}</div>
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

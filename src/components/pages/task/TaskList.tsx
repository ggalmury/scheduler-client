import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../..";
import { TaskType } from "../../../common/enums/task";
import { TaskSearchRequest } from "../../../common/interfaces/requestData";
import { TaskResponse } from "../../../common/interfaces/responseData";
import { Account } from "../../../common/interfaces/store";
import { CalendarType, DateFormat } from "../../../common/utils/enums";
import { fetchTaskList } from "../../../store/axios/taskRequest";
import { RootState } from "../../../store/rootReducer";
import Calendar from "../../shared/Calendar";
import TaskCreateModal from "../modal/TaskCreateModal";

const TaskList = () => {
  const dispatch = useDispatch();
  const userAccount: Account = useSelector((state: RootState) => state.login.account);
  const userTask = useSelector((state: RootState) => state.task.tasks);
  const date = useSelector((state: RootState) => state.date.selectedDate);

  const [hourCount, setHourCount] = useState<number[]>(new Array(24).fill(0));
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
  const [todayTasks, setTodayTasks] = useState<{ main: TaskResponse[]; sub: TaskResponse[] }>({ main: [], sub: [] });

  useEffect(() => {
    fetchData();
  }, [date, userTask]);

  const fetchData = async () => {
    // TODO: visualize task charts differently from day to day
    if (!isDataFetched) {
      console.log("fetch task data");
      const taskSearchRequest: TaskSearchRequest = { uid: userAccount.uid, email: userAccount.email };
      await dispatch(fetchTaskList(taskSearchRequest) as any);
      setIsDataFetched(true);
    }

    setTodayTasks({ main: [], sub: [] });

    const state = store.getState() as RootState;
    const tasks: Map<number, TaskResponse[]> = state.task.tasks;

    const taskArr: TaskResponse[] | undefined = tasks.get(parseInt(date.date));
    console.log(taskArr);

    const main: TaskResponse[] = [];
    const sub: TaskResponse[] = [];

    if (taskArr) {
      taskArr.forEach((task) => {
        switch (task.type) {
          case TaskType.MAIN_TASK:
            main.push(task);
            break;
          case TaskType.SUB_TASK:
            sub.push(task);
            break;
        }
      });

      setTodayTasks({ main, sub });
    }
  };

  const taskGraph = (index: number, defaultType: TaskType) => {
    let tasks: TaskResponse[] = [];

    switch (defaultType) {
      case TaskType.MAIN_TASK:
        tasks = todayTasks.main;
        break;
      case TaskType.SUB_TASK:
        tasks = todayTasks.sub;
        break;
    }

    const graph = tasks.map((task, idx) => {
      const today = new Date(task.date).getDate();
      const startHour: number = task.time.startAt.hour;
      const startMinute: number = task.time.startAt.minute;
      const startTotal = startHour * 60 + startMinute;
      const endHour: number = task.time.endAt.hour;
      const endMinute: number = task.time.endAt.minute;
      const endTotal = endHour * 60 + endMinute;
      const type: TaskType = task.type;

      const duration = () => {
        return startHour + ":" + startMinute + " ~ " + endHour + ":" + endMinute;
      };

      const modalStyle = {
        height: `${(endTotal - startTotal) * 1.5}px`,
        marginTop: `${startMinute * 1.5}px`,
        background: `${task.color}`,
        border: `2px solid ${task.color}`,
      };

      const titleStyle = {
        lineHeight: `${endTotal - startTotal}px`,
      };

      if (startHour === index && type === defaultType) {
        return (
          <div key={idx} className="task-box__modal" style={modalStyle}>
            <div className="task-box__duration">{duration()}</div>
            <div className="task-box__title" style={titleStyle}>
              {task.title}
            </div>
          </div>
        );
      }
    });

    return graph;
  };

  const taskBox = () => {
    return hourCount.map((value, idx) => {
      return (
        <div key={idx}>
          <div className="task-box">
            <div className="task-box__time">
              {idx} : 00 {idx < 12 ? "AM" : "PM"}
            </div>
            <div className="task-box__main-task">{isDataFetched ? <div className="task-box__chart">{taskGraph(idx, TaskType.MAIN_TASK)}</div> : null}</div>
            <div className="task-box__sub-task">{isDataFetched ? <div className="task-box__chart">{taskGraph(idx, TaskType.SUB_TASK)}</div> : null}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <Fragment>
      <div className="task-content">
        <div className="task-option">
          <Calendar size={CalendarType.SMALL_CALENDAR}></Calendar>
          <TaskCreateModal></TaskCreateModal>
        </div>
        <div className="task-timestamp">
          <div className="task-timestamp__header">
            <div className="task-timestamp__date">
              <div className="task-timestamp__date task-timestamp__date--month">{date.moment.format(DateFormat.MONTH_4)}</div>
              <div className="task-timestamp__date task-timestamp__date--today">{date.moment.format("dddd, MM Do, YYYY")}</div>
            </div>
            <div className="task-timestamp__counter-box">
              <div className="task-timestamp__counter task-timestamp__counter--main">
                Main
                <br />
                {todayTasks.main.length}
              </div>
              <div className="task-timestamp__counter task-timestamp__counter--sub">
                Sub
                <br />
                {todayTasks.sub.length}
              </div>
            </div>
          </div>
          <div className="task-timestamp__body">{taskBox()}</div>
        </div>
        <div className="task-stat"></div>
      </div>
    </Fragment>
  );
};

export default TaskList;

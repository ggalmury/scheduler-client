import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../..";
import { TaskType } from "../../../common/enums/task";
import { TaskSearchRequest, TaskDeleteRequest } from "../../../common/interfaces/requestData";
import { TaskResponse } from "../../../common/interfaces/responseData";
import { Account } from "../../../common/interfaces/store";
import ClockSvg from "../../../common/svgs/ClockSvg";
import LocationSvg from "../../../common/svgs/LocationSvg";
import ScopeSvg from "../../../common/svgs/ScopeSvg";
import { addPad } from "../../../common/utils/dateUtil";
import { CalendarType, DateFormat } from "../../../common/utils/enums";
import { fetchTaskDelete, fetchTaskList } from "../../../store/axios/taskRequest";
import { RootState } from "../../../store/rootReducer";
import Calendar from "../../shared/Calendar";
import TaskCreate from "./TaskCreate";

const TaskList = () => {
  const dispatch = useDispatch();
  const userAccount: Account = useSelector((state: RootState) => state.login.account);
  const userTask: Map<number, TaskResponse[]> = useSelector((state: RootState) => state.task.tasks);
  const date = useSelector((state: RootState) => state.date.selectedDate);

  const [hourCount, setHourCount] = useState<number[]>(new Array(24).fill(0));
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
  const [todayTasks, setTodayTasks] = useState<{ official: TaskResponse[]; personal: TaskResponse[] }>({ official: [], personal: [] });
  const [selectedTask, setSelectedTask] = useState<TaskResponse | null>(null);

  useEffect(() => {
    fetchData();
  }, [date, userTask]);

  useEffect(() => {
    console.log(userTask);
  }, []);

  const fetchData = async () => {
    if (!isDataFetched) {
      console.log("fetch task data");
      const taskSearchRequest: TaskSearchRequest = { uid: userAccount.uid, email: userAccount.email };
      await dispatch(fetchTaskList(taskSearchRequest) as any);
      setIsDataFetched(true);
    }

    setTodayTasks({ official: [], personal: [] });

    const state = store.getState() as RootState;
    const tasks: Map<number, TaskResponse[]> = state.task.tasks;

    const taskArr: TaskResponse[] | undefined = tasks.get(parseInt(date.date));

    const official: TaskResponse[] = [];
    const personal: TaskResponse[] = [];

    if (taskArr) {
      taskArr.forEach((task) => {
        switch (task.type) {
          case TaskType.OFFICIAL_TASK:
            official.push(task);
            break;
          case TaskType.PERSONAL_TASK:
            personal.push(task);
            break;
        }
      });

      setTodayTasks({ official, personal });
    }
  };

  const deleteTask = async () => {
    if (selectedTask) {
      const taskDeleteRequest: TaskDeleteRequest = { email: userAccount.email, taskId: selectedTask.taskId };
      await dispatch(fetchTaskDelete(taskDeleteRequest) as any);

      setSelectedTask(null);
    }
  };

  const confirmTask = () => {
    setSelectedTask(null);
  };

  const taskGraph = (index: number, defaultType: TaskType) => {
    let tasks: TaskResponse[] = [];

    switch (defaultType) {
      case TaskType.OFFICIAL_TASK:
        tasks = todayTasks.official;
        break;
      case TaskType.PERSONAL_TASK:
        tasks = todayTasks.personal;
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

      const taskClick = () => {
        setSelectedTask(task);
      };

      const duration = () => {
        return addPad(startHour) + ":" + addPad(startMinute) + " ~ " + addPad(endHour) + ":" + addPad(endMinute);
      };

      const modalStyle = {
        height: `${(endTotal - startTotal) * 1.5}px`,
        top: `${startMinute * 1.5}px`,
        background: `${task.color}`,
        border: `2px solid ${task.color}`,
        zIndex: `${idx}`,
      };

      const titleStyle = {
        lineHeight: `${endTotal - startTotal}px`,
      };

      if (startHour === index && type === defaultType) {
        return (
          <div key={idx} className="task-box__modal" style={modalStyle} onClick={taskClick}>
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
            <div className="task-box__main-task">{isDataFetched ? <div className="task-box__chart">{taskGraph(idx, TaskType.OFFICIAL_TASK)}</div> : null}</div>
            <div className="task-box__sub-task">{isDataFetched ? <div className="task-box__chart">{taskGraph(idx, TaskType.PERSONAL_TASK)}</div> : null}</div>
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
          <TaskCreate todayTasks={todayTasks}></TaskCreate>
        </div>
        <div className="task-timestamp">
          <div className="task-timestamp__header">
            <div className="task-timestamp__date">
              <div className="task-timestamp__date task-timestamp__date--month">{date.moment.format(DateFormat.MONTH_4)}</div>
              <div className="task-timestamp__date task-timestamp__date--today">{date.moment.format("dddd, MM Do, YYYY")}</div>
            </div>
            <div className="task-timestamp__counter-box">
              <div className="task-timestamp__counter task-timestamp__counter--main">
                Official
                <br />
                {todayTasks.official.length}
              </div>
              <div className="task-timestamp__counter task-timestamp__counter--sub">
                Personal
                <br />
                {todayTasks.personal.length}
              </div>
            </div>
          </div>
          <div className="task-timestamp__body">{taskBox()}</div>
        </div>
        <div className="task-stat">
          {selectedTask ? (
            <Fragment>
              <div className="task-describe">
                <div className="task-describe__title">{selectedTask.title}</div>
                <div className="task-describe__duration">
                  <ClockSvg></ClockSvg>
                  from {addPad(selectedTask.time.startAt.hour)} : {addPad(selectedTask.time.startAt.minute)} &nbsp;to &nbsp;{addPad(selectedTask.time.endAt.hour)} :{" "}
                  {addPad(selectedTask.time.endAt.minute)}
                </div>
                <div className="task-describe__location">
                  <LocationSvg></LocationSvg>
                  {selectedTask.location}
                </div>
                <div className="task-describe__privacy">
                  <ScopeSvg></ScopeSvg>
                  {selectedTask.privacy}
                </div>
                <hr />
                <div className="task-describe__description">
                  <div className="task-describe__description--text">Description</div>
                  <div className="task-describe__description--content">{selectedTask.description}</div>
                </div>
              </div>
              <div className="task-describe__todolist">
                <div className="task-describe__todo-header">
                  Todolist
                  <button className="btn-submit-small task-describe__btn--modify">modify</button>
                </div>
                <div className="task-describe__todo-body"></div>
              </div>
              <div className="task-describe__footer">
                <button className="btn-submit-small task-describe__btn--confirm" onClick={confirmTask}>
                  confirm
                </button>
                <button className="btn-submit-small task-describe__btn--delete" onClick={deleteTask}>
                  delete
                </button>
              </div>
            </Fragment>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default TaskList;

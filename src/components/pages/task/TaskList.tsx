import { Fragment, useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../..";
import { TaskType } from "../../../common/types/enums/task";
import { TaskDeleteOrDoneRequest, TodoCreateRequest, TodoDeleteRequest } from "../../../common/types/interfaces/requestData";
import { TaskResponse, TodoData } from "../../../common/types/interfaces/responseData";
import CheckSvg from "../../../common/svgs/CheckSvg";
import ClockSvg from "../../../common/svgs/ClockSvg";
import ForwardSvg from "../../../common/svgs/ForwardSvg";
import LocationSvg from "../../../common/svgs/LocationSvg";
import ScopeSvg from "../../../common/svgs/ScopeSvg";
import { addPad } from "../../../common/utils/dateUtil";
import { CalendarType, DateFormat } from "../../../common/utils/enums";
import { fetchTaskDelete, fetchTaskDone, fetchTaskList, fetchTodoCreate, fetchTodoDelete } from "../../../store/apis/taskRequest";
import { RootState } from "../../../store/rootReducer";
import Calendar from "../../shared/Calendar";
import TaskCreate from "./TaskCreate";
import PlusSvg from "../../../common/svgs/PlusSvg";
import TrashSvg from "../../../common/svgs/TrashSvg";

const TaskList = () => {
  const dispatch = useDispatch();

  const userTask: Map<number, TaskResponse[]> = useSelector((state: RootState) => state.task.tasks);
  const date = useSelector((state: RootState) => state.date.selectedDate);

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
  const [todayTasks, setTodayTasks] = useState<{ official: TaskResponse[]; personal: TaskResponse[] }>({ official: [], personal: [] });
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [createTodo, setCreateTodo] = useState<boolean>(false);
  const [statOn, setStatOn] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<string>("");

  const hourCount: number[] = new Array(24).fill(0);

  const selectedTask = useMemo((): TaskResponse | null => {
    return selectedTaskId != null ? userTask.get(parseInt(date.date))?.filter((e) => e.taskId === selectedTaskId)?.[0] ?? null : null;
  }, [selectedTaskId, date.date, userTask]);

  useEffect(() => {
    if (!isDataFetched) {
      console.log("fetch task data");

      dispatch(fetchTaskList() as any);
      setIsDataFetched(true);
    }
  }, [isDataFetched]);

  useEffect(() => {
    console.log("render1");
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
  }, [date, userTask]);

  useEffect(() => {
    console.log("render2");
    console.log(selectedTask);
    setCreateTodo(false);
    setNewTodo("");
  }, [selectedTask]);

  const confirmTask = () => {
    setStatOn(false);
    setTimeout(() => {
      setSelectedTaskId(null);
    }, 500);
  };

  const deleteTask = async () => {
    if (selectedTask) {
      const taskDeleteRequest: TaskDeleteOrDoneRequest = { taskId: selectedTask.taskId };

      await dispatch(fetchTaskDelete(taskDeleteRequest) as any);

      setStatOn(false);
      setSelectedTaskId(null);
    }
  };

  const doneTask = async () => {
    if (selectedTask) {
      const taskDoneRequest: TaskDeleteOrDoneRequest = { taskId: selectedTask.taskId };

      await dispatch(fetchTaskDone(taskDoneRequest) as any);

      setStatOn(false);
      setSelectedTaskId(null);
    }
  };

  const setTodoCreateMode = (event: React.MouseEvent<HTMLElement>) => {
    setCreateTodo(!createTodo);
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
      const startHour: number = task.time.startAt.hour;
      const startMinute: number = task.time.startAt.minute;
      const startTotal = startHour * 60 + startMinute;
      const endHour: number = task.time.endAt.hour;
      const endMinute: number = task.time.endAt.minute;
      const endTotal = endHour * 60 + endMinute;
      const type: TaskType = task.type;
      const duration: string = addPad(startHour) + ":" + addPad(startMinute) + " ~ " + addPad(endHour) + ":" + addPad(endMinute);

      const taskClick = () => {
        setSelectedTaskId(task.taskId);
        setStatOn(true);
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
            <div className="task-box__duration">{duration}</div>
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

  const todoBox = () => {
    return selectedTask?.createdTodo.map((task, idx) => {
      return (
        <div className="todo-list" key={idx}>
          <div className="todo-list__description">{task.description}</div>
          <div className="todo-list__trash" onClick={(event) => deleteTodo(event, task)}>
            <TrashSvg></TrashSvg>
          </div>
        </div>
      );
    });
  };

  const getNewTodo = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTodo(event.target.value);
  };

  const submitTodo = (event: React.MouseEvent<HTMLElement>) => {
    if (selectedTask && newTodo !== "") {
      const todoRequest: TodoCreateRequest = {
        taskId: selectedTask.taskId,
        description: newTodo,
        date: selectedTask.date,
      };

      dispatch(fetchTodoCreate(todoRequest) as any);
    }

    setNewTodo("");
  };

  const deleteTodo = (event: React.MouseEvent<HTMLElement>, todoData: TodoData) => {
    if (selectedTask) {
      const todoRequest: TodoDeleteRequest = {
        todoId: todoData.todoId,
      };

      dispatch(fetchTodoDelete(todoRequest) as any);
    }
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
        <div className={"task-stat"}>
          {selectedTask ? (
            <div className={`task-detail ${statOn ? "slide-in" : "slide-out"} ${selectedTask ? (selectedTask.type === TaskType.OFFICIAL_TASK ? "task-stat--official" : "task-stat--personal") : ""}`}>
              <div className="task-describe">
                <div className="task-describe__header">
                  <div className="task-describe__header--title">{selectedTask.title}</div>
                  <div className="task-describe__header--svg" onClick={confirmTask}>
                    <ForwardSvg></ForwardSvg>
                  </div>
                </div>
                <div className="task-describe__duration">
                  <ClockSvg></ClockSvg>
                  from {addPad(selectedTask.time.startAt.hour)} : {addPad(selectedTask.time.startAt.minute)} &nbsp;to &nbsp;{addPad(selectedTask.time.endAt.hour)} :
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
                  <button className="btn-submit-small task-describe__btn--create" onClick={setTodoCreateMode}>
                    {createTodo ? "done" : "create"}
                  </button>
                </div>
                <div className="task-describe__todo-body">
                  <div className={`task-describe__new-todo ${createTodo ? "slide-down" : "slide-up"}`}>
                    <textarea value={newTodo} className="task-describe__todo-input" onChange={getNewTodo}></textarea>
                    <div className="task-describe__submit-svg" onClick={submitTodo}>
                      <CheckSvg></CheckSvg>
                    </div>
                  </div>
                  <div>{todoBox()}</div>
                </div>
              </div>
              <div className="task-describe__footer">
                {selectedTask.state ? null : (
                  <button className="btn-submit-small task-describe__btn--modify" onClick={doneTask}>
                    done!
                  </button>
                )}
                <button className="btn-submit-small task-describe__btn--delete" onClick={deleteTask}>
                  delete
                </button>
              </div>
            </div>
          ) : (
            <div>asdf</div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default TaskList;

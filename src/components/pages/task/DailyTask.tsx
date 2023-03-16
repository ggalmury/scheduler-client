import { useState, useMemo, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckSvg, ClockSvg, ForwardSvg, LocationSvg, ScopeSvg, TrashSvg } from "../../../common/svg";
import { TaskDeleteOrDoneRequest, TaskListRequest, TodoCreateRequest, TodoDeleteRequest } from "../../../common/types/interfaces/requestData";
import { TaskResponse, TodoData } from "../../../common/types/interfaces/responseData";
import { DateFormat, StoredTask } from "../../../common/types/types/common";
import { addPad, fullDateFormat } from "../../../common/utils/dateUtil";
import { fetchTaskDelete, fetchTaskDone, fetchTaskList, fetchTodoCreate, fetchTodoDelete } from "../../../store/apis/taskRequest";
import { RootState } from "../../../store/rootReducer";

const DailyTask = () => {
  const dispatch = useDispatch();

  const userTask: StoredTask = useSelector((state: RootState) => state.task.dailyTasks);
  const date = useSelector((state: RootState) => state.date.selectedDate);

  const initialState = {
    isDataFetched: false as boolean,
    weeklyTask: new Map<number, TaskResponse[]>() as Map<number, TaskResponse[]>,
    selectedTaskCopy: null as { id: number; date: string } | null,
    createTodo: false as boolean,
    statOn: false as boolean,
    newTodo: "" as string,
  } as any;

  const [isDataFetched, setIsDataFetched] = useState<boolean>(initialState.isDataFetched);
  const [weeklyTask, setWeelkyTask] = useState<Map<number, TaskResponse[]>>(initialState.weeklyTask);
  const [selectedTaskCopy, setSelectedTaskCopy] = useState<{ id: number; date: string } | null>(initialState.selectedTaskId);
  const [createTodo, setCreateTodo] = useState<boolean>(initialState.createTodo);
  const [statOn, setStatOn] = useState<boolean>(initialState.statOn);
  const [newTodo, setNewTodo] = useState<string>(initialState.newTodo);

  const hourCount: number[] = new Array(24).fill(0);
  const today: string = date.moment.clone().format(DateFormat.day4);

  const selectedTask = useMemo((): TaskResponse | null => {
    const data: TaskResponse[] | null = selectedTaskCopy ? userTask.get(selectedTaskCopy.date) ?? null : null;

    return data ? data.filter((task) => task.taskId === selectedTaskCopy?.id)[0] : null;
  }, [selectedTaskCopy, userTask]);

  // schedule table header
  const dateArr = useMemo((): string[][] => {
    const firstDay: moment.Moment = date.moment.clone().startOf("week");

    const dateArr: string[][] = [];

    for (let i = 0; i < 7; i++) {
      const newMoment: moment.Moment = firstDay.clone().add(i, "day");
      const newDay: string = newMoment.format(DateFormat.day4);
      const newDate: string = newMoment.format("MM/DD");

      dateArr.push([newDay, newDate]);
    }

    return dateArr;
  }, [date.moment]);

  useEffect(() => {
    console.log("trigger fetch data per month");
    setIsDataFetched(false);
  }, [date.month]);

  useEffect(() => {
    if (!isDataFetched) {
      console.log("fetch data");
      const startWeek: number = date.moment.clone().startOf("month").week();
      const endWeek: number = date.moment.clone().endOf("month").week();

      const startOfWeek: Date = date.moment.clone().week(startWeek).startOf("week").toDate();
      const endOfWeek: Date = date.moment.clone().week(endWeek).endOf("week").toDate();
      const selectedDate: moment.Moment = date.moment;

      const param: TaskListRequest = { startOfWeek, endOfWeek, selectedDate };

      dispatch(fetchTaskList(param) as any);
      setIsDataFetched(true);
    }
  }, [isDataFetched]);

  useEffect(() => {
    console.log("set weekly tasks");
    const startOfWeek: moment.Moment = date.moment.clone().startOf("week");

    let tempwWeeklyTask: Map<number, TaskResponse[]> = new Map<number, TaskResponse[]>();

    for (let i: number = 0; i < 7; i++) {
      const key: string = fullDateFormat(startOfWeek.clone().add(i, "day"));
      const taskByDay: TaskResponse[] | undefined = userTask.get(key);

      taskByDay ? tempwWeeklyTask.set(i, taskByDay) : tempwWeeklyTask.set(i, []);
    }

    setWeelkyTask(tempwWeeklyTask);
  }, [date, userTask]);

  const confirmTask = (): void => {
    setStatOn(false);
    setTimeout(() => {
      setSelectedTaskCopy(null);
    }, 500);
  };

  const deleteTask = async (): Promise<void> => {
    if (selectedTask) {
      console.log(selectedTask);
      const taskDeleteRequest: TaskDeleteOrDoneRequest = { taskId: selectedTask.taskId };

      await dispatch(fetchTaskDelete(taskDeleteRequest) as any);

      setStatOn(false);
      setSelectedTaskCopy(null);
    }
  };

  const endTask = async (): Promise<void> => {
    if (selectedTask) {
      const taskDoneRequest: TaskDeleteOrDoneRequest = { taskId: selectedTask.taskId };

      await dispatch(fetchTaskDone(taskDoneRequest) as any);

      setStatOn(false);
      setSelectedTaskCopy(null);
    }
  };

  const setTodoCreateMode = (): void => {
    setCreateTodo(!createTodo);
  };

  const taskGraph = (time: number, dt: number): (JSX.Element | undefined)[] | undefined => {
    const taskArr: TaskResponse[] | undefined = weeklyTask.get(dt);

    if (taskArr) {
      return taskArr.map((task, idx) => {
        const startHour: number = task.time.startAt.hour;
        const startMinute: number = task.time.startAt.minute;
        const startTotal = startHour * 60 + startMinute;
        const endHour: number = task.time.endAt.hour;
        const endMinute: number = task.time.endAt.minute;
        const endTotal = endHour * 60 + endMinute;
        const duration: string = addPad(startHour) + ":" + addPad(startMinute) + " ~ " + addPad(endHour) + ":" + addPad(endMinute);

        const taskClick = () => {
          setSelectedTaskCopy({ id: task.taskId, date: task.date });
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

        if (startHour === time) {
          return (
            <Fragment key={idx}>
              <div className="task-modal" style={modalStyle} onClick={taskClick}>
                <div className="task-modal__duration">{duration}</div>
                <div className="task-modal__title" style={titleStyle}>
                  {task.title}
                </div>
              </div>
              {selectedTask && selectedTask.taskId === task.taskId ? (
                <div className={`task-detail ${dt < 4 ? "task-detail--left" : "task-detail--right"} ${statOn ? "task-detail-appear" : "task-detail-disappear"} task-detail--${selectedTask.type}`}>
                  <div className="task-describe">
                    <div className="task-describe__header">
                      <div className="task-describe__header--title">{selectedTask.title}</div>
                      <div className="task-describe__header--svg" onClick={confirmTask}>
                        <ForwardSvg></ForwardSvg>
                      </div>
                    </div>
                    <div className="task-describe__duration">
                      <ClockSvg></ClockSvg>
                      from {addPad(selectedTask.time.startAt.hour)} : {addPad(selectedTask.time.startAt.minute)} &nbsp;to &nbsp;{addPad(selectedTask.time.endAt.hour)} :{addPad(selectedTask.time.endAt.minute)}
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
                      <div className={`todo-list ${createTodo ? "slide-down" : "slide-up"}`}>
                        <div className="todo-list__description">
                          <textarea value={newTodo} className="todo-list__textarea" onChange={getNewTodo}></textarea>
                        </div>
                        <div className="todo-list__svg" onClick={submitTodo}>
                          <CheckSvg></CheckSvg>
                        </div>
                      </div>
                      <div>{todoBox()}</div>
                    </div>
                  </div>
                  <div className="task-describe__footer">
                    {selectedTask.state ? null : (
                      <button className="btn-submit-small task-describe__btn--modify" onClick={endTask}>
                        done!
                      </button>
                    )}
                    <button className="btn-submit-small task-describe__btn--delete" onClick={deleteTask}>
                      delete
                    </button>
                  </div>
                </div>
              ) : null}
            </Fragment>
          );
        }
      });
    }
  };

  const todoBox = (): JSX.Element[] | undefined => {
    return selectedTask?.createdTodo.map((task, idx) => {
      return (
        <div className="todo-list" key={idx}>
          <div className="todo-list__description">{task.description}</div>
          <div className="todo-list__svg" onClick={() => deleteTodo(task)}>
            <TrashSvg></TrashSvg>
          </div>
        </div>
      );
    });
  };

  const getNewTodo = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setNewTodo(event.target.value);
  };

  const submitTodo = (): void => {
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

  const deleteTodo = (todoData: TodoData): void => {
    if (selectedTask) {
      const todoRequest: TodoDeleteRequest = {
        todoId: todoData.todoId,
      };

      dispatch(fetchTodoDelete(todoRequest) as any);
    }
  };

  return (
    <div className="task-table">
      <div className="task-table__header">
        <div className="task-table__time"></div>
        {dateArr.map((dt, idx) => {
          return (
            <div key={idx} className={`task-table__date ${today === dt[0] ? "task-table__current-day" : ""}`}>
              <div className={`task-table__date--day ${today === dt[0] ? "selected-day" : ""}`}>{dt[0]}</div>
              <div className={`task-table__date--date ${today === dt[0] ? "selected-day" : ""}`}>{dt[1]}</div>
            </div>
          );
        })}
      </div>
      <div className="task-table__body">
        {hourCount.map((value, hour) => {
          return (
            <div key={hour}>
              <div className="task-table__row task-table__row--hour">
                <div className="task-table__time">
                  {hour} {hour < 12 ? "AM" : "PM"}
                </div>
                {Array(7)
                  .fill(0)
                  .map((value, date) => {
                    return (
                      <div key={date} className="task-table__elem">
                        {isDataFetched ? <div className="task-table__chart">{taskGraph(hour, date)}</div> : null}
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyTask;

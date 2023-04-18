import { Dispatch, ReactElement, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import TaskCreate from "./TaskCreate";
import { RootState } from "../../store/rootReducer";
import { PlusSvg, XSvg } from "../svg";
import { SelectedDate } from "../types/interfaces/store";
import { DefaultDailyTask } from "../types/interfaces/task";
import { StoredTask } from "../types/types/common";
import { addPad } from "../utils/dateUtil";
import TaskDetail from "./TaskDetail";

interface DailyTaskListState {
  taskCreate: boolean;
  taskDetail: boolean;
  selectedTask: number | null;
}

interface DailyTaskListProp {
  xPos: number;
  yPos: number;
  tasks: DefaultDailyTask[] | undefined;
  toggle: boolean;
  setToggle: Dispatch<React.SetStateAction<boolean>>;
}

const DailyTaskList = ({ xPos, yPos, tasks, toggle, setToggle }: DailyTaskListProp): ReactElement => {
  const userTask: StoredTask = useSelector((state: RootState) => state.task.dailyTasks);
  const date: SelectedDate = useSelector((state: RootState) => state.date.selectedDate);

  const initialValue: DailyTaskListState = {
    taskCreate: false,
    taskDetail: false,
    selectedTask: null,
  };

  const [taskCreate, setTaskCreate] = useState<boolean>(initialValue.taskCreate);
  const [taskDetail, setTaskDetail] = useState<boolean>(initialValue.taskDetail);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(initialValue.selectedTask);

  const selectedTask = useMemo((): DefaultDailyTask | null => {
    return tasks ? tasks.filter((task) => task.taskId === selectedTaskId)[0] ?? null : null;
  }, [userTask, selectedTaskId]);

  useEffect(() => {
    if (!toggle) {
      setTaskCreate(initialValue.taskCreate);
      setTaskDetail(initialValue.taskDetail);
    }
  }, [toggle]);

  const closeTaskDetail = (): void => {
    setToggle(false);
  };

  const taskCreateToggle = (): void => {
    if (taskDetail) {
      setTaskDetail(false);
    }

    setTaskCreate(!taskCreate);
  };

  const taskDetailToggle = (): void => {
    if (taskCreate) {
      setTaskCreate(false);
    }

    setTaskDetail(!taskDetail);
  };

  const setTaskId = (taskId: number): void => {
    setSelectedTaskId(taskId);
  };

  const appearAnimation = (): string => {
    return toggle
      ? xPos < 3
        ? "task-detail-appear-left"
        : "task-detail-appear-right"
      : toggle === null
      ? ""
      : xPos < 3
      ? "task-detail-disappear-left"
      : "task-detail-disappear-right";
  };

  const childAppearAnimation = (condition: boolean): string => {
    return condition
      ? xPos > 4 || xPos === 2
        ? "task-creator-appear-right"
        : "task-creator-appear-left"
      : xPos > 4 || xPos === 2
      ? "task-creator-disappear-right"
      : "task-creator-disappear-left";
  };

  const stopEventBubbling = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
  };

  const drawTasks = (index: number): (JSX.Element | undefined)[] | undefined => {
    if (tasks) {
      const graph: (JSX.Element | undefined)[] = tasks.map((task, idx) => {
        const startHour: number = task.time.startAt.hour;
        const startMinute: number = task.time.startAt.minute;
        const startTotal = startHour * 60 + startMinute;
        const endHour: number = task.time.endAt.hour;
        const endMinute: number = task.time.endAt.minute;
        const endTotal: number = endHour * 60 + endMinute;

        const duration = (): string => {
          return addPad(startHour) + ":" + addPad(startMinute) + " ~ " + addPad(endHour) + ":" + addPad(endMinute);
        };

        const modalStyle = {
          height: `${(endTotal - startTotal) * 1.5 - 6}px`,
          top: `${startMinute * 1.5}px`,
          background: `${task.color}`,
        } as any;

        if (startHour === index) {
          return (
            <div
              key={idx}
              className="drawable-task"
              style={modalStyle}
              onClick={() => {
                setTaskId(task.taskId);
                taskDetailToggle();
              }}
            >
              <div className="drawable-task__duration">{duration()}</div>
              <div className="drawable-task__title">{task.title}</div>
            </div>
          );
        }
      });

      return graph;
    }
  };

  return (
    <div className={`daily-task ${appearAnimation()}`} style={{ top: `${yPos * -100}px` }} onClick={stopEventBubbling}>
      <div className="daily-task__header">
        <div className="daily-task__current-date">{date.moment.format("dddd, MM Do, YYYY")}</div>
        <div className="daily-task__options">
          <div onClick={taskCreateToggle}>
            <PlusSvg />
          </div>
          <div onClick={closeTaskDetail}>
            <XSvg />
          </div>
        </div>
      </div>
      <div className="daily-task__content invisible-scroll">
        {Array(24)
          .fill(0)
          .map((value, idx) => {
            return (
              <div key={idx} className="daily-task__timestamp">
                <div className="daily-task__time">
                  {idx}
                  {idx < 12 ? "AM" : "PM"}
                </div>
                <div className="daily-task__list">{drawTasks(idx)}</div>
              </div>
            );
          })}
      </div>
      <div className={`task-child-modal ${childAppearAnimation(taskCreate)}`}>
        <TaskCreate setTaskCreate={setTaskCreate} />
      </div>
      <div className={`task-child-modal ${childAppearAnimation(taskDetail)}`}>
        <TaskDetail selectedTask={selectedTask} setTaskDetail={setTaskDetail} />
      </div>
    </div>
  );
};

export default DailyTaskList;

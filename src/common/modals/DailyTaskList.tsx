import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import TaskCreate from "./TaskCreate";
import { RootState } from "../../store/rootReducer";
import { PlusSvg, XSvg } from "../svg";
import { DailyTaskListProp } from "../types/interfaces/props";
import { SelectedDate } from "../types/interfaces/store";
import { DefaultDailyTask } from "../types/interfaces/task";
import Types, { DateFormat, StoredTask } from "../types/types/common";
import { addPad, fullDateFormat } from "../utils/dateUtil";
import TaskDetail from "./TaskDetail";

const DailyTaskList = ({ idx, selectedDayTasks, taskDetailOn, setTaskDetailOn }: DailyTaskListProp): JSX.Element => {
  const userTask: StoredTask = useSelector((state: RootState) => state.task.dailyTasks);
  const date: SelectedDate = useSelector((state: RootState) => state.date.selectedDate);

  const initialValue = {
    taskCreate: false as boolean,
    taskDetail: false as boolean,
    selectedTask: null as number | null,
  } as any;

  const [taskCreate, setTaskCreate] = useState<boolean>(initialValue.taskCreate);
  const [taskDetail, setTaskDetail] = useState<boolean>(initialValue.taskDetail);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(initialValue.selectedTask);

  const selectedTask = useMemo((): DefaultDailyTask | null => {
    return selectedDayTasks ? selectedDayTasks.filter((task) => task.taskId === selectedTaskId)[0] ?? null : null;
  }, [userTask, selectedTaskId]);

  useEffect(() => {
    if (!taskDetailOn) {
      setTaskCreate(initialValue.taskCreate);
      setTaskDetail(initialValue.taskDetail);
    }
  }, [taskDetailOn]);

  const closeTaskDetail = (): void => {
    setTaskDetailOn(false);
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

  const drawTasks = (index: number): (JSX.Element | undefined)[] | undefined => {
    if (selectedDayTasks) {
      const graph: (JSX.Element | undefined)[] = selectedDayTasks.map((task, idx) => {
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
    <div className="daily-task">
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
      <div
        className={`task-child-modal ${
          taskCreate ? (idx > 4 || idx === 2 ? "task-creator-appear-right" : "task-creator-appear-left") : idx > 4 || idx === 2 ? "task-creator-disappear-right" : "task-creator-disappear-left"
        }`}
      >
        <TaskCreate />
      </div>
      <div
        className={`task-child-modal ${
          taskDetail ? (idx > 4 || idx === 2 ? "task-creator-appear-right" : "task-creator-appear-left") : idx > 4 || idx === 2 ? "task-creator-disappear-right" : "task-creator-disappear-left"
        }`}
      >
        <TaskDetail selectedTask={selectedTask} setTaskDetail={setTaskDetail} />
      </div>
    </div>
  );
};

export default DailyTaskList;

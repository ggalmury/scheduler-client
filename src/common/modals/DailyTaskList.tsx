import { CSSProperties, Dispatch, ReactElement, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import TaskCreate from "./TaskCreate";
import { RootState } from "../../store/rootReducer";
import { SelectedDate } from "../types/interfaces/store";
import { DefaultDailyTask } from "../types/interfaces/task";
import { StoredTask } from "../types/types/common";
import { addPad } from "../utils/dateUtil";
import BtnDefaultSmall from "../../components/molecules/button/BtnDefaultSmall";
import TaskDetail from "./TaskDetail";

interface DailyTaskListState {
  taskCreate: boolean;
  taskDetail: boolean;
  selectedTask: number | null;
}

interface DailyTaskListProp {
  tasks: DefaultDailyTask[] | undefined;
  toggle: boolean;
  setToggle: Dispatch<React.SetStateAction<boolean>>;
}

const DailyTaskList = ({ tasks, toggle, setToggle }: DailyTaskListProp): ReactElement => {
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

  const title = useMemo((): string => {
    const titleArr: string[] = ["Here's your plans!", "Stay hungry, stay foolish", "Asdf!", "Use Schedy", "What's your plan?", "Good day to plan"];
    const randomIndex: number = Math.floor(Math.random() * titleArr.length);

    return titleArr[randomIndex];
  }, [toggle]);

  const selectedTask = useMemo((): DefaultDailyTask | null => {
    return tasks ? tasks.filter((task) => task.taskId === selectedTaskId)[0] ?? null : null;
  }, [userTask, selectedTaskId]);

  useEffect((): void => {
    if (!toggle) {
      setTaskCreate(initialValue.taskCreate);
      setTaskDetail(initialValue.taskDetail);
    }
  }, [toggle]);

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

  const duration = (startHour: number, startMinute: number, endHour: number, endMinute: number): string => {
    return addPad(startHour) + ":" + addPad(startMinute) + " ~ " + addPad(endHour) + ":" + addPad(endMinute);
  };

  const stopEventBubbling = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
  };

  return (
    <div className={`daily-task ${toggle ? "task-list-appear" : "task-list-disappear"}`} onClick={stopEventBubbling}>
      <div className="daily-task__header">
        <div className="daily-task__desc">
          <div className="daily-task__title">{title}</div>
          <div className="daily-task__current-date">{date.moment.format("dddd, MM Do, YYYY")}</div>
        </div>
        <div className="daily-task__options">
          <BtnDefaultSmall name={`${taskCreate ? "cancle" : "create"}`} onClick={taskCreateToggle} />
        </div>
      </div>
      <div className="daily-task__content invisible-scroll">
        {tasks ? (
          tasks.map((task, idx) => {
            const color: CSSProperties = {
              borderLeft: `4px solid ${task.color}`,
            };

            return (
              <div
                key={idx}
                style={color}
                className="drawable-task"
                onClick={() => {
                  setTaskId(task.taskId);
                  taskDetailToggle();
                }}
              >
                <div className="drawable-task__title">{task.title}</div>
                <div className="drawable-task__duration">{duration(task.time.startAt.hour, task.time.startAt.minute, task.time.endAt.hour, task.time.endAt.minute)}</div>
              </div>
            );
          })
        ) : (
          <div className="drawable-task__no-task">No task exist!</div>
        )}
      </div>
      <TaskCreate toggle={taskCreate} setToggle={taskCreateToggle} />
      <TaskDetail selectedTask={selectedTask} toggle={taskDetail} setTaskDetail={setTaskDetail} />
    </div>
  );
};

export default DailyTaskList;

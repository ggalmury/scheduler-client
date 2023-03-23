import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import TaskCreate from "../../components/pages/task/TaskCreate";
import { RootState } from "../../store/rootReducer";
import { DailyTaskDetailProp } from "../types/interfaces/props";
import { DefaultDailyTask } from "../types/interfaces/task";
import { DateFormat, StoredTask } from "../types/types/common";
import { fullDateFormat } from "../utils/dateUtil";

const DailyTaskDetail = ({ idx }: DailyTaskDetailProp) => {
  const userTask: StoredTask = useSelector((state: RootState) => state.task.dailyTasks);
  const date = useSelector((state: RootState) => state.date.selectedDate);

  const initialState = {
    weeklyTask: new Map<number, DefaultDailyTask[]>() as Map<number, DefaultDailyTask[]>,
    selectedTaskCopy: null as { id: number; date: string } | null,
    createTodo: false as boolean,
    statOn: false as boolean,
    newTodo: "" as string,
    taskCreate: false as boolean,
  } as any;

  const [weeklyTask, setWeelkyTask] = useState<Map<number, DefaultDailyTask[]>>(initialState.weeklyTask);
  const [selectedTaskCopy, setSelectedTaskCopy] = useState<{ id: number; date: string } | null>(initialState.selectedTaskId);
  const [createTodo, setCreateTodo] = useState<boolean>(initialState.createTodo);
  const [statOn, setStatOn] = useState<boolean>(initialState.statOn);
  const [newTodo, setNewTodo] = useState<string>(initialState.newTodo);
  const [taskCreate, setTaskCreate] = useState<boolean>(initialState.taskCreate);

  const selectedDayTasks = useMemo((): DefaultDailyTask[] | undefined => {
    return userTask.get(fullDateFormat(date.moment));
  }, [date]);

  const taskCreateToggle = (event: React.MouseEvent<HTMLElement>): void => {
    setTaskCreate(!taskCreate);
  };

  return (
    <div className="daily-task">
      <div className="daily-task__list"></div>
      <button onClick={taskCreateToggle}>craete new task</button>
      <div
        className={`task-create-modal ${
          taskCreate ? (idx > 4 || idx === 2 ? "task-creator-appear-right" : "task-creator-appear-left") : idx > 4 || idx === 2 ? "task-creator-disappear-right" : "task-creator-disappear-left"
        }`}
      >
        <TaskCreate></TaskCreate>
      </div>
    </div>
  );
};

export default DailyTaskDetail;

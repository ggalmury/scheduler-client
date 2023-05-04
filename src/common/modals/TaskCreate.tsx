import React, { Dispatch, ReactElement, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TimePicker from "./TimePicker";
import { SelectedDate } from "../types/interfaces/store";
import { DefaultDailyTask, TaskTimeDetail } from "../types/interfaces/task";
import { DailyTaskCreateRequest } from "../types/interfaces/task";
import { StoredTask } from "../types/types/common";
import { TaskGroup, TaskGroupType, TaskPrivacy, TaskPrivacyType } from "../types/types/task";
import { normalFail } from "../utils/alert";
import { addPad, fullDateFormat } from "../utils/dateUtil";
import { fetchTaskCreate } from "../../store/apis/taskRequest";
import { RootState } from "../../store/rootReducer";
import { AnyAction } from "@reduxjs/toolkit";
import { clockDraw, description2Draw, descriptionDraw, locationDraw, xDraw } from "../utils/svgSources";
import { useInput } from "../../hooks/useInput";
import Svg from "../../components/shared/Svg";

interface TaskCreateProp {
  toggle: boolean;
  setToggle: () => void;
}

interface TaskCreateState {
  title: string;
  description: string;
  location: string;
  startTime: TaskTimeDetail;
  endTime: TaskTimeDetail;
  privacy: TaskPrivacyType;
  type: TaskGroupType;
  startTimePickerOn: boolean;
  endTimePickerOn: boolean;
  typeSelectBtn: string | null;
}

const TaskCreate = ({ toggle, setToggle }: TaskCreateProp): ReactElement => {
  const dispatch: Dispatch<AnyAction> = useDispatch();

  const userTask: StoredTask = useSelector((state: RootState) => state.task.dailyTasks);
  const date: SelectedDate = useSelector((state: RootState) => state.date.selectedDate);

  const startTimePicker = useRef<HTMLDivElement>(null);
  const endTimePicker = useRef<HTMLDivElement>(null);

  const initialValue: TaskCreateState = {
    title: "",
    description: "",
    location: "",
    startTime: { hour: 0, minute: 0 },
    endTime: { hour: 0, minute: 0 },
    privacy: TaskPrivacy.public,
    type: TaskGroup.basic,
    startTimePickerOn: false,
    endTimePickerOn: false,
    typeSelectBtn: null,
  };

  const [title, setTitle, resetTitle] = useInput<string>(initialValue.title);
  const [description, setDescription, resetDescription] = useInput<string>(initialValue.description);
  const [location, setLocation, resetLocation] = useInput<string>(initialValue.location);

  const [startTime, setStartTime] = useState<TaskTimeDetail>(initialValue.startTime);
  const [endTime, setEndTime] = useState<TaskTimeDetail>(initialValue.endTime);
  const [privacy, setPrivacy] = useState<TaskPrivacyType>(initialValue.privacy);
  const [type, setType] = useState<TaskGroupType>(initialValue.type);
  const [startTimePickerOn, setStartTimePickerOn] = useState<boolean>(initialValue.startTimePickerOn);
  const [endTimePickerOn, setEndTimePickerOn] = useState<boolean>(initialValue.endTimePickerOn);
  const [typeSelectBtn, setTypeSelectBtn] = useState<string | null>(initialValue.typeSelectBtn);

  useEffect(() => {
    if (startTimePicker.current && endTimePicker.current) {
      startTimePicker.current.style.display = startTimePickerOn ? "flex" : "none";
      endTimePicker.current.style.display = endTimePickerOn ? "flex" : "none";
    }
  }, [startTimePickerOn, endTimePickerOn]);

  const setInitialValue = (): void => {
    resetTitle();
    resetDescription();
    resetLocation();
    setStartTime(initialValue.startTime);
    setEndTime(initialValue.endTime);
    setPrivacy(initialValue.privacy);
    setType(initialValue.type);
    setStartTimePickerOn(initialValue.startTimePickerOn);
    setEndTimePickerOn(initialValue.endTimePickerOn);
    setTypeSelectBtn(initialValue.typeSelectBtn);
  };

  const getType = (taskGroup: TaskGroupType): void => {
    if (typeSelectBtn === taskGroup.type) {
      setTypeSelectBtn(null);
      setType(initialValue.type);
      return;
    }

    setTypeSelectBtn(taskGroup.type);
    setType(taskGroup);
  };

  const getPrivacy = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setPrivacy(event.target.value as TaskPrivacyType);
  };

  const submitTask = (): void => {
    if (startTime.hour > endTime.hour || (startTime.hour === endTime.hour && startTime.minute > endTime.minute)) {
      normalFail(undefined, "Start time cannot be greater then end time");
      return;
    }

    if (startTime.hour === endTime.hour && endTime.minute - startTime.minute < 15) {
      normalFail(undefined, "Minumum task duration is 15 minutes");
      return;
    }

    const taskTypeArr: DefaultDailyTask[] | undefined = userTask.get(fullDateFormat(date.moment));

    let checker: boolean = false;

    if (taskTypeArr) {
      taskTypeArr.forEach((task) => {
        const startAlready: number = task.time.startAt.hour * 60 + task.time.startAt.minute;
        const endAlready: number = task.time.endAt.hour * 60 + task.time.endAt.minute;
        const startNew: number = startTime.hour * 60 + startTime.minute;
        const endNew: number = endTime.hour * 60 + endTime.minute;

        if (
          (startNew > startAlready && startNew < endAlready) ||
          (endNew > startAlready && endNew < endAlready) ||
          (startNew > startAlready && endNew < endAlready) ||
          (startNew < startAlready && endNew > endAlready)
        ) {
          checker = true;
        }
      });

      if (checker) {
        normalFail(undefined, "Task already exist");
        return;
      }
    }

    const taskRequest: DailyTaskCreateRequest = {
      title,
      description,
      location,
      date: date.moment.format("YYYY-MM-DD"),
      time: { startAt: startTime, endAt: endTime },
      privacy,
      type,
    };

    dispatch(fetchTaskCreate(taskRequest) as any);
    setInitialValue();
    setToggle();
  };

  const changeStartTimePickerStatus = (): void => {
    setStartTimePickerOn(!startTimePickerOn);
  };

  const changeEndTimePickerStatus = (): void => {
    setEndTimePickerOn(!endTimePickerOn);
  };

  const stopEventBubbling = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
  };

  return (
    <div className={`task-create ${toggle ? "task-creator-appear" : "task-creator-disappear"}`}>
      <div className="task-create__header">Create new task</div>
      <div className="task-create__title task-create__box">
        <input className="task-create__input" placeholder="Title" value={title} onChange={setTitle} />
      </div>
      <div className="task-create__type task-create__box">
        <div className="task-create__type-header">Task Type</div>
        <div className="task-create__type-content">
          {Object.entries(TaskGroup).map(([key, task]) => (
            <div
              key={key}
              className={`task-create__type-elem ${typeSelectBtn === task.type && "btn-large"}`}
              style={{ backgroundColor: task.color }}
              onClick={() => {
                getType(task);
              }}
            >
              {task.type}
            </div>
          ))}
        </div>
      </div>
      <div className="task-create__time task-create__box">
        <div className="task-create__svg">
          <Svg width={24} draw={clockDraw} />
        </div>
        <div className="task-create__timebox">
          <div className="task-create__timepicker" onClick={changeStartTimePickerStatus}>
            From {`${addPad(startTime.hour)} : ${addPad(startTime.minute)}`}
            <div className="timepicker" ref={startTimePicker} onClick={stopEventBubbling}>
              <TimePicker setTime={setStartTime} setTimePickerOn={setStartTimePickerOn}></TimePicker>
            </div>
          </div>
          <div className="task-create__timepicker" onClick={changeEndTimePickerStatus}>
            To {`${addPad(endTime.hour)} : ${addPad(endTime.minute)}`}
            <div className="timepicker" ref={endTimePicker} onClick={stopEventBubbling}>
              <TimePicker setTime={setEndTime} setTimePickerOn={setEndTimePickerOn}></TimePicker>
            </div>
          </div>
        </div>
      </div>
      <div className="task-create__description task-create__box">
        <div className="task-create__svg">
          <Svg width={20} draw={description2Draw} />
        </div>
        <input className="task-create__input" value={description} placeholder="Description" onChange={setDescription} />
      </div>
      <div className="task-create__location task-create__box">
        <div className="task-create__svg">
          <Svg width={20} draw={locationDraw} />
        </div>
        <input className="task-create__input" value={location} placeholder="Location" onChange={setLocation} />
      </div>
      <div className="task-create__submit">
        <button className="btn-submit-big" onClick={submitTask}>
          submit
        </button>
      </div>
    </div>
  );
};

export default TaskCreate;

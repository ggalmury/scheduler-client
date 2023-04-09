import React, { Dispatch, ReactElement, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TimePicker from "./TimePicker";
import { ClockSvg, DescriptionSvg, LocationSvg, XSvg } from "../svg";
import { SelectedDate } from "../types/interfaces/store";
import { DefaultDailyTask, TaskTimeDetail } from "../types/interfaces/task";
import { DailyTaskCreateRequest } from "../types/interfaces/task";
import Types, { StoredTask } from "../types/types/common";
import { TaskPrivacy, TaskType } from "../types/types/task";
import { normalFail } from "../utils/alert";
import { addPad, fullDateFormat } from "../utils/dateUtil";
import { fetchTaskCreate } from "../../store/apis/taskRequest";
import { RootState } from "../../store/rootReducer";
import { AnyAction } from "@reduxjs/toolkit";
import { TaskCreateProp } from "../types/interfaces/props";
import { TaskCreateState } from "../types/interfaces/state";

const TaskCreate = ({ setTaskCreate }: TaskCreateProp): ReactElement => {
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
    type: TaskType.basic,
    startTimePickerOn: false,
    endTimePickerOn: false,
    typeSelectBtn: null,
  };

  const [title, setTitle] = useState<string>(initialValue.title);
  const [description, setDescription] = useState<string>(initialValue.description);
  const [location, setLocation] = useState<string>(initialValue.location);
  const [startTime, setStartTime] = useState<TaskTimeDetail>(initialValue.startTime);
  const [endTime, setEndTime] = useState<TaskTimeDetail>(initialValue.endTime);
  const [privacy, setPrivacy] = useState<Types<typeof TaskPrivacy>>(initialValue.privacy);
  const [type, setType] = useState<Types<typeof TaskType>>(initialValue.type);
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
    setTitle(initialValue.title);
    setDescription(initialValue.description);
    setLocation(initialValue.location);
    setStartTime(initialValue.startTime);
    setEndTime(initialValue.endTime);
    setPrivacy(initialValue.privacy);
    setType(initialValue.type);
    setStartTimePickerOn(initialValue.startTimePickerOn);
    setEndTimePickerOn(initialValue.endTimePickerOn);
    setTypeSelectBtn(initialValue.typeSelectBtn);
  };

  const taskCreateOff = (): void => {
    setTaskCreate(false);
  };

  const getTitle = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setTitle(event.target.value);
  };

  const getDescription = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setDescription(event.target.value);
  };

  const getLocation = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setLocation(event.target.value);
  };

  const getType = (type: Types<typeof TaskType>): void => {
    if (typeSelectBtn === type.type) {
      setTypeSelectBtn(null);
      setType(initialValue.type);
      return;
    }

    setTypeSelectBtn(type.type);
    setType(type);
  };

  const getPrivacy = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setPrivacy(event.target.value as Types<typeof TaskPrivacy>);
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
    <div className="task-create">
      <div className="task-create__header" onClick={taskCreateOff}>
        <XSvg />
      </div>
      <div className="task-create__input task-create__input--title">
        <textarea className="task-create__textarea task-create__textarea--title" placeholder="Title" value={title} onChange={getTitle}></textarea>
      </div>
      <div className="task-create__type">
        <div className="task-create__type-header">Task Type</div>
        <div className="task-create__type-content">
          {Object.entries(TaskType).map(([key, task]) => (
            <div
              key={key}
              className={`task-create__type-elem ${typeSelectBtn === task.type ? "btn-large" : ""}`}
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
      <div className="task-create__input task-create__input--extra">
        <div className="task-create__svg">
          <ClockSvg></ClockSvg>
        </div>
        <div className="task-create__timebox">
          <div className="task-create__time" onClick={changeStartTimePickerStatus}>
            From {`${addPad(startTime.hour)} : ${addPad(startTime.minute)}`}
            <div className="timepicker" ref={startTimePicker} onClick={stopEventBubbling}>
              <TimePicker setTime={setStartTime} setTimePickerOn={setStartTimePickerOn}></TimePicker>
            </div>
          </div>
          <div className="task-create__time" onClick={changeEndTimePickerStatus}>
            To {`${addPad(endTime.hour)} : ${addPad(endTime.minute)}`}
            <div className="timepicker" ref={endTimePicker} onClick={stopEventBubbling}>
              <TimePicker setTime={setEndTime} setTimePickerOn={setEndTimePickerOn}></TimePicker>
            </div>
          </div>
        </div>
      </div>
      <div className="task-create__input task-create__input--extra">
        <div className="task-create__svg">
          <DescriptionSvg></DescriptionSvg>
        </div>
        <textarea className="task-create__textarea task-create__textarea--extra" value={description} placeholder="Description" onChange={getDescription}></textarea>
      </div>
      <div className="task-create__input task-create__input--extra">
        <div className="task-create__svg">
          <LocationSvg></LocationSvg>
        </div>
        <textarea className="task-create__textarea task-create__textarea--extra" value={location} placeholder="Loaction" onChange={getLocation}></textarea>
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

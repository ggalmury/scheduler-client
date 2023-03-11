import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TimePicker from "../../../common/modals/TimePicker";
import { ClockSvg, DescriptionSvg, LocationSvg } from "../../../common/svg";
import { TaskTimeDetail } from "../../../common/types/interfaces/global";
import { TaskCreateRequest } from "../../../common/types/interfaces/requestData";
import { TaskResponse } from "../../../common/types/interfaces/responseData";
import { TaskPrivacy, Types } from "../../../common/types/types";
import { normalFail } from "../../../common/utils/alert";
import { addPad } from "../../../common/utils/dateUtil";
import { fetchTaskCreate } from "../../../store/apis/taskRequest";
import { RootState } from "../../../store/rootReducer";
import { TaskType } from "../../../common/types/types";

const TaskCreate = () => {
  const dispatch = useDispatch();

  const date = useSelector((state: RootState) => state.date.selectedDate);

  const startTimePicker = useRef<HTMLDivElement>(null);
  const endTimePicker = useRef<HTMLDivElement>(null);

  const [title, setTitle] = useState<string>("-");
  const [description, setDescription] = useState<string>("-");
  const [location, setLocation] = useState<string>("-");
  const [startTime, setStartTime] = useState<TaskTimeDetail>({ hour: 0, minute: 0 });
  const [endTime, setEndTime] = useState<TaskTimeDetail>({ hour: 0, minute: 0 });
  const [privacy, setPrivacy] = useState<Types<typeof TaskPrivacy>>(TaskPrivacy.public);
  const [type, setType] = useState<Types<typeof TaskType>>(TaskType.basic);
  const [startTimePickerOn, setStartTimePickerOn] = useState<boolean>(false);
  const [endTimePickerOn, setEndTimePickerOn] = useState<boolean>(false);

  useEffect(() => {
    if (startTimePicker.current && endTimePicker.current) {
      startTimePicker.current.style.display = startTimePickerOn ? "flex" : "none";
      endTimePicker.current.style.display = endTimePickerOn ? "flex" : "none";
    }
  }, [startTimePickerOn, endTimePickerOn]);

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
    setType(type);
  };

  const getPrivacy = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setPrivacy(event.target.value as Types<typeof TaskPrivacy>);
  };

  const submitTask = (event: React.MouseEvent<HTMLElement>): void => {
    if (startTime.hour > endTime.hour || (startTime.hour === endTime.hour && startTime.minute > endTime.minute)) {
      normalFail(undefined, "Start time cannot be greater then end time");
      return;
    }

    if (startTime.hour === endTime.hour && endTime.minute - startTime.minute < 20) {
      normalFail(undefined, "Minumum task duration is 20 minutes");
      return;
    }

    let taskTypeArr: TaskResponse[] = [];
    let checker: boolean = false;

    taskTypeArr.forEach((task) => {
      const startAlready: number = task.time.startAt.hour * 60 + task.time.startAt.minute;
      const endAlready: number = task.time.endAt.hour * 60 + task.time.endAt.minute;
      const startNew: number = startTime.hour * 60 + startTime.minute;
      const endNew: number = endTime.hour * 60 + endTime.minute;

      if (
        (startNew >= startAlready && startNew <= endAlready) ||
        (endNew >= startAlready && endNew <= endAlready) ||
        (startNew >= startAlready && endNew <= endAlready) ||
        (startNew <= startAlready && endNew >= endAlready)
      ) {
        checker = true;
      }
    });

    if (checker) {
      normalFail(undefined, "Task already exist");
      return;
    }

    const taskRequest: TaskCreateRequest = {
      title,
      description,
      location,
      date: new Date(date.moment.format("YYYY-MM-DD")),
      time: { startAt: startTime, endAt: endTime },
      privacy,
      type,
    };

    dispatch(fetchTaskCreate(taskRequest) as any);
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
      <div className="task-create__intro">Create new task</div>
      <div className="task-create__input task-create__input--title">
        <textarea className="task-create__textarea task-create__textarea--title" placeholder="Title" onChange={getTitle}></textarea>
      </div>
      <div className="task-create__type">
        <div className="task-create__type-header">Task Type</div>
        <div className="task-create__type-content">
          <div
            className="task-create__type-elem"
            style={{ backgroundColor: TaskType.basic.color }}
            onClick={() => {
              getType(TaskType.basic);
            }}
          >
            {TaskType.basic.type}
          </div>
          <div
            className="task-create__type-elem"
            style={{ backgroundColor: TaskType.meeting.color }}
            onClick={() => {
              getType(TaskType.meeting);
            }}
          >
            {TaskType.meeting.type}
          </div>
          <div
            className="task-create__type-elem"
            style={{ backgroundColor: TaskType.personal.color }}
            onClick={() => {
              getType(TaskType.personal);
            }}
          >
            {TaskType.personal.type}
          </div>
          <div
            className="task-create__type-elem"
            style={{ backgroundColor: TaskType.work.color }}
            onClick={() => {
              getType(TaskType.work);
            }}
          >
            {TaskType.work.type}
          </div>
        </div>
      </div>
      <div className="task-create__input task-create__input--extra">
        <div className="task-create__svg">
          <ClockSvg></ClockSvg>
        </div>
        <div className="task-create__time" onClick={changeStartTimePickerStatus}>
          <span>From {`${addPad(startTime.hour)} : ${addPad(startTime.minute)}`}</span>
          <div className="timepicker" ref={startTimePicker} onClick={stopEventBubbling}>
            <TimePicker setTime={setStartTime}></TimePicker>
          </div>
        </div>
        <div className="task-create__time" onClick={changeEndTimePickerStatus}>
          <span>To {`${addPad(endTime.hour)} : ${addPad(endTime.minute)}`}</span>
          <div className="timepicker" ref={endTimePicker} onClick={stopEventBubbling}>
            <TimePicker setTime={setEndTime}></TimePicker>
          </div>
        </div>
      </div>
      {/* <select className="task-create__select-box" name="privacy" onChange={getPrivacy}>
          <option value={TaskPrivacy.PUBLIC}>{TaskPrivacy.PUBLIC}</option>
          <option value={TaskPrivacy.PRIVATE}>{TaskPrivacy.PRIVATE}</option>
          <option value={TaskPrivacy.RELEVANT}>{TaskPrivacy.RELEVANT}</option>
        </select>
      </div> */}
      <div className="task-create__input task-create__input--extra">
        <div className="task-create__svg">
          <DescriptionSvg></DescriptionSvg>
        </div>
        <textarea className="task-create__textarea task-create__textarea--extra" placeholder="Description" onChange={getDescription}></textarea>
      </div>
      <div className="task-create__input task-create__input--extra">
        <div className="task-create__svg">
          <LocationSvg></LocationSvg>
        </div>
        <textarea className="task-create__textarea task-create__textarea--extra" placeholder="Loaction" onChange={getLocation}></textarea>
      </div>
      <div className="task-create__submit task-create__btn-submit">
        <button className="btn-submit-small" onClick={submitTask}>
          submit
        </button>
      </div>
    </div>
  );
};

export default TaskCreate;

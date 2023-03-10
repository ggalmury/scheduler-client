import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TimePicker from "../../../common/modals/TimePicker";
import { TaskColor, TaskPrivacy, TaskType } from "../../../common/types/enums/task";
import { TaskTimeDetail } from "../../../common/types/interfaces/global";
import { TaskCreateRequest } from "../../../common/types/interfaces/requestData";
import { TaskResponse } from "../../../common/types/interfaces/responseData";
import { normalFail } from "../../../common/utils/alert";
import { fetchTaskCreate } from "../../../store/apis/taskRequest";
import { RootState } from "../../../store/rootReducer";

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
  const [color, setColor] = useState<TaskColor>(TaskColor.BASIC);
  const [privacy, setPrivacy] = useState<TaskPrivacy>(TaskPrivacy.PUBLIC);
  const [type, setType] = useState<TaskType>(TaskType.BASIC);
  const [startTimePickerOn, setStartTimePickerOn] = useState<boolean>(false);
  const [endTimePickerOn, setEndTimePickerOn] = useState<boolean>(false);

  useEffect(() => {
    console.log("2");
    if (startTimePicker.current && endTimePicker.current) {
      startTimePicker.current.style.display = startTimePickerOn ? "flex" : "none";
      endTimePicker.current.style.display = endTimePickerOn ? "flex" : "none";
    }
  }, [startTimePickerOn, endTimePickerOn]);

  useEffect(() => {
    console.log(startTime);
  }, [startTime]);

  const getTitle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  const getDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const getLocation = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocation(event.target.value);
  };

  const getType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const type: string = event.target.value;

    switch (type) {
      case TaskType.BASIC:
        setType(TaskType.BASIC);
        setColor(TaskColor.BASIC);
        break;
      case TaskType.WORK:
        setType(TaskType.WORK);
        setColor(TaskColor.WORK);
        break;
      case TaskType.MEETING:
        setType(TaskType.MEETING);
        setColor(TaskColor.MEETING);
        break;
      case TaskType.PERSONAL:
        setType(TaskType.PERSONAL);
        setColor(TaskColor.PERSONAL);
        break;
    }
  };

  const getPrivacy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPrivacy(event.target.value as TaskPrivacy);
  };

  const submitTask = (event: React.MouseEvent<HTMLElement>) => {
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
      color,
      location,
      date: new Date(date.moment.format("YYYY-MM-DD")),
      time: { startAt: startTime, endAt: endTime },
      privacy,
      type,
    };

    dispatch(fetchTaskCreate(taskRequest) as any);
  };

  return (
    <div className="task-create">
      <div className="task-create__intro">Create new task</div>
      <div className="task-create__input task-create__input--title input-task">
        <textarea className="task-create__textarea" placeholder="Title" onChange={getTitle}></textarea>
      </div>
      <div className="task-create__input task-create__input--description input-task">
        <textarea className="task-create__textarea" placeholder="Description" onChange={getDescription}></textarea>
      </div>
      <div className="task-create__time-box">
        <div
          className="task-create__time"
          onClick={() => {
            setStartTimePickerOn(!startTimePickerOn);
          }}
        >
          <span>start</span>
          <div className="timepicker" ref={startTimePicker}>
            <TimePicker setTime={setStartTime}></TimePicker>
          </div>
        </div>
        <div
          className="task-create__time"
          onClick={() => {
            setEndTimePickerOn(!endTimePickerOn);
          }}
        >
          <span>end</span>
          <div className="timepicker" ref={endTimePicker}>
            <TimePicker setTime={setEndTime}></TimePicker>
          </div>
        </div>
        {/* <input className="task-create__time" type="time" placeholder="Start time" onChange={getStartTime}></input>
        <input className="task-create__time" type="time" placeholder="End time" onChange={getEndTime}></input> */}
      </div>
      <div className="task-create__input task-create__input--location input-task">
        <textarea className="task-create__textarea" placeholder="Loaction" onChange={getLocation}></textarea>
      </div>
      <div className="task-create__select">
        <select className="task-create__select-box" name="type" onChange={getType}>
          <option value={TaskType.BASIC}>{TaskType.BASIC}</option>
          <option value={TaskType.WORK}>{TaskType.WORK}</option>
          <option value={TaskType.MEETING}>{TaskType.MEETING}</option>
          <option value={TaskType.PERSONAL}>{TaskType.PERSONAL}</option>
        </select>
        <select className="task-create__select-box" name="privacy" onChange={getPrivacy}>
          <option value={TaskPrivacy.PUBLIC}>{TaskPrivacy.PUBLIC}</option>
          <option value={TaskPrivacy.PRIVATE}>{TaskPrivacy.PRIVATE}</option>
          <option value={TaskPrivacy.RELEVANT}>{TaskPrivacy.RELEVANT}</option>
        </select>
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

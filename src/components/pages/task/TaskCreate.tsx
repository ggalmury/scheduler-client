import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TaskColor, TaskPrivacy, TaskType } from "../../../common/enums/task";
import { TaskTimeDetail } from "../../../common/interfaces/global";
import { TodayTasksProp } from "../../../common/interfaces/props";
import { TaskCreateRequest } from "../../../common/interfaces/requestData";
import { TaskResponse } from "../../../common/interfaces/responseData";
import { Account } from "../../../common/interfaces/store";
import { normalFail } from "../../../common/utils/alert";
import { fetchTaskCreate } from "../../../store/axios/taskRequest";
import { RootState } from "../../../store/rootReducer";

const TaskCreate = ({ todayTasks }: TodayTasksProp) => {
  const dispatch = useDispatch();
  const userAccount: Account = useSelector((state: RootState) => state.login.account);
  const date = useSelector((state: RootState) => state.date.selectedDate);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [startTime, setStartTime] = useState<TaskTimeDetail>({ hour: 0, minute: 0 });
  const [endTime, setEndTime] = useState<TaskTimeDetail>({ hour: 0, minute: 0 });
  const [color, setColor] = useState<TaskColor>(TaskColor.OFFICIAL_TASK);
  const [privacy, setPrivacy] = useState<TaskPrivacy>(TaskPrivacy.PUBLIC);
  const [type, setType] = useState<TaskType>(TaskType.OFFICIAL_TASK);

  const getTitle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  const getDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const getLocation = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocation(event.target.value);
  };

  const getStartTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time: string = event.target.value;
    const timeArray: string[] = time.split(":");
    const newStartTime = { hour: parseInt(timeArray[0]), minute: parseInt(timeArray[1]) };

    setStartTime(newStartTime);
  };

  const getEndTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time: string = event.target.value;
    const timeArray: string[] = time.split(":");
    const newEndTime = { hour: parseInt(timeArray[0]), minute: parseInt(timeArray[1]) };

    setEndTime(newEndTime);
  };

  const getType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === TaskType.OFFICIAL_TASK) {
      setType(TaskType.OFFICIAL_TASK);
      setColor(TaskColor.OFFICIAL_TASK);
    } else {
      setType(TaskType.PERSONAL_TASK);
      setColor(TaskColor.PERSONAL_TASK);
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

    switch (type) {
      case TaskType.OFFICIAL_TASK:
        taskTypeArr = todayTasks.official;
        break;
      case TaskType.PERSONAL_TASK:
        taskTypeArr = todayTasks.personal;
        break;
    }

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
      uid: userAccount.uid,
      userName: userAccount.userName,
      email: userAccount.email,
      title,
      description,
      color,
      location,
      date: date.moment.toDate(),
      time: { startAt: startTime, endAt: endTime },
      privacy,
      type,
    };

    dispatch(fetchTaskCreate(taskRequest) as any);
  };

  return (
    <div className="task-create">
      <div className="task-create__content">
        <div className="task-create__intro">Create new task</div>
        <textarea className="task-create__input task-create__input--title input-task" placeholder="Title" onChange={getTitle}></textarea>
        <textarea className="task-create__input task-create__input--description input-task" placeholder="Description" onChange={getDescription}></textarea>
        <div className="task-create__time-box">
          <input className="task-create__time" type="time" placeholder="Start time" onChange={getStartTime}></input>
          <input className="task-create__time" type="time" placeholder="End time" onChange={getEndTime}></input>
        </div>
        <textarea className="task-create__input task-create__input--location input-task" placeholder="Loaction" onChange={getLocation}></textarea>
        <div className="task-create__select">
          <select className="task-create__select-box" name="type" onChange={getType}>
            <option value={TaskType.OFFICIAL_TASK}>{TaskType.OFFICIAL_TASK}</option>
            <option value={TaskType.PERSONAL_TASK}>{TaskType.PERSONAL_TASK}</option>
          </select>
          <select className="task-create__select-box" name="privacy" onChange={getPrivacy}>
            <option value={TaskPrivacy.PUBLIC}>{TaskPrivacy.PUBLIC}</option>
            <option value={TaskPrivacy.PRIVATE}>{TaskPrivacy.PRIVATE}</option>
            <option value={TaskPrivacy.GROUP}>{TaskPrivacy.GROUP}</option>
          </select>
        </div>
        <div className="task-create__submit task-create__btn-submit">
          <button className="btn-submit-small" onClick={submitTask}>
            submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCreate;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { TaskTimeDetail } from "../../../common/interfaces/global";
import { CreateTaskToggleProp } from "../../../common/interfaces/props";
import { TaskCreateRequest } from "../../../common/interfaces/requestData";
import { Account } from "../../../common/interfaces/store";
import { getMoment } from "../../../common/utils/dateUtil";
import { fetchTaskCreate } from "../../../store/axios/taskRequest";
import { RootState } from "../../../store/rootReducer";

const TaskCreateModal = ({ createTaskModal, setCreateTaskModal }: CreateTaskToggleProp) => {
  const dispatch = useDispatch();
  const userAccount: Account = useSelector((state: RootState) => state.login.account);
  const date = useSelector((state: RootState) => state.date.selectedDate);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [startTime, setStartTime] = useState<TaskTimeDetail>({ hour: 0, minute: 0 });
  const [endTime, setEndTime] = useState<TaskTimeDetail>({ hour: 0, minute: 0 });
  const [color, setColor] = useState<string>("#88d3ce");
  const [privacy, setPrivacy] = useState<string>("public");

  useEffect(() => {}, [createTaskModal]);

  const getTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const getDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const getLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const getColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  const getPrivacy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPrivacy(event.target.value);
  };

  const submitTask = (event: React.MouseEvent<HTMLElement>) => {
    if (startTime.hour > endTime.hour || (startTime.hour === endTime.hour && startTime.minute > endTime.minute)) {
      alert("Start time cannot be greater then end time");
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
    };

    dispatch(fetchTaskCreate(taskRequest) as any);

    Swal.fire({ icon: "success", text: "Task successfully created", showCancelButton: false, confirmButtonText: "confirm" }).then((res) => {
      setCreateTaskModal(false);
    });
  };

  return (
    <div id="task-create">
      <input placeholder="title" onChange={getTitle}></input>
      <input placeholder="description" onChange={getDescription}></input>
      <input placeholder="loaction" onChange={getLocation}></input>
      <input type="time" placeholder="start time" onChange={getStartTime}></input>
      <input type="time" placeholder="end time" onChange={getEndTime}></input>
      <input type="color" placeholder="color" onChange={getColor}></input>
      <select name="privacy" onChange={getPrivacy}>
        <option value="public">public</option>
        <option value="private">private</option>
        <option value="group">group</option>
      </select>
      <button onClick={submitTask}>submit</button>
    </div>
  );
};

export default TaskCreateModal;

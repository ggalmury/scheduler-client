import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTodoCreate } from "../../store/apis/taskRequest";
import { CheckSvg, ClockSvg, DescriptionSvg, LocationSvg, ScopeSvg, XSvg } from "../svg";
import { TaskDetailProp } from "../types/interfaces/props";
import { TodoCreateRequest } from "../types/interfaces/todo";
import { addPad } from "../utils/dateUtil";

const TaskDetail = ({ selectedTask, setTaskDetail }: TaskDetailProp): JSX.Element => {
  const dispatch: Dispatch<AnyAction> = useDispatch();

  const initialValue = {
    createTodo: false as boolean,
    todoDescription: "" as string,
  } as any;

  const [createTodo, setCreateTodo] = useState<boolean>(initialValue.createTodo);
  const [todoDescription, setTodoDescription] = useState<string>(initialValue.todoDescription);

  const taskDetailToggle = (): void => {
    setTaskDetail(false);
  };

  const todoCreateToggle = (): void => {
    setCreateTodo(!createTodo);
  };

  const todoBox = (): JSX.Element[] | undefined => {
    return selectedTask?.createdTodo.map((task, idx) => {
      return (
        <div key={idx} className="todolist__list">
          <div className="todolist__description">{task.description}</div>
        </div>
      );
    });
  };

  const getTodoDescription = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setTodoDescription(event.target.value);
  };

  const submitTodo = (): void => {
    if (selectedTask && todoDescription !== "") {
      const todoRequest: TodoCreateRequest = {
        taskId: selectedTask.taskId,
        description: todoDescription,
        date: selectedTask.date,
      };

      dispatch(fetchTodoCreate(todoRequest) as any);
    }

    setTodoDescription("");
  };

  return (
    <Fragment>
      {selectedTask ? (
        <div className="task-detail" style={{ border: `3px solid ${selectedTask.color}` }}>
          <div className="task-detail__exp">
            <div className="task-detail__header">
              <div className="task-detail__header--title invisible-scroll">{selectedTask.title}</div>
              <div className="task-detail__svg" onClick={taskDetailToggle}>
                <XSvg />
              </div>
            </div>
            <div className="task-detail__content">
              <div className="task-detail__svg">
                <ClockSvg />
              </div>
              {addPad(selectedTask.time.startAt.hour)} : {addPad(selectedTask.time.startAt.minute)} &nbsp; - &nbsp;{addPad(selectedTask.time.endAt.hour)} :{addPad(selectedTask.time.endAt.minute)}
            </div>
            <div className="task-detail__content">
              <div className="task-detail__svg">
                <LocationSvg />
              </div>
              <div className="invisible-scroll">{selectedTask.location}</div>
            </div>
            <div className="task-detail__content">
              <div className="task-detail__svg">
                <ScopeSvg />
              </div>
              <div className="invisible-scroll">{selectedTask.privacy}</div>
            </div>
            <div className="task-detail__content">
              <div className="task-detail__svg">
                <DescriptionSvg />
              </div>
              <div className="invisible-scroll">{selectedTask.description}</div>
            </div>
            <hr />
          </div>
          <div className="todolist">
            <div className="todolist__header">
              Todolist
              <button className="btn-submit-small task-detail__btn--create" onClick={todoCreateToggle}>
                create
              </button>
            </div>
            <div className="todolist__body invisible-scroll">
              <div className={`todolist__new-todo ${createTodo ? "slide-down" : "slide-up"}`}>
                <div className="todolist__input">
                  <textarea className="todolist__textarea" onChange={getTodoDescription}></textarea>
                </div>
                <div className="task-detail__svg" onClick={submitTodo}>
                  <CheckSvg />
                </div>
              </div>
              <div>{todoBox()}</div>
            </div>
          </div>
          <div className="todolist__footer">
            <button className="btn-submit-small task-detail__btn--modify">modify</button>
            <button className="btn-submit-small task-detail__btn--delete">delete</button>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default TaskDetail;
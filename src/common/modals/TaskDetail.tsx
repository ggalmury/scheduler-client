import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch, Fragment, ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTaskDelete, fetchTodoCreate, fetchTodoDelete } from "../../store/apis/taskRequest";
import { DailyTaskDeleteOrDoneRequest, DefaultDailyTask } from "../types/interfaces/task";
import { DefaultTodo, TodoCreateRequest, TodoDeleteRequest } from "../types/interfaces/todo";
import { addPad } from "../utils/dateUtil";
import Svg from "../../components/shared/Svg";
import { clockDraw, description2Draw, descriptionDraw, locationDraw, plusDraw, scopeDraw, tagDraw, trashDraw, xDraw } from "../utils/svgSources";

interface TaskDetailProp {
  selectedTask: DefaultDailyTask | null;
  toggle: boolean;
  setTaskDetail: Dispatch<React.SetStateAction<boolean>>;
}

interface TaskDetailState {
  createTodo: boolean;
  todoDescription: string;
}

const TaskDetail = ({ selectedTask, toggle, setTaskDetail }: TaskDetailProp): ReactElement => {
  const dispatch: Dispatch<AnyAction> = useDispatch();

  const initialValue: TaskDetailState = {
    createTodo: false,
    todoDescription: "",
  };

  const [createTodo, setCreateTodo] = useState<boolean>(initialValue.createTodo);
  const [todoDescription, setTodoDescription] = useState<string>(initialValue.todoDescription);

  const taskDetailOff = (): void => {
    setTaskDetail(false);
  };

  const todoCreateToggle = (): void => {
    setCreateTodo(!createTodo);
  };

  const todoBox = (): ReactElement[] | undefined => {
    return selectedTask?.createdTodo.map((todo, idx) => {
      return (
        <div key={idx} className="todolist__todobox">
          <div className="todolist__text">{todo.description}</div>
          <div
            className="todolist__svg"
            onClick={() => {
              deleteTodo(todo);
            }}
          >
            <Svg width={24} draw={trashDraw} />
          </div>
        </div>
      );
    });
  };

  const getTodoDescription = (event: React.ChangeEvent<HTMLInputElement>): void => {
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

  const deleteTask = (): void => {
    if (selectedTask) {
      const taskDeleteRequest: DailyTaskDeleteOrDoneRequest = { taskId: selectedTask.taskId };

      dispatch(fetchTaskDelete(taskDeleteRequest) as any);

      setTaskDetail(false);
    }
  };

  const deleteTodo = (todo: DefaultTodo): void => {
    const todoDeleteRequest: TodoDeleteRequest = {
      todoId: todo.todoId,
    };

    dispatch(fetchTodoDelete(todoDeleteRequest) as any);
  };

  return (
    <Fragment>
      {selectedTask && (
        <div className={`task-detail ${toggle ? "task-creator-appear" : "task-creator-disappear"}`} style={{ backgroundColor: `${selectedTask.color}` }}>
          <div className="task-detail__exp">
            <div className="task-detail__title">
              <div className="task-detail__svg task-detail__svg--title">
                <Svg width={24} draw={tagDraw} />
              </div>
              <div className="task-detail__title-word invisible-scroll">{selectedTask.title}</div>
            </div>
            <div className="task-detail__common">
              <div className="task-detail__svg">
                <Svg width={24} draw={clockDraw} />
              </div>
              <div>
                {addPad(selectedTask.time.startAt.hour)} : {addPad(selectedTask.time.startAt.minute)} &nbsp; - &nbsp;{addPad(selectedTask.time.endAt.hour)} :&nbsp;
                {addPad(selectedTask.time.endAt.minute)}
              </div>
            </div>
            <div className="task-detail__common">
              <div className="task-detail__svg">
                <Svg width={24} draw={locationDraw} />
              </div>
              <div className="invisible-scroll">{selectedTask.location}</div>
            </div>
            <div className="task-detail__common">
              <div className="task-detail__svg">
                <Svg width={24} draw={scopeDraw} />
              </div>
              <div className="invisible-scroll">{selectedTask.privacy}</div>
            </div>
            <div className="task-detail__description">
              <div className="task-detail__svg task-detail__svg--description">
                <Svg width={24} draw={description2Draw} />
              </div>
              <div className="task-detail__description-word invisible-scroll">{selectedTask.description}</div>
            </div>
          </div>
          <div className="todolist">
            <div className="todolist__header">
              <div>Todolist</div>
              <button className="btn-submit-small todolist__btn-create" onClick={todoCreateToggle}>
                create
              </button>
            </div>
            <div className="todolist__body invisible-scroll">
              <div className={`todolist__todo-create-box ${createTodo ? "slide-down" : "slide-up"}`}>
                <div className="todolist__todobox">
                  <div className="todolist__text">
                    <input onChange={getTodoDescription} />
                  </div>
                  <div className="todolist__svg" onClick={submitTodo}>
                    <Svg width={24} draw={plusDraw} />
                  </div>
                </div>
              </div>
              <div className="todolist__todo-create-box">{todoBox()}</div>
            </div>
          </div>
          <div className="task-detail__footer">
            <div>
              <button className="btn-submit-small" onClick={taskDetailOff}>
                confirm
              </button>
              <button className="btn-submit-small btn-submit-small--negative" onClick={deleteTask}>
                delete
              </button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default TaskDetail;

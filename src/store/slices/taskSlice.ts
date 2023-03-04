import { createSlice } from "@reduxjs/toolkit";
import { CustomErrorMessage } from "../../common/types/enums/errorCode";
import { TaskResponse, TodoData } from "../../common/types/interfaces/responseData";
import { TaskInitialState } from "../../common/types/interfaces/store";
import { fetchTaskCreate, fetchTaskDelete, fetchTaskDone, fetchTaskList, fetchTodoCreate, fetchTodoDelete } from "../apis/taskRequest";
import { enableMapSet } from "immer";
import { normalFail, normalSuccess } from "../../common/utils/alert";

const initialState: TaskInitialState = {
  tasks: new Map(),
};

const commonReject = (action: any) => {
  if (action.error.message === CustomErrorMessage.SESSION_EXPIRED) {
    normalFail("Oops!", "Session expired. Please log in").then((res) => {
      window.location.href = "/";
    });

    return;
  }

  normalFail("Oops!", "Something went wrong. Please try again");
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTaskCreate.fulfilled, (state, action) => {
        const newTaskDate: number = new Date(action.payload.date).getDate();
        const taskArray: TaskResponse[] | undefined = state.tasks.get(newTaskDate);

        if (taskArray) {
          taskArray.push(action.payload);
        } else {
          state.tasks.set(newTaskDate, [action.payload]);
        }

        normalSuccess(undefined, "Task successfully created");
      })
      .addCase(fetchTaskCreate.rejected, (state, action) => {
        commonReject(action);
      })
      .addCase(fetchTaskList.fulfilled, (state, action) => {
        enableMapSet();
        const tasks: TaskResponse[] = action.payload;
        const taskByDate: Map<number, TaskResponse[]> = new Map<number, TaskResponse[]>();

        for (let i = 0; i < 31; i++) {
          const result: TaskResponse[] = tasks.filter((task) => new Date(task.date).getDate() === i);

          if (result.length !== 0) {
            taskByDate.set(i, result);
          }
        }

        state.tasks = taskByDate;
      })
      .addCase(fetchTaskList.rejected, (state, action) => {
        commonReject(action);
      })
      .addCase(fetchTaskDelete.fulfilled, (state, action) => {
        const newTaskDate: number = new Date(action.payload.date).getDate();
        const taskArray: TaskResponse[] | undefined = state.tasks.get(newTaskDate);

        if (taskArray) {
          const newArr: TaskResponse[] = taskArray.filter((task) => task.taskId !== action.payload.taskId);

          state.tasks.set(newTaskDate, newArr);
        } else {
          normalFail("Oops!", "Task not exist");
          return;
        }

        normalSuccess(undefined, "Task successfully deleted");
      })
      .addCase(fetchTaskDelete.rejected, (state, action) => {
        commonReject(action);
      })
      .addCase(fetchTaskDone.fulfilled, (state, action) => {
        const newTaskDate: number = new Date(action.payload.date).getDate();
        const taskArray: TaskResponse[] | undefined = state.tasks.get(newTaskDate);

        if (taskArray) {
          taskArray.forEach((task) => {
            if (task.taskId === action.payload.taskId) {
              task.state = action.payload.state;
              task.color = action.payload.color;
            }
          });
        } else {
          normalFail("Oops!", "Task not exist");
          return;
        }

        normalSuccess(undefined, "Task clear!");
      })
      .addCase(fetchTaskDone.rejected, (state, action) => {
        commonReject(action);
      })
      .addCase(fetchTodoCreate.fulfilled, (state, action) => {
        const taskId: number = action.payload.createdTask.taskId;

        const todoData: TodoData = {
          todoId: action.payload.todoId,
          uid: action.payload.uid,
          description: action.payload.description,
        };

        state.tasks.forEach((task) => {
          task.forEach((t) => {
            if (t.taskId === taskId) {
              t.createdTodo.push(todoData);
            }
          });
        });
      })
      .addCase(fetchTodoCreate.rejected, (state, action) => {
        commonReject(action);
      })
      .addCase(fetchTodoDelete.fulfilled, (state, action) => {
        const newTodoDate: number = new Date(action.payload.date).getDate();
        const todoId: number = action.payload.todoId;

        const tasks: TaskResponse[] | undefined = state.tasks.get(newTodoDate);

        if (tasks) {
          tasks.forEach((task) => {
            task.createdTodo = task.createdTodo.filter((elem) => elem.todoId !== todoId);
          });
        }
      })
      .addCase(fetchTodoDelete.rejected, (state, action) => {
        commonReject(action);
      });
  },
});

export default taskSlice.reducer;

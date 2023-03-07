import { createSlice, current, TaskResolved } from "@reduxjs/toolkit";
import { CustomErrorMessage } from "../../common/types/enums/errorCode";
import { TaskResponse, TodoData } from "../../common/types/interfaces/responseData";
import { TaskInitialState } from "../../common/types/interfaces/store";
import { fetchTaskCreate, fetchTaskDelete, fetchTaskDone, fetchTaskList, fetchTodoCreate, fetchTodoDelete } from "../apis/taskRequest";
import { normalFail, normalSuccess } from "../../common/utils/alert";

const initialState: TaskInitialState = {
  tasks: [],
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
        state.tasks.push(action.payload);

        normalSuccess(undefined, "Task successfully created");
      })
      .addCase(fetchTaskCreate.rejected, (state, action) => {
        commonReject(action);
      })
      .addCase(fetchTaskList.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(fetchTaskList.rejected, (state, action) => {
        commonReject(action);
      })
      .addCase(fetchTaskDelete.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.taskId !== action.payload.taskId);

        normalSuccess(undefined, "Task successfully deleted");
      })
      .addCase(fetchTaskDelete.rejected, (state, action) => {
        commonReject(action);
      })
      .addCase(fetchTaskDone.fulfilled, (state, action) => {
        state.tasks.forEach((task) => {
          if (task.taskId === action.payload.taskId) {
            task.state = action.payload.state;
            task.color = action.payload.color;
          }
        });

        normalSuccess(undefined, "Task clear!");
      })
      .addCase(fetchTaskDone.rejected, (state, action) => {
        commonReject(action);
      })
      .addCase(fetchTodoCreate.fulfilled, (state, action) => {
        const taskId: number = action.payload.createdTask.taskId;

        const todoData: TodoData = {
          taskId,
          todoId: action.payload.todoId,
          uid: action.payload.uid,
          description: action.payload.description,
        };

        state.tasks.forEach((task) => {
          if (task.taskId === taskId) {
            task.createdTodo.push(todoData);
          }
        });
      })
      .addCase(fetchTodoCreate.rejected, (state, action) => {
        commonReject(action);
      })
      .addCase(fetchTodoDelete.fulfilled, (state, action) => {
        const taskId: number = action.payload.createdTask.taskId;
        const todoId: number = action.payload.todoId;

        const currentTask: TaskResponse[] = state.tasks.filter((task) => task.taskId === taskId);

        if (currentTask) {
          currentTask[0].createdTodo = currentTask[0].createdTodo.filter((todo) => todo.todoId !== todoId);
        }
      })
      .addCase(fetchTodoDelete.rejected, (state, action) => {
        commonReject(action);
      });
  },
});

export default taskSlice.reducer;

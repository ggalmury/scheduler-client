import { createSlice } from "@reduxjs/toolkit";
import { CustomErrorMessage } from "../../common/enums/errorCode";
import { TaskResponse } from "../../common/interfaces/responseData";
import { TaskInitialState } from "../../common/interfaces/store";
import { fetchTaskCreate, fetchTaskDelete, fetchTaskList } from "../axios/taskRequest";
import { enableMapSet } from "immer";
import { normalFail, normalSuccess } from "../../common/utils/alert";

const initialState: TaskInitialState = {
  tasks: new Map(),
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTaskCreate.fulfilled, (state, action) => {
        const newTaskDate: number = new Date(action.payload.date).getDate();
        const taskArray = state.tasks.get(newTaskDate);
        if (taskArray) {
          taskArray.push(action.payload);
        } else {
          state.tasks.set(newTaskDate, [action.payload]);
        }

        normalSuccess(undefined, "Task successfully created");
      })
      .addCase(fetchTaskCreate.rejected, (state, action) => {
        if (action.error.message === CustomErrorMessage.SESSION_EXPIRED) {
          normalFail("Oops!", "Session expired. Please log in").then((res) => {
            window.location.href = "/";
          });

          return;
        }
        normalFail("Oops!", "Something went wrong. Please try again");
      })
      .addCase(fetchTaskList.fulfilled, (state, action) => {
        enableMapSet();
        const tasks: TaskResponse[] = action.payload;
        const taskByDate = new Map<number, TaskResponse[]>();

        for (let i = 0; i < 31; i++) {
          const result: TaskResponse[] = tasks.filter((task) => new Date(task.date).getDate() === i);

          if (result.length !== 0) {
            taskByDate.set(i, result);
          }
        }

        state.tasks = taskByDate;
      })
      .addCase(fetchTaskList.rejected, (state, action) => {
        console.log(action.error);
        if (action.error.message === CustomErrorMessage.SESSION_EXPIRED) {
          normalFail("Oops!", "Session expired. Please log in").then((res) => {
            window.location.href = "/";
          });

          return;
        }

        normalFail("Oops!", "Something went wrong. Please try again");
      })
      .addCase(fetchTaskDelete.fulfilled, (state, action) => {
        const newTaskDate: number = new Date(action.payload.date).getDate();
        const taskArray = state.tasks.get(newTaskDate);

        if (taskArray) {
          const newArr = taskArray.filter((task) => task.taskId !== action.payload.taskId);

          state.tasks.set(newTaskDate, newArr);
        } else {
          normalFail("Oops!", "Task not exist");
          return;
        }

        normalSuccess(undefined, "Task successfully deleted");
      })
      .addCase(fetchTaskDelete.rejected, (state, action) => {
        console.log(action.error);
        if (action.error.message === CustomErrorMessage.SESSION_EXPIRED) {
          normalFail("Oops!", "Session expired. Please log in").then((res) => {
            window.location.href = "/";
          });

          return;
        }

        normalFail("Oops!", "Something went wrong. Please try again");
      });
  },
});

export default taskSlice.reducer;

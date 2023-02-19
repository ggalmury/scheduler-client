import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { CustomErrorMessage } from "../../common/enums/errorCode";
import { TaskResponse } from "../../common/interfaces/responseData";
import { TaskInitialState } from "../../common/interfaces/store";
import { fetchTaskCreate, fetchTaskList } from "../axios/taskRequest";
import { enableMapSet } from "immer";

const initialState: TaskInitialState = {
  tasks: new Map(),
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTaskCreate.fulfilled, (state, action) => {
      const newTaskDate: number = new Date(action.payload.date).getDate();
      const taskArray = state.tasks.get(newTaskDate);
      if (taskArray) {
        taskArray.push(action.payload);
      } else {
        state.tasks.set(newTaskDate, [action.payload]);
      }
    });
    builder.addCase(fetchTaskCreate.rejected, (state, action) => {
      if (action.error.message === CustomErrorMessage.SESSION_EXPIRED) {
        Swal.fire({ icon: "error", title: "Oops!", text: "Session expired. Please log in", showCancelButton: false, confirmButtonText: "confirm" }).then((res) => {
          window.location.href = "/";
        });

        return;
      }

      Swal.fire({ icon: "error", title: "Oops!", text: "Something went wrong. Please try again", showCancelButton: false, confirmButtonText: "confirm" });
    });
    builder.addCase(fetchTaskList.fulfilled, (state, action) => {
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
    });
    builder.addCase(fetchTaskList.rejected, (state, action) => {
      console.log(action.error);
      if (action.error.message === CustomErrorMessage.SESSION_EXPIRED) {
        Swal.fire({ icon: "error", title: "Oops!", text: "Session expired. Please log in", showCancelButton: false, confirmButtonText: "confirm" }).then((res) => {
          window.location.href = "/";
        });

        return;
      }

      Swal.fire({ icon: "error", title: "Oops!", text: "Something went wrong. Please try again", showCancelButton: false, confirmButtonText: "confirm" });
    });
  },
});

export default taskSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { TaskResponse, TodoData } from "../../common/types/interfaces/responseData";
import { TaskInitialState } from "../../common/types/interfaces/store";
import { fetchTaskCreate, fetchTaskDelete, fetchTaskDone, fetchTaskList, fetchTodoCreate, fetchTodoDelete } from "../apis/taskRequest";
import { normalFail, normalSuccess } from "../../common/utils/alert";
import { current, enableMapSet } from "immer";
import { CustomErrorMessage } from "../../common/types/types/errorMsg";
import { StoredTask } from "../../common/types/types/common";

enableMapSet();

const initialState: TaskInitialState = {
  dailyTasks: new Map<string, TaskResponse[]>() as StoredTask,
};

const commonReject = (action: any) => {
  if (action.error.message === CustomErrorMessage.sessionExpired) {
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
        const taskResponse: TaskResponse = action.payload;
        const key: string = taskResponse.date;
        const taskArr: TaskResponse[] | undefined = state.dailyTasks.get(key);

        if (taskArr) {
          taskArr.push(taskResponse);
          state.dailyTasks.set(key, taskArr);
        } else {
          state.dailyTasks.set(key, [taskResponse]);
        }

        normalSuccess(undefined, "Task successfully created");
      })
      .addCase(fetchTaskCreate.rejected, (state, action) => {
        commonReject(action);
      })
      .addCase(fetchTaskList.fulfilled, (state, action) => {
        const taskList: TaskResponse[] = action.payload;

        const taskMap: Map<string, TaskResponse[]> = new Map<string, TaskResponse[]>();

        taskList.forEach((task) => {
          const key: string = task.date.toString();

          if (taskMap.has(key)) {
            taskMap.get(key)?.push(task);
          } else {
            taskMap.set(key, [task]);
          }
        });

        state.dailyTasks = taskMap;
      })
      .addCase(fetchTaskList.rejected, (state, action) => {
        commonReject(action);
      })
      .addCase(fetchTaskDelete.fulfilled, (state, action) => {
        const taskResponse: TaskResponse = action.payload;
        const key: string = taskResponse.date;

        const oldTasks: TaskResponse[] = state.dailyTasks.get(key) ?? [];
        const newTasks: TaskResponse[] = oldTasks.filter((task) => task.taskId !== taskResponse.taskId);

        state.dailyTasks.set(key, newTasks);

        normalSuccess(undefined, "Task successfully deleted");
      })
      .addCase(fetchTaskDelete.rejected, (state, action) => {
        commonReject(action);
      })
      .addCase(fetchTaskDone.fulfilled, (state, action) => {
        // state.tasks.forEach((task) => {
        //   if (task.taskId === action.payload.taskId) {
        //     task.state = action.payload.state;
        //     task.type.color = action.payload.type.color;
        //   }
        // });

        normalSuccess(undefined, "Task clear!");
      })
      .addCase(fetchTaskDone.rejected, (state, action) => {
        commonReject(action);
      })
      .addCase(fetchTodoCreate.fulfilled, (state, action) => {
        const taskId: number = action.payload.createdTask.taskId;
        const key: string = action.payload.date.toString();

        const todoData: TodoData = {
          taskId,
          todoId: action.payload.todoId,
          uid: action.payload.uid,
          description: action.payload.description,
        };

        state.dailyTasks.get(key)?.forEach((task) => {
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
        const key: string = action.payload.date.toString();

        state.dailyTasks.get(key)?.forEach((task) => {
          if (task.taskId === taskId) {
            task.createdTodo = task.createdTodo.filter((todo) => todo.todoId !== todoId);
          }
        });
      })
      .addCase(fetchTodoDelete.rejected, (state, action) => {
        commonReject(action);
      });
  },
});

export default taskSlice.reducer;

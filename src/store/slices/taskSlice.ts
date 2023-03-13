import { createSlice } from "@reduxjs/toolkit";
import { CustomErrorMessage } from "../../common/types/enums/errorCode";
import { TaskResponse, TodoData } from "../../common/types/interfaces/responseData";
import { TaskInitialState } from "../../common/types/interfaces/store";
import { fetchTaskCreate, fetchTaskDelete, fetchTaskDone, fetchTaskList, fetchTodoCreate, fetchTodoDelete } from "../apis/taskRequest";
import { normalFail, normalSuccess } from "../../common/utils/alert";
import { StoredTasks } from "../../common/types/types";
import { current, enableMapSet } from "immer";

enableMapSet();

const initialState: TaskInitialState = {
  dailyTasks: new Map<number, Map<number, TaskResponse[]>>(),
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
        const taskResponse: TaskResponse = action.payload;
        const { x, y } = taskResponse.dateMatrix;

        state.dailyTasks.get(y)?.get(x)?.push(taskResponse);

        normalSuccess(undefined, "Task successfully created");
      })
      .addCase(fetchTaskCreate.rejected, (state, action) => {
        commonReject(action);
      })
      .addCase(fetchTaskList.fulfilled, (state, action) => {
        const taskList: TaskResponse[] = action.payload;

        let weekArrangedTask: StoredTasks = new Map<number, Map<number, TaskResponse[]>>();

        for (let i: number = 0; i < 6; i++) {
          const matrixY: TaskResponse[] = taskList.filter((task) => task.dateMatrix.y === i);
          let dateArrangedTask: Map<number, TaskResponse[]> = new Map<number, TaskResponse[]>();

          for (let j: number = 0; j < 7; j++) {
            const matrixX: TaskResponse[] = matrixY.filter((task) => task.dateMatrix.x === j);
            if (matrixX) {
              dateArrangedTask.set(j, matrixX);
            } else {
              dateArrangedTask.set(j, []);
            }
          }

          weekArrangedTask.set(i, dateArrangedTask);
        }

        state.dailyTasks = weekArrangedTask;
      })
      .addCase(fetchTaskList.rejected, (state, action) => {
        commonReject(action);
      })
      .addCase(fetchTaskDelete.fulfilled, (state, action) => {
        const taskResponse: TaskResponse = action.payload;
        const { x, y } = taskResponse.dateMatrix;

        state.dailyTasks
          .get(y)
          ?.get(x)
          ?.filter((task) => task.taskId !== taskResponse.taskId);

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

        const todoData: TodoData = {
          taskId,
          todoId: action.payload.todoId,
          uid: action.payload.uid,
          description: action.payload.description,
        };

        state.dailyTasks.forEach((taskY) => {
          taskY.forEach((taskX) => {
            taskX.filter((task) => {
              if (task.taskId === taskId) {
                task.createdTodo.push(todoData);
              }
            });
          });
        });
      })
      .addCase(fetchTodoCreate.rejected, (state, action) => {
        commonReject(action);
      })
      .addCase(fetchTodoDelete.fulfilled, (state, action) => {
        const taskId: number = action.payload.createdTask.taskId;
        const todoId: number = action.payload.todoId;

        state.dailyTasks.forEach((taskY) => {
          taskY.forEach((taskX) => {
            taskX.filter((task) => {
              if (task.taskId === taskId) {
                console.log(todoId);
                task.createdTodo = task.createdTodo.filter((todo) => todo.todoId !== todoId);
              }
            });
          });
        });
      })
      .addCase(fetchTodoDelete.rejected, (state, action) => {
        commonReject(action);
      });
  },
});

export default taskSlice.reducer;

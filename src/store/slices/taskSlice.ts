import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { store } from "../..";
import { fetchTaskCreate } from "../axios/taskRequest";

const initialState = {
  success: false,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTaskCreate.fulfilled, (state, action) => {
      console.log("success request second");
      console.log(action.payload);
    });
    builder.addCase(fetchTaskCreate.rejected, (state, action) => {
      console.log("fail request second");

      if (action.error.name === "AxiosError") {
        setTimeout(() => {
          store.dispatch(fetchTaskCreate() as any);
        }, 100);
      } else {
        Swal.fire({ icon: "error", title: "Oops!", text: "Something went wrong. Please try again", showCancelButton: false, confirmButtonText: "confirm" });
        return;
      }
    });
  },
});

export default taskSlice.reducer;

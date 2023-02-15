import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { CustomErrorMessage } from "../../common/enums/errorCode";
import { fetchTaskCreate } from "../axios/taskRequest";

const initialState = {};

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

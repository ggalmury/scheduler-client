import { createSlice } from "@reduxjs/toolkit";
import { fetchRegister } from "../axios/authRequest";
import Swal from "sweetalert2";

const registerSlice = createSlice({
  name: "register",
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchRegister.pending, (state, action) => {});
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      Swal.fire({ icon: "success", title: "Hooray!", text: "User successfully created", showCancelButton: false, confirmButtonText: "confirm" }).then((res) => {
        window.location.href = "/";
      });
    });
    builder.addCase(fetchRegister.rejected, (state, action) => {
      Swal.fire({ icon: "error", title: "Oops!", text: "User not created", showCancelButton: false, confirmButtonText: "confirm" });
    });
  },
});

export default registerSlice.reducer;

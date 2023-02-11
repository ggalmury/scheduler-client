import { createSlice } from "@reduxjs/toolkit";
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
      console.log(action.payload);
    });
  },
});

export default taskSlice.reducer;

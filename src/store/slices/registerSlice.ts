import { createSlice } from "@reduxjs/toolkit";
import { fetchRegister } from "../apis/authRequest";
import { normalFail, normalSuccess } from "../../common/utils/alert";

// TODO: remove slice
const registerSlice = createSlice({
  name: "register",
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchRegister.pending, (state, action) => {});
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      normalSuccess("Hooray!", "User successfully created").then((res) => {
        window.location.href = "/";
      });
    });
    builder.addCase(fetchRegister.rejected, (state, action) => {
      normalFail("Oops!", "User not created");
    });
  },
});

export default registerSlice.reducer;

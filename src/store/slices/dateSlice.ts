import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { DateFormat } from "../../common/types/types/common";

const initialState = {
  selectedDate: {
    moment: moment(),
    year: moment().format(DateFormat.year4),
    month: moment().format(DateFormat.month2),
    date: moment().format(DateFormat.day1),
  },
};

const dateSlice = createSlice({
  name: "selectedDate",
  initialState,
  reducers: {
    setDate: (state, action) => {
      const date: moment.Moment = action.payload;

      if (date) {
        state.selectedDate.moment = date;
        state.selectedDate.year = date.format(DateFormat.year4);
        state.selectedDate.month = date.format(DateFormat.month2);
        state.selectedDate.date = date.format(DateFormat.day1);
      } else {
        state.selectedDate = initialState.selectedDate;
      }
    },
  },
});

export const { setDate } = dateSlice.actions;
export default dateSlice.reducer;

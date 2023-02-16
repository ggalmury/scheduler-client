import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { DateFormat } from "../../common/utils/enums";

const initialState = {
  selectedDate: {
    moment: moment(),
    year: moment().format(DateFormat.YEAR_4),
    month: moment().format(DateFormat.MONTH_2),
    date: moment().format(DateFormat.DAY_1),
  },
};

const dateSlice = createSlice({
  name: "selectedDate",
  initialState,
  reducers: {
    setDate: (state, action) => {
      const date: moment.Moment = action.payload;
      state.selectedDate.moment = date;
      state.selectedDate.year = date.format(DateFormat.YEAR_4);
      state.selectedDate.month = date.format(DateFormat.MONTH_2);
      state.selectedDate.date = date.format(DateFormat.DAY_1);
    },
  },
});

export const { setDate } = dateSlice.actions;
export default dateSlice.reducer;

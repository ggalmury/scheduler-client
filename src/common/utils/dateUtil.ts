import moment from "moment";
import { DateFormat } from "./enums";

export const getMoment = moment();

export const getDate = (format: DateFormat | string): string | number => {
  return getMoment.format(format);
};

export const addPad = (time: number): string => {
  return time.toString().padStart(2, "0");
};

export const toISOAndSlice = (date: Date): string => {
  return date.toString().slice(0, 10);
};

export const weekOfMonth = (m: moment.Moment): number => {
  return m.week() - moment(m).startOf("month").week();
};

export const weekCountOfMonth = (m: moment.Moment): number => {
  const firstDayOfMonth: moment.Moment = m.clone().startOf("month");
  const lastDayOfMonth: moment.Moment = m.clone().endOf("month");
  const weeksInMonth = lastDayOfMonth.week() - firstDayOfMonth.week() + 1;

  return weeksInMonth;
};

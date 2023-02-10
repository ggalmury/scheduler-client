import moment from "moment";
import { DateFormat } from "./enums";

export const getMoment = moment();

export const getDate = (format: DateFormat | string): string | number => {
  return getMoment.format(format);
};

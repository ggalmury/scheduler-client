import { TaskResponse } from "../interfaces/responseData";

export const RouteName = {
  home: "home" as string,
  tasks: "tasks" as string,
  group: "group" as string,
  message: "message" as string,
} as const;

export const CalendarType = {
  big: "big-cal" as string,
  small: "small-cal" as string,
} as const;

export const DateFormat = {
  year4: "YYYY" as string,
  year2: "YY" as string,

  month4: "MMMM" as string,
  month3: "MMM" as string,
  month2: "MM" as string,
  month1: "M" as string,

  day4: "dddd" as string,
  day2: "DD" as string,
  day1: "D" as string,
} as const;

export type StoredTask = Map<string, TaskResponse[]>;

export type Types<T> = T[keyof T];

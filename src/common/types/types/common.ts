import { DefaultDailyTask } from "../interfaces/task";

export const RouteName = {
  home: "home",
  task: "task",
  daily: "daily",
  weekly: "weekly",
  group: "group",
  message: "message",
} as const;

export const RouteParam = {
  signin: "signin",
  index: "/",
  home: "home",
  dailyTask: "task/daily",
  weeklyTask: "task/weekly",
};

export const DateFormat = {
  year4: "YYYY",
  year2: "YY",

  month4: "MMMM",
  month3: "MMM",
  month2: "MM",
  month1: "M",

  day4: "dddd",
  day2: "DD",
  day1: "D",
} as const;

export type StoredTask = Map<string, DefaultDailyTask[]>;
export type RouteNameType = (typeof RouteName)[keyof typeof RouteName];
export type RouteParamType = (typeof RouteParam)[keyof typeof RouteParam];
export type DateFormatType = (typeof DateFormat)[keyof typeof DateFormat];

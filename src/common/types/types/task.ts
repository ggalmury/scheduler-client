export const TaskPrivacy = {
  public: "public",
  private: "private",
  relevant: "relevant",
} as const;

export const TaskGroup = {
  basic: {
    type: "basic",
    color: "#E6CDA3",
  },
  work: {
    type: "work",
    color: "#95DBDA",
  },
  meeting: {
    type: "meeting",
    color: "#9BAADD",
  },
  personal: {
    type: "personal",
    color: "#EAB0E3",
  },
} as const;

export const TaskPeriod = {
  daily: "daily",
  weekly: "weekly",
} as const;

export type TaskPrivacyType = (typeof TaskPrivacy)[keyof typeof TaskPrivacy];
export type TaskGroupType = (typeof TaskGroup)[keyof typeof TaskGroup];
export type TaskPeriodType = (typeof TaskPeriod)[keyof typeof TaskPeriod];

export const TaskPrivacy = {
  public: "public" as string,
  private: "private" as string,
  relevant: "relevant" as string,
} as const;

export const TaskType = {
  basic: {
    type: "basic" as string,
    color: "#E6CDA3" as string,
  },
  work: {
    type: "work" as string,
    color: "#95DBDA" as string,
  },
  meeting: {
    type: "meeting" as string,
    color: "#9BAADD" as string,
  },
  personal: {
    type: "personal" as string,
    color: "#EAB0E3" as string,
  },
} as const;

export const TaskCreatorType = {
  daily: "daily" as string,
  weekly: "weekly" as string,
} as const;

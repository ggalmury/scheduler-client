export const TaskPrivacy = {
  public: "public",
  private: "private",
  relevant: "relevant",
} as const;

export const TaskType = {
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

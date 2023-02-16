export interface TaskTimeDetail {
  hour: number;
  minute: number;
}

export interface TaskTime {
  startAt: TaskTimeDetail;
  endAt: TaskTimeDetail;
}

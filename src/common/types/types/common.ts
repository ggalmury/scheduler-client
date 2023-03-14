import { TaskResponse } from "../interfaces/responseData";

export type DateMatrix = { x: number; y: number };
export type StoredTasks = Map<number, Map<number, TaskResponse[]>>;

export type Types<T> = T[keyof T];

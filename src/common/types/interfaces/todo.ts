export interface TodoCreateRequest {
  taskId: number;
  description: string;
  date: string;
}

export interface TodoDeleteRequest {
  todoId: number;
}

export interface TodoResponse {
  todoId: number;
  uid: number;
  description: string;
  date: string;
  createdTask: { taskId: number };
}

export interface DefaultTodo {
  taskId: number;
  todoId: number;
  uid: number;
  description: string;
}

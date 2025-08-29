export type TaskStatus = 'todo' | 'in-progress' | 'done';

export type Task = {
  _id: string;
  status: TaskStatus;
  title: string;
  description: string;
};

export type Column = {
  id: TaskStatus;
  title: string;
};
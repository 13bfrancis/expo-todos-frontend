import { Todo } from "./todo";

export type List = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  todos?: Todo[];
};

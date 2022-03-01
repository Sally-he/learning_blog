interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyOmit<Todo, "description" | "title">;

const todo: TodoPreview = {
  completed: false,
};

type MyOmit<T, K extends keyof T> = {
  [Key in MyExclude<keyof T, K>]: T[Key];
};

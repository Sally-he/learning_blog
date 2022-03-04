interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

const todo3: MyReadonly2<Todo, "title" | "description"> = {
  title: "Hey",
  description: "foobar",
  completed: false,
};

todo3.title = "Hello"; // Error: cannot reassign a readonly property
todo3.description = "barFoo"; // Error: cannot reassign a readonly property
todo3.completed = true; // OK

type MyReadonly2<T, K extends keyof T = keyof T> = T & { readonly [S in K]: T[S] };

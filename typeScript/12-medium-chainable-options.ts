declare const config: Chainable;

const result = config
  .option("foo", 123)
  .option("name", "type-challenges")
  .option("bar", { value: "Hello World" })
  .get();

// expect the type of result to be:
interface Result {
  foo: number;
  name: string;
  bar: {
    value: string;
  };
}

type Chainable<T extends Record<string, unknown> = {}> = {
  option<K extends string, V = unknown>(
    key: Exclude<K, keyof T>,
    value: V
  ): Chainable<T & Record<K, V>>;
  get(): T;
};

// type Chainable<T extends Record<string, unknown> = {}> = {
//   option<K extends string, V>(
//     key: K,
//     value: V
//   ): Chainable<T & { [Key in K]: V }>;
//   get(): T;
// };

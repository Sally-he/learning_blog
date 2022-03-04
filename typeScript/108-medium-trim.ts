type trimed1 = Trim<"  Hello World  ">; // expected to be 'Hello World'

type TrimRight<T extends string> = T extends `${infer R}${" " | "\n" | "\t"}`
  ? TrimRight<R>
  : T;

type Trim<S extends string> = TrimRight<TrimLeft<S>>;

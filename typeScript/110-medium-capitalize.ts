type capitalized = Capitalizes<"hello world">; // expected to be 'Hello world'

type Capitalizes<T extends string> = T extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Rest}`
  : T;

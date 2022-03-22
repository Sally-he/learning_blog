type Test3 = '123';
type Result3 = StringToUnion<Test3>; // expected to be "1" | "2" | "3"

type StringToUnion<T extends string> = T extends `${infer L}${infer R}` ? L | StringToUnion<R> : never;
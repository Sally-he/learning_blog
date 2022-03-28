type arr3 = ["a", "b", "c"];
type arr4 = [3, 2, 1];

type tail1 = Last<arr3>; // expected to be 'c'
type tail2 = Last<arr4>; // expected to be 1

type Last<T extends any[]> = T extends [infer A, ...infer B]
  ? B extends []
    ? A
    : Last<B>
  : never;

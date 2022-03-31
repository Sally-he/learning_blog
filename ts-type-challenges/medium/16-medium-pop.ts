type arr5 = ["a", "b", "c", "d"];
type arr6 = [3, 2, 1];

type re1 = Pop<arr5>; // expected to be ['a', 'b', 'c']
type re2 = Pop<arr6>; // expected to be [3, 2]

type Pop<T extends any[]> = T extends [...infer A, infer B] ? A : never;

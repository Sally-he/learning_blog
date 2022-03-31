type a = TupleToNestedObject<['a'], string> // {a: string}
type b = TupleToNestedObject<['a', 'b'], number> // {a: {b: number}}
type c = TupleToNestedObject<[], boolean> // boolean. if the tuple is empty, just return the U type

// type TupleToNestedObject<T extends any[], U> = T['length'] extends 0 ? U : {
//     [key in T[0]]: T['length'] extends 1 ? U : T extends [any, ...infer R] ? TupleToNestedObject<R, U> : never;
// }

type TupleToNestedObject<T, U> = T extends [infer F, ...infer R] ? {
    [K in F & string]: TupleToNestedObject<R, U>
} : U;
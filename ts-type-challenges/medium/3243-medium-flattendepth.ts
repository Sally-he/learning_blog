type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1

type FlattenDepth<T extends any[], C extends number = 1, U extends any[] = []> = T extends [infer F, ...infer R] ?
    F extends any[] ?
    U['length'] extends C ?
    [F, ...FlattenDepth<R, C, U>]
    : [...FlattenDepth<F, C, [0, ...U]>, ...FlattenDepth<R, C, U>]
    : [F, ...FlattenDepth<R, C, U>]

    : T;
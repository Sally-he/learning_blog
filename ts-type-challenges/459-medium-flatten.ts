type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]

type Flatten<T extends any[]> = T extends [infer U, ...infer R] ? (U extends any[] ? [...Flatten<U>, ...Flatten<R>] : [U, ...Flatten<R>]) : []
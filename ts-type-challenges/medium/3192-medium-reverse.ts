type a1 = Reverse<['a', 'b']> // ['b', 'a']
type b2 = Reverse<['a', 'b', 'c']> // ['c', 'b', 'a']


type Reverse<T extends any[], Result extends readonly any[] = []> = T extends [infer F, ...infer R] ?
    Reverse<R, [F, ...Result]> : Result;
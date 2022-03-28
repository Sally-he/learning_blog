type Butterfly = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'

type DropChar<S extends string, K extends string> = S extends `${infer L}${K}${infer R}` ? DropChar<`${L}${R}`, K> : S;
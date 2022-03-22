// for-bar-baz -> forBarBaz
type CamelCase<T extends string> = T extends `${infer F}-${infer L}` ?
    L extends Capitalize<L> ?
    `${F}-${CamelCase<L>}` :
    `${F}${CamelCase<Capitalize<L>>}`
    : T;

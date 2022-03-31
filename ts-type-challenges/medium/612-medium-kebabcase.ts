// FooBarBaz -> foo-bar-baz
type KebabCase<T extends string> = T extends `${infer F}${infer L}` ?
    L extends Uncapitalize<L> ? `${Lowercase<F>}${KebabCase<L>}` : `${F}-${KebabCase<L>}`
    : T;

let test2: KebabCase<'FooBarBaz'>;
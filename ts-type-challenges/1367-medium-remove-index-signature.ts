
type Foo = {
    [key: string]: any;
    foo(): void;
}

type A = RemoveIndexSignature<Foo>  // expected { foo(): void }


type RemoveIndexSignature<T> = {
    [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K];
}
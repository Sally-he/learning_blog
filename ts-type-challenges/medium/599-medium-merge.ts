type Merge<F, T> = {
    [k in keyof F | keyof T]: k extends keyof F ? F[k] : k extends keyof T ? T[k] : never;
}

let a = {
    a: 1,
    b: 3
}
let b = {
    c: 3,
    d: 4
}

let c: Merge<typeof a, typeof b> = {
    a: 1,
    b: 3,
    c: 3,
    d: 4
}
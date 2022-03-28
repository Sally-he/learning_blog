type Test = { id: '1' }
type Result = AppendToObject<Test, 'value', 4> // expected to be { id: '1', value: 4 }

type AppendToObject<T extends Record<string, unknown>, U extends string, R extends unknown> = {
    [K in keyof T | U]: K extends U ? R : T[K]
};
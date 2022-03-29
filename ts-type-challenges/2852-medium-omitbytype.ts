type OmitBoolean = OmitByType<{
    name: string
    count: number
    isReadonly: boolean
    isEnable: boolean
}, boolean> // { name: string; count: number }


type OmitByType<T, U> = {
    [P in keyof T as T[P] extends U ? never : P]: T[P]
}
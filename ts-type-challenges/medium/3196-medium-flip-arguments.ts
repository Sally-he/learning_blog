type Flipped = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>
// (arg0: boolean, arg1: number, arg2: string) => void

type FlipArguments<T extends (...args: any[]) => void> = (...args: Reverse<Parameters<T>>) => ReturnType<T>;
type Result = Push<[1, 2], "3">; // [1, 2, '3']

type Push<T extends any[], U> = [...T, U];

type case1 = IsUnion<string>  // false
type case2 = IsUnion<string | number>  // true
type case3 = IsUnion<[string | number]>  // false

type IsUnion<T, B = T> = T extends B ? [B] extends [T] ? false : true : never;

// type IsUnion<T, B = T> = T extends T
/**
 * type T = string | number;
 * step1: string | number extends string | number
 * step2: string extends string | number => [number] extends [never] => true
 * step3: number extends string | number => [string] extends [never] => true
 * step4: true | true
 * result: true
 */

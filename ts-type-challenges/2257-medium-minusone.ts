type Zero = MinusOne<1> // 0
type FiftyFour = MinusOne<55> // 54

type Pop<T extends any[]> = T extends [...infer head, any] ? head : never;
type MinusOne<T extends number, A extends any[] = []> = A['length'] extends T ? Pop<A>['length'] : MinusOne<T, [...A, 0]>;
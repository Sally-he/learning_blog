type a1 = EndsWith<'abc', 'bc'> // expected to be true
type b1 = EndsWith<'abc', 'abc'> // expected to be true
type c1 = EndsWith<'abc', 'abcd'> // expected to be false


type EndsWith<T extends string, U extends string> = T extends `${infer _}${U}` ? true : false;
type EndsWith2<T extends string, U extends string> = T extends `${string}${U}` ? true : false;
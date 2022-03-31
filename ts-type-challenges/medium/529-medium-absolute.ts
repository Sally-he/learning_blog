type Test2 = -100;
type Result2 = Absolute<Test2>; // expected to be "100"

type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer V}` ? V : `${T}`;
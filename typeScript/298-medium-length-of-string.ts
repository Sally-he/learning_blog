type LengthOfString<
  S extends string,
  U extends string[]
> = S extends `${infer first}${infer rest}`
  ? LengthOfString<rest, [first, ...U]>
  : U["length"];
 
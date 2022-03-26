type replaced2 = ReplaceAll<"t y p e s", " ", "">; // expected to be 'types'

type ReplaceAll<
  S extends string,
  T extends string,
  K extends string
> = T extends ""
  ? S
  : S extends `${infer L}${infer T}${infer R}`
  ? `${L}${K}${ReplaceAll<R, T, K>}`
  : S;

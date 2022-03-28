type replaced = Replace<"types are fun!", "fun", "awesome">; // expected to be 'types are awesome!'

type Replace<
  S extends string,
  T extends string,
  K extends string
> = T extends ""
  ? S
  : S extends `${infer L}${infer T}${infer R}`
  ? `${L}${K}${R}`
  : S;

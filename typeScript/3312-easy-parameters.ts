type MyParameters<T extends (...args: any[]) => any[]> = T extends (
  ...args: infer R
) => any
  ? R
  : never;

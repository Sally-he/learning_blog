interface Cat {
  type: "cat";
  breeds: "Abyssinian" | "Shorthair" | "Curl" | "Bengal";
}

interface Dog {
  type: "dog";
  breeds: "Hound" | "Brittany" | "Bulldog" | "Boxer";
  color: "brown" | "white" | "black";
}

type MyDogType = LookUp<Cat | Dog, "dog">; // expected to be `Dog`

type LookUp<T, U> = T extends { type: U } ? T : never;


type P = keyof Point;


type Persons = { age: number; name: string; alive: boolean };
type I1 = Persons['age' | 'name'];

type I2 = Persons[keyof Persons];


type AliveOrName = 'alive' | 'name';
type I3 = Persons[AliveOrName];
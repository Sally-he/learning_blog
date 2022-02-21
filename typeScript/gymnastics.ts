function identity<Type>(arg: Type): Type {
  return arg;
}

let output = identity("testString");

function loggingIdentity<Type>(arg: Type[]): Type[] {
  console.log(arg.length);
  return arg;
}

let myIdentity: { <Type>(arg: Type): Type } = identity;

interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}

// @strict: false
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

function create<Type>(c: { new (): Type }): Type {
  return new c();
}

class BeeKeeper {
  hasMask: boolean = true;
}

class ZooKeeper {
  nametag: string = "Mikle";
}

class Animals {
  numLegs: number = 4;
}

class Bee extends Animals {
  keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animals {
  keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animals>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;

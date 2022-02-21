/**
 * @author: zhiyu.he
 * @file: description
 * @Date: 2021-10-25 20:25:23
 * @LastEditors: zhiyu.he
 * @LastEditTime: 2021-10-26 11:46:02
 */

function add(x: number, y: number): number {
  return x + y;
}

let myAdd: (baseValue: number, increment: number) => number = function (
  baseValue: number,
  increment: number
): number {
  return baseValue + increment;
};

function buildName(firstName: string, ...restOfName: string[]): string {
  return firstName + " " + restOfName.join(" ");
}
let buildNameFun: (firstName: string, ...restOfName: string[]) => string =
  buildName;

interface Card {
  suit: string;
  card: number;
}
interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  // NOTE: The function now explicitly specifies that its callee must be of type Deck
  createCardPicker: function (this: Deck) {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    };
  },
};

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);

interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void): void;
}

class Handler {
  info: string;
  onClickBad(this: Handler, e: Event) {
    this.info = e.type;
  }
}

let h = new Handler();
// uiElement.addClickListener(h.onClickBad); // error!

let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: { suit: string; card: number }[]): number;
function pickCard(x: number): { suit: string; card: number };
function pickCard(x): any {
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  } else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return {
      suit: suits[pickedSuit],
      card: x % 13,
    };
  } else {
    return x;
  }
}

// function identity(arg: number): number {
//   return arg;
// }

function identity<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}

type Horse = {};

type OnlyBoolsAndHorses = {
  [key: string]: boolean | Horse;
};

const conforms: OnlyBoolsAndHorses = {
  del: true,
  rodney: false,
};

type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type EventConfig<Events extends { kind: string }> = {
  [E in Events as E["kind"]]: (event: E) => void;
};

type SquareEvent = { kind: "square"; x: number; y: number };
type CircleEvent = { kind: "circle"; radius: number };

type Config = EventConfig<SquareEvent | CircleEvent>;

class Animal {
  move() {
    console.log("Moving along");
  }
}

class Dog extends Animal {
  woof(times: number) {
    for (let i = 0; i < times; i++) {
      console.log("woof");
    }
  }
}

class Base {
  protected m = 10;
}

class Derived extends Base {
  m = 15;
}
const d = new Derived();
console.log(d.m);

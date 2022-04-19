// Partial 将类编

interface Person {
    name: string;
    age: number;
}


const p1: Person = {
    name: 'sally',
    age: 25
}


const p2: Partial<Person> = {
    name: 'sally',
}
// =>  interface Person {
    // name?: string;
    // age?: number;
//  }
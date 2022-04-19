import { ref as RefOne, unref } from './reactivity';
import { ref as RefTwo } from './reactivity.copy';

const testOne = RefOne<string>('test');
const testTwo = RefTwo<string>('test');

const test = unref(testOne);
const test2 = unref(testTwo);
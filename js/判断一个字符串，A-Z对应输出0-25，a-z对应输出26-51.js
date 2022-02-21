/**
 * code 1
 */
let Words = (s, a = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz') => s.split('').map(v => a.indexOf(v)).join('');

Words('AZaz');
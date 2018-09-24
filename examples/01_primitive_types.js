// A JS minden számot 64 bites lebegőpontos formátumban tárol el  (nincs külön egész típus)
// JS Unicode karakterkészletet használ
var a = 'alma';
var b = true;
var c = null;
console.log(typeof NaN); // => number
console.log(typeof undefined); // => undefined
var d = 2;
var π = 3.14;

// A lebegőpontos számok nem egészen pontosak:
console.log(0.1 + 0.2); // => 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // => false

// hoisting, syntax parser, memóriafoglalás futás előtt
console.log(i); // => undefined
var i = 10;

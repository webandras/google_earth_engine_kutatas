var a = 2;
var b = a; // másolat készül
b = 10;
console.log(a); // => 2
console.log(a === b) // => false

var a = [1, 2, 3];
var b = a;
b[0] = 10;
console.log(a); // => [10, 2, 3]
// ugyanarra az objektumra hivatkoznak
console.log(a === b) // => true

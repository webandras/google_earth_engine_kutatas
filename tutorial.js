// A JS egyszálas, egyszerre csak egy parancsot hajt végre, sorban, szinkronban
// A böngésző nem feltétlenül így működik, vannak benne aszinkron részek is
// ES5 (ECMAScript 5) szabvány szerint programozunk

// A JS gyengén típusos nyelv, változókat és objektumokat a var kulcsszóval hozunk létre
// a változó típusa változhat

// Az ún. primitív adattípusok: undefined, null, string, logikai és szám (beleértve a NaN)
var a = 'alma';
var b = true;
var c = null;

console.log(typeof NaN) // => number
console.log(typeof undefined) // => undefined (tehát külön típus)

// A JS-ben nincsen igazi egész szám, hanem minden számot 64 bites lebegőpontos formátumban
// reprezentál. Max eltárolható szám: ±1.7976931348623157 x 10^308
// Minimum eltárolható szám 5 x 10^-324 (ezt még képes a nullától megkülönböztetni)
// A JavaScript számformátuma pontosan reprezentálja az egész számokat
// -9007199254740992 (-2^53) és 9007199254740992 (2^53) között.
// Bizonyos operátorok viszont (pl. a tömbök indexelése) 32-bites egész számokkal működnek.
var d = 2
var e = 3.14

// A lebegőpontos számok nem egészen pontosak
console.log(0.1 + 0.2); // => 0.30000000000000004
console.log(0.1 + 0.2 == 0.3); // => false

// hamisértékek közé tartozik: a false, a 0, a null, az undefined, az "" (üres sztring) és a NaN.
// Ezek a kifejezésekben mindig hamisnak (false) értékelődnek ki

// EZ HIBÁS: A typeof rosszul tudja!!!
// Mert a null egy primitív típus, nem objektum
console.log(typeof null) // => objektum (rossz!!)

// A JavaScript-ben minden, ami nem primitív típus, az objektum (referenciatípus)

var a = [1, 2, 3];
var b = a;
b[0] = 10;
console.log(a); // => [10, 2, 3]
// 'a' és 'b' ugyanarra a tömbre hivatkozik.
console.log(a === b) // => true

a.push(7, 8, 5);
a.length = a.length - 1;
a.pop();
// Táblázatként is kiírható!
console.table(a); // => [10, 2, 3, 7]

// "FELEMELÉS" (hoisting), syntax parser!
console.log(i) // => undefined
var i = 10

greet() //
// Függvények változóknak is értékül adhatók:
var greet = function () {
  console.log('Hello world!');
}
greet();

// FÜGGVÉNYEK, HATÓKÖR, HATÓKÖRLÁNC
// érték szerinti argumentumátadás van a JS-ben
// mutatók nincsenek, a memóriacímekhez nem férünk hozzá
// A JS a memóriakezelést automatikusan elvégzi és
// felszabadítja a már nem használta memóriaterületet (garbage collector)

var scope = 'globális'
function foo () {
  var scope = 'lokális'
  console.log(scope)
}
foo() // => lokális
console.log(scope) // => globális

// DE MI TÖRTÉNIK EKKOR?
var scope = 'globális'
function foo2 () {
  scope = 'lokális'
  console.log(scope)
}
foo2() // => lokális
console.log(scope) // ??

// FÜGGVÉNYHATÓKÖR
for (var i = 0; i < 10; i++) { /* utasítások */ }
console.log(i) // ??

// MI AZ OBJEKTUM? kulcs-érték párok gyűjteménye
// ENNYI! ÉRTÉK lehet mindenféle baromság:
var hallgato = {
  // KULCS: ÉRTÉK
  eha: 'guasabt.sze',
  keresztnév: 'András',
  magyar: true,
  születésÉve: 1111,
  születésnap: [1111, 11, 11],
  print: function () {
    console.log('srihrrui')
  },
  cím: {
    város: 'Szeged',
    irányítószám: 6722
  }
};

// Tulajdonságok hozzáadása meglévő objektumhoz
hallgato.age = 25;
hallgato['évfolyam'] = 2;

console.log('Évfolyam: ' + hallgato.age);
console.log('Évfolyam: ' + hallgato.évfolyam);

// PONT adattag operátor
console.log(hallgato.cím.város);
console.table(hallgato.születésnap);

// []-kel ]is el lehet érni a tulajdonságokat
console.log(hallgato['keresztnév']);

// Object literal syntax
var person = {
  név: 'Jancsi',
  age: 33,
  print: function () {
    console.log('object literal: ' + person.név + ', ' + person.age + ' éves');
  }
}
console.log(person);
console.table(person);
person.print();

var square = function (x) {
  return x * x;
};

function square2 (x) {
  return x * x;
}


// Function syntax
function Person (name, age) {
  this.name = name || 'John Doe';
  this.age = age || 0;
  this.print = function () {
    console.log('Person: ' + this.name + ', ' + this.age + ' éves');
  }
}

// példányosítás
var adam = new Person('Ádám', 25);
adam.print();

// Function syntax
function Person2 (name, age) {
  this.name = name;
  this.age = age;
}

// a prototípushoz hozzáadok egy metódust, amihez hozzáfér az objektumom a prototípus láncon keresztül
Person2.prototype.print = function () {
  console.log('Person2: ' + this.name + ', ' + this.age + ' éves');
}

// példányosítás
var eva = new Person2('Éva', 23);
eva.print();

// GLOBÁLIS objektum

// METÓDUSLÁNC
/* Ez nem konstruktor, csupán egy függvény, ami egy objektum
  A függvénynek több tulajdonsága van:
  Van a kód property, van neve (vagy névetlen), van prototípus tulajdonsága stb.
*/
function Szam (ertek) {
  this.ertek = ertek;
  this.print = function () {
    console.log('A szám: ' + this.ertek);
  }
}
// A kód tulajdonság kiírása
console.log(Szam.toString());

// Négyzetre emelő függvény
Szam.prototype.square = function () {
  this.ertek *= this.ertek;
  return this;
}

// Negáló függvény
Szam.prototype.negate = function () {
  this.ertek = -this.ertek;
  return this;
}

// Az objektum példányosítása
var myNumber = new Szam(32);
// metóduslánc
myNumber.square().negate().print();


// FUNKCIONÁLIS PROGRAMOZÁSI PARADIGMA


var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var lessThanFive = arr.filter(function (elem) {
  return elem <= 5;
});
console.log({ lessThanFive })

var eredmeny = []
for (var i = 0; i < arr.length; i++) {
  if(arr[i] <= 5) {
    eredmeny.push(arr[i])
  }
}
console.log({ eredmeny })


// operátor szintaxis
var c = 3 + 5;
// de fel lehetne függvénnyel is írni:
function add (a, b) { return a + b }
c = add(3, 5);

// forEach használatával
[1, 2, 3].forEach(function (elem) {
  console.log(elem)
})

// for ciklussal:
var arr = [1, 2, 3]
for (var i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}


var arr = [1, 2, 3]
function square (x) { return x * x }
var arr2 = arr.map(function (x) {
  return square(x)
})
console.table(arr2)

var arr3 = []
for (var i = 0; i < arr.length; i++) {
  arr3.push(square(arr[i]);
};
console.table(arr3)

// Reducer használata, összeg számítása:
var osszeg = arr.reduce(function (accumulator, elem) {
  return accumulator + elem
}, 0)
console.log(osszeg)

// Hagyományos módon:
var sum = 0
for (var i = 0; i < arr.length; i++) {
  sum += arr[i]
}
console.log(sum)



// JSON formátum bemutatása
var obj = {
  x: 6,
  y: 13,
  a: 'abc',
  t: [1, 2, 3]
};

var json = JSON.stringify(obj)
console.log('JSON formátum: ' + json)
console.log('vissza objektummá: ' + JSON.parse(json))

// filter!!



/*
// primitív típusok
console.log({y}) // => undefined
var y = 11
console.log({y}); // => 11

var a = 7;
var x = 7;
var gy = 'körte';
var π = 3.14;
console.log({π}) // => 3.14

// Referencia típus (objektumok)
var a = [1, 2, 3];
var b = a
b[0] = 10
console.log(a); // => [10, 2, 3]

a.push(7, 8, 5);
a.length = a.length - 1;
a.pop()
// Táblázatként is kiírható!
console.table(a);

var str = 'hello'
str += ' world'
console.log({str}) // => "hello world"

str = 101 + ' kiskutya';
console.log({str}) // => "101 kikutya"

var bool = true
bool === true ? console.log('igaz') : console.log('hamis')
if (bool === true) {
  console.log('igaz')
} else {
  console.log('hamis')
}


*/
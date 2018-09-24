// OBJEKTUM = kulcs-érték (key-value) párok gyűjteménye. A kulcsok sztringek.
var hallgato = {
  nev: 'Béla',
  magyar: true,
  szuletesEve: 1995,
  szuletesnap: [1995, 11, 23],
  print: function () {
    console.log('Helló világ!')
  },
  cim: {
    varos: 'Szeged'
  }
};

// Tulajdonságok hozzáadása meglévő objektumhoz
hallgato.age = 25;
hallgato['evfolyam'] = 2; // evfolyam: 2
console.log('Életkor: ' + hallgato.age);
console.log('Évfolyam: ' + hallgato.évfolyam);

console.log(hallgato.cim.varos);
console.table(hallgato.szuletesnap);

// []-kel is el lehet érni a tulajdonságokat
console.log(hallgato['nev']);

// Objektum literál szintaxis
var person = {
  name: 'Jancsi',
  age: 33,
  print: function () {
    console.log(person.name + ' ' + person.age + ' éves');
  }
}
console.log(person);
console.table(person);
person.print();

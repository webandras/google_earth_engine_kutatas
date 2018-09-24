function Szam (ertek) {
  this.ertek = ertek;
  this.print = function () {
    console.log('A szám: ' + this.ertek);
  },
  // négyzetre emelő függvény
  this.square = function () {
    this.ertek *= this.ertek;
    return this;
  },
  // negáló függvény
  this.negate = function () {
    this.ertek = -this.ertek;
    return this;
  }
}

// példányosítás
var myNumber = new Szam(32);
// metódusok láncolata (a jQuery könyvtár extenzíven használja ezt a technikát)
myNumber.square().negate().print();

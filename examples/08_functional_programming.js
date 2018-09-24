// Mindent függvényekkel fejezünk ki, amelyek egy bemenetet kimenetté alakítanak át
// Iterációk helyett is speciális függvényeket használunk
// Ennél természetesen sokkal többet jelent a funkcionális programozás, de itt elég ennyit tudni

// operátor szintaxis
var c = 3 + 5;
// de fel lehet függvényként is fogni:
function add (a, b) {
  return a + b;
}
c = add(3, 5);
console.log(c);

var square = function (x) {
  return x * x;
};
// a kód tulajdonság kiírása
console.log(square.toString());

function square2 (x) {
  return x * x;
}

// Use "eng" for an English, and "esp" for a Spanish greeting!
function greet (lang) {
  if (lang === 'eng') {
    return function (name) {
      console.log('Hello ' + name + '!');
    }
  } else if (lang === 'esp') {
    return function (name) {
      console.log('Hola ' + name + '!');
    }
  } else {
    throw 'Unsupported language!';
  }
}

var greetSpanish = greet('esp');
greetSpanish('Béla');

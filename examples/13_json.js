var obj = {
  x: 6,
  y: 13,
  a: 'abc',
  t: [1, 2, 3]
};

var json = JSON.stringify(obj);
console.log('JSON formátum: ' + json);

// vissza objektummá:
var result = JSON.parse(json)
console.log(result);

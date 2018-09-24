// reduce – példa: összeg számítása
var arr = [1, 2, 3];
var osszeg = arr.reduce(function (accumulator, elem) {
  return accumulator + elem;
}, 0)
console.log(osszeg);

// Hagyományos módon:
var sum = 0;
for (var i = 0; i < arr.length; i++) {
  sum += arr[i];
}
console.log(sum);
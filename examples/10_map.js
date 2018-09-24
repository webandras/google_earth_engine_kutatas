var arr = [1, 2, 3];
function square (x) {
  return x * x;
}
var arr2 = arr.map(function (x) {
  return square(x);
});
console.table(arr2)

var arr3 = []
for (var i = 0; i < arr.length; i++) {
  arr3.push(square(arr[i]));
};
console.table(arr3)
var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var lessThanFive = arr.filter(function (elem) {
  return elem <= 5;
});
console.table(lessThanFive);

var eredmeny = [];
for (var i = 0; i < arr.length; i++) {
  if (arr[i] <= 5) {
    eredmeny.push(arr[i]);
  }
}
console.table(eredmeny)

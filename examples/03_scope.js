var scope = 'globális'
function foo () {
  var scope = 'lokális'
  console.log(scope)
}
foo() // => lokális
console.log(scope) // => glob.

// DE MI TÖRTÉNIK EKKOR?
var scope = 'globális'
function foo2 () {
  scope = 'lokális'
  console.log(scope)
}
foo2() // => lokális
console.log(scope) // ??

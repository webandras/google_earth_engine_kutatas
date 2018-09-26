exports.dateInput = function () {
  // User inputs: start and end year of a period
  var range = prompt('Add the start and end year to create a median image:', '1980-1984');
  
  var parts = range.split('-');
  print(parts[0]);
  
  return {
    start: ee.Date(parts[0] + '-01-01'),
    finish: ee.Date(parts[1] + '-12-31'),
    range: range
  } || undefined;
};

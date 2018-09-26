// Load the image from Assets folder
var zones = ee.Image('users/gulandras90/Landsat5_MNDWI_miklapuszta1984-2012changes');

// Study area
var studyArea = ee.FeatureCollection('ft:1g6Kve0rEAVDeF6UsPXE4NIgfwJO1azGBM9jwc3QV', 'geometry').union();

// Drier area
var drier = zones.eq(1);
var areaImage = drier.multiply(ee.Image.pixelArea());

// Sum the values of loss pixels in the study area
var stats = areaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: studyArea,
  scale: 30,
  maxPixels: 1e9
});
print('Drier: ', stats.get('constant'), ' square meters');


// Wetter area
var wetter = zones.eq(2);
var areaImage2 = wetter.multiply(ee.Image.pixelArea());

// Sum the values of loss pixels in the study area
var stats2 = areaImage2.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: studyArea,
  scale: 30,
  maxPixels: 1e9
});
print('Wetter: ', stats2.get('constant'), ' square meters');

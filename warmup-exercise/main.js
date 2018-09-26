var region = ee.Geometry.Rectangle(19.1223, 46.7513, 19.2341, 46.8884);

var studyArea = ee.FeatureCollection('ft:1g6Kve0rEAVDeF6UsPXE4NIgfwJO1azGBM9jwc3QV', 'geometry').union();

Map.centerObject(studyArea);

// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();

// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: studyArea,
  color: "black",
  width: 2
});

// Cloud percentage property for filtering
var cloudFilter = ee.Filter.lessThanOrEquals('CLOUD_COVER', 20);
// FILTER Landsat COLLECTION
var filteredCollection = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
  .filterBounds(studyArea)
  .filterDate('2018-06-01', '2018-10-31')
  .filter(cloudFilter)
  .sort('CLOUD_COVER', true)
  ;
// Print filtered images
print(filteredCollection);

// A legjobb minőségű kép kiválasztása a felhőborítás mértéke alapján  
var first = filteredCollection.first();
print(first);

var vizParams = {
  bands: ['B4', 'B3', 'B2'],
  min: 317.44,
  max: 1778.56,
  gamma: 1.3
};

Map.addLayer(first, vizParams, 'Landsat 8 false color');

var firstClipped = first.clip(studyArea);
Map.addLayer(firstClipped, vizParams, 'Landsat false color clipped');

// Save the composite image as GeoTIFF
Export.image.toDrive({
  image: firstClipped.select(['B1','B2','B3','B4','B5', 'B7']),
  description: 'L8_miklapuszta_' + '2018',
  scale: 30,
  region: studyArea
});

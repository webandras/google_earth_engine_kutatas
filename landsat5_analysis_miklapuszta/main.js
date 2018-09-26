/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * +++++                 Landsat Change Detection Program                     ++++++
 * +++++                      Author: András Gulácsi                          ++++++
 * +++++                     Date: September 24, 2018                         ++++++
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */
// Collection name string, CHANGE THE LINE BELOW
var productName = 'LANDSAT/LT05/C01/T1_SR';

/*
LANDSAT/LT04/C01/T1_SR
LANDSAT/LT05/C01/T1_SR
LANDSAT/LE07/C01/T1_SR
LANDSAT/LC08/C01/T1_SR

*/

// IMPORT MODULES
// Import sepctral index calculator function
var spectral = require('users/gulandras90/course:process/spectralIndex');

// Import date functions module
var date = require('users/gulandras90/course:process/inputDate');

// Functions used for masking out cloudy pixels from Landsat bands
var quality = require('users/gulandras90/course:process/qualityAssessment');


// Scale milliseconds by a large constant to avoid very small slopes
// in the linear regression output.
var createTimeBand = function(image){
  return image.addBands(image.metadata('system:time_start').divide(1e18));
};

var createMNDWIBand = function (image) {
  return image.addBands(spectral.getSpectralIndex('MNDWI2', image, productName).rename('MNDWI'));
};

// AREA OF INTEREST
// Add study area polygon
var nameOfTheArea = 'miklapuszta';

var studyArea = ee.FeatureCollection('ft:1g6Kve0rEAVDeF6UsPXE4NIgfwJO1azGBM9jwc3QV', 'geometry').union();
print(studyArea)

// Sets the map view to the center of the study area
Map.centerObject(studyArea);

// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();

// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: studyArea,
  color: "black",
  width: 2
});

// User input for filtering ImageCollection by date (year, month)
var dateInput = date.dateInput();
// returns an object containing the start and finish dates

print(dateInput.start);
print(dateInput.finish);

// Cloud percentage property for filtering
var cloudFilter = ee.Filter.lessThanOrEquals('CLOUD_COVER', 20);

// FILTER Landsat COLLECTION
var filteredCollection = ee.ImageCollection(productName)
  .filterBounds(studyArea)
  .filterDate(dateInput.start, dateInput.finish)
  .filter(cloudFilter)
  .map(quality.addMask(productName))
  .map(quality.addMaskedData(productName))
  .map(createTimeBand)
  .map(createMNDWIBand)
  ;
  
// Print filtered images
print(filteredCollection);

var median = filteredCollection.median().clip(studyArea);
print(median);

// CALCULATE INDICES
var mndwi = spectral.getSpectralIndex('MNDWI2', median, productName).rename('MNDWI');


var vizParams = {
  bands: ['B5_1', 'B4_1', 'B3_1'],
  min: 547,
  max: 3408,
  gamma: 1.3
};

Map.addLayer(median, vizParams, 'median havi kompozit');

print(ui.Chart.image.series(filteredCollection.select('MNDWI'), studyArea, ee.Reducer.median(), 30));

Map.addLayer(median.select(['MNDWI']), { min: -1, max: 1,
  palette: [
    '620000',
    'ff341f',
    'fffb7d',
    '4095ff',
    '0731ff',
    '030160'
    ]
  }, 'MNDWI');


// Reduce the collection with the linear fit reducer.
// Independent variable are followed by dependent variables.
var linearFit = filteredCollection.select(['system:time_start', 'MNDWI'])
  .reduce(ee.Reducer.linearFit()).clip(studyArea);
  
var pearsonsTrend = filteredCollection.select(['system:time_start', 'MNDWI'])
  .reduce(ee.Reducer.pearsonsCorrelation()).clip(studyArea);
  
print("Pearson's: ", pearsonsTrend);

// Display the results.
Map.addLayer(pearsonsTrend,
 { min: -1, max: 1 , bands: ['correlation'] }, 'Pearsons r');

// Define arbitrary thresholds
var zones = pearsonsTrend.expression(
  "(b('correlation') > 0 && b('p-value') < 0.05) ? 2" +
  ": (b('correlation') < 0 && b('p-value') < 0.05) ? 1" +
  ": 0");
  
zones = zones.clip(studyArea);

Map.addLayer(zones, { min: 0, max: 2,
  palette: [
    '000000',
    'ff341f',
    '0731ff',
    ]
  }, 'change detection');
    
/* EXPORT IMAGES
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */
 
var filename;
switch(productName) {
  case 'LANDSAT/LT04/C01/T1_SR':
    filename = 'Landsat4_MNDWI_';
    break;

  case 'LANDSAT/LT05/C01/T1_SR':
    filename = 'Landsat5_MNDWI_';
    break;

  case 'LANDSAT/LE07/C01/T1_SR':
    filename = 'Landsat7_MNDWI_';
    break;

  case 'LANDSAT/LC08/C01/T1_SR':
    filename = 'Landsat8_MNDWI_';
    break;

  default:
    throw 'This ImageCollection is not supported!';
}


// Export the image to an Earth Engine asset.
Export.image.toAsset({
    image: zones,
    description: filename + nameOfTheArea + dateInput.range + 'changes',
    assetId: filename + nameOfTheArea + dateInput.range + 'changes',
    scale: 30,
    region: studyArea
});

// // Save the image as GeoTIFF
Export.image.toDrive({
    image: zones,
    description: filename + nameOfTheArea + dateInput.range + 'changes',
    scale: 30,
    region: studyArea
});

// Save the image as GeoTIFF
Export.image.toDrive({
    image: median.select(['MNDWI']),
    description: filename + nameOfTheArea + dateInput.range,
    scale: 30,
    region: studyArea
});

// Save the composite image as GeoTIFF
Export.image.toAsset({
    image: median.select(['B1_1','B2_1','B3_1','B4_1','B5_1', 'B7_1']),
    description: filename + nameOfTheArea + dateInput.range + 'multi',
    assetId: filename + nameOfTheArea + dateInput.range + 'multi',
    scale: 30,
    region: studyArea
});

// Save the composite image as GeoTIFF
Export.image.toDrive({
    image: median.select(['B1_1','B2_1','B3_1','B4_1','B5_1', 'B7_1']),
    description: filename + nameOfTheArea + dateInput.range + 'multi',
    scale: 30,
    region: studyArea
});
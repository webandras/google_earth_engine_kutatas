// Import Classifier module
var classify = require('users/gulandras90/course:process/classifier');

// Import Classifier module
var chartClusters = require('users/gulandras90/course:process/chartClusters');

// Load the image to classify
var image = ee.Image('users/gulandras90/Landsat5_MNDWI_miklapuszta1984-2012multi');

Map.centerObject(image);
Map.addLayer(image);

// Study area
var studyArea = ee.FeatureCollection('ft:1g6Kve0rEAVDeF6UsPXE4NIgfwJO1azGBM9jwc3QV', 'geometry').union();


// Classify the image
var classifiedData = classify.classifier(image, studyArea, 10, 'clusters');

// Plot clusters by backscatter mean values to inspect water classes.
chartClusters.plotClustersByReflectance(
  image,
  classifiedData,
  studyArea
);

// Outline for the study area
Map.addLayer(ee.Image().paint(studyArea, 0, 2), {}, 'Study Area');

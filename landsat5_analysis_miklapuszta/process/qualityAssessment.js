/* FUNCTION DEFINITIONS STARTS HERE
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */


/* This is a very simple function can be used for any value extraction from bitfields.
 * Returns an image containing just the specified QA bits.
 *
 * Args:
 *   image - The QA Image to get bits from.
 *   start - The first bit position, 0-based.
 *   end   - The last bit position, inclusive.
 *   name  - A name for the output image.
 */
var getQABits = function(image, start, end, newName) {
  // Compute the bits we need to extract.
  // Here we get a pattern full of 1111...
  var pattern = 0;
  for (var i = start; i <= end; i++) {
     pattern += Math.pow(2, i);
  }
  return image.select([0], [newName])
                .bitwiseAnd(pattern) // &, extracting bits from the QA band.
                .rightShift(start); // >>, for positioning in the bitfield.
};


/* 
* Own function created to obtain the quality mask
* Args:
* image: MOD09A1 ImageCollection
*/

function qualityMask (image) {
  // Extract 'QA' and 'StateQA' bands from Landsat image
  var pixelQuality = image.select('pixel_qa');
  var radiometricSaturation =  image.select('radsat_qa');
  
  // Where data quality is inappropiate
  var cloudShadow = getQABits(pixelQuality, 3, 3, "Cloud_Shadow").eq(0);

  var clouds = getQABits(pixelQuality, 5, 5, "Cloud").eq(0);

  // You can add more bands if it is needed for your research

  /* Where data quality is appropiate. */
  var mask = clouds.and(cloudShadow);
  
  // Returns the mask, 1 = good quality, 0 = bad quality
  return mask;
}


// Adds a mask layer named 'QA_mask' to the properties of a collection
exports.addMask = function(image) {
  return function(image) {
    return image.addBands(qualityMask(image).rename('QA_mask'));
  };
};

// Uses the mask on the properties of the ImageCollection
exports.addMaskedData = function(image) {
  return function(image) {
    return image.addBands(image.updateMask(image.select('QA_mask')));
  };
};

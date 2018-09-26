// This function calculates spectral indices for Landsat TM
// First argument is the index name: NDVI EVI, MNDWI
// MNDWI
// Second argument is an instance of ee.Image() class

exports.getSpectralIndex = function(index, image, collection) {
  switch (index) {
    case 'NDVI':
      return image.normalizedDifference(['B4_1', 'B3_1']);

    case 'MNDWI':
      if (collection === 'LANDSAT/LC08/C01/T1_SR') {
        return image.normalizedDifference(['B3_1', 'B7_1']);
      }
      // print("Nem L8");
      return image.normalizedDifference(['B2_1', 'B7_1']);

    case 'MNDWI2':
      if (collection === 'LANDSAT/LC08/C01/T1_SR') {
        return image.normalizedDifference(['B3', 'B7']);
      }
      // print("Nem L8");
      return image.normalizedDifference(['B2', 'B7']);

    // Normalized Difference Snow Index
    case 'NDSI':
      return image.normalizedDifference(['B2', 'B5']);

    // Enhanced Vegetation Index
    case 'EVI':
      return image.expression(
        '2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 10000))', {
          'NIR': image.select('B4_1'),
          'RED': image.select('B3_1'),
          'BLUE': image.select('B1_1')
        }
      );

    case 'EVI2': // Enhanced Vegetation Index 2
      return image.expression(
        '2.5 * ((NIR - RED) / (NIR + 2.4 * RED + 10000))', {
          'NIR': image.select('B4_1'),
          'RED': image.select('B3_1')
        }
      );

    default:
      throw 'Wrong index name supplied or the 2nd argument is not instance of ee.Image class.';
  }
};

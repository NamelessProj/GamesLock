const {getAverageColor} = require('fast-average-color-node');

const getAverageColorOfImage = async (imagePath) => {
    return await getAverageColor(imagePath);
}

module.exports = getAverageColorOfImage;
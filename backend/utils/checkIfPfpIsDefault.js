const allDefaultPfp = require('./allDefaultPfp');

const checkIfPfpIsDefault = (image) => {
    return allDefaultPfp.includes(image);
}

module.exports = checkIfPfpIsDefault;
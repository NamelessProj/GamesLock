const checkIfPfpIsDefault = (image) => {
    const defaultPfp = ['default.jpg'];
    return defaultPfp.includes(image);
}

module.exports = checkIfPfpIsDefault;
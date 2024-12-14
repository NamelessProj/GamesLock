const seedrandom = require('seedrandom');
const allDefaultPfp = require('./allDefaultPfp');

const getRandomPfp = () => {
    const randomIndex = Math.floor(Math.random() * allDefaultPfp.length);
    return allDefaultPfp[randomIndex];
}

const getSeededRandomPfp = (seed) => {
    const rng = seedrandom(seed.toString());
    const randomIndex = Math.floor(rng() * allDefaultPfp.length);
    return allDefaultPfp[randomIndex];
}

module.exports = {
    getRandomPfp,
    getSeededRandomPfp,
};
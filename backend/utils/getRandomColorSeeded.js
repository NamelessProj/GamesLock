const seedrandom = require('seedrandom');

const getRandomColorSeeded = (seed) => {
    const rng = seedrandom(seed.toString().toUpperCase());
    return {
        h: Math.floor(351 * rng()),
        s: 100,
        l: 50
    };
}

module.exports = getRandomColorSeeded;
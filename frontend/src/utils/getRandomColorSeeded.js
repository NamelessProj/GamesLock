import Rand from "rand-seed";

export const getRandomColorSeeded = (seed) => {
    const rand = new Rand(seed);
    return {
        h: Math.floor(351 * rand.next()),
        s: 100,
        l: 50
    };
}
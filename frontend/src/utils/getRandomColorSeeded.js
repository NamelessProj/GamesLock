import Rand from "rand-seed";
import {colorArray} from "./colorArray.js";

export const getRandomColorSeeded = (seed) => {
    const rand = new Rand(seed);
    return colorArray[Math.floor((colorArray.length + 1) * rand.next())];
}
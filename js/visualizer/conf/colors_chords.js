import { qualities, styles } from "../constants.js"

// prettier-ignore
export default {
    [styles.color.INTIMATE]: [
        {
            [qualities.major]: [
                [186,230,172],
                [255,255,129],
            ],
            [qualities.minor]: [
                [165,210,158],
                [195,155,167],
            ],
            [qualities.unknown]: [
                [241,158,156], 
                [255,255,129],
            ],
        },
        {
            [qualities.major]: [
                [255,255,129],
                [255,255,129],
            ],
            [qualities.minor]: [
                [120,218,164],
                [120,218,164],
            ],
            [qualities.unknown]: [
                [237,193,198],
                [237,193,198],
            ],
        },
        {
            [qualities.major]: [
                [120,218,164],
                [241,229,141],
            ],
            [qualities.minor]: [
                [241,158,156],
                [192,241,184],
            ],
            [qualities.unknown]: [
                [241,229,141], // GRÜN
                [195,155,167],
            ],
        },
    ],    
    [styles.color.LUMINOUS]: [
        {
            [qualities.major]: [
                [101,255,25],
                [255,153,29],
            ],
            [qualities.minor]: [
                [0,147,0],
                [0,0,138],
            ],
            [qualities.unknown]: [
                [0,60,255],
                [255,72,83],
            ],
        },
        {
            [qualities.major]: [
                [255,153,29],
                [255,153,29],
            ],
            [qualities.minor]: [
                [53,197,31],
                [53,197,31],
            ],
            [qualities.unknown]: [
                [0,60,255],
                [0,60,255],
            ],
        },
        {
            [qualities.major]: [
                [255,76,84],
                [59,216,169],
            ],
            [qualities.minor]: [
                [17,80,204],
                [0,207,119],
            ],
            [qualities.unknown]: [
                [0,85,156],
                [255,115,0] ,
            ],
        },
    ],    
    [styles.color.GLOOM]: [
        {
            [qualities.major]: [
                [255,255,0],
                [0,87,73],
            ],
            [qualities.minor]: [
                [0,87,73],
                [59,24,63],
            ],
            [qualities.unknown]: [
                [221,156,0],
                [123,0,151],
            ],
        },
        {
            [qualities.major]: [
                [231,203,0],
                [231,203,0],
            ],
            [qualities.minor]: [
                [0,120,106],
                [0,120,106],
            ],
            [qualities.unknown]: [
                [123,0,151],
                [123,0,151],
            ],
        },
        {
            [qualities.major]: [
                [59,216,169],
                [255,255,0],
            ],
            [qualities.minor]: [
                [167,0,99],
                [59,216,169],
            ],
            [qualities.unknown]: [
                [123,0,151],
                [255,255,0],
            ],
        },
    ],    
}

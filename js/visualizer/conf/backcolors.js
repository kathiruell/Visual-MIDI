import { styles, qualities } from "../constants.js";

export default {
  [styles.color.INTIMATE]: {
    [qualities.major]: [
      [237, 193, 198], //unten
      [255, 255, 129], //oben
    ],
    [qualities.minor]: [
      [195, 155, 167], //unten
      [165, 210, 158], //oben
    ],
    [qualities.augmented]: [
      [241, 158, 156], //unten
      [235, 220, 161], //oben
    ],
    [qualities.diminished]: [
      [235, 220, 161], //unten
      [186, 230, 172], //oben
    ],
  },
  [styles.color.LUMINOUS]: {
    [qualities.major]: [
      [101, 255, 25], //unten
      [255, 153, 29], //oben
    ],
    [qualities.minor]: [
      [0, 0, 138], //unten
      [0, 147, 0], //oben
    ],
    [qualities.augmented]: [
      [0, 214, 0], //unten
      [255, 76, 84], //oben
    ],
    [qualities.diminished]: [
      [255, 72, 83], //unten
      [0, 60, 255], //oben
    ],
  },
  [styles.color.GLOOM]: {
    [qualities.major]: [
      [59, 216, 169], //unten
      [255, 255, 0], //oben
    ],
    [qualities.minor]: [
      [59, 24, 63], //unten
      [0, 87, 73], //oben
    ],
    [qualities.augmented]: [
      [123, 0, 151], //unten
      [221, 156, 0], //oben
    ],
    [qualities.diminished]: [
      [0, 98, 116], //unten
      [167, 0, 99], //oben
    ],
  },
};

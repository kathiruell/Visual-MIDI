import { qualities } from "./constants.js";

export function linearGradient(x1, y1, color1, opacity1, x2, y2, color2, opacity2) {
    let gradient = drawingContext.createLinearGradient(x1, y1, x2, y2);
    gradient.addColorStop(0, color(...color1, opacity1));
    gradient.addColorStop(1, color(...color2, opacity2));
    drawingContext.fillStyle = gradient;
}

export function radialGradient(x1, y1, r1, color1, opacity1, x2, y2, r2, color2, opacity2) {
    let gradient = drawingContext.createRadialGradient(x1, y1, r1, x2, y2, r2);
    gradient.addColorStop(0, color(...color1, opacity1));
    gradient.addColorStop(1, color(...color2, opacity2));
    drawingContext.fillStyle = gradient;
}
export function radialGradientBlurry(x, y, r, color1, opacity1, color2, opacity2, pos, size) {
    let gradient = drawingContext.createRadialGradient(x, y, 0, x, y, r);
    gradient.addColorStop(0, color(...color1, opacity1));
    gradient.addColorStop(pos - size/2, color(...color2, opacity2));
    gradient.addColorStop(pos + size/2, color(...color2, opacity2));
    gradient.addColorStop(1, color(...color1, opacity1));
    drawingContext.fillStyle = gradient;
}
export function radialGradientDual(pos, radius, color1, color2, breakpoint, size) {
    let gradient = drawingContext.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, radius);
    gradient.addColorStop(0, color(color1));
    gradient.addColorStop(breakpoint - size, color(color1));
    gradient.addColorStop(breakpoint, color(color2));
    drawingContext.fillStyle = gradient;
}
/**
 * returns duration of one frame in ms
 */
export function getFrameDuration(frame_rate_hz) {
    return 1000 / (frame_rate_hz)
}

export function rgbModBrightness(rgb,factor) {
    if (rgb === undefined) throw "color null"
    return [Math.round(rgb[0] * factor), Math.round(rgb[1] * factor), Math.round(rgb[2] * factor)];
}

export function simpleQuality(quality) {
    switch (quality) {
        case qualities.augmented:
            return qualities.major
        case qualities.diminished:
            return qualities.minor
        default:
            return quality
    }
}
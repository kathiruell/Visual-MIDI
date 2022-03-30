function linearGradient(x1, y1, color1, opacity1, x2, y2, color2, opacity2) {
    let gradient = drawingContext.createLinearGradient(x1, y1, x2, y2);
    gradient.addColorStop(0, color(...color1, opacity1));
    gradient.addColorStop(1, color(...color2, opacity2));
    drawingContext.fillStyle = gradient;
}

function radialGradient(x1, y1, r1, color1, opacity1, x2, y2, r2, color2, opacity2) {
    let gradient = drawingContext.createRadialGradient(x1, y1, r1, x2, y2, r2);
    gradient.addColorStop(0, color(...color1, opacity1));
    gradient.addColorStop(1, color(...color2, opacity2));
    drawingContext.fillStyle = gradient;
}

/**
 * returns duration of one frame in ms
 */
function getFrameDuration(frame_rate_hz) {
    return 1000 / (frame_rate_hz)
}

function rgbModBrightness(rgb,factor) {
    return [Math.round(rgb[0] * factor), Math.round(rgb[1] * factor), Math.round(rgb[2] * factor)];
}
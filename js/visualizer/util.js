/**
 * 
 * [255,255,255], 0.5 => "rgba(255,255,255,0.5)"
 * @param {arry} rgb 
 * @param {float} alpha 
 * @returns 
 */
function rgbArrayToString(rgb, alpha) {
    if (alpha !== undefined) {
        return "rgba(" + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + alpha + ')';
    } else {
        return "rgb(" + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
    }
}

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
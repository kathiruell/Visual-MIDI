/**
 * 
 * [255,255,255], 0.5 => "rgba(255,255,255,0.5)"
 * @param {arry} rgb 
 * @param {float} alpha 
 * @returns 
 */
function rgbArrayToString(rgb, alpha) {
    if (alpha !== undefined) {
        return "rgba("+rgb[0]+','+rgb[1]+','+rgb[2]+','+alpha+')';
    } else {
        return "rgb("+rgb[0]+','+rgb[1]+','+rgb[2]+')';
    }
}
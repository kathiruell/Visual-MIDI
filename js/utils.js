function linearGradient(x1, y1, x2, y2, colors) {
  let gradient = drawingContext.createLinearGradient(x1, y1, x2, y2);
  gradient.addColorStop(0, color(...colors[0]));
  gradient.addColorStop(1, color(...colors[1]));
  drawingContext.fillStyle = gradient;
}

function radialGradient(x1, y1, r1, x2, y2, r2, colors) {
  let gradient = drawingContext.createRadialGradient(x1, y1, r1, x2, y2, r2);
  gradient.addColorStop(0, color(...colors[0]));
  gradient.addColorStop(1, color(...colors[1]));
  drawingContext.fillStyle = gradient;
}

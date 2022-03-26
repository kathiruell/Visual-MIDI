class DetailedMellowIntimate {
  static items = [];

  constructor(x, y, note, vel) {
    this.posX = x;
    this.posY = y;
    this.isAlive = true;
    this.goal = 0;
    this.size = vel * 20;
    this.colors = [colorScale[note], colorScale[note - 1]];
    this.opacity = 255;
    this.fadeAmount = 1;
    this.constructor.items.push(this);
  }

  remove() {
    this.constructor.items.splice(this.constructor.items.indexOf(this), 1);
  }

  update() {
    if (this.size > this.goal) {
      this.fadeAmount = -10;
      this.size += this.fadeAmount;
      this.opacity += this.fadeAmount;
    } else {
      this.remove();
      return;
    }

    this.show();
  }

  show() {
    blendMode(LIGHTEST);
    noStroke();
    radialGradient(
      this.posX,
      this.posY,
      this.size / 6,
      this.posX,
      this.posY,
      this.size / 2,
      [
        [...this.colors[0], this.opacity],
        [...this.colors[1], 0],
      ]
    );
    ellipse(this.posX, this.posY, this.size, this.size);
    blendMode(BLEND);
  }
}

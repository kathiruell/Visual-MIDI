class BriskClearLuminous {
  static items = [];

  constructor(x, y, note, vel) {
    this.posX = x;
    this.posY = y;
    this.isAlive = true;
    this.goal = 0;
    this.size = vel * 5;
    this.color = colorScale[note];
    this.opacity = 255;
    this.fadeAmount = 1;
    this.constructor.items.push(this);
  }

  remove() {
    this.constructor.items.splice(this.constructor.items.indexOf(this), 1);
  }

  update() {
    if (this.opacity > 0) {
      this.fadeAmount = -1;
      this.opacity += this.fadeAmount;
    } else if (this.opacity == 0) {
      this.remove();
      return;
    }
    this.show();
  }

  show() {
    blendMode(LIGHTEST);
    noStroke();
    fill(...this.color, this.opacity);
    ellipse(this.posX, this.posY, this.size);
    blendMode(BLEND);
  }
}

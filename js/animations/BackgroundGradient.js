const backgrounds = [];
class BackgroundGradient {
  constructor(x, y, width, height, colors, opacity) {
    this.posX = x;
    this.posY = y;
    this.width = width;
    this.height = height;
    this.isAlive = true;
    this.colors = colors;
    this.opacity = opacity;
    this.fadeAmount = 1;
    this.backgrounds = [];

    this.backgrounds.push(this);
  }

  remove() {
    this.backgrounds.splice(this.backgrounds.indexOf(this), 1);
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
    linearGradient(
      this.posX + this.width / 2,
      this.posY,
      this.posX + this.width / 2,
      this.posY + this.height / 2,
      [
        [...this.colors[0], this.opacity],
        [...this.colors[1], this.opacity],
      ]
    );
    rect(this.posX, this.posY, this.width, this.height);
  }
}

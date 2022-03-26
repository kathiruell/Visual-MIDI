// const circles = [];
class ScalingCircle {
  constructor(x, y, colors, size) {
    this.posX = x;
    this.posY = y;
    this.isAlive = true;
    this.goal = windowHeight * 2;
    this.size = size;
    this.colors = colors;
    this.speed = 0;
    this.opacity = 255;
    this.circles = [];

    this.circles.push(this);
  }

  remove() {
    this.circles.splice(this.circles.indexOf(this), 1);
  }

  update() {
    if (this.size < this.goal) {
      this.size += 8;
    } else {
      this.remove();
      return;
    }
    if (this.size >= this.goal / 2) {
      this.opacity -= 5;
    }

    this.show();
  }

  show() {
    noStroke();
    // fill(...this.color, this.opacity);
    radialGradient(
      windowWidth / 2,
      windowHeight / 2,
      this.size / 6,
      windowWidth / 2,
      windowHeight / 2,
      this.size,
      [
        [...this.colors[0], this.opacity],
        [...this.colors[1], this.opacity],
      ]
    );
    ellipse(this.posX, this.posY, this.size, this.size);
  }
}

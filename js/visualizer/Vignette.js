class Vignette extends BackgroundShape {

	constructor() {
		super(new Chord(['C']))
	}

    drawShape() {
        // TODO image
        stroke(...this.getColor())
        strokeWeight(this.getRadius())
        // filter(BLUR)
        fill(0,0,0,0)
        rect(0, 0, this.getSize().x, this.getSize().y, this.getRadius())
    }

    getColor() {
        return [0,0,0]
    }

    getRadius() {
        return 100
    }
}
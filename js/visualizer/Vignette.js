class Vignette extends BackgroundShape {

	constructor() {
		super(new Chord(['C']))
	}

    drawShape() {
        stroke(...this.getColor())
        strokeWeight(this.getRadius())
        // filter(BLUR)
        rect(0, 0, this.getSize().x, this.getSize().y, this.getRadius())
    }

    getColor() {
        return [0,0,0]
    }

    getRadius() {
        return 100
    }
}
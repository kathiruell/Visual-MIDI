class BackgroundShapeBlackout extends BackgroundShape {

    constructor() {
        super(new Chord(["C"]))
        this.chord = undefined
    }

    draw() {
        background(0)
    }

    getColor() {
        return [0,0,0]
    }

}
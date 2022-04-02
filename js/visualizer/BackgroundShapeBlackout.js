class BackgroundShapeBlackout extends BackgroundShape {

    constructor() {
        super(new Chord(["C"]))
        this.chord = undefined
    }

    getColor() {
        return [0,0,0]
    }

    getOpacity() {
        return 1
    }

}
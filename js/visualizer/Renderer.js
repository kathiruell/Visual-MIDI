/**
 * manages the shapes
 */
class Renderer {
    canvas = undefined;
    shapes = [];

    constructor(canvas, frame_rate) {
        this.canvas = canvas
        this.setFramerate(frame_rate)
        this.background = new BackgroundShapeBlackout()
    }

    renderShape(shape) {
        this.shapes.push(shape);
    }

    draw() {

        // clear dead shapes
        this.shapes = this.shapes.filter(shape => shape.isAlive())

        // background
        background(0)
        // this.background.draw()

        // chord shapes
        this.shapes.filter(shape => shape instanceof ChordShape).forEach(shape => shape.draw())

        // note shapes
        this.shapes.filter(shape => shape instanceof NoteShape).forEach(shape => shape.draw())

    }

    noteOff(pitch) {
        this.shapes.filter(shape => shape.getNote().getPitch() === pitch).forEach(shape => shape.triggerRelease())
    }

    start() {
        this.shapes = []
        loop()
        console.log("Renderer start", this.getFramerateTarget(), "fps target")
    }
    stop() {
        noLoop()
    }

    getFramerateTarget() {
        return this.framerate_target
    }
    getFramerateActual() {
        return frameRate()
    }
    setFramerate(frame_rate) {
        this.framerate_target = frame_rate
        frameRate(parseFloat(this.framerate_target))
    }
    getFrameDurationTarget() {
        return 1000 / this.framerate_target
    }
    getFrameDurationActual() {
        return frameRate()
    }

}
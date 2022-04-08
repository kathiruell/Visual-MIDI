/**
 * manages the shapes
 */
class Renderer {
    static canvas = undefined;
    shapes = [];
    static background_shape = undefined;

    static canvas = undefined;
    static background = undefined;
    shapes = []
    chord_shapes = []


    constructor(canvas, frame_rate) {
        this.canvas = canvas
        this.setFramerate(frame_rate)
        this.background = new BackgroundShapeBlackout()
    }

    renderShape(shape) {
        // if (shape instanceof BackgroundShape) throw "for background shapes call renderBackgrounShape()"
        this.shapes.push(shape);
    }

    // chord shapes are being rendered first (background)
    renderChordShape(shape) {

    }

    draw() {

        // clear dead shapes
        this.shapes = this.shapes.filter(shape => shape.isAlive())

        // background
        this.background.draw()

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
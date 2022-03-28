/**
 * manages the shapes
 */
class Renderer {

    static canvas = undefined;
    static background_shape = undefined;
    shapes = []

    constructor(canvas, background_shape, frame_rate) {
        this.canvas = canvas
        this.background_shape = background_shape
        this.setFramerate(frame_rate)
    }
    
    renderShape(shape) {
        this.shapes.push(shape);
    }

    renderBackgroundShape(background_shape) {
        this.background_shape = background_shape;
    }

    draw() {
        background(0)

        // clear dead shapes
        this.shapes = this.shapes.filter(shape => shape.isAlive())

        // shapes
        this.shapes.forEach(shape => shape.draw())

        return;
        // background
        if (getChord()) {
            this.background_shape.update();
        }

    }

    start() {
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

}
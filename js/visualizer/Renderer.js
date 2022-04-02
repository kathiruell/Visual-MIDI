/**
 * manages the shapes
 */
class Renderer {

    static canvas = undefined;
    shapes = []
    static background_shape = undefined;

    constructor(canvas, frame_rate) {
        this.canvas = canvas
        this.setFramerate(frame_rate)
        this.background_shape = new BackgroundShapeBlackout()
        this.vignette = new Vignette()
    }
    
    renderShape(shape) {
        if (shape instanceof BackgroundShape) throw "for background shapes call renderBackgrounShape()"
        this.shapes.push(shape);
    }

    renderBackgroundShape(background_shape) {
        this.background_shape = background_shape;
    }

    draw() {

        // clear dead shapes
        if (!this.background_shape.isAlive()) this.background_shape = new BackgroundShapeBlackout()
        this.shapes = this.shapes.filter(shape => shape.isAlive())

        // background
        this.background_shape.draw()

        // shapes
        this.shapes.forEach(shape => shape.draw())

        // vignette
        if (visualizer.preferences.getVignetteOn()) {
            this.vignette.draw()
        }
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

}
/**
 * manages the shapes
 */
class Renderer {

    static canvas = undefined;
    static background_shape = undefined;
    shapes = []

    constructor(canvas, background_shape, conf) {
        this.canvas = canvas
        this.background_shape = background_shape
        this.conf = conf
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
        this.shapes.forEach(shape => shape.update())

        return;
        // background
        if (getChord()) {
            this.background_shape.update();
        }

    }

    start() {
        loop()
    }
    stop() {
        noLoop()
    }

}
import { blend_modes, styles } from "./constants.js";
import { Preferences } from "./Preferences.js";
import { NoteShape, ChordShape, BlackoutShape } from "./Shape.js";
/**
 * manages the shapes
 */
export class Renderer {
    static canvas = undefined;
    static shapes = [];
    // static texture = undefined;

    static init(canvas, frame_rate) {
        this.canvas = canvas
        this.setFramerate(frame_rate)
        this.background = new BlackoutShape()

        // load textures
        // TODO syntax check
        this.loadTexture()
    }

    static renderShape(shape) {
        this.shapes.push(shape);
    }

    static draw() {

        // clear dead shapes
        this.shapes = this.shapes.filter(shape => shape.isAlive())

        // background
        this.background.draw()

        // chord shapes
        this.shapes.filter(shape => shape instanceof ChordShape).forEach(shape => shape.draw())

        // note shapes
        this.shapes.filter(shape => shape instanceof NoteShape).forEach(shape => shape.draw())

        // texture
        if (Preferences.getShapeStyle() === styles.shapes.EMBOSSED) {
            this.drawTexture()
        }
    }

    static noteOff(pitch) {
        this.shapes.filter(shape => shape.getNote().getPitch() === pitch).forEach(shape => shape.triggerRelease())
    }

    static start() {
        this.shapes = []
        loop()
        console.log("Renderer start", this.getFramerateTarget(), "fps target")
    }
    static stop() {
        noLoop()
    }

    static getFramerateTarget() {
        return this.framerate_target
    }
    static getFramerateActual() {
        return frameRate()
    }
    static setFramerate(frame_rate) {
        this.framerate_target = frame_rate
        frameRate(parseFloat(this.framerate_target))
    }
    static getFrameDurationTarget() {
        return 1000 / this.framerate_target
    }
    static getFrameDurationActual() {
        return frameRate()
    }

    // TOCHECK
    static loadTexture() {
        this.texture = loadImage("/doc/texture_grain_black.png", (img) => console.log("img loaded", img));
    }

    // TOCHECK
    static drawTexture() {
        image(this.texture, 0, 0, width, height)
        // tint(255, 100);
        blendMode(MULTIPLY)
    }
}
const SHAPE_TYPE_PLAIN = 'plain',
    SHAPE_TYPE_BLURRY = 'blurry',
    SHAPE_TYPE_3D = '3d';

let shapes_id=0

class Shape {

    constructor(note) {
        this.note = note
        this.conf = visualizer.conf
        this.position = this.getPosition();
        this.opacity = this.getOpacity();
        this.lifetime_frames = 0
        this.lifetime_ms = 0
        this.id = ++shapes_id
        this.color = this.getColor();
    }

    isAlive() {
        return this.conf.getAnimations().some(animation => animation.time_ms > this.lifetime_ms)
    }

    /**
     * 
     * @returns 0 < opacity < 1
     */
    getOpacity() {
        let animation = this.conf.getAnimation('opacity')
        if (animation !== undefined && this.lifetime_ms > 0) {
            if (this.lifetime_ms >= animation.time_ms) {
                return animation.goal
            } else {
                let rel = animation.goal - this.opacity * (this.lifetime_ms / animation.time_ms)
                return this.opacity + rel
            }
        } else {
            return this.conf.getOpacity()
        }
    }

    draw() {
        // console.log("Shape", this.id, "drawing frame", this.lifetime_frames, this.lifetime_ms, "ms")
        // console.log("opacity", this.getOpacity(), "shape type", this.conf.getShapeType(), "color", this.getColor().join(','), "pos", this.getPosition(), "size", this.getSize())

        this.drawShape()

        // go to next frame
        this.lifetime_frames++
        // could use renderer.getFramerateActual() here for actual processed framerate
        this.lifetime_ms += getFrameDuration(visualizer.renderer.getFramerateTarget())
    }

    drawShape() {
        noStroke()
        switch (this.conf.getShapeType()) {
            case SHAPE_TYPE_PLAIN:
                fill(...this.getColor(), Math.round(255 * this.getOpacity()))
                ellipse(this.getPosition().x, this.getPosition().y, this.getSize(), this.getSize())
                break;

            case SHAPE_TYPE_BLURRY:
                radialGradient(
                    this.getPosition().x,
                    this.getPosition().y,
                    this.getSize() / 6,
                    this.getColor(),
                    Math.round(255 * this.getOpacity()),
                    this.getPosition().x,
                    this.getPosition().y,
                    this.getSize() / 2,
                    this.getColorSecondary(),
                    0
                );
                ellipse(this.getPosition().x, this.getPosition().y, this.getSize(), this.getSize())
                break;

            case SHAPE_TYPE_3D:
                break;

            default:
                console.log("ERROR shape type not defined", this.conf.getShapeType())
        }
    }

    /**
     * 
     * @returns rgb array
     */
    getColor() {
        // color is not animated
        if (this.lifetime_frames == 0) {

            // default color
            let color = UNDEFINED_COLOR
            let harmony = visualizer.music.getHarmony(this.note)
            if (harmony !== undefined) {

                // get colorscheme from conf
                let colors = this.conf.getColorScheme(visualizer.music.getHarmony(this.note))

                // pick random color from colorscheme
                color = colors[Math.ceil(Math.random() * colors.length) - 1]

                // pitch -> parametric
                color = rgbModBrightness(color, this.note.getOctave() / 7)
            }

            this.color = color
        }
        return this.color
    }

    getColorSecondary() {
        return [0,255,255];
    }

    getPosition() {
        let animation = this.conf.getAnimation('position')
        if (animation && this.lifetime_frames > 0) {
            // TODO?
        } else {
            if (!this.initial_position) this.initial_position = this.conf.getPosition(this.note)
            return this.initial_position
        }
    }

    getSize() {
        return 100;
    }
}
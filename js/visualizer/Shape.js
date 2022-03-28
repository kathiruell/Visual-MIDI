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
        fill(255,255,255, 255)
        ellipse(10,10,10,10)
        // console.log("Shape", this.id, "drawing frame", this.lifetime_frames, this.lifetime_ms, "ms")
        // console.log("opacity", this.getOpacity(), "shape type", this.conf.getShapeType())

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
                    255 * this.getOpacity(),
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

        // go to next frame
        this.lifetime_frames++
        // could use renderer.getFramerateActual() here for actual processed framerate
        this.lifetime_ms += getFrameDuration(visualizer.renderer.getFramerateTarget())
    }

    /**
     * 
     * @returns rgb array
     */
    getColor() {
        return [255,255,0];
        return this.getColorStyle(conf)[note];
    }

    getColorSecondary() {
        return [0,255,255];
    }

    getColorStyle() {
        switch (conf.color) {
            case 0:
                return 'color_style_0';
            case 1:
                return 'color_style_1';
            case 2:
                return 'color_style_2';
        }
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
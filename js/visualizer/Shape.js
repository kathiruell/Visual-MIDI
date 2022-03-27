const SHAPE_TYPE_PLAIN = 'plain',
    SHAPE_TYPE_BLURRY = 'blurry',
    SHAPE_TYPE_3D = '3d';

class Shape {

    constructor(note) {
        this.note = note
        this.conf = conf
        this.position = this.getPosition();
        this.opacity = this.getOpacity();
        this.lifetime = 0
    }

    isAlive() {
        return this.conf.getAnimations().some(animation => animation.frames > this.lifetime)
    }

    /**
     * 
     * @returns 0 < opacity < 1
     */
    getOpacity() {
        let animation = this.conf.getAnimation('opacity')
        if (animation !== undefined && this.lifetime > 0) {
            if (this.lifetime >= animation.frames) {
                return animation.goal
            } else {
                let step = animation.goal - this.opacity * (1 / animation.frames)
                let opacity = this.opacity + (this.lifetime * step)
                return opacity
            }
        } else {
            return this.conf.getOpacity()
        }
    }

    draw() {
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
        }
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
        if (animation && this.lifetime > 0) {
            // TODO?
        } else {
            if (!this.initial_position) this.initial_position = this.conf.getPosition(this.note)
            return this.initial_position
        }
    }

    getSize() {
        return 100;
    }

    /**
     * called per frame
     */
    update() {
        this.lifetime++
        
        this.draw()
    }
}
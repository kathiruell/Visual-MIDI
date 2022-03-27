const SHAPE_TYPE_PLAIN = 'plain',
    SHAPE_TYPE_BLURRY = 'blurry',
    SHAPE_TYPE_3D = '3d';

class Shape {

    constructor(note) {
        this.note = note
        this.conf = conf
        console.log("Shape const", this.conf)
        this.opacity = this.getOpacity();
        this.lifetime = 0
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
        switch (this.conf.getShapeType()) {
            case SHAPE_TYPE_PLAIN:
                console.log(...this.getColor(), this.getOpacity())
                fill(...this.getColor(), this.getOpacity())
                ellipse(this.getPosition().x, this.getPosition().y, this.getSize().x, this.getSize().y)
                break;

            case SHAPE_TYPE_BLURRY:
            case SHAPE_TYPE_3D:
                break;
        }
    }

    getBlur() {
        return null;
        switch (conf.shape) {
            case 0:
                return radialGradient(

                );
            case 1:
                return ellipse(

                );
            case 2:
                return ellipse(

                );
        }
    }

    /**
     * 
     * @returns rgb array
     */
    getColor() {
        return [255,255,0];
        return this.getColorScheme(conf)[note];
    }

    getColorScheme() {
        switch (conf.color) {
            case 0:
                return 'color_scheme_0';
            case 1:
                return 'color_scheme_1';
            case 2:
                return 'color_scheme_2';
        }
    }

    getPosition() {
        return this.conf.getPosition(this.note)
    }

    getSize() {
        return {x: 100, y: 100}
    }

    update() {
        this.lifetime++
        
        this.draw()
    }
}
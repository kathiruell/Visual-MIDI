class Conf {

    constructor() {
        this.shapes = shapes_array
    }

    getPosition(note) {
        if (canvas === undefined) throw "canvas not initialized"
        return {x: random(0, canvas.width), y: random(0, canvas.height)};
    }

    getColorScheme() {
        return this.shapes[preferences.getId()].color_scheme
    }

    getOpacity() {
        return this.shapes[preferences.getId()].opacity
    }

    getShapeType() {
        return this.shapes[preferences.getId()].shape_type
    }

    isAnimated(key) {
        return 'animations' in this.shapes[preferences.getId()] 
            && this.shapes[preferences.getId()].animations.some(elem => elem.param === key)
    }

    getAnimation(key) {
        try {
            return this.shapes[preferences.getId()].animations.find(elem => elem.param === key)
        } catch (error) {
            return undefined;
        }
    }
}
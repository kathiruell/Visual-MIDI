class Conf {

    constructor() {
        this.shapes = shapes_array
    }

    getPosition(note) {
        if (canvas === undefined) throw "canvas not initialized"
        return {x: random(0, canvas.width), y: random(0, canvas.height)};
    }

    getColorStyle() {
        return this.getByPref("color_style")
    }

    getOpacity() {
        return this.getByPref("opacity")
    }

    getShapeType() {
        return this.getByPref("shape_type")
    }

    getAnimations() {
        return this.getByPref("animations")
    }

    isAnimated(key) {
        return 'animations' in this.shapes[preferences.getId()] 
            && this.getByPref("animations").some(elem => elem.param === key)
    }

    getAnimation(key) {
        try {
            return this.getByPref("animations").find(elem => elem.param === key)
        } catch (error) {
            return undefined;
        }
    }

    getByPref(key) {
        return this.shapes[preferences.getId()][key]
    }
}
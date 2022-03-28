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
        return this.getAnimation(key) !== undefined
    }

    getAnimation(key) {
        try {
            return this.getByPref("animations").find(elem => elem.param === key)
        } catch (error) {
            return undefined;
        }
    }

    getByPref(key) {
        return this.shapes[visualizer.preferences.getStyleId()][key]
    }
}
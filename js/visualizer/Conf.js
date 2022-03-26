class Conf {

    constructor(canvas) {
        this.canvas = canvas
    }

    getPosition(note) {
        return {x: random(0, this.canvas.width), y: random(0, this.canvas.height)};
    }

    getColorScheme() {
        return this.shapes[preferences.getId()].color_scheme
    }

    getOpacity() {
        return this.shapes[preferences.getId()].opacity
    }
}
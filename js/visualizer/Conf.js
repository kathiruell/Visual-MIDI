class Conf {

    constructor() {
        this.shapes = shapes_array
        this.colors = colors_array
        this.harmony = harmony_array
    }

    getPosition(note) {
        if (visualizer.canvas === undefined) throw "canvas not initialized"
        return {x: random(0, visualizer.canvas.width), y: random(0, visualizer.canvas.height)}
    }

    /**
     * @returns array of colors
     */
    getColorScheme(harmony) {
        return this.colors[visualizer.preferences.getColorStyle()][harmony]
    }

    getHarmony(mode, interval) {
        return this.harmony[mode][interval]
    }

    getOpacity() {
        return this.getByPref("opacity")
    }

    getShapeType() {
        return this.getByPref("shape_type")
    }

    getByPref(key) {
        let raw = this.shapes[visualizer.preferences.getStyleId()][key]
        if (typeof raw === 'function') {
            return new AnimatedParameter(raw())
        } else {
            return new Parameter(raw)
        }
    }
}
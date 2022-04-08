class Conf {

    constructor() {
        this.shapes = shapes_array
        this.colors = colors_array
        this.harmony = harmony_array
        this.bg_colors = bg_colors_array
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

    getScale() {
        return this.getByPref("scale")
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
class Conf {

    arrays = {}

    constructor() {
        this.shapes = shapes_array
        this.colors = colors_array
        this.harmony = harmony_array
        this.bg_colors = bg_colors_array

        this.arrays['shapes'] = shapes_array
        this.arrays['chord_colors'] = bg_colors_array
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
        return this.get('shapes', visualizer.preferences.getStyleId(), 'opacity')
    }

    getShapeType() {
        return this.get('shapes', visualizer.preferences.getStyleId(), 'shape_type')
    }

    getScale() {
        return this.get('shapes', visualizer.preferences.getStyleId(), 'scale')
    }

    getChordColors(chord) {
        return this.get('chord_colors', visualizer.preferences.getColorStyle(), chord.getQuality())
    }

    get(conf_id, style_id, key) {
        if (!(conf_id in this.arrays)) {
            throw "Conf "+conf_id+" not defined"
        }
        if (!(style_id in this.arrays[conf_id])) {
            throw "Style " + style_id + " not defined in conf " + conf_id
        }
        if (!(key in this.arrays[conf_id][style_id])) {
            throw "Key " + key + " not defined in " + conf_id + "[" + style_id + "]"
        }

        let raw = this.arrays[conf_id][style_id][key]
        if (typeof raw === 'function') {
            return new AnimatedParameter(raw())
        } else {
            return new Parameter(raw)
        }
    }
}
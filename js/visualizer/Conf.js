import shapes from './conf/shapes.js';
import colors from './conf/colors.js';
import harmonies from './conf/harmony.js';
import bg_colors from './conf/backcolors.js';
import { Preferences } from './Preferences.js';
import { Parameter, AnimatedParameter } from './Parameter.js';
import backcolors from './conf/backcolors.js';

export class Conf {

    static arrays = {}
    static is_init = false

    static UNDEFINED_COLOR = [255, 255, 255]

    static init() {
        if (this.is_init) return

        this.colors = colors
        this.harmony = harmonies

        this.arrays['shapes'] = shapes
        this.arrays['chord_colors'] = bg_colors

        this.is_init = true
    }

    /**
     * @returns array of colors
     */
    static getColorSchemes() {
        return colors[Preferences.getColorStyle()]
    }

    static getHarmony(mode, interval) {
        return harmonies[mode][interval]
    }

    static getOpacity(note) {
        return this.get('shapes', Preferences.getStyleId(), 'opacity', note)
    }

    static getShapeType(note) {
        return this.get('shapes', Preferences.getStyleId(), 'shape_type', note)
    }

    static getScale(note) {
        return this.get('shapes', Preferences.getStyleId(), 'scale', note)
    }

    static getChordColors(chord) {
        return this.get(bg_colors, Preferences.getColorStyle(), chord.getQuality())
    }

    static getShapeParameter(key, note) {
        return this.get(shapes, Preferences.getStyleId(), key, note)
    }

    static get(array, style_id, key, args) {
        this.init()
        if (!(style_id in array)) {
            throw "Style " + style_id + " not defined in conf " + conf_id
        }
        if (!(key in array[style_id])) {
            throw "Key " + key + " not defined in " + conf_id + "[" + style_id + "]"
        }

        // modulators
        let modulator = undefined
        if (
            'modulators' in array[style_id]
            && key in array[style_id]['modulators']
        ) {
            modulator = array[style_id]['modulators'][key](args)
        } 

        let raw = array[style_id][key]
        // console.log("Conf.get()", conf_id, style_id, key, raw, modulator)
        if (typeof raw === 'function') {
            return new AnimatedParameter(raw(), modulator)
        } else {
            return new Parameter(raw, modulator)
        }
    }
}
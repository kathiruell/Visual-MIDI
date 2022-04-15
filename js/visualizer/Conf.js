import shapes from './conf/shapes.js';
import colors from './conf/colors.js';
import harmonies from './conf/harmony.js';
import bg_colors from './conf/backcolors.js';
import { Preferences } from './Preferences.js';
import { Parameter, AnimatedParameter } from './Parameter.js';

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
    getColorSchemes() {
        return this.colors[visualizer.preferences.getColorStyle()]
    }

    static getHarmony(mode, interval) {
        return this.harmony[mode][interval]
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
        return this.get('chord_colors', Preferences.getColorStyle(), chord.getQuality())
    }

    static get(conf_id, style_id, key, args) {
        this.init()
        if (!(conf_id in this.arrays)) {
            throw "Conf "+conf_id+" not defined"
        }
        if (!(style_id in this.arrays[conf_id])) {
            throw "Style " + style_id + " not defined in conf " + conf_id
        }
        if (!(key in this.arrays[conf_id][style_id])) {
            throw "Key " + key + " not defined in " + conf_id + "[" + style_id + "]"
        }

        // modulators
        let modulator = undefined
        if (
            'modulators' in this.arrays[conf_id][style_id]
            && key in this.arrays[conf_id][style_id]['modulators']
        ) {
            modulator = this.arrays[conf_id][style_id]['modulators'][key](args)
        } 

        let raw = this.arrays[conf_id][style_id][key]
        // console.log("Conf.get()", conf_id, style_id, key, raw, modulator)
        if (typeof raw === 'function') {
            return new AnimatedParameter(raw(), modulator)
        } else {
            return new Parameter(raw, modulator)
        }
    }
}
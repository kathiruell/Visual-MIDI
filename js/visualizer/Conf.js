import shapes from './conf/shapes.js';
import colors from './conf/colors.js';
import harmonies from './conf/harmony.js';
import bg_colors from './conf/backcolors.js';
import { Preferences } from './Preferences.js';
import { Parameter, AnimatedParameter } from './Parameter.js';
import { Animation } from './Animation.js';

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

    static getShapeParameter(key, note) {
        return this.get(shapes, Preferences.getStyleId(), key, note)
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

    static getChordColors(chord) {
        return this.get(bg_colors, Preferences.getColorStyle(), chord.getQuality())
    }

    static get(array, style_id, key, args) {
        this.init()

        if (!(style_id in array)) {
            throw "Style " + style_id + " not defined in conf " + conf_id
        }

        let raw = undefined
        if (key in array[style_id]) {
            // search key
            raw = array[style_id][key]
        } else if ('default' in array && key in array['default']) {
            // look for a default value
            raw = array['default'][key]
        } else {
            throw new KeyNotDefinedException("Key " + key + " not defined in [" + style_id + "] of", array)
        }

        // key has modulators?
        let modulator = undefined
        if (
            'modulators' in array[style_id]
            && key in array[style_id]['modulators']
        ) {
            modulator = array[style_id]['modulators'][key](args)
        } 

        // console.log("Conf.get()", array, style_id, key, raw, modulator)

        // value is computed ?
        let value = raw
        if (typeof raw === 'function') {
            // value is animated ?
            value = raw(args)
            if (value instanceof Animation) {
                console.log("CONF GET", "IS ANIMATION")
                return new AnimatedParameter(value, modulator)
            }
        }
        let res = new Parameter(value, modulator)
        console.log("CONF GET", res)
        return res
    }
}

class KeyNotDefinedException extends Error {

}
import * as CONST from './constants.js';

export class Preferences {

    static DEFAULTS = {
        'shape_style': CONST.styles.shapes.MELLOW,
        'animation_style': CONST.styles.animation.DETAILED,
        'color_style': CONST.styles.color.INTIMATE,
        'frame_rate': 60,
        'vignette': "v1",
    }

    static setShapeStyle(value) {
        this.set('shape_style', value)
    }
    static getShapeStyle() {
        return this.get('shape_style')
    }
    static setColorStyle(value) {
        this.set('color_style', value)
    }
    static getColorStyle() {
        return this.get('color_style')
    }
    static setAnimationStyle(value) {
        this.set('animation_style', value)
    }
    static getAnimationStyle() {
        return this.get('animation_style')
    }
    static getStyleId() {
        return "" + this.getAnimationStyle() + this.getShapeStyle() + this.getColorStyle();
    }
    static setVignetteId(id) {
        this.set('vignette', id)
        // if (typeof visualizer !== 'undefined' && 'note_positions' in visualizer) visualizer.note_positions.init()
    }
    static getVignetteId() {
        return this.get('vignette')
    } 

    /**
     * unit fps
     */
    static getFramerate() {
        return this.get('frame_rate')
    }
    static setFrameRate(value) {
        value = parseFloat(value)
        // try {
        //     visualizer.renderer.setFramerate(value)
        // } catch {
        //     console.log("could not change framerate")
        // }
        this.set('frame_rate', value)
    }
    
    static set(key, value) {
        window.sessionStorage.setItem(key, value);
    }
    static get(key) {
        return window.sessionStorage.getItem(key) || Preferences.DEFAULTS[key]
    }
}
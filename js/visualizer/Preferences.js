import { styles } from "./visualizer.js"

export class Preferences {

    static DEFAULTS = {
        'shape_style': styles.shapes.MELLOW,
        'animation_style': styles.animation.DETAILED,
        'color_style': styles.color.INTIMATE,
        'frame_rate': 60,
        'vignette': "v1",
    }

    constructor() {
        console.log("Preferences:", "Style", this.getStyleId(), "Framerate", this.getFramerate())
    }

    setShapeStyle(value) {
        this.set('shape_style', value)
    }
    getShapeStyle() {
        return this.get('shape_style')
    }
    setColorStyle(value) {
        this.set('color_style', value)
    }
    getColorStyle() {
        return this.get('color_style')
    }
    setAnimationStyle(value) {
        this.set('animation_style', value)
    }
    getAnimationStyle() {
        return this.get('animation_style')
    }
    getStyleId() {
        return "" + this.getAnimationStyle() + this.getShapeStyle() + this.getColorStyle();
    }
    setVignetteId(id) {
        this.set('vignette', id)
        if (typeof visualizer !== 'undefined' && 'note_positions' in visualizer) visualizer.note_positions.init()
    }
    getVignetteId() {
        return this.get('vignette')
    } 

    /**
     * unit fps
     */
    getFramerate() {
        return this.get('frame_rate')
    }
    setFrameRate(value) {
        value = parseFloat(value)
        try {
            visualizer.renderer.setFramerate(value)
        } catch {
            console.log("could not change framerate")
        }
        this.set('frame_rate', value)
    }
    
    set(key, value) {
        window.sessionStorage.setItem(key, value);
    }
    get(key) {
        return window.sessionStorage.getItem(key) || Preferences.DEFAULTS[key]
    }
}
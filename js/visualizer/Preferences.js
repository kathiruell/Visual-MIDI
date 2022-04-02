const   ANIMATION_STYLE_DETAILED = 0,
        ANIMATION_STYLE_BRISK = 1,
        ANIMATION_STYLE_MASSIVE = 2,
        SHAPE_STYLE_MELLOW = 0,
        SHAPE_STYLE_CLEAR = 1,
        SHAPE_STYLE_EMBOSSED = 2,
        COLOR_STYLE_INTIMATE = 0,
        COLOR_STYLE_LUMINOUS = 1,
        COLOR_STYLE_GLOOM = 2;

class Preferences {

    constructor() {
        console.log("Preferences:", "Style", this.getStyleId(), "Framerate", this.getFramerate())
    }

    setShapeStyle(value) {
        this.set('shape_style', value)
    }
    getShapeStyle() {
        return this.get('shape_style') || SHAPE_STYLE_MELLOW
    }
    setColorStyle(value) {
        this.set('color_style', value)
    }
    getColorStyle() {
        return this.get('color_style') || COLOR_STYLE_INTIMATE
    }
    setAnimationStyle(value) {
        this.set('animation_style', value)
    }
    getAnimationStyle() {
        return this.get('animation_style') || ANIMATION_STYLE_DETAILED
    }
    getStyleId() {
        return "" + this.getAnimationStyle() + this.getShapeStyle() + this.getColorStyle();
    }
    getVignetteOn() {
        return true;
    } 

    /**
     * unit fps
     */
    getFramerate() {
        return this.get('frame_rate') || 60
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
        return window.sessionStorage.getItem(key);
    }
}
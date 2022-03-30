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
        this.init()

        console.log("Preferences:", "Style", this.getStyleId(), "Framerate", this.getFramerate())
    }

    init() {
        this.setShapeStyle(this.getShapeStyle() || SHAPE_STYLE_MELLOW)
        this.setColorStyle(this.getColorStyle() || COLOR_STYLE_INTIMATE)
        this.setAnimationStyle(this.getAnimationStyle() || ANIMATION_STYLE_DETAILED)
        this.setFrameRate(this.getFramerate() || 60)
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
        return window.sessionStorage.getItem(key);
    }
}
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
    }

    init() {
        this.args = {
            shape_style: SHAPE_STYLE_CLEAR,
            color_scheme: COLOR_STYLE_GLOOM,
            animation_style: ANIMATION_STYLE_BRISK,
        }
        console.log("init", this.args)
    }
    setShapeStyle(value) {
        this.set('shape_style', value)
    }
    getShapeStyle() {
        this.get('shape_style')
    }
    setColorScheme(value) {
        this.set('color_scheme', value)
    }
    getColorScheme() {
        this.get('color_scheme')
    }
    setAnimationStyle(value) {
        this.set('animation_style', value)
    }
    getAnimationStyle() {
        this.get('animation_style')
    }
    
    set(key, value) {
        this.args[key] = value
    }
    get(key) {
        return this.args[key];
    }

    getId() {
        console.log(this.getAnimationStyle())
        return "" + this.getAnimationStyle() + this.getShapeStyle() + this.getColorScheme();
    }
}
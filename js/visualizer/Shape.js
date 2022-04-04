const SHAPE_TYPE_PLAIN = 'plain',
    SHAPE_TYPE_BLURRY = 'blurry',
    SHAPE_TYPE_3D = '3d';

let shapes_id=0
let debug_anim = undefined

class Shape {

    constructor() {
        this.conf = visualizer.conf
        this.lifetime_frames = 0
        this.lifetime_ms = 0
        this.id = ++shapes_id
        this.parameters = {}
        console.log(typeof this, this)
    }

    setParameter(key, parameter) {
        if (!(parameter instanceof Parameter)) throw "only pass Parameter objects to Shape.setParameter()"
        console.log("Shape ",this.id, " setParameter", key, parameter)
        this.parameters[key] = parameter

        // DEBUG
        if (parameter instanceof AnimatedParameter && debug_anim === undefined) debug_anim = parameter
    }

    getParameter(key) {
        if (!(key in this.parameters)) throw "undefined Parameter "+key
        let parameter = this.parameters[key]
        if (!(parameter instanceof Parameter)) console.log("illegal param", parameter)
        return this.parameters[key].getValue()
    }

    draw() {
        // console.log(this.constructor.name, this.id, "drawing frame", this.lifetime_frames, this.lifetime_ms, "ms")
        // console.log("opacity", this.getOpacity(), "shape type", this.conf.getShapeType(), "color", this.getColor().join(','), "pos", this.getPosition(), "size", this.getSize())

        this.animate()

        this.drawShape()

        // go to next frame
        this.lifetime_frames++
        // could use renderer.getFramerateActual() here for actual processed framerate
        this.lifetime_ms += getFrameDuration(visualizer.renderer.getFramerateTarget())
    }

    animate() {
        Object.values(this.parameters).forEach(param => param instanceof AnimatedParameter && param.triggerAnimation())
    }

    triggerRelease() {
        Object.values(this.parameters).forEach(param => param instanceof AnimatedParameter && param.triggerAnimationRelease())
    }

    drawShape() {}

    isAlive() {
        // active animation ? 
        return Object.values(this.parameters).some(param => param instanceof AnimatedParameter && param.isActive())
    }
}

class BackgroundShape extends Shape {}

class NoteShape extends Shape {

    constructor(note) {
        super()
        this.note = note
        this.setParameter('opacity', this.conf.getOpacity())
        this.setParameter('shape_type', this.conf.getShapeType())
    }

    /**
     * 
     * @returns rgb array
     */
    getColor() {
        if (this.color === undefined) {
            // default color
            let color = UNDEFINED_COLOR
            let harmony = visualizer.music.getHarmony(this.note)
            if (harmony !== undefined) {

                // get colorscheme from conf
                let colors = this.conf.getColorScheme(visualizer.music.getHarmony(this.note))

                // pick random color from colorscheme
                color = colors[Math.ceil(Math.random() * colors.length) - 1]

                // pitch -> parametric
                color = rgbModBrightness(color, this.note.getOctave() / 7)
            }
            this.color = color
        }

        return this.color
    }

    getColorSecondary() {
        return [0,255,255];
    }

    getPosition() {
        if (this.position === undefined) {
            this.position = {
                x: Math.random() * width,
                y: Math.random() * height,
            }
        }
        return this.position
    }
    getSize() {
        return 100;
    }

    getNote() {
        return this.note
    }

    drawShape() {
        noStroke()
        switch (this.getParameter('shape_type')) {
            case SHAPE_TYPE_PLAIN:
                fill(...this.getColor(), Math.round(255 * this.getParameter('opacity')))
                ellipse(this.getPosition().x, this.getPosition().y, this.getSize(), this.getSize())
                break;

            case SHAPE_TYPE_BLURRY:
                radialGradient(
                    this.getPosition().x,
                    this.getPosition().y,
                    this.getSize() / 6,
                    this.getColor(),
                    Math.round(255 *  this.getParameter('opacity')),
                    this.getPosition().x,
                    this.getPosition().y,
                    this.getSize() / 2,
                    this.getColorSecondary(),
                    0
                );
                ellipse(this.getPosition().x, this.getPosition().y, this.getSize(), this.getSize())
                break;

            case SHAPE_TYPE_3D:
                break;

            default:
                console.log("ERROR shape type not defined", this.conf.getShapeType())
        }
    }

    isAlive() {
        // key pressed or animation ?
        return this.note.isOn() || super.isAlive()
    }
}

class BackgroundShapeBlackout extends BackgroundShape {

    drawShape() {
        noStroke()
        fill(0,0,0,255)
        rect(0, 0, width, height)
    }

    isAlive() {
        return true
    }
}

class ChordShape extends BackgroundShape {
    constructor(chord) {
        super(new Note(chord.getBaseNote(), 0))
        this.chord = chord
        this.color = this.getColor()
        this.setParameter('opacity', new AnimatedParameter(
            new InOutAnimation(
                [200, 2000],
                [1, 0],
                'linear'
            )
        ))
	}

    drawShape() {
        noStroke()
        fill(...this.color, Math.round(255 * this.getParameter('opacity')))
        rect(0, 0, width, height)
    }

    getColor() {
        // pick colorscheme for base note of this.chord
        let harmony = visualizer.music.getHarmony(this.getNote())
        let colors = this.conf.getColorScheme(harmony)
        
        // pick random color from colorscheme
        return colors[Math.ceil(Math.random() * colors.length) - 1]
    }

    getNote() {
        return new Note(this.chord.getBaseNote(), 0)
    }
}
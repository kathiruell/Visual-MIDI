import { blend_modes, shape_types } from './constants.js';
import { Conf } from './Conf.js'
import { Renderer } from './Renderer.js'
import { getFrameDuration, rgbModBrightness, linearGradient, radialGradientBlurry, simpleQuality } from './util.js'
import { Parameter, AnimatedParameter } from './Parameter.js';
import { Music } from './Music.js';
import { NotePositions } from './NotePositions.js';
import { Note } from './MusicalEvent.js';
import { InOutAnimation } from './Animation.js';

let shapes_id = 0
let color_scheme_index = 0
let chord_color_scheme_index = 0

export class Shape {

    static DEFAULT_LIFETIME = 5000

    constructor() {
        this.lifetime_frames = 0
        this.lifetime_ms = 0
        this.id = ++shapes_id
        this.parameters = {}
        // console.log(typeof this, this)
    }

    setParameter(key, parameter) {
        if (!(parameter instanceof Parameter)) throw "only pass Parameter objects to Shape.setParameter()"
        // console.log("Shape ",this.id, " setParameter", key, parameter)
        this.parameters[key] = parameter
    }

    getParameter(key) {
        if (!(key in this.parameters)) throw "undefined Parameter "+key
        let parameter = this.parameters[key]
        if (!(parameter instanceof Parameter)) console.log("illegal param", parameter)
        return this.parameters[key].getValue()
    }

    draw() {
        // console.log(this.constructor.name, this.id, "drawing frame", this.lifetime_frames, this.lifetime_ms, "ms")
        // console.log("opacity", this.getShapeParameter('opacity', ), "shape type", Conf.getShapeParameter('shape_type', ), "color", this.getColor().join(','), "pos", this.getPosition(), "size", this.getSize())

        this.animate()

        this.drawShape()

        // go to next frame
        this.lifetime_frames++
        // could use renderer.getFramerateActual() here for actual processed framerate
        this.lifetime_ms += getFrameDuration(Renderer.getFramerateTarget())
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
        if (Object.values(this.parameters).some(param => param instanceof AnimatedParameter)) {
            return Object.values(this.parameters).some(param => param instanceof AnimatedParameter && param.isActive())
        } else {
            return this.lifetime_ms < Shape.DEFAULT_LIFETIME
        }
    }
}

export class BackgroundShape extends Shape {}

export class NoteShape extends Shape {

    constructor(note) {
        super()
        this.note = note
        this.setParameter('opacity', Conf.getShapeParameter('opacity', this.note))
        this.setParameter('scale', Conf.getShapeParameter('scale', this.note))
        this.setParameter('inner_size', Conf.getShapeParameter('inner_size', this.note))
        this.setParameter('shape_type', Conf.getShapeParameter('shape_type', this.note))
        this.setParameter('blend_mode', Conf.getShapeParameter('blend_mode', this.note))
    }

    /**
     * 
     * @returns rgb array
     */
    getColor() {
        if (this.color === undefined) {
            // default color
            let color = Conf.UNDEFINED_COLOR
            let harmony = Music.getHarmony(this.note)
            if (harmony !== undefined) {

                // get colorschemes from conf
                let color_schemes = Conf.getColorSchemes()

                // apply harmony
                let harmony = Music.getHarmony(this.note)
                color_scheme_index = (color_scheme_index + harmony) % color_schemes.length
                let color_scheme = color_schemes[color_scheme_index]

                // pick random color from colorscheme
                color = color_scheme[Math.ceil(Math.random() * color_scheme.length) - 1]

                // pitch -> parametric
                color = rgbModBrightness(color, this.note.getOctave() / 7)
            }
            this.color = color
        }

        return this.color
    }

    getColorSecondary() {
        return [240,255,255];
    }

    getOpacity() {
        return Math.floor(this.getParameter('opacity') * 255)
    }

    getPosition() {
        return NotePositions.getPosition(this.note)
    }

    getSize() {
        return 250 * this.getParameter('scale')
    }

    getInnerSize() {
        return 200 * this.getParameter('inner_size')
    }

    getNote() {
        return this.note
    }

    drawShape() {
        // console.log("NoteShape.draw()", this.getPosition(), this.getSize(), this.getColor(), this.getShapeParameter('opacity', ))
        noStroke()
        switch (this.getParameter('blend_mode')) {
            case blend_modes.difference: 
                blendMode(DIFFERENCE)
                break;
            
            case blend_modes.lightest:
                blendMode(LIGHTEST)
                break;
                            
            case blend_modes.multiply:
                blendMode(MULTIPLY)
                break;

            case blend_modes.normal:
                blendMode(BLEND)
                break;    
        }
        
        switch (this.getParameter('shape_type')) {
            case shape_types.plain:
                fill(...this.getColor(), this.getOpacity())
                ellipse(this.getPosition().x, this.getPosition().y, this.getSize(), this.getSize())
                break;

            case shape_types.blurry:
                radialGradientBlurry(
                    this.getPosition().x,
                    this.getPosition().y,
                    this.getSize() / 2, // radius
                    // INNER & OUTER
                    this.getColor(),
                    0,
                    // MIDDLE
                    this.getColor(),
                    this.getOpacity(),
                    .7,
                    this.getParameter('inner_size'),
                );
                ellipse(this.getPosition().x, this.getPosition().y, this.getSize(), this.getSize())
                // rect(0,0,width, height)
                break;

            case shape_types.texturized:

            // decision: blur oder 3d
                drawingContext.shadowOffsetX = 10;
                drawingContext.shadowOffsetY = -10;
                drawingContext.shadowBlur = 5;
                drawingContext.shadowColor = 'white';
                // drawingContext.filter = 'blur(100px)';
                fill(...this.getColor(), this.getOpacity())
                ellipse(this.getPosition().x, this.getPosition().y, this.getSize(), this.getSize())
                break;

            default:
                console.log("ERROR shape type not defined", Conf.getShapeParameter('shape_type', ))
        }
    }

    isAlive() {
        // key pressed or animation ?
        return this.note.isOn() || super.isAlive()
    }
}

export class BlackoutShape extends BackgroundShape {

    drawShape() {
        blendMode(BLEND)
        background(0)
    }

    isAlive() {
        return true
    }
}

export class ChordShape extends BackgroundShape {
    constructor(chord) {
        super(new Note(chord.getBaseNote(), 0))
        this.chord = chord
        this.setParameter('opacity', new AnimatedParameter(
            new InOutAnimation(
                [200, 4000],
                [1, 0],
                'linear'
            )
        ))
	}

    getOpacity() {
        return Math.floor(255 * this.getParameter('opacity'))
    }

    drawShape() {
        noStroke()
        linearGradient(0, 0, this.getColors()[0], this.getOpacity(), 0, height, this.getColors()[1], this.getOpacity())
        rect(0, 0, width, height)
    }

    getColors() {
        if (this.colors !== undefined) return this.colors

        // get colorschemes from conf
        let color_schemes = Conf.getChordColors()

        // apply harmony
        let harmony = Music.getChordHarmony(this.chord) || 0
        chord_color_scheme_index = (chord_color_scheme_index + harmony) % color_schemes.length
        console.log("GLOBAL INDEX", chord_color_scheme_index)

        // apply quality
        let quality = simpleQuality(this.chord.getQuality())
        this.colors = color_schemes[chord_color_scheme_index][quality]
        return this.colors
    }

    getNote() {
        return new Note(this.chord.getBaseNote(), 0)
    }
}
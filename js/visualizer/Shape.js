import { shape_types } from './constants.js';
import { Conf } from './Conf.js'
import { Renderer } from './Renderer.js'
import { getFrameDuration, rgbModBrightness, linearGradient } from './util.js'
import { Parameter, AnimatedParameter } from './Parameter.js';
import { Music } from './Music.js';
import { NotePositions } from './NotePositions.js';
import { Note } from './MusicalEvent.js';
import { InOutAnimation } from './Animation.js';

let shapes_id=0

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
        // console.log("opacity", this.getOpacity(), "shape type", Conf.getShapeType(), "color", this.getColor().join(','), "pos", this.getPosition(), "size", this.getSize())

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
        this.setParameter('opacity', Conf.getOpacity(this.note))
        this.setParameter('scale', Conf.getScale(this.note))
        this.setParameter('shape_type', Conf.getShapeType(this.note))
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

                // get colorscheme from conf
                let colors = Conf.getColorScheme(Music.getHarmony(this.note))

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
        return [240,255,255];
    }

    getOpacity() {
        return Math.floor(this.getParameter('opacity') * 255)
    }

    getPosition() {
        return NotePositions.getPosition(this.note)
    }

    getSize() {
        return 200 * this.getParameter('scale')
    }

    getNote() {
        return this.note
    }

    drawShape() {
        // console.log("NoteShape.draw()", this.getPosition(), this.getSize(), this.getColor(), this.getOpacity())
        noStroke()
        switch (this.getParameter('shape_type')) {
            case shape_types.plain:
                fill(...this.getColor(), this.getOpacity())
                ellipse(this.getPosition().x, this.getPosition().y, this.getSize(), this.getSize())
                break;

            case shape_types.blurry:
                radialGradient(
                    this.getPosition().x,
                    this.getPosition().y,
                    this.getSize() / 6,
                    this.getColor(),
                    this.getOpacity(),
                    this.getPosition().x,
                    this.getPosition().y,
                    this.getSize() / 2,
                    this.getColorSecondary(),
                    0
                );
                ellipse(this.getPosition().x, this.getPosition().y, this.getSize(), this.getSize())
                break;

            case shape_types.texturized:
                blendMode(DIFFERENCE);
                fill(...this.getColor(), this.getOpacity())
                ellipse(this.getPosition().x, this.getPosition().y, this.getSize(), this.getSize())
                break;

            default:
                console.log("ERROR shape type not defined", Conf.getShapeType())
        }
    }

    isAlive() {
        // key pressed or animation ?
        return this.note.isOn() || super.isAlive()
    }
}

export class BlackoutShape extends BackgroundShape {

    drawShape() {
        // noStroke()
        // fill(0,0,0)
        // rect(0, 0, width, height)
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
        this.colors = Conf.getChordColors(this.chord).getValue()
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
        linearGradient(0, 0, this.colors[0], this.getOpacity(), 0, height, this.colors[1], this.getOpacity())
        rect(0, 0, width, height)
    }

    getColors() {
        Conf.getChordColors(this.chord)
    }

    getNote() {
        return new Note(this.chord.getBaseNote(), 0)
    }
}
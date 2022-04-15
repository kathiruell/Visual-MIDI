/// <reference types="p5/global" />
import { Preferences } from "./Preferences.js";

export let styles = {
    color: {
        INTIMATE: 0,
        LUMINOUS: 1,
        GLOOM: 2,
    },
    animation: {
        DETAILED: 0,
        BRISK: 1,
        MASSIVE: 2,
    },
    shapes: {
        MELLOW: 0,
        CLEAR: 1,
        EMBOSSED: 2,

    }
}

export let visualizer = {
    conf: new Conf(),
    preferences: new Preferences(),
    renderer: undefined,
    canvas: undefined,
    music: new Music(),
    note_positions: undefined,
    UNDEFINED_COLOR: [255,255,255],

    ANIMATION_STYLE_DETAILED: 0,
    ANIMATION_STYLE_BRISK: 1,
    ANIMATION_STYLE_MASSIVE: 2,
    SHAPE_STYLE_MELLOW: 0,
    SHAPE_STYLE_CLEAR: 1,
    SHAPE_STYLE_EMBOSSED: 2,
    COLOR_STYLE_INTIMATE: 0,
    COLOR_STYLE_LUMINOUS: 1,
    COLOR_STYLE_GLOOM: 2,
}

export function setup() {
    visualizer.canvas = createCanvas(windowWidth, windowHeight);
    visualizer.canvas.parent("canvas");
    visualizer.note_positions = new NotePositions()

    visualizer.renderer = new Renderer(
        visualizer.canvas, 
        visualizer.preferences.getFramerate()
    )
	visualizer.renderer.start()

    setupMidi(handleNoteOn, handleNoteOff);

    // demo()
    // debugNotePositions()
}

function demo() {
    window.setInterval(function(){
        handleNoteOn(0, 56, 100)
        window.setTimeout(function() {
            handleNoteOff(0, 56, 100)
        }, 2500)
    }, 5000);
}

function debugNotePositions() {
    for (let i = 0; i < 127; i++) {
        handleNoteOn(0, i, 100)
    }
}

export function draw() {
    visualizer.renderer.draw()
}

export function handleNoteOn(ch, pitch, vel) {
    let note = new Note(pitch, vel)
    visualizer.music.addNote(note);

    let shape = new NoteShape(note);
    visualizer.renderer.renderShape(shape)

    // chord?
    if (isChord()) {
        let chord_alternatives = getChord()
        let chord = new Chord(chord_alternatives)
        visualizer.music.addChord(chord);

        let chord_shape = new ChordShape(chord)
        visualizer.renderer.renderShape(chord_shape)
    }
}

export function handleNoteOff(ch, pitch, vel) {
    visualizer.music.noteOff(pitch)
    visualizer.renderer.noteOff(pitch)
}

export function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
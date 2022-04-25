/// <reference types="p5/global" />
import { Preferences } from "./Preferences.js";
import { Music } from "./Music.js";
import { NotePositions } from "./NotePositions.js";
import { Renderer } from "./Renderer.js";
import { Note, Chord } from "./MusicalEvent.js";
import { NoteShape, ChordShape } from "./Shape.js";
import * as p5 from "./../lib/p5.js";
// import * as tonal from "./../lib/tonal.js";
import * as midi from "./../lib/midi.js";

// interface to p5
window.setup = function() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("canvas");

    NotePositions.init()
    Renderer.init(
        canvas, 
        Preferences.getFramerate()
    )
	Renderer.start()

    midi.setupMidi(window.handleNoteOn, window.handleNoteOff);

    // demo()
    // debugNotePositions()
}

window.draw = function() {
    Renderer.draw()
}

window.windowResized = function() {
    resizeCanvas(windowWidth, windowHeight);
    NotePositions.init()
}

// interface to midi.js
window.handleNoteOn = function(ch, pitch, vel) {
    let note = new Note(pitch, vel)
    Music.addNote(note);

    let shape = new NoteShape(note);
    Renderer.renderShape(shape)

    // chord?
    if (midi.isChord()) {
        let chord_alternatives = midi.getChord()
        let chord = new Chord(chord_alternatives)
        if (chord.getNumNotes() > 2) {
            Music.addChord(chord);

            let chord_shape = new ChordShape(chord)
            Renderer.renderShape(chord_shape)
        }
    }
}

window.handleNoteOff = function(ch, pitch, vel) {
    Music.noteOff(pitch)
    Renderer.noteOff(pitch)
}

// DEBUGGING
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
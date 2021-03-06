import { Conf } from "./Conf.js"
import { Renderer } from "./Renderer.js"
import { harmonies, qualities } from "./constants.js"
import { MusicalEvent, Note } from "./MusicalEvent.js"

export class Music {

    static LIFETIME_S = 2
    static notes = [] 
    static chords = []
    static pedal = false
    static verbose = false

    // DEBUG
    static debug() {
        this.verbose = true
    }
    static log(...o) {
        if (!this.verbose) return
        console.log("Music.js Notes", this.notes, "Chords:", this.chords, "PEDAL", this.pedal)
        console.log(...o)
    }

    /**
     * 
     * @returns the current base note (either a chords basenote or the last played note)
     */
    static getBaseNote() {
        // last chord ?
        if (this.chords.length) {
            return this.chords[this.chords.length - 1].getBaseNote()
        } else if (this.notes.length > 1) {
            return this.notes[this.notes.length - 2].getBaseNote()
        } else {
            return undefined
        }
    }

    /**
     * @returns current mode as MODE_MAJOR, MODE_MINOR or MODE_FREE
     */
    static getMode() {
        if (this.chords.length) {
            return this.chords[this.chords.length - 1].getQuality()
        } else {
            return qualities.unknown
        }
    }

    /**
     * returns the last played interval
     */
    static getInterval(note) {
        if (this.notes.length > 1) {
            return this.notes[this.notes.length - 2].getInterval(note)
        } else {
            return undefined
        }
    }

    static addNote(note) {
        // cleanup this.notes and this.chords
        this.cleanup()

        // push note
        this.notes.push(note)

        // pedal active?
        if (this.pedal) note.pedalOn()
        this.log("ADD NOTE",note.pitch)
    }

    static addChord(chord) {
        this.chords.push(chord)
        // console.log("CHORD", chord.getName(), chord.getQuality())
        // console.log("base:", MusicalEvent.noteName(this.getBaseNote()), "mode:", this.getMode())
    }

    /**
     * returns consonant, semisonant or dissonant
     */
    static getHarmony(note) {
        if (this.getInterval(note) === undefined) return undefined

        // depends on Interval and underlying chord 
        return Conf.getHarmony(this.getMode(), this.getInterval(note))
    }

    static keyRelease(pitch) {
        this.notes.filter(note => note.pitch === pitch).forEach(note => {
            note.keyRelease()
            if (note.isOff()) Renderer.noteOff(note.pitch)
        });
    }

    static pedalOn() {
        this.pedal = true
        this.notes.forEach(note => note.isOn() && note.pedalOn())
        this.log("PEDAL ON")
    }

    static pedalOff() {
        this.pedal = false
        this.notes.forEach(note => {
            note.pedalOff()
            if (note.isOff()) Renderer.noteOff(note.pitch)
        })
        this.log("PEDAL OFF")
    }

    static getChordHarmony(chord) {
        if (this.chords.length <= 1) return undefined
        let last_chord = this.chords[this.chords.length -2]
        
        let sonance = 0
        let last_chord_root = new Note(last_chord.getBaseNote())
        let last_chord_quality = last_chord.getQuality()
        chord.getNotes().forEach(note => {
            let rel = 0
            // let interval = last_chord_root.getInterval(note)
            let interval = note.getInterval(last_chord_root)
            switch (Conf.getHarmony(last_chord_quality, interval)) {
                case harmonies.consonant:
                    rel = 5
                    break
                case harmonies.semisonant:
                    rel = 0
                    break
                case harmonies.dissonant:
                    rel = -10
                    break
            }
            console.log("REL ", note.getName(), rel)
            sonance += rel
        });


        let res = harmonies.consonant
        if (sonance < 3) {
            res = harmonies.dissonant
        } else if (last_chord.getNotes().length !== chord.getNotes().length) {
            res = harmonies.semisonant
        }
        console.log("SONANCE root=", last_chord_root.getName(), "mode=",last_chord_quality, "chord=", chord.getName(), "sonance=", sonance, "res=", res)
        return res
    }

    static noteOff(pitch) {
        this.notes.filter(note => note.pitch === pitch).forEach(note => note.noteOff())
    }

    static cleanup() {
        function isAlive(item) {
            if (item.isOn()) return true
            let now = Date.now()
            return now - (item.timestamp_note_off || item.timestamp) < Music.LIFETIME_S * 1000
        }
        this.notes = this.notes.filter(item => isAlive(item))
        this.chords = this.chords.filter(item => isAlive(item))
    }

}
const NOTE_NAMES = "C C# D D# E F F# G G# A A# B".split(" ")
const MODE_MAJOR = 0,
    MODE_MINOR = 1,
    MODE_FREE = -1;

class Music {

    events = []
    notes = [] 
    chords = []

    getBaseNote() {
        // last chord ?
        if (this.chords.length) {
            return this.chords[this.chords.length - 1].getBaseNote()
        } else if (this.notes.length > 1) {
            return this.notes[this.notes.length - 2].getBaseNote()
        } else {
            return undefined
        }
    }

    getMode() {
        if (this.chords.length) {
            return this.chords[this.chords.length - 1].getMode()
        } else {
            return MODE_FREE
        }
    }

    addNote(note) {
        this.events.push(note)
        this.notes.push(note)
        console.log("NOTE",note.pitch)
        console.log("base:", MusicalEvent.noteName(this.getBaseNote()), "mode:", this.getMode())
    }

    addChord(chord) {
        this.events.push(chord)
        this.chords.push(chord)
        console.log("CHORD", chord.getName(), chord.getMode())
        console.log("base:", MusicalEvent.noteName(this.getBaseNote()), "mode:", this.getMode())
    }
}
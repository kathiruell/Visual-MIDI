const NOTE_NAMES = {
    'C': 0,
    'C#': 1,
    'Db': 1,
    'D': 2,
    'D#': 3,
    'Eb': 3,
    'E': 4,
    'F': 5,
    'F#': 6,
    'Gb': 6,
    'G': 7,
    'G#': 8,
    'Ab': 8,
    'A': 9,
    'A#': 10,
    'Bb': 10,
    'B': 11,
};

const MODE_FREE = 0,
    MODE_MAJOR = 1,
    MODE_MINOR = 2;

const CONSONANT = 0,
    DISSONANT = 1,
    SEMISONANT = 2;

class Music {

    events = []
    notes = [] 
    chords = []

    /**
     * 
     * @returns the current base note (either a chords basenote or the last played note)
     */
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

    /**
     * @returns current mode as MODE_MAJOR, MODE_MINOR or MODE_FREE
     */
    getMode() {
        if (this.chords.length) {
            return this.chords[this.chords.length - 1].getMode()
        } else {
            return MODE_FREE
        }
    }

    /**
     * returns the last played interval
     */
    getInterval(note) {
        if (this.notes.length > 1) {
            return this.notes[this.notes.length - 2].getInterval(note)
        } else {
            return undefined
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

    getHarmony(note) {
        if (this.getInterval(note) === undefined) return undefined

        // depends on Interval and underlying chord 
        return visualizer.conf.getHarmony(this.getMode(), this.getInterval(note))
    }

    noteOff(pitch) {
        // remove all notes from this.notes with given pitch
        // this.notes = this.notes.filter(note => note.pitch !== pitch)
        this.notes.filter(note => note.pitch === pitch).forEach(note => note.noteOff())
    }
}
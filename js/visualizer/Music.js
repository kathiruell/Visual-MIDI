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
    SEMISONANT = 1,
    DISSONANT = 2;

class Music {

    static LIFETIME_S = 2
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
            return this.chords[this.chords.length - 1].getQuality()
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
        this.cleanup()
        this.notes.push(note)
        // console.log("NOTE",note.pitch)
        // console.log("base:", MusicalEvent.noteName(this.getBaseNote()), "mode:", this.getMode())
    }

    addChord(chord) {
        this.chords.push(chord)
        // console.log("CHORD", chord.getName(), chord.getQuality())
        // console.log("base:", MusicalEvent.noteName(this.getBaseNote()), "mode:", this.getMode())
    }

    getHarmony(note) {
        if (this.getInterval(note) === undefined) return undefined

        // depends on Interval and underlying chord 
        return visualizer.conf.getHarmony(this.getMode(), this.getInterval(note))
    }

    noteOff(pitch) {
        this.notes.filter(note => note.pitch === pitch).forEach(note => note.noteOff())
    }

    cleanup() {
        function isAlive(item) {
            let now = Date.now()
            return now - (item.timestamp_note_off || item.timestamp) < Music.LIFETIME_S * 1000
        }
        this.notes = this.notes.filter(item => isAlive(item))
        this.chords = this.chords.filter(item => isAlive(item))
    }
}
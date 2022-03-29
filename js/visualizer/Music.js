class Music {

    events = []
    notes = [] 
    chords = []

    getBaseNote() {
        // last chord ?
        if (this.chords.length) {
            return this.chords[this.chords.length - 1].getBaseNote()
        } else {
            return this.notes[this.notes.length - 2]
        }
    }

    addNote(note) {
        this.events.push(note)
        this.notes.push(note)
        console.log("NOTE",note.pitch)
    }

    addChord(chord) {
        this.events.push(chords)
        this.chords.push(chord)
        console.log("CHORD",chord.getName())
    }
}
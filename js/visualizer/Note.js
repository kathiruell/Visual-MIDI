class MusicalEvent {

    constructor() {
        this.timestamp = Date.now()
        this.timestamp_note_off = undefined
    }

    noteOff() {
        this.timestamp_note_off = Date.now()
    }

    isOn() {
        return this.timestamp_note_off === undefined
    }

    isOff() {
        return !!this.timestamp_note_off
    }

    static noteName(pitch) {
        return Object.keys(NOTE_NAMES).find(p => NOTE_NAMES[p] === pitch)
    }
    static pitch(note_name) {
        return NOTE_NAMES[note_name]
    }
}

class Chord extends MusicalEvent {

    constructor(alternatives) {
        super()
        this.alternatives = alternatives    // array of chord names
        this.name = this.getName()
        this.noteOff()
        // console.log("CHORD", this.name)
    }

    getTonalObject() {
        let name = this.getName()
        return Tonal.Chord.get(name.split('/')[0]) // we ignore chord root, since not implemented in tonal.js
    }
    /**
     * returns pitch
     */
    getBaseNote() {
        return MusicalEvent.pitch(this.getTonalObject().tonic)
    }

    getName() {
        // only compute once
        if (this.name) return this.name

        let i = 0

        // avoid minor #5 and major b5 chords if there are other alternatives
        for (i; i < this.alternatives.length - 1; i++) {
            if (['m#5', 'Mb5'].some(x => this.alternatives[i].includes(x))) {
                continue
            } else {
                break
            }
        }
        return this.alternatives[i]
    }

    getQuality() {
        let quality = this.getTonalObject().quality
        return quality === 'Major' ? MODE_MAJOR : MODE_MINOR;
    }
}

class Note extends MusicalEvent {

    constructor(pitch, vel) {
        super()
        this.pitch = pitch
        this.vel = vel
    }

    getBaseNote() {
        return this.pitch % 12
    }

    getInterval(note) {
        return (this.pitch - note.pitch + 360) % 12
    }

    getOctave() {
        return Math.ceil(this.pitch / 12)
    }

    getPitch() {
        return this.pitch
    }

}
class MusicalEvent {

    constructor() {
        this.timestamp = Date.now()
    }

    static noteName(pitch) {
        return NOTE_NAMES[pitch % 12]
    }
    static pitch(note_name) {
        return NOTE_NAMES.find((x) => x === note_name)
    }
}

class Chord extends MusicalEvent {

    constructor(alternatives) {
        super()
        this.alternatives = alternatives    // array of chord names
        console.log("tonal object", this.getTonalObject())
    }

    getTonalObject() {
        return Tonal.Chord.get(this.alternatives[0])
    }
    /**
     * returns Note object
     */
    getBaseNote() {
        // use tonal.js
        // return MusicalEvent.pitch(this.getTonalObject().tonic)

        let s = this.getName().match(/(.[#b]?)/)[1]
        return NOTE_NAMES.findIndex((i) => i == s)
    }

    getName() {
        let res = this.alternatives[0]
        if (!res.length) throw "chord.getName() return incorrect"
        return res
    }

    getMode() {
        // use tonal.js
        // let quality = this.getTonalObject().quality
        // return quality === 'Major' ? MODE_MAJOR : MODE_MINOR;

        let s = this.getName().match(/.[#b]?([m|M])/)[1]    // m or M
        if (s === 'm') {
            return MODE_MINOR;
        } else {
            return MODE_MAJOR;
        }
    }
}

class Note extends MusicalEvent {

    static pitch
    static vel

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


}
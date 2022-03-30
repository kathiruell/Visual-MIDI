class MusicalEvent {

    constructor() {
        this.timestamp = Date.now()
    }

    static noteName(pitch) {
        return NOTE_NAMES[pitch % 12]
    }
}

class Chord extends MusicalEvent {

    constructor(alternatives) {
        super()
        this.alternatives = alternatives    // array of chord names
    }

    /**
     * returns 0 < int < 12
     */
    getBaseNote() {
        // TODO how to fetch from tonal.js?
        let s = this.getName().match(/(.[#b]?)/)[1]
        return NOTE_NAMES.findIndex((i) => i == s)
    }

    getInterval() {
        return (this.pitch % 12 - this.getBaseNote()) % 12
    }

    getOctave() {
        return Math.ceil(this.pitch / 12)
    }

    getName() {
        return this.alternatives[0]
    }

    getMode() {
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

}
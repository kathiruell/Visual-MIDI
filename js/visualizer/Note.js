const NOTE_NAMES = "C C# D D# E F F# G G# A A# B".split(" ")

class MusicalEvent {

    constructor() {
        this.timestamp = Date.now()
    }
}

class Chord extends MusicalEvent {

    constructor(name) {
        this.name = name    // A#maj7/C#
    }

    /**
     * returns 0 < int < 12
     */
    getBaseNote() {
        // TODO how to fetch from tonal.js?
        s = this.name.match(/(.#?)/)
        return NOTE_NAMES.findIndex(s)
    }

    getName() {
        return this.name
    }
    getMode() {

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

}
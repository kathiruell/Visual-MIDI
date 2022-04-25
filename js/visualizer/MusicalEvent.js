import { qualities, note_names } from "./constants.js";

export class MusicalEvent {

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
        return Object.keys(note_names).find(p => note_names[p] === pitch)
    }
    static pitch(note_name) {
        return note_names[note_name]
    }
}

export class Chord extends MusicalEvent {

    constructor(alternatives) {
        super()
        this.alternatives = alternatives    // array of chord names
        this.name = this.getName()
        this.noteOff()
        // console.log("CHORD", this.name)
        // console.log(this.getTonalObject())
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

    getNotes() {
        return this.getTonalObject().notes.map((item) => 
            new Note(note_names[item])
        )
    }

    getQuality() {
        let intervals = this.getTonalObject().intervals

        let res = qualities.unknown
        // major third and perfect fifth
        if (intervals.includes('3M') && intervals.includes('5P')) {
            res = qualities.major
        }
        // minor third and perfect fifth
        else if (intervals.includes('3m') && intervals.includes('5P')) {
            res = qualities.minor
        }
        // major third and augmented fifth
        else if (intervals.includes('3M') && intervals.includes('5A')) {
            res = qualities.augmented
        }
        // minor third and diminished fifth
        else if (intervals.includes('3m') && intervals.includes('5d')) {
            res = qualities.diminished
        }
        // sus => major
        else if (intervals.includes('5P') && ( intervals.includes('2M') || intervals.includes('4P') )) {
            res = qualities.major
        }
        // console.log("INT", intervals, " => ", res)
        return res
    }

    getNumNotes() {
        return this.getTonalObject().intervals.length
    }
}

export class Note extends MusicalEvent {

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

    getName() {
        return MusicalEvent.noteName(this.getPitch())
    }
}
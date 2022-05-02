import { Preferences } from "./Preferences.js"

export class NotePositions {

    static DISTRIBUTION_NORMAL = 1
    static DISTRIBUTION_CENTER = 4

    static MAP_VIGNETTE_DISTRIBUTION = {
        v1: this.DISTRIBUTION_NORMAL,
        v2: this.DISTRIBUTION_NORMAL,
        v3: this.DISTRIBUTION_CENTER,
    }

    static MARGIN_NONE = 0
    static MARGIN_NORMAL = 100  // px

    static MAP_VIGNETTE_MARGIN = {
        v1: this.MARGIN_NONE,
        v2: this.MARGIN_NORMAL,
        v3: this.MARGIN_NORMAL,
    }

    static pos = {}
    static distribution = NotePositions.DISTRIBUTION_NORMAL

    /**
     * computes random positions for all pitches
     */
    static init() {
        this.setVignetteId(Preferences.getVignetteId())
        for (let i = 0; i < 128; i++) {
            this.pos[i] = this.getRandomPosition()
        }
    }

    static getRandomPosition() {
        let max_x = width * .5 - this.margin
        let max_y = height * .5 - this.margin
        return {
            x: Math.round((1 - 2 * this.randomG(this.distribution)) * max_x + .5 * width),
            y: Math.round((1 - 2 * this.randomG(this.distribution)) * max_y + .5 * height),
        }
    }

    static getPosition(note) {
        return this.pos[note.getPitch()]
    }

    static setDistribution(distribution_id) {
        this.distribution = distribution_id
    }

    static setMargin(margin) {
        this.margin = margin
    }

    static randomG(v){ 
        var r = 0;
        for(var i = v; i > 0; i --){
            r += Math.random();
        }
        return r / v;
    }

    static setVignetteId(id) {
        this.setDistribution(NotePositions.MAP_VIGNETTE_DISTRIBUTION[id])
        this.setMargin(NotePositions.MAP_VIGNETTE_MARGIN[id])
    }
}
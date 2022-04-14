class NotePositions {

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

    pos = {}
    distribution = NotePositions.DISTRIBUTION_NORMAL

    constructor() {
        this.init()
    }

    init() {
        this.setVignetteId(visualizer.preferences.getVignetteId())
        for (let i = 0; i < 128; i++) {
            this.pos[i] = this.getRandomPosition()
        }
        console.log("NotePositions RECOMPUTE")
    }

    getRandomPosition() {
        let max_x = width * .5 - this.margin
        let max_y = height * .5 - this.margin
        console.log("NotePositions", this.margin, this.distribution, max_x, max_y)
        return {
            x: (1 - 2 * this.randomG(this.distribution)) * max_x + .5 * width,
            y: (1 - 2 * this.randomG(this.distribution)) * max_y + .5 * height,
        }
    }

    getPosition(note) {
        return this.pos[note.getPitch()]
    }

    setDistribution(distribution_id) {
        this.distribution = distribution_id
    }

    setMargin(margin) {
        this.margin = margin
    }

    randomG(v){ 
        var r = 0;
        for(var i = v; i > 0; i --){
            r += Math.random();
        }
        return r / v;
    }

    setVignetteId(id) {
        this.setDistribution(NotePositions.MAP_VIGNETTE_DISTRIBUTION[id])
        this.setMargin(NotePositions.MAP_VIGNETTE_MARGIN[id])
    }
}
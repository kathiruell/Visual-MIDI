class NotePositions {

    static DISTRIBUTION_NORMAL = 1
    static DISTRIBUTION_CENTER = 4

    pos = {}
    distribution = NotePositions.DISTRIBUTION_NORMAL

    constructor() {
        this.init()
    }

    init() {
        for (let i = 0; i < 128; i++) {
            this.pos[i] = this.getRandomPosition()
        }
    }

    getRandomPosition() {
        return {
            x: (1 - 2 * this.randomG(this.distribution)) * width * .5 + width * .5,
            y: (1 - 2 * this.randomG(this.distribution)) * height * .5 + height * .5,
        }
    }

    getPosition(note) {
        // return this.getRandomPosition()
        return this.pos[note.getPitch()]
    }

    setDistribution(distribution_id) {
        this.distribution = distribution_id
        this.init()
    }

    randomG(v){ 
        var r = 0;
        for(var i = v; i > 0; i --){
            r += Math.random();
        }
        return r / v;
    }
}
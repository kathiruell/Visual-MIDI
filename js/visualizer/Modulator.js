class Modulator {

    constructor() {
        this.start = Date.now()
    }

    modulate(value) {
        return value
    }
}

export class VelocityModulator extends Modulator {
    
    constructor(vel) {
        super()
        this.vel = vel
    }

    modulate(value) {
        return value * Math.min( ( this.vel / 128 ), 1)
    }
}

export class LinearPositionModulator extends Modulator {
    
    /** speed as { x: px/s, y: px/s } */
    constructor(speed) {
        super()
        this.speed = speed
    }

    // value is [x,y]
    modulate(value) {
        return {
            x: value.x + (Date.now() - this.start) / 1000 * this.speed.x,
            y: value.y + (Date.now() - this.start) / 1000 * this.speed.y,
        }
    }
}
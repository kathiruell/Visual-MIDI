class Modulator {

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
        return (Math.min( value * ( this.vel / 128 ), 1))
    }
}
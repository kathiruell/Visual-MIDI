/**
 * abstract class
 */
class Animation {

    getValue() {
        return this.value
    }

    trigger() {}

    isActive() {}
}

class SimpleAnimation extends Animation {

    constructor(time, goal) {
        super()
        // TODO...
    }
}

class AdsrAnimation extends Animation {

    PRE_RELEASE = 0
    POST_RELEASE = 1

    /**
     * 
     * @param {array} timing attack, decay, sustain, releasetimes
     * @param {array} levels attack, decay, sustain, release/floor levels
     */
    constructor(timing, levels, interpolation_type) {
        super()
        this.timing = timing
        this.levels = levels
        this.interpolation_type = interpolation_type || 'linear'
        this.phase = this.PRE_RELEASE
        this.time_ms = 0        // counts ms after Attack / Release
        this.level_release = undefined
    }

    getValue() {
        let x = this.time_ms
        let t = this.timing
        let l = this.levels
        if (this.level_release === undefined) {
            if (x <= t[0]) {
                // ATTACK
                return this.interpolate(0, l[0], t[0], x)
            } else if (x <= t[0] + t[1]) {
                // DECAY
                return this.interpolate(l[0], l[1], t[1], x - t[0])
            } else if (x <= t[0] + t[1] + t[2]) {
                // SUSTAIN
                return this.interpolate(l[1], l[2], t[2], x - t[1] - t[0])
            } else {
                // SUSTAIN LEVEL REACHED
                return l[2]
            }
        } else {
            if (x <= t[3]) {
                // RELEASE
                return this.interpolate(this.level_release, l[3], t[3], x)
            } else {
                // OVER
                return l[3]
            }
        }
    }

    interpolate(from, to, time, x) {
        switch (this.interpolation_type) {
            case 'linear':
                return from + (to - from) * (x / time)
            case 'exp':
                throw "exponential interpolation not implemented"
        }
    }

    /**
     * per frame computation of this.value
     */
    trigger() {
        this.time_ms += visualizer.renderer.getFrameDurationTarget()
    }

    triggerRelease() {
        if (this.level_release !== undefined) return
        this.level_release = this.getValue()
        this.time_ms = 0
    }

    isActive() {
        return this.level_release === undefined ||  this.time_ms <= this.timing[3]
    }
}

/**
 * Attack - Release Animation
 * timing:
 *      0: attack time
 *      1: release time
 * levels:
 *      0:  attack level
 *      1:  release/floor level
 */
class InOutAnimation extends AdsrAnimation {

    getValue() {
        let x = this.time_ms
        let t = this.timing
        let l = this.levels

        if (this.time_ms <= t[0]) {
            // FADE IN
            return this.interpolate(0, l[0], t[0], x)
        } else if (this.time_ms <= t[1]) {
            // FADE OUT
            return this.interpolate(l[0], l[1], t[1], x)
        } else {
            return l[1]
        }
    }

    isActive() {
        return this.time_ms <= this.timing[0] + this.timing[1]
    }

}
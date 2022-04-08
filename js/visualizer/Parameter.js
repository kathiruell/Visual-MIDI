class Parameter {

    constructor(value, ...modulators) {
        this.value = value
        this.modulators = modulators.filter(Boolean)
    }

    getValue() {
        return this.modulate(this.value)
    }

    isActive() {
        return false
    }

    modulate(value) {
        if (!this.modulators.length) return value
        let v = value
        for (let modulator of this.modulators) {
            v = modulator.modulate(v)
        }
        console.log("Parameter.modulate()", value, "=>", v)
        return v
    }
}

class AnimatedParameter extends Parameter {

    constructor(animation, ...modulators) {
        super(undefined, ...modulators)
        this.animation = animation
    }

    getValue() {
        return this.modulate(this.animation.getValue())
    }

    isActive() {
        return this.animation.isActive()
    }

    triggerAnimation() {
        this.animation.trigger()
    }

    triggerAnimationRelease() {
        this.animation.triggerRelease()
    }
}
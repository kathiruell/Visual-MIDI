class Parameter {

    constructor(value) {
        this.value = value
    }

    getValue() {
        return this.value
    }

    isActive() {
        return false
    }
}

class AnimatedParameter extends Parameter {

    constructor(animation) {
        super(undefined)
        this.animation = animation
    }

    getValue() {
        return this.animation.getValue()
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
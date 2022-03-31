class BackgroundShape extends Shape {

	constructor(chord) {
		super(new Note(chord.getBaseNote()));
	}

    drawShape() {
        noStroke()
        fill(...this.getColor(), Math.round(255 * this.getOpacity()))
        rect(0, 0, this.getSize().x, this.getSize().y)
    }

    getSize() {
        return {x: width, y: height}
    }

    getColor() {
        if (this.lifetime_frames == 0) {
            // pick colorscheme for base note of this.chord
            let harmony = visualizer.music.getHarmony(this.note)
            let colors = this.conf.getColorScheme(harmony)
            
            // pick random color from colorscheme
            this.color = colors[Math.ceil(Math.random() * colors.length) - 1]
        }

        return this.color
    }
}
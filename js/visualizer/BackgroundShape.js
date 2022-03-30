class BackgroundShape extends Shape {

	constructor(chord) {
		super(new Note(chord.getBaseNote()));
	}

    getShapes() {
        return [
            rect(0, 100, 100),
        ];
    }
}
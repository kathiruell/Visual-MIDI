class Shape {

    shapes = [];

    constructor(note, conf) {
        this.note = note
        this.conf = conf
        console.log("Shape const", this.conf)
        this.shapes = this.getShapes();
        this.opacity = this.getOpacity();
        // this.shapes.forEach(x => x.show());

    }

    getOpacity() {
        return this.conf.getOpacity()
    }

    getShapes() {
        return [
            ellipse(this.getPosition().x, this.getPosition().y, this.getSize().x, this.getSize().y),
            this.getBlur(),
        ];
    }

    getBlur() {
        return null;
        switch (conf.shape) {
            case 0:
                return radialGradient(

                );
            case 1:
                return ellipse(

                );
            case 2:
                return ellipse(

                );
        }
    }

    getColor() {
        return this.getColorScheme(conf)[note];
    }

    getColorScheme() {
        switch (conf.color) {
            case 0:
                return 'color_scheme_0';
            case 1:
                return 'color_scheme_1';
            case 2:
                return 'color_scheme_2';
        }
    }

    getPosition() {
        return this.conf.getPosition(this.note)
    }

    getSize() {
        return {x: 100, y: 100}
    }

    update() {

    }
}
/// <reference types="p5/global" />

const visualizerPage = document.querySelector("#visualizer-page");
const UNDEFINED_COLOR = [255,255,255]

let visualizer = {
    conf: new Conf(),
    preferences: new Preferences(),
    renderer: undefined,
    canvas: undefined,
    music: new Music(),
}

function setup() {
    visualizer.canvas = createCanvas(windowWidth, windowHeight);
    visualizer.canvas.parent("visualizer-page");

    visualizerPage.addEventListener("show", () => visualizer.renderer.start());
    visualizerPage.addEventListener("hide", () => visualizer.renderer.stop());

    visualizer.renderer = new Renderer(
        visualizer.canvas, 
        visualizer.preferences.getFramerate()
    )
	visualizer.renderer.start()

    setupMidi(handleNoteOn, handleNoteOff);
}

function draw() {
    visualizer.renderer.draw()
}

function handleNoteOn(ch, pitch, vel) {
    let note = new Note(pitch, vel)
    visualizer.music.addNote(note);

    let shape = new Shape(note);
    visualizer.renderer.renderShape(shape)

    // chord?
    if (isChord()) {
        let chord_alternatives = getChord()
        console.log("getChord", chord_alternatives)

        let chord = new Chord(chord_alternatives)
        console.log(chord, chord.getBaseNote(),chord.getMode())

        visualizer.music.addChord(chord);

        let background = new BackgroundShape(chord)
        visualizer.renderer.renderShape(background)
    }
}

function handleNoteOff(ch, pitch, vel) {
    // TODO
    // playingNotes = playingNotes.filter((note) => note.pitch !== pitch);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
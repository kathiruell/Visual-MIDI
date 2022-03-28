/// <reference types="p5/global" />

const visualizerPage = document.querySelector("#visualizer-page");

let visualizer = {
    conf: new Conf(),
    preferences: new Preferences(),
    renderer: undefined,
    canvas: undefined,
}
let myChords = null;
let playingNotes = [];
let lastNote = playingNotes[playingNotes.length - 1];

function setup() {
    visualizer.canvas = createCanvas(windowWidth, windowHeight);
    visualizer.canvas.parent("visualizer-page");

    visualizerPage.addEventListener("show", () => visualizer.renderer.start());
    visualizerPage.addEventListener("hide", () => visualizer.renderer.stop());

    visualizer.renderer = new Renderer(
        visualizer.canvas, 
        new BackgroundShapeBlackout(new Note(0, 0)), 
        visualizer.preferences.getFramerate()
    )
	visualizer.renderer.start()

    setupMidi(handleNoteOn, handleNoteOff);
    myChords = getChord();
    chordIsMajor = isMajor(myChords);
}

function draw() {
    visualizer.renderer.draw()
}

function handleNoteOn(pitch, vel) {
    let note = new Note(pitch, vel)
    playingNotes.push(note);

    let shape = new Shape(note);
    visualizer.renderer.renderShape(shape)
}

function handleNoteOff(pitch, vel) {
    // TODO
    playingNotes = playingNotes.filter((note) => note.pitch !== pitch);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
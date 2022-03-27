/// <reference types="p5/global" />

const visualizerPage = document.querySelector("#visualizer-page");

let myChords = null;
let playingNotes = [];
let lastNote = playingNotes[playingNotes.length - 1];
let visualizer_conf = undefined;
let preferences = new Preferences();
let conf = new Conf();
let renderer = undefined;
let canvas = undefined;

function setup() {
	frameRate(30);
    noLoop();

    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("visualizer-page");

    visualizerPage.addEventListener("show", loop);
    visualizerPage.addEventListener("hide", noLoop);

    renderer = new Renderer(
        canvas, 
        new BackgroundShapeBlackout(new Note(0, 0)), 
        preferences
    )
	renderer.start()

    setupMidi(handleNoteOn, handleNoteOff);
    myChords = getChord();
    chordIsMajor = isMajor(myChords);
}

function draw() {
    renderer.draw()
}

function handleNoteOn(pitch, vel) {
    let note = new Note(pitch, vel)
    playingNotes.push(note);

    let shape = new Shape(note, visualizer_conf);
    renderer.renderShape(shape)
}

function handleNoteOff(pitch, vel) {
    // TODO
    playingNotes = playingNotes.filter((note) => note.pitch !== pitch);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
/// <reference types="p5/global" />

let visualizer = {
    conf: new Conf(),
    preferences: new Preferences(),
    renderer: undefined,
    canvas: undefined,
    music: new Music(),
    note_positions: undefined,
    UNDEFINED_COLOR: [255,255,255],
}

function setup() {
    visualizer.canvas = createCanvas(windowWidth, windowHeight);
    visualizer.canvas.parent("canvas");
    visualizer.note_positions = new NotePositions()

    visualizer.renderer = new Renderer(
        visualizer.canvas, 
        visualizer.preferences.getFramerate()
    )
	visualizer.renderer.start()

    setupMidi(handleNoteOn, handleNoteOff);

    demo()
}

function demo() {
    window.setInterval(function(){
        handleNoteOn(0, 56, 100)
        window.setTimeout(function() {
            handleNoteOff(0, 56, 100)
        }, 2500)
    }, 5000);
}

function draw() {
    visualizer.renderer.draw()
}

function handleNoteOn(ch, pitch, vel) {
    let note = new Note(pitch, vel)
    visualizer.music.addNote(note);

    let shape = new NoteShape(note);
    visualizer.renderer.renderShape(shape)

    // chord?
    if (isChord()) {
        let chord_alternatives = getChord()
        console.log("getChord", chord_alternatives)

        let chord = new Chord(chord_alternatives)
        console.log(chord, chord.getBaseNote(),chord.getMode())

        visualizer.music.addChord(chord);

        let chord_shape = new ChordShape(chord)
        visualizer.renderer.renderShape(chord_shape)
    }
}

function handleNoteOff(ch, pitch, vel) {
    visualizer.music.noteOff(pitch)
    visualizer.renderer.noteOff(pitch)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
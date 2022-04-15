// Listener fuction
// function ON(channel, note, velocity){...}

let MIDI_PUSHED = [];

export function setupMidi(
    listenOn = () => console.log("No listener specified on ON"),
    listenOff
) {
    // Check if available
    if (navigator.requestMIDIAccess) console.log("WebMIDI supported.");
    else return console.log("WebMIDI is not supported.");
    navigator.requestMIDIAccess().then(
        (access) => {
            const midi = access;
            const inputs = midi.inputs.values();

            console.log("Available MIDI devices: ");
            let idx = 0;
            for (let i = inputs.next(); i && !i.done; i = inputs.next()) {
                console.log("Device No." + String(idx));
                console.log(
                    "%c Device name: " + i.value.name + ", " + i.value.manufacturer,
                    "background: #EAE4D1; color: #F7347A"
                );
                console.log(
                    "%c Type: " + i.value.type,
                    "background: #EAE4D1; color: #167F45"
                );
                console.log(
                    "%c State: " + i.value.state,
                    "background: #EAE4D1; color: #210898"
                );
                i.value.onmidimessage = onMIDIMessage;
                idx++;
            }
        },
        (e) => console.log("Could not access your MIDI devices: ", e)
    );

    // MIDI listener =============
    function onMIDIMessage(message) {
        const data = message.data;
        // 0: channel; 1: note; 2: velocity;
        const cmd = data[0] >> 4;
        const channel = data[0] & 0xf;
        const type = data[0] & 0xf0;
        const note = data[1];
        const velocity = data[2];

        // console.log("MIDI data: ", data)
        // if (data[0] != 248) console.log("MIDI data: ", data); //clock

        switch (type) {
            case 144:
                MIDI_PUSHED.push(note);
                MIDI_PUSHED.sort();
                listenOn(channel, note, velocity);
                break;
            case 128:
                listenOff(channel, note, velocity);
                MIDI_PUSHED = MIDI_PUSHED.filter((element) => element != note);
                MIDI_PUSHED.sort();
                break;
        }
    }
}

export function isChord() {
    let a = [];
    for (let n of MIDI_PUSHED) a.push(Tonal.Midi.midiToNoteName(n));
    let res = Tonal.Chord.detect(a);
    res = res.length > 0 ? true : false;
    return res;
}

export function getChord() {
    let a = [];
    for (let n of MIDI_PUSHED) a.push(Tonal.Midi.midiToNoteName(n));
    let res = Tonal.Chord.detect(a);
    return res;
}

export function isMajor(chords) {
    let res = false;
    if (Array.isArray(chords) && chords.length > 0) {
        let check = chords[0].includes("M");
        if (check) res = true;
    }
    return res;
}

export function isMinor(chords) {
    let res = false;
    if (!isDiminished(chords)) {
        if (Array.isArray(chords) && chords.length > 0) {
            let check = chords[0].includes("m");
            if (check) res = true;
        }
    }
    return res;
}

export function isAugmented(chords) {
    let res = false;
    if (Array.isArray(chords) && chords.length > 0) {
        let check = chords[0].includes("aug");
        if (check) res = true;
    }
    return res;
}

export function isDiminished(chords) {
    let res = false;
    if (Array.isArray(chords) && chords.length > 0) {
        let check = chords[0].includes("dim");
        if (check) res = true;
    }
    return res;
}
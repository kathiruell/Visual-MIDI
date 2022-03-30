function handleNoteOn() {
  base_note = note;
  note = midiGet()

  drawShape(note, pref)
  drawBackground(note, pref)
}

function drawShape(note) {
  let shape = new Shape()

  shape.draw(note, pref)
}
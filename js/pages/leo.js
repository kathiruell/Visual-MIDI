/// <reference types="p5/global" />

const visualizerPage = document.querySelector("#visualizer-page");
const backgrounds = [];
const circles = [];
let myChords = null;
let chordIsMajor = null;
let tone = null;
let activeTone = null;
let playingNotes = [];
let lastNote = playingNotes[playingNotes.length - 1];
let SelectedCircleAnimation = DetailedMellowIntimate;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("visualizer-page");

  visualizerPage.addEventListener("show", loop);
  visualizerPage.addEventListener("hide", noLoop);
  noLoop();

  setupMidi(handleNoteOn, handleNoteOff);
  myChords = getChord();
  chordIsMajor = isMajor(myChords);
}

function draw() {
  background(0);
  drawSequence();
}

function drawSequence() {
  if (isMajor(getChord())) {
    for (let i = 0; i < this.backgrounds.length; i++) {
      backgrounds[i].update();
    }
  }
  if (isMinor(getChord())) {
    for (let i = 0; i < backgrounds.length; i++) {
      backgrounds[i].update();
    }
  }
  if (isAugmented(getChord())) {
    for (let i = 0; i < backgrounds.length; i++) {
      backgrounds[i].update();
    }
  }
  if (isDiminished(getChord())) {
    for (let i = 0; i < backgrounds.length; i++) {
      backgrounds[i].update();
    }
  }

  for (let i = 0; i < backgrounds.length; i++) {
    backgrounds[i].update();
  }

  for (const Animation of Object.values(circleAnimations)) {
    for (const item of Animation.items) {
      item.update();
    }
  }
}

function handleNoteOn(ch, note, vel) {
  tone = note;
  playingNotes.push({ note: note, vel: vel });

  new SelectedCircleAnimation(
    random(windowWidth),
    random(windowHeight),
    note,
    vel
  );
}

function handleNoteOff(ch, note, vel) {
  tone = undefined;
  activeTone = undefined;
  playingNotes = playingNotes.filter((el) => el.note !== note);
}

function keyPressed() {
  if (key === " ") {
    switchCircleAnimation();
  }
}

function switchCircleAnimation() {
  const animations = Object.values(circleAnimations);
  const currentIndex = animations.indexOf(SelectedCircleAnimation);

  let nextIndex = currentIndex + 1;
  if (nextIndex >= animations.length) nextIndex = 0;

  SelectedCircleAnimation = animations[nextIndex];
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

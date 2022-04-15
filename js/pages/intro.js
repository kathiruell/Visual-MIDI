const sentences = [
  "THIS IS A <span class='other-font'>POETIC</span> LIVE VISUALISER, BASED ON SOUND AND COLOR PERCEPTION.",
  "COLOR CHANGES WHAT WE FEEL.<br />SOUND TRANSFORMS WHAT WE SEE.",
  "SYNESTHESIA — THE EXPERIENCE OF ONE SENSE EVOKING ANOTHER  — IS MORE COMMON THAN WE REALIZE.",
  "WHILE PERFORMING MUSIC AND DESIGNING VISUAL WE NEED TO CREATE THE OVERLAPS AND INTERSECTION OF THE SENSES.",
  "THIS TOOL IS MADE FOR MUSICIANS, DESIGNERS AND OBSERVERS.",
  "SETUP YOUR PERFORMANCE AND CONNECT YOUR MIDI-DEVICE...",
];

// Documentation for typewriter: https://github.com/tameemsafi/typewriterjs#examples
$(function () {
  let typewriter = new Typewriter(document.querySelector(".typewriter"), {
    delay: 75, // Speed of the typewriting (time between each character).
    autoStart: true,
    deleteSpeed: 1,
  });

  const deleteSpeed = 1;

  typewriter
    .typeString(
      "THIS IS A <span class='other-font'>POETIC</span> LIVE VISUALIZER, BASED ON SOUND AND COLOR PERCEPTION."
    )
    .pauseFor(3000)
    .deleteAll(deleteSpeed)
    .typeString(
      "WHILE <span class='other-font'>PERFORMING</span> MUSIC AND <span class='other-font'>DESIGNING</span> VISUALLY WE NEED TO <span class='other-font'>CREATE</span> THE OVERLAPS AND INTERSECTION OF THE SENSES."
    )
    .pauseFor(3000)
    .deleteAll(deleteSpeed)
    .typeString(
      "COLOR <span class='other-font'>CHANGES</span> <br /> HOW WE FEEL.<br />SOUND <span class='other-font'>TRANSFORMS</span> WHAT WE SEE."
    )
    .callFunction(function () {
      document
        .querySelector(".typewriter")
        .setAttribute("contenteditable", true);
    })
    .start();
});

const sentences = [
  "THIS IS A <span class='other-font'>POETIC</span> LIVE VISUALISER, BASED ON SOUND AND COLOR PERCEPTION.",
  "COLOR CHANGES WHAT WE FEEL.<br />SOUND TRANSFORMS WHAT WE SEE.",
  "SYNESTHESIA — THE EXPERIENCE OF ONE SENSE EVOKING ANOTHER  — IS MORE COMMON THAN WE REALIZE.",
  "WHILE PERFORMING MUSIC AND DESIGNING VISUAL WE NEED TO CREATE THE OVERLAPS AND INTERSECTION OF THE SENSES.",
  "THIS TOOL IS MADE FOR MUSICIANS, DESIGNERS AND OBSERVERS.",
  "SETUP YOUR PERFORMANCE AND CONNECT YOUR MIDI-DEVICE...",
];

const introPage = document.querySelector("#intro-page");
introPage.addEventListener("first-show", function () {
  // Documentation for typewriter: https://github.com/tameemsafi/typewriterjs#examples

  let typewriter = new Typewriter(document.querySelector(".typewriter"), {
    delay: 75, // Speed of the typewriting (time between each character).
    autoStart: true,
    deleteSpeed: 1,
  });

  const deleteSpeed = 1;

  typewriter
    .typeString(
      "THIS IS A <span class='other-font'>POETIC</span> LIVE VISUALISER, BASED ON SOUND AND COLOR PERCEPTION."
    )
    .deleteAll(deleteSpeed)
    .typeString(
      "COLOR CHANGES WHAT WE FEEL.<br />SOUND TRANSFORMS WHAT WE SEE."
    )
    .callFunction(function () {
      introPage.setAttribute("contenteditable", true);
    })
    .start();
});

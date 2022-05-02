TODO Update


# ////////////////////// NAVIGATION //////////////////////

## TASTATUR

- Keyboard Layout erklären?

# //////////////////// DESIGN-DETAILS ////////////////////

## Intro Typewriter

- Kann ich den Cursor stylen? Wenn man schreibt, werden 2 cursor angezeigt
    *https://stackoverflow.com/questions/38095446/how-to-make-custom-caret*

# ////////////////////////////////////////////////////////

# Visualizer

Session I Visualizer Test
- Akkorde werden schon ab 2 Tönen erkannt? (Bsp. Quarte & Quinte)
- Quinten (X5 & X5/Y) nicht als Akkord erkennen, sondern eigene Farbe? EINFARBIG?
- Aug & Dim. Akkorde
- Em#5 als Dur erkennen lassen (2. Umkehrung Dur wird als Em#5 erkannt, was richtig ist, aber nicht sinnvoll fûr die Visualisierung) 
    *-> &check; m#5 und Mb5 werden vermieden*
- Relations between Chord:
  Grundton detect-->Interval zum Grundton des 2. Chords (4 neue "harmony"-arrays:
  Dur––Dur, Dur––Moll, Moll--Dur, Moll--Moll
   let harmony_array = {
    
    // MAJOR––MAJOR
    0: {
        0: CONSONANT,
        1: SEMISONANT,
        2: SEMISONANT,
        3: SEMISONANT,
        4: DISSONANT,
        5: CONSONANT,
        6: DISSONANT,
        7: CONSONANT,
        8: SEMISONANT,
        9: SEMISONANT,
        10: SEMISONANT,
        11: DISSONANT,
    },
    // MAJOR––minor
    1: {
        0: CONSONANT,
        1: SEMISONANT,
        2: CONSONANT,
        3: DISSONANT,
        4: CONSONANT,
        5: SEMISONANT,
        6: DISSONANT,
        7: CONSONANT,
        8: DISSONANT,
        9: CONSONANT,
        10: SEMISONANT,
        11: SEMISONANT,

    },
    // minor––MAJOR
    2: {
        0: CONSONANT,
        1: SEMISONANT,
        2: DISSONANT,
        3: CONSONANT,
        4: DISSONANT,
        5: CONSONANT,
        6: DISSONANT,
        7: CONSONANT,
        8: CONSONANT,
        9: DISSONANT,
        10: CONSONANT,
        11: DISSONANT,
    }
        // minor––minor
    2: {
        0: CONSONANT,
        1: SEMISONANT,
        2: SEMISONANT,
        3: DISSONANT,
        4: DISSONANT,
        5: CONSONANT,
        6: DISSONANT,
        7: CONSONANT,
        8: SEMISONANT,
        9: DISSONANT,
        10: SEMISONANT,
        11: DISSONANT,
    }
}

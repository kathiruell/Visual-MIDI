TODO Update


# ////////////////////// NAVIGATION //////////////////////

## TASTATUR

- No MIDI-Device? https://gist.github.com/nick-thompson/3995530


# //////////////////// DESIGN-DETAILS ////////////////////

## Intro Typewriter

- Kann ich den Cursor stylen? Wenn man schreibt, werden 2 cursor angezeigt
- Kann man das "Textfeld" (blaue Kontur) ausblenden?
- Können wir nur CAPS einstellen?

## About

- Aufbau der Text-Seite, Font Größen anpassen// @kathiruell

#////////////////////////////////////////////////////////

# Visualizer

- setup auf visualizer funktioniert nicht
- vignette auf visualizer wird nicht angezeigt




Session I Visualizer Test
- Grundton wird immer zu "Rot"="Consonant"; Grundton soll bei der eigenen Farbe bleiben
- Chord-Backgrounds bleiben manchmal stehen...Bug?
- Akkorde werden schon ab 2 Tönen erkannt? (Bsp. Quarte & Quinte)
- Aug & Dim. Akkorde
- Em#5 als Dur erkennen lassen (2. Umkehrung Dur wird als Em#5 erkannt, was richtig ist, aber nicht sinnvoll fûr die Visualisierung) 
- Quinten (X5 & X5/Y) nicht als Akkord erkennen, sondern eigene Farbe? EINFARBIG?
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









/////////
FONT-FORMATS

Intro Typewriter
size: 8.3vw
font-weight: normal
line-height: 7.6vw

Intro Typewriter other font
size: 5.5vw
line-height: 7.6vw
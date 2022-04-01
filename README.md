TODO Update

# ////////////////////// TOOL-LOGIK //////////////////////

## Visualizer ON/OFF

- Visualizer soll erst funktionieren, wenn Visualizer geöffnet ist
- Wenn man Visualizer verlässt, sollte p5 gestoppt werden.
  @kathiruell -> Renderer.start() / Renderer.stop() sind schon implementiert, müssen nur noch vom UI getriggered werden

## Vignette

- Vignette verhindert Hard Edges bei Projektion
- unterschiedlich große Vignetten

## Tone Positions

- Random, aber feste Positionen für jeden Ton.
- Positionen abhängig von Größe der Vignette

## First Tone

- timestamp einrichten // Wenn kein Midi-Signal für 15 Sekunden eingeht

## Background-Entscheidung

@kathiruell

- andere ColorSchemes für Backgrounds
- Welche Farben? Welche parameter bestimmen Farbe?

## Interval-Chord-to-Colors (After 1. Chord played)

- haben wir schon bestimmt, wie Akkorde zueinander stehen? Ja, oder?

# ////////////////////// NAVIGATION //////////////////////

## No MIDI-Supported

- Visualizer sollte anzeigen, falls Web-Midi nicht supported wird.
  @linobino1 Kann Tool abfragen, welcher Browser benutzt wird und dann Meldung aktivieren?
  _@kathiruell `if (!navigator.requestMIDIAccess) alert("Midi not supported in this browser")`_
- Visualizer sollte anzeigen, falls kein Midi-Device angeschlossen ist.

```
navigator.requestMIDIAccess()
    .then((midi) => {
        // wie gehabt
    })
    .catch(() => {
        alert("No midi device connected)
    })
```

## Visualizer

Visualizer braucht doch noch Esc & Setup-Infos;
diese blenden nur ein wenn Cursor im Bereich ist (Ähnlich wie Apple-Dock)

- Esc-Button & Setup-Infos eingefügt

- Click von button soll hier anders funktionieren: Bei Click soll einfach zu nächstem pref-data-value gesprungen werden.

# //////////////////// DESIGN-DETAILS ////////////////////

## Allgemein

- Wenn Tool auf mobil geöffnet wird, soll nur About kommen und Verweis, dass Tool im Browser geöffnet werden soll.

## Intro Typewriter

- @linobino1 Ist es möglich, nachdem Satz animiert wurde ihn komplett zu löschen und nicht letter by letter?
- Textanimation soll sticky sein, Weißer Blur & Setup-Page soll darüber scrollen.
  @linobino1 Vielleicht muss ich nicht Intro Page schwarz-zu-transparent Blur-Hintergrund geben, sondern SetupPage Weiß-zu-Transparent Blur? Maybe, maybe not?
  _@kathiruell um was zu erreichen?_

## Setup

- Setup Popup soll nicht untereinander stehen, nebeneinander zentriert
  Popup soll sich visuell von Setup Categories unterscheiden // @kathiruell

- Vignette-Setup einfügen
- Auswahl: Square | Square with soft Edges | Circle
  Setup: No Vignette | Vignette Blur Edges | Vignette Blur Edges Round
  @linobino1 Hier benutz ich am Besten auch ein Bild, dass ich einfach darüber lege?

## About

- Aufbau der Text-Seite // @kathiruell
  Problem mit Hover

#////////////////////////////////////////////////////////

## Notes

### movement:

0 detailed
1 brisk
2 massive

### shape:

0 mellow
1 clear
2 embossed

### color:

0 intimate
1 luminous
2 gloom

---

//OHNE TONART
konsonant (Abstände 12,7,5)
halbsonant (Abstände 9,4,3,8)
oder dissonant (Abstände 10,2,11,1,6)

//MAJOR
konsonant (Abstände 12,7,5,4)
halbsonant (Abstände 9,2,11)
oder dissonant (Abstände 3,8,10,1,6)

//minor
konsonant (Abstände 12,7,5,3)
halbsonant (Abstände 8,10,2)
oder dissonant (Abstände 9,4,11,1,6)

---

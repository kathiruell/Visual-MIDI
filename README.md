Hi Leo,
hier dokumentier ich dir mal alle Tasks, die noch bevorstehen.
Ich kommentier alle Tasks mit @kathiruell, an denen ich gerne erstmal selbst knobeln würde. Fragen an dich hab ich mit @linobino1 markiert.
Spannend für dich sind wahrscheinlich mehr die Logiken ;) Nehm dir hier ruhig Zeit, dir ein Überblick zu verschaffen. Ich hab es selbst mehrmals lesen müssen.
Hab ein paar weitere Überlegungen in der Navigation gemacht, zum Verständnis hab ich das visualisiert im pdf, dass ich dir schicken werde...

# ////////////////////// TOOL-LOGIK //////////////////////

## Visualizer ON/OFF

- Visualizer soll erst funktionieren, wenn Visualizer geöffnet ist
- Wenn man Visualizer verlässt, sollte p5 gestoppt werden.
  @kathiruell -> Renderer.start() / Renderer.stop() sind schon implementiert, müssen nur noch vom UI getriggered werden

## Tone Positions

- Random, aber feste Positionen für jeden Ton.
  Array?

## First Tone

- Erster Ton sollte Weiß sein, weil noch kein Bezugs-Ton
  Wann ist erster Ton? --> Wenn kein Midi-Signal für 15 Sekunden eingeht

## Konsonant, Dissonant – Die Beziehungen der Töne und Tonarten zueinander

@linobino1 jetzt wird es etwas komplizierter; hier hatte ich dir schon ein paar Visualisierungen geschickt. Vergiss die!
Im Grunde genommen geht es einfach darum, die Abstände zwischen den Tönen zu kalkulieren (und das unter bestimmten Umständen).

Hierfür ist immer wichtig:

- zu wissen, welcher unser Grundton ist
- Welcher Abstand zum Grundton herrscht
- & in welcher Kategorie wir uns befinden (ohne Tonart, Major, minor)

ABSTÄNDE

- zum Grundton ist der nachfolgende Ton immer entweder konsonant, halbsonant oder dissonant

## Abstände FÜR ohne Tonart

konsonant (Abstände 12,7,5)
halbsonant (Abstände 9,4,3,8)
oder dissonant (Abstände 10,2,11,1,6)

## Abstände FÜR MAJOR

konsonant (Abstände 12,7,5,4)
halbsonant (Abstände 9,2,11)
oder dissonant (Abstände 3,8,10,1,6)

## Abstände FÜR minor

konsonant (Abstände 12,7,5,3)
halbsonant (Abstände 8,10,2)
oder dissonant (Abstände 9,4,11,1,6)

## Color-Schemes

– Es soll 3 Color Schemes geben
1 intimate
2 luminous
3 gloom

--> Dabei unterscheiden sich die 3 Color Schemes in sich in ihren Farbabfolgen, je nachdem ob sie in Major, minor oder ohne Tonart angesteuert werden.

- Für jedes Color Scheme möchte ich 15 Farben benutzen
  3 Farbfamilien à 5 Farben
  Dabei ist Farbfamilie 1 & 3 zueinander im Kontrast
  --> Harmonie & Disharmonie
  Jede Farbfamilie muss als Kategorie "konsonant, halbsonant oder dissonant" funktionieren können. Weil eine Kategorie mal 5 Töne/Farben besitzt, sind es 15 Farben in total.

- Wunschvorstellung:
  Je tiefer ein Ton, desto dunkler die Farbe.
  Je höher ein Ton, desto heller die Farbe.
  --> Dazu hatte ich mir mal die Oktaven errechnen wollen:
  If (midi < 24) {-/+ im rgb-Wert ??}
  If (23 < midi < 36) {-/+ im rgb-Wert ??}
  If (35 < midi < 48) {-/+ im rgb-Wert ??}
  If (47 < midi < 60) {-/+ im rgb-Wert ??}
  ...
  @linobino1 mir ist noch nicht ganz klar, ob man die RGB-Farbwerte mit prozentualer Erhöhung oder Senkung parametrisch dunkler oder heller bekommt…
  _@kathiruell ja, denn `rgb(0,0,0) == schwarz` und `rgb(255,255,255) == weiss`_
  ```
    function rgbModBrightness(rgb,factor) {
        return [Math.round(rgb[0] * factor), Math.round(rgb[1] * factor), Math.round(rgb[2] * factor)];
    }
  ```

## Interval-Tones-to-Colors (Before 1. Chord played)

- Wenn zweiter Ton nach zuvor gespieltem Ton in weniger als 15 Sekunden eingeht
  _@kathiruell Vorschlag: die Note class erweitern um einen Parameter `timestamp`, der speichert, wann die Note gespielt wurde_
- Wenn noch kein Akkord gespielt wurde, befinden wir uns in "Abstände ohne Tonart"
- Errechne Abstand zu zuvor gespieltem Ton mit Hinblick auf Oktaven
  Midi2 - Midi1 = Abstand = x
  Abstand kann nur zwischen 0 und 12 liegen, also
  If (x > 11) {x - 12}
  If (x > 23) {x - 24}
  If (x > 35) {x - 36}
  ...
  _@kathiruell das macht der sog. Modulo-Operator (der Rest einer bei einer Division): `7 % 12 = 7, 15 % 12 = 3, 12 % 12 = 0, ...`_

- Bei 3. gespielten Ton, ist "tonales Zentrum" nicht mehr "Ton 1" sondern "Ton 2", heißt der zuvor gespielte Ton ist immer "tonales Zentrum".
  --> Bedeutet, dass davon ausgegangen werden muss, dass jeder der 12 Töne "Grundton" oder "tonales Zentrum" sein kann
  --> Bedeutet, dass es 15 verschiedene Farbkombinationen/Farbabfolgen geben muss, da wir 15 Farben in unserem Colorscheme haben.
  --> Also Array von 15 Farblisten?

## Interval-Chord-to-Colors (After 1. Chord played)

- Selbe Logik wie zuvor, nur dass von den Akkorden immer der Grundton bestimmt werden muss
- Wenn Chord detected, dann bestimme Grundton & Tonart (Major or minor)
  D-Dur --> D
  Wenn D Grundton ist, sollen alle Töne/Farben im Bezug zu D als "1" verglichen werden und dazugehörige Farbe zuordnen
- Chord zeigt immer Hintergrund-Verlauf, basierend auf "Grundton-Farben"
- Farbtöne kalkulieren sich genau wie im Fall zuvor, nur dass die Farbabfolgen auf Major or minor angepasst sind.

### Generelles Vorgehen Tonabstände

- `visualizer.notes = []` wird alle bisher gespielten Töne aufbewahren:
  `visualizer.notes.push(new Note(pitch, vel, Date.now())`
- in jedem handleNoteOn() wird das tonale Zentrum anhand von `visualizer.notes` berechnet
- `Note` Klasse wird erweitert um property `timestamp`

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

1. Esc-Button

- Visualizer benötigt "BACK"-Button zur Setup-Page // @kathiruell
  Cursor ist im linken Bereich (10%) der Seite
  --> dann fährt Pfeil von links nach rechts ein
  Blurry Pfeil nach links; bei Hover: entblurrt; bei Click: Setup-Page // @kathiruell
  @linobino1, kann ich für den Pfeil einen selbst gezeichneten Pfeil als .svg benutzen?

2. Setup-Infos

- Damit man im Visualizer bleiben kann, ohne Setup-Page wieder zu öffnen: Setup-Infos
  Cursor ist im unteren Bereich (10%) der Seite
  --> dann fährt Setup-Infos, die gerade eingestellt sind von unten nach oben ein
  Blurry alles; bei Hover: entblurrt; bei Click: Wechsel zum nächsten Pref
  Cursor verlässt unteren Bereich wieder; Setup-Infos blenden wieder mit Animation aus

# //////////////////// DESIGN-DETAILS ////////////////////

## Allgemein

- Font-Ratio errechnen; Schrift sollte sich der Fenstergröße anpassen // @kathiruell
  _@kathiruell probier mal font-size in `vw`anzugeben_
- Ist noch was an Fenstergröße anzupassen? Muss nicht mobil funktionieren, Schriften und Abstände sollen allerdings unabhängig von Browser gut sitzen.

## Intro Typewriter

- @linobino1 Ist es möglich, nachdem Satz animiert wurde ihn komplett zu löschen und nicht letter by letter?
- Textanimation soll sticky sein, Weißer Blur & Setup-Page soll darüber scrollen.
  @linobino1 Vielleicht muss ich nicht Intro Page schwarz-zu-transparent Blur-Hintergrund geben, sondern SetupPage Weiß-zu-Transparent Blur? Maybe, maybe not?
  _@kathiruell um was zu erreichen?_

## Setup

- Setup Popup soll nicht untereinander stehen, nebeneinander zentriert
  Popup soll sich visuell von Setup Categories unterscheiden // @kathiruell

- Vignette-Setup; Kill Hard Edges of Projection // @kathiruell
- Auswahl: Square | Square with soft Edges | Circle
  Setup: No Vignette | Vignette Blur Edges | Vignette Blur Edges Round
  @linobino1 Hier benutz ich am Besten auch ein Bild, dass ich einfach darüber lege?

## About

- Aufbau der Text-Seite // @kathiruell

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

Colorscheme INTIMATE

colors [
(rgb A1),
(rgb A2),
(rgb A3),
(rgb A4),
(rgb A5),

(rgb B1),
(rgb B2),
(rgb B3),
(rgb B4),
(rgb B5),

(rgb C1),
(rgb C2),
(rgb C3),
(rgb C4),
(rgb C5)
]

// Zuschreibung der Harmonie-Abfolgen

intervals ohne [
0: [konsonant],
1: [dissonant],
2: [dissonant],
3: [halbsonant],
4: [halbsonant],
5: [konsonant],
6: [dissonant],
7: [konsonant],
8: [halbsonant],
9: [halbsonant],
10: [dissonant],
11: [dissonant],
12: [konsonant],
]

intervals MAJOR [
0: [konsonant],
1: [dissonant],
2: [halbsonant],
3: [dissonant],
4: [konsonant],
5: [konsonant],
6: [dissonant],
7: [konsonant],
8: [dissonant],
9: [halbsonant],
10: [dissonant],
11: [halbsonant],
12: [konsonant],
]

intervals minor [
0: [konsonant],
1: [dissonant],
2: [halbsonant],
3: [konsonant],
4: [dissonant],
5: [konsonant],
6: [dissonant],
7: [konsonant],
8: [halbsonant],
9: [dissonant],
10: [halbsonant],
11: [dissonant],
12: [konsonant],
]

// Farb-Abfolgen für jeden Ton als "Grundton" in Kategorie "ohne Tonart"

intervals ohne FÜR 0 = [
0: [konsonant],
1: [dissonant],
2: [dissonant],
3: [halbsonant],
4: [halbsonant],
5: [konsonant],
6: [dissonant],
7: [konsonant],
8: [halbsonant],
9: [halbsonant],
10: [dissonant],
11: [dissonant],
12: [konsonant],
]

Farbskalen
GLOOM

01: [59,24,63],
02: [123,0,151],
03: [120,21,84],
04: [167,0,99],
05: [96,0,108]

01: [59,216,169],
02: [0,120,106],
03: [0,98,116],
04: [96,131,137],
05: [0,87,73]

01: [221,156,0],
02: [173,112,53],
03: [214,166,0],
04: [231,203,0],
05: [255,255,0]

LUMINOUS

01: [237,111,36],
02: [255,76,84],
03: [255,115,0],
04: [255,153,29],
05: [255,72,83]

01: [0,214,0],
02: [0,147,0],
03: [0,207,119],
04: [101,255,25],
05: [53,197,31]

01: [0,85,156],
02: [17,80,204],
03: [0,0,138],
04: [59,36,187],
05: [0,60,255]

INTIMATE

01: [195,155,167],
02: [237,193,198],
03: [241,158,156],
04: [237,193,198],
05: [219,156,155]

01: [237,216,161],
02: [227,213,196],
03: [235,220,161],
04: [241,229,141],
05: [255,255,129]

01: [192,241,184],
02: [165,210,158],
03: [120,218,164],
04: [218,254,192],
05: [186,230,172]

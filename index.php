<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>

    <!-- Libraries -->
    <script
      src="https://code.jquery.com/jquery-3.6.0.min.js"
      integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
      crossorigin="anonymous"></script>
    <script src="js/lib/p5.js"></script>
    <script src="js/lib/midi.js"></script>
    <script src="js/lib/tonal.js"></script>
    <script src="js/lib/typewriter.js"></script>

    <!-- Visualizer -->
    <script src="js/visualizer/Renderer.js"></script>
    <script src="js/visualizer/Shape.js"></script>
    <script src="js/visualizer/BackgroundShape.js"></script>
    <script src="js/visualizer/BackgroundShapeBlackout.js"></script>
    <script src="js/pages/vignette.js"></script>
    <script src="js/visualizer/Vignette.js"></script>
    <script src="js/visualizer/Music.js"></script>
    <script src="js/visualizer/Note.js"></script>
    <script src="js/visualizer/Preferences.js"></script>
    <script src="js/visualizer/Conf.js"></script>
    <script src="js/visualizer/util.js"></script>
    <script src="js/visualizer/conf/shapes.js"></script>
    <script src="js/visualizer/conf/colors.js"></script>
    <script src="js/visualizer/conf/harmony.js"></script>

    <!-- Lists -->
    <script src="js/arrays/colorscale2.js"></script>
    <script src="js/arrays/tonetable.js"></script>

    <!-- Styles -->
    <link rel="stylesheet" href="main.css" />
    <link rel="stylesheet" href="css/reset.css" />
    <link rel="stylesheet" href="https://use.typekit.net/ncw6oai.css" />

    <!-- Page styles -->
    <link rel="stylesheet" href="css/pages/main.css" />
    <link rel="stylesheet" href="css/pages/intro.css" />
    <link rel="stylesheet" href="css/pages/visualizer.css" />
    <link rel="stylesheet" href="css/pages/about.css" />
    <link rel="stylesheet" href="css/pages/setup.css" />


  </head>
  <body>
    
    <div class="mainstage">
      <!-- PAGE CONTENT  -->
      <? include "about.php" ?>
    </div>

    <div class="setup">
      <? include "setup.php" ?>
    </div>

    <!-- Code -->
    <script src="main.js"></script>

    <!-- Pages code -->
    <script src="js/pages/intro.js"></script>
    <script src="js/pages/setup.js"></script>
    <script src="js/visualizer/visualizer.js"></script>
  </body>
</html>

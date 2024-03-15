document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("background-canvas");
  if (!canvas) {
    console.error("Canvas element not found!");
    return;
  }

  var canvasWidth = (canvas.width = window.innerWidth);
  var canvasHeight = (canvas.height = window.innerHeight);
  var ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Canvas context not supported!");
    return;
  }

  // Constants
  const HEXAGON_SIZE = 60; // Size of hexagons
  const HEXAGON_SPACING_X = 120; // Increased spacing between hexagons on the x-axis
  const HEXAGON_SPACING_Y = 110; // Increased spacing between hexagons on the y-axis
  const HEXAGON_OPACITY = 0.1; // Opacity of hexagons
  const ANIMATION_SPEED = 1; // Adjusted animation speed
  const RESET_SPEED = 0.8; // Speed of resetting wavePosition

  // Color options
  const colors = {
    light: {
      gradientStart: "rgba(173, 216, 230, 1)", // Light blue
      gradientMiddle: "rgba(12, 205, 205, 1)", // Custom primary color
      gradientEnd: "rgba(173, 216, 230, 1)", // Light blue
    },
    dark: {
      gradientStart: "rgba(178, 34, 34, 1)", // Firebrick red
      gradientMiddle: "rgba(255, 0, 0, 1)", // Red
      gradientEnd: "rgba(178, 34, 34, 0)", // Firebrick red
    },
  };

  // Function to draw a hexagon with given coordinates and opacity
  function drawHexagon(x, y, opacity) {
    ctx.strokeStyle = "rgba(255, 255, 255, " + opacity + ")";
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.moveTo(x + HEXAGON_SIZE * Math.cos(0), y + HEXAGON_SIZE * Math.sin(0));

    for (let i = 1; i < 6; i++) {
      ctx.lineTo(
        x + HEXAGON_SIZE * Math.cos((i * 2 * Math.PI) / 6),
        y + HEXAGON_SIZE * Math.sin((i * 2 * Math.PI) / 6)
      );
    }

    ctx.closePath();
    ctx.stroke();
  }

  // Function to animate drawing and erasing hexagons
  function animate() {
    var wavePosition = 0;
    var isResetting = false;

    function drawFrame() {
      // Draw gradient background based on mode
      var gradient;
      if (document.body.classList.contains("dark")) {
        gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
        gradient.addColorStop(0, colors.dark.gradientStart);
        gradient.addColorStop(0.5, colors.dark.gradientMiddle);
        gradient.addColorStop(1, colors.dark.gradientEnd);
      } else {
        gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
        gradient.addColorStop(0, colors.light.gradientStart);
        gradient.addColorStop(0.5, colors.light.gradientMiddle);
        gradient.addColorStop(1, colors.light.gradientEnd);
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Update wave position
      wavePosition += ANIMATION_SPEED;

      // Reset animation when wave reaches the end of canvas width
      if (wavePosition > canvasWidth) {
        if (!isResetting) {
          isResetting = true;
          resetAnimation();
        }
      } else {
        isResetting = false;
      }

      // Draw hexagons with dynamic opacity based on wave position
      for (
        var x = -HEXAGON_SIZE;
        x < canvasWidth + HEXAGON_SIZE;
        x += HEXAGON_SPACING_X
      ) {
        for (
          var y = -HEXAGON_SIZE;
          y < canvasHeight + HEXAGON_SIZE;
          y += HEXAGON_SPACING_Y
        ) {
          var distanceFromWave = Math.sqrt(
            Math.pow(x - wavePosition, 2) + Math.pow(y - canvasHeight / 2, 2)
          );
          var opacity = Math.max(0, 1 - distanceFromWave / (canvasWidth / 2)); // Opacity decreases as distance from wave increases

          drawHexagon(x, y, opacity * HEXAGON_OPACITY);
        }
      }

      // Request the next animation frame
      requestAnimationFrame(drawFrame);
    }

    // Reset animation smoothly
    function resetAnimation() {
      var startTime = Date.now();
      var initialWavePosition = wavePosition;

      function resetFrame() {
        var currentTime = Date.now();
        var elapsedTime = currentTime - startTime;
        var resetProgress = elapsedTime / (RESET_SPEED * 1000);

        wavePosition = initialWavePosition * (1 - resetProgress);

        if (resetProgress < 1) {
          requestAnimationFrame(resetFrame);
        }
      }

      resetFrame();
    }

    // Initiate the animation loop
    drawFrame();
  }

  // Start the animation
  animate();

  // Toggle between dark and light modes
  const toggleButton = document.getElementById("toggle-mode");
  const body = document.body;

  // toggleButton.addEventListener("click", () => {
  //   body.classList.toggle("dark");
  // Redraw the frame to apply the new background gradient
  animate();
});
// });

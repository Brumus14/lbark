let dotPositions = [];
let cursorX = 0;
let cursorY = 0;

//#region Cursor Control
{
  const cursor = document.querySelector("#cursor");
  let firstCursorMove = true;

  document.onmousemove = (event) => {
    if (firstCursorMove) {
      firstCursorMove = false;
      cursor.style.opacity = 1;
      event
    }

    cursorX = event.clientX;
    cursorY = event.clientY;

    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";
  };

  document.onmousedown = () => {
    expandingDot();
  }

  document.querySelectorAll("button").forEach(button => {
    button.addEventListener("mouseenter", () => {
      cursor.style.width = "5rem";
    });

    button.addEventListener("mouseleave", () => {
      cursor.style.width = "";
    });
  })
}
//#endregion

//#region Canvas Background
{
  let heroTextBounds = document.querySelector("p").getBoundingClientRect();
  let heroTextPadding = 100;
  let windowPadding = 50;
  let dotPadding = 300;

  const canvas = document.querySelector("#background-canvas");
  const context = canvas.getContext("2d");
  // Depending on distance from top left decrease dot size
  // When scrolling dots move towards top left and change size
  // When link clicked black dot at link which expands
  // Splash effect on click
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function drawDot(x, y) {
    let distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    let dotSize = 50 / (1 + Math.pow(Math.E, -((-0.005 * distance) + 4)));

    context.beginPath();
    context.arc(x, y, dotSize, 0, 2 * Math.PI, false);
    context.fillStyle = "white";
    context.fill();
  }

  function GenerateDot() {
    dotPosition = {
      x: randomNumber(windowPadding, window.innerWidth - windowPadding),
      y: randomNumber(windowPadding, window.innerHeight - windowPadding)
    };

    let positionFree = true;

    dotPositions.forEach(position => {
      if (Math.sqrt(Math.pow(position.x - dotPosition.x, 2) + Math.pow(position.y - dotPosition.y, 2)) < dotPadding) {
        positionFree = false;
      }
    });

    if (positionFree && (dotPosition.x < heroTextBounds.left - heroTextPadding || dotPosition.x > heroTextBounds.right + heroTextPadding || dotPosition.y < heroTextBounds.top - heroTextPadding || dotPosition.y > heroTextBounds.bottom + heroTextPadding)) {
      drawDot(dotPosition.x, dotPosition.y);
      dotPositions.push(dotPosition);
    }
  }

  function expandingDot() {
    let expandingCircle = document.createElement("div");
    document.body.appendChild(expandingCircle);
    expandingCircle.style.cssText = `position: absolute; left: ${cursorX}px; top: ${cursorY}px; transform: translate(-50%, -50%) scale(0); border-radius: 50%; background-color: black; transition: transform 1s ease-in-out; will-change: transform;`;

    setTimeout(() => {
      if (window.innerHeight > window.innerWidth) {
        expandingCircle.style.width = "250vh";
        expandingCircle.style.height = "250vh";
      }
  
      else {
        expandingCircle.style.width = "250vw";
        expandingCircle.style.height = "250vw";
      }

      expandingCircle.style.transform = "translate(-50%, -50%) scale(1)";
    }, 0);
  }

  for (let i = 0; i < 20; i++) {
    GenerateDot();
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//#endregion

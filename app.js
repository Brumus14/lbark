// Variables {{{
let dotPositions = [];
let cursorX = 0;
let cursorY = 0;
// }}}

// Cursor Control {{{
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

  // document.onmousedown = () => {
  //   if (!firstCursorMove)
  //   {
  //     expandingDot();
  //   }
  // }

  document.querySelectorAll("button").forEach(button => {
    button.addEventListener("mouseenter", () => {
      cursor.style.width = "5rem";
    });

    button.addEventListener("mouseleave", () => {
      cursor.style.width = "";
    });
  })
}
// }}}

// Background {{{
{
  // const canvas = document.querySelector("#background-canvas");
  // const context = canvas.getContext("2d");
  // // Depending on distance from top left decrease dot size
  // // When scrolling dots move towards top left and change size
  // // When link clicked black dot at link which expands
  // // Splash effect on click
  // canvas.width = window.innerWidth;
  // canvas.height = window.innerHeight;

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
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// }}}

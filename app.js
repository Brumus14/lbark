//#region Cursor Control
document.onmousemove = (event) => {
  const cursor = document.querySelector("#cursor");

  cursor.style.left = event.clientX + "px";
  cursor.style.top = event.clientY + "px";
};
//#endregion

//#region Canvas Background
{
  let heroTextBounds = document.querySelector("p").getBoundingClientRect();
  let heroTextPadding = 100;
  let windowPadding = 50;

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
    let dotSize = 50 / (1 + Math.pow(Math.E, -((-0.004 * distance) + 4)));

    context.beginPath();
    context.arc(x, y, dotSize, 0, 2 * Math.PI, false);
    context.fillStyle = "lightblue";
    context.fill();
  }

  for (let i = 0; i < 20; i++) {
    dotPosition = {
      x: randomNumber(windowPadding, window.innerWidth - windowPadding),
      y: randomNumber(windowPadding, window.innerHeight - windowPadding)
    };


    if (dotPosition.x < heroTextBounds.left - heroTextPadding || dotPosition.x > heroTextBounds.right + heroTextPadding || dotPosition.y < heroTextBounds.top - heroTextPadding || dotPosition.y > heroTextBounds.bottom + heroTextPadding) {
      drawDot(dotPosition.x, dotPosition.y);
    }
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//#endregion
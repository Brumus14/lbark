// Variables
let cursorX = 0;
let cursorY = 0;

document.body.onload = () => {
  let fadingScreen = document.querySelector("#fading-screen");
  setTimeout(() => { fadingScreen.style.opacity = "0"; }, 10);
  setTimeout(() => { fadingScreen.remove(); }, 310);
}

// Cursor Control
{
  const cursor = document.querySelector("#cursor");
  let firstCursorMove = true;
  let pointerCursorSize = "4rem";

  document.onmousemove = (event) => {
    if (firstCursorMove) {
      firstCursorMove = false;
      cursor.style.opacity = 1;
    }

    cursorX = event.clientX;
    cursorY = event.clientY;

    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";
  }

  document.querySelectorAll("a").forEach(element => {
    element.addEventListener("mouseenter", () => {
      cursor.style.width = pointerCursorSize;
    });
  });

  document.querySelectorAll("a").forEach(element => {
    element.addEventListener("mouseleave", () => {
      cursor.style.width = "";
    });
  });
}

document.querySelectorAll(".menu a").forEach(element => {
  element.addEventListener("click", (event) => {
    event.preventDefault();

    let circle = document.createElement("div");
    document.body.appendChild(circle);
    circle.style.cssText = `position: absolute; left: ${event.clientX - 50}px; top: ${event.clientY - 50}px; width: 10rem; height: 10rem; background-color: white; border-radius: 50%; transition: transform 0.7s ease-in-out; transform: scale(0);`;
    
    setTimeout(() => { circle.style.transform = "scale(50)"; document.querySelector("#cursor").style.opacity = "0"; document.body.style.overflow = "hidden"; }, 10);
    setTimeout(() => { document.location.href = event.target.getAttribute("href"); }, 710);
  });
});

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// Variables
let cursorX = 0;
let cursorY = 0;

function globalOnLoad() {
  let fadingScreen = document.querySelector("#fading-screen");
  setTimeout(() => { fadingScreen.style.opacity = "0"; }, 10);
  setTimeout(() => { fadingScreen.remove(); }, 310);

  longest = 0;

  document.querySelectorAll(".menu a").forEach(item => {
    if (item.innerText.length > longest) {
      longest = item.innerText.length;
    }
  });

  document.documentElement.style.setProperty("--menuItemWidth", (longest + 1) + "ch");
}

// Cursor Control
{
  const cursor = document.querySelector("#cursor");
  let firstCursorMove = true;
  let pointerCursorSize = "4rem";

  document.addEventListener("mousemove", updateCursor);

  function updateCursor(event) {
    if (firstCursorMove) {
      firstCursorMove = false;
      cursor.style.opacity = 1;
    }

    cursorX = event.pageX;
    cursorY = event.pageY;

    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";
  }

  document.querySelectorAll("a, button, .projects .container, .repositories .container").forEach(element => {
    element.addEventListener("mouseenter", () => {
      cursor.style.width = pointerCursorSize;
    });
    
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
    circle.style.cssText = `position: absolute; left: ${event.pageX - 50}px; top: ${event.pageY - 50}px; width: 10rem; height: 10rem; background-color: #262626; border-radius: 50%; transition: transform 0.7s ease-in-out; transform: scale(0);`;
    
    setTimeout(() => { circle.style.transform = "scale(50)"; document.querySelector("#cursor").style.opacity = "0"; document.body.style.overflow = "hidden"; }, 10);
    setTimeout(() => { document.location.href = event.target.getAttribute("href"); }, 710);
  });
});

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
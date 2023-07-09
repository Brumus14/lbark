// Variables
let cursorX = 0;
let cursorY = 0;
let pointerCursorSize = "4rem";

function globalOnLoad() {
  let fadingScreen = document.querySelector("#fading-screen");
  setTimeout(() => { fadingScreen.style.opacity = "0"; document.body.style.overflow = "hidden"; window.scrollTo(0, 0) }, 10);
  setTimeout(() => { fadingScreen.remove(); document.body.removeAttribute("style"); }, 310);

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

  document.addEventListener("mousemove", updateCursor);

  function updateCursor(event) {
    if (firstCursorMove) {
      firstCursorMove = false;
      cursor.style.opacity = 1;
    }

    cursorX = event.clientX;
    cursorY = event.clientY;

    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";
  }

  hoverableElement(document.querySelectorAll("a, button, .projects-container .container"));
}

document.querySelectorAll(".menu a").forEach(element => {
  element.addEventListener("click", (event) => {
    event.preventDefault();

    let circle = document.createElement("div");
    circle.setAttribute("id", "circle-screen");
    document.body.appendChild(circle);
    circle.style.left = `${event.pageX - 50}px`;
    circle.style.top = `${event.pageY - 50}px`;

    setTimeout(() => { circle.style.transform = "scale(50)"; document.querySelector("#cursor").style.opacity = "0"; document.body.style.overflow = "hidden"; }, 10);
    setTimeout(() => { document.location.href = event.target.getAttribute("href"); }, 710);
  });
});

function hoverableElement(elements) {
  elements.forEach(element => {
    element.addEventListener("mouseenter", () => {
      cursor.style.width = pointerCursorSize;
    });
    
    element.addEventListener("mouseleave", () => {
      cursor.style.width = "";
    });
  });
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
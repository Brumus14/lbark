// Variables
let cursorX = 0;
let cursorY = 0;
let pointerCursorSize = "4rem";

function globalOnLoad() {
  let fadingScreen = document.querySelector("#fading-screen");

  setTimeout(() => { fadingScreen.style.opacity = "0"; document.body.style.overflow = "hidden"; window.scrollTo(0, 0) }, 10);
  setTimeout(() => { fadingScreen.remove(); document.body.removeAttribute("style"); }, 310);

  longest = 0;

  document.querySelectorAll(".nav-list a").forEach(item => {
    if (item.innerText.length > longest) {
      longest = item.innerText.length;
    }

    if (window.innerWidth > 1500) {
      item.style.transform = "translateY(0%)";
    }
  });

  document.documentElement.style.setProperty("--menuItemWidth", (longest + 1) + "ch");

  navToggleElement = document.querySelector(".nav-toggle");

  navToggleElement.addEventListener("click", (event) => {
    if (navToggleElement.classList.contains("active")) {
      circleShrink();
    }

    else {
      circleEnlarge(event.pageX - 50, event.pageY - 50);
    }

    navToggleElement.classList.toggle("active");
  });
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

  hoverableElement(document.querySelectorAll("a, button, .projects-container .container, .nav-toggle"));
}

document.querySelectorAll(".nav-list a").forEach(element => {
  element.addEventListener("click", (event) => {
    event.preventDefault();

    circleEnlarge(event.pageX - 50, event.pageY - 50);
    document.querySelector("#cursor").style.opacity = "0";

    setTimeout(() => { document.location.href = event.target.getAttribute("href"); }, 710);
  });
});

function circleEnlarge(positionX, positionY) {
  let circle = document.querySelector("#circle-screen");

  if (circle == null) {
    circle = document.createElement("div");
    circle.setAttribute("id", "circle-screen");
    document.body.appendChild(circle);
  }


  circle.style.left = `${positionX}px`;
  circle.style.top = `${positionY}px`;

  setTimeout(() => {
    circle.style.transform = "scale(42)";
    document.body.style.overflow = "hidden";
  }, 10);
}

function circleShrink() {
  console.log("sdf");
  let circle = document.querySelector("#circle-screen");

  circle.style.transform = "";
  document.body.style.overflow = "";
}

function hoverableElement(elements) {
  elements.forEach(element => {
    // When mouse enters make cursor larger
    element.addEventListener("mouseenter", () => {
      cursor.style.width = pointerCursorSize;
    });
    
    // When mouse leaves
    element.addEventListener("mouseleave", () => {
      cursor.style.width = "";
    });
  });
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
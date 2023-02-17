elements = {
  cursor: document.querySelector("#cursor"),
};

document.onmousemove = (event) => {
  elements.cursor.style.left = event.clientX + "px";
  elements.cursor.style.top = event.clientY + "px";
  console.log(`translate(${event.clientX - 1920 / 2},${event.clientY - 1080 / 2})`);
  //document.querySelector("p").style.transform = `translate(${(event.clientX - 1920 / 2) / 64}px,${(event.clientY - 1080 / 2) / 64})`;
};

const canvas = document.getElementById("jsCanvas");
// console.log(canvas);
const ctx = canvas.getContext("2d");

ctx.strokeStyle = "#2c2c2c";
ctx.linewidth = 2.5;

let painting = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginpath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTO(x, y);
    ctx.stroke();
  }
}

function onMouseDown(event) {
  //   console.log(event);
  painting = true;
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}

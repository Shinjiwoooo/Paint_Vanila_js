const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const ColorArray = Array.from(colors);
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const Eraser = document.getElementById("jsEraser");
const Reset = document.getElementById("jsReset");

const INITIAL_COLOR = "#2C2C2C";
const CANVAS_SIZE = 700;

canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

// canvas.width = CANVAS_SIZE;
// canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

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
    // false 면 moveto  true 면 lineto
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  //console.log(event); // click 정보
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  // console.log(color);
  // console.log(event.target.style);

  // console.log(this);
  this.classList.add("colorActive");

  ColorArray.forEach(function (item, index) {
    //  forEach 사용 시 두개의 파라미터가 온다. 첫번째 item, 두번째 index item 에는 배열의
    // 요소들이 차례대로 온다. index 에는 배열의 요소의 인덱스 값이 차례로 온다
    // console.log(index);
    if (
      ColorArray[index].getAttribute("style").substr(17, 7) !== ctx.strokeStyle
    ) {
      ColorArray[index].classList.remove("colorActive");
      // ColorArray[index].classList.remove("colorActive");
    }
    console.log(ColorArray[index].getAttribute("style"));
  });
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
  console.log(event);
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  // console.log(image);
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[EXPORT]";
  link.click();
}

function handleEraserClick() {
  ctx.strokeStyle = "white";
}

function handleResetClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  range.value = 2.5;
}
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); // 올리기만했을때
  canvas.addEventListener("mousedown", startPainting); //눌럿을때
  canvas.addEventListener("mouseup", stopPainting); // 뗏을때
  canvas.addEventListener("mouseleave", stopPainting); //범위 벗어날때
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(
  (color) => color.addEventListener("click", handleColorClick)
  // 1~9 총 9번
);

// Array.from(colors).forEach(function(color){
//   color.addEventListener("click", handleColorClick)

// })

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

if (Eraser) {
  Eraser.addEventListener("click", handleEraserClick);
}

if (Reset) {
  Reset.addEventListener("click", handleResetClick);
}

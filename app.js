// canvas 는 canvas내에 픽셀을 다를수 있는 요소
const canvas = document.querySelector(".jsCanvas");
//cavas 내 context 요소(픽셀을 컨트롤하는)
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.querySelector(".jsRange");
const mode = document.querySelector(".jsMode");
const save = document.querySelector(".jsSave");
const reset = document.querySelector(".jsReset");
const eraser = document.querySelector(".jsEraser");
const colorDefault = "#2c2c2c";

//canvas 요소에 width 와 height의 크기가 정확히 어떠한지 사이즈를 줘야함
canvas.width = "800";
canvas.height = "500";
//처음 저장할시 배경이 투명색으로 저장되는것을 방지
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
//첫색상
ctx.strokeStyle = colorDefault;
ctx.fillStyle = colorDefault;
//라인굵기 기본 2.5
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
  //offsetX ,Y 해당 canvas태그내의 좌표
  const x = event.offsetX;
  const y = event.offsetY;

  //painting false 일때(클릭하지않앗을대)
  if (!painting) {
    //path를 만드는함수 눈에 안보이는선이라고 생각하면됨 선의시작점
    ctx.beginPath();
    //시작포인트를 새로운 서브패스 x ,y 로 옮김
    ctx.moveTo(x, y);
  } else {
    //마지막 포인트까지 직선으로 연결
    ctx.lineTo(x, y);
    //획을 긋는다
    ctx.stroke();
  }
}

function changeColor() {
  //color 에 해당 타겟 백그라운드를 받아서 저장
  const color = event.target.style.backgroundColor;
  //해당 color를 색상스타일 저장
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function RangeChange() {
  // 해당 이벤트 타겟 값(range 값) 을 변수저장
  const strokeSize = event.target.value;
  //lineWidth 변수에 해당 값 저장
  ctx.lineWidth = strokeSize;
}

function ModeClick() {
  if (filling === true) {
    //filling true 일시 false로 만든후 버튼에 Fill 삽입 (그리기 상태 )
    filling = false;
    mode.innerText = "채우기";
  } else {
    //filling false 일시 true 로 만든후 버튼에 Paint 삽입 (채우기 상태)
    filling = true;
    mode.innerText = "그리기";
  }
}

function CanvasClick() {
  if (filling) {
    //fillRect는 채우기 함수 x 위치 y위치 가로 세로
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}
// 우클릭 비허용
function RightClick(event) {
  event.preventDefault();
}

function SaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "Picture";
  link.click();
}

function EraserClick(event) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

if (canvas) {
  //마우스 움직이는 이벤트
  canvas.addEventListener("mousemove", onMouseMove);
  //마우스 눌럿을때 이벤트
  canvas.addEventListener("mousedown", startPainting);
  //마우스 안눌렀을때 이벤트
  canvas.addEventListener("mouseup", stopPainting);
  //마우스 벗어낫을때 이벤트
  canvas.addEventListener("mouseleave", stopPainting);
  //마우스 클릭 이벤트
  canvas.addEventListener("click", CanvasClick);
  //마우스 우클릭시
  canvas.addEventListener("contextmenu", RightClick);
}
//Arrat.from 으로 colors를 배열로 만든뒤 forEach 함수를 사용해 각각의 색상들에게 클릭이벤트를 적용 함수실행
Array.from(colors).forEach((color) =>
  color.addEventListener("click", changeColor)
);
//굵기
if (range) {
  range.addEventListener("input", RangeChange);
}
//그리기 , 채우기 모드
if (mode) {
  mode.addEventListener("click", ModeClick);
}
//저장
if (save) {
  save.addEventListener("click", SaveClick);
}
//초기화
if (eraser) {
  eraser.addEventListener("click", EraserClick);
}

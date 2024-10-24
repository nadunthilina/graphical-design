const bgCol = "#447abd";
const gCol = "#a2c2e8";
const nGrid = 20;
let gSpace;
let vertices = [];
let faces = [
  [0, 18, 6, 14],
  [0, 22, 9, 12],
  [0, 25, 1, 24],
  [0, 27, 11, 16],
  [0, 23, 7, 26],
  [1, 19, 7, 13],
  [1, 23, 10, 15],
  [1, 26, 0, 27],
  [1, 24, 8, 17],
  [1, 22, 6, 25],
  [2, 16, 5, 12],
  [2, 21, 11, 14],
  [2, 31, 3, 30],
  [2, 29, 9, 18],
  [2, 20, 4, 28],
  [3, 17, 4, 15],
  [3, 20, 8, 13],
  [3, 28, 2, 29],
  [3, 30, 10, 19],
  [3, 21, 5, 31],
  [4, 14, 2, 16],
  [4, 28, 6, 24],
  [4, 29, 3, 20],
  [4, 15, 11, 25],
  [4, 21, 10, 17],
  [5, 12, 8, 26],
  [5, 20, 9, 16],
  [5, 13, 3, 17],
  [5, 31, 7, 27],
  [5, 30, 2, 21],
  [6, 14, 10, 28],
  [6, 23, 11, 18],
  [6, 15, 1, 19],
  [6, 25, 4, 29],
  [6, 24, 0, 22],
  [7, 12, 0, 18],
  [7, 26, 5, 30],
  [7, 27, 1, 23],
  [7, 13, 9, 31],
  [7, 22, 8, 19],
  [8, 13, 1, 22],
  [8, 17, 5, 20],
  [8, 26, 10, 24],
  [8, 30, 7, 12],
  [8, 19, 3, 28],
  [9, 12, 2, 20],
  [9, 18, 7, 22],
  [9, 31, 11, 29],
  [9, 27, 5, 13],
  [9, 16, 0, 25],
  [10, 15, 3, 21],
  [10, 19, 6, 23],
  [10, 28, 8, 30],
  [10, 24, 4, 14],
  [10, 17, 1, 26],
  [11, 14, 0, 23],
  [11, 16, 4, 21],
  [11, 25, 9, 27],
  [11, 29, 6, 15],
  [11, 18, 2, 31]
];

let C0 = 0.5729490168751577;
let C1 = 0.6909830056250526;
let C2 = 0.9270509831248423;
let C3 = 1.1180339887498948;
let C4 = 1.8090169943749474;

function setup() {
  w = max(400, min(windowWidth, windowHeight) * 0.9);
  createCanvas(w, w, WEBGL);
  rectMode(CENTER);
  angleMode(DEGREES);
  textScreen = createGraphics(400, 400);
  textScreen.textSize(16);
  textScreen.fill(gCol);
  vertices = [
    createVector(0.0, -C2, C0),
    createVector(0.0, -C2, -C0),
    createVector(0.0, C2, C0),
    createVector(0.0, C2, -C0),
    createVector(-C2, C0, 0.0),
    createVector(C2, C0, 0.0),
    createVector(-C2, -C0, 0.0),
    createVector(C2, -C0, 0.0),
    createVector(C0, 0.0, -C2),
    createVector(C0, 0.0, C2),
    createVector(-C0, 0.0, -C2),
    createVector(-C0, 0.0, C2),
    createVector(C4, 0.0, C1),
    createVector(C4, 0.0, -C1),
    createVector(-C4, 0.0, C1),
    createVector(-C4, 0.0, -C1),
    createVector(0.0, C1, C4),
    createVector(0.0, C1, -C4),
    createVector(0.0, -C1, C4),
    createVector(0.0, -C1, -C4),
    createVector(C1, C4, 0.0),
    createVector(-C1, C4, 0.0),
    createVector(C1, -C4, 0.0),
    createVector(-C1, -C4, 0.0),
    createVector(-C3, -C3, -C3),
    createVector(-C3, -C3, C3),
    createVector(C3, -C3, -C3),
    createVector(C3, -C3, C3),
    createVector(-C3, C3, -C3),
    createVector(-C3, C3, C3),
    createVector(C3, C3, -C3),
    createVector(C3, C3, C3)
  ];
}

function draw() {
  background(bgCol);
  drawGrid();
  t = frameCount / 3;
  stroke(gCol);
  strokeWeight(2);
  orbitControl();

  fill(255, 255, 255, 120);
  push();
  rotateX(t);
  rotateY(t / 2);
  rotateZ(-t / 3);
  for (let i = 0; i < faces.length; i++) {
    beginShape();
    for (let j = 0; j < faces[i].length; j++) {
      let v = vertices[faces[i][j]];
      vertex(v.x * 100, v.y * 100, v.z * 100); // Scale for better visualization
    }
    endShape(CLOSE);
  }
  pop();
  push();
  translate(-90, width - 110, 0);
  drawingContext.disable(drawingContext.DEPTH_TEST);
  drawingContext.enable(drawingContext.BLEND);
  image(textScreen, -width / 2, -height / 2);
  drawingContext.enable(drawingContext.DEPTH_TEST);

  pop();
}

function drawGrid() {
  gSpace = (w / nGrid) * 0.95;
  stroke(gCol);
  strokeWeight(0.3);
  for (let i = 1; i <= nGrid; i++) {
    for (let j = 1; j <= nGrid; j++) {
      line(
        -w / 2 + gSpace * i,
        -w / 2 + gSpace,
        -w / 2 + gSpace * i,
        w / 2 - gSpace
      );
      line(
        -w / 2 + gSpace,
        -w / 2 + gSpace * i,
        w / 2 - gSpace,
        -w / 2 + gSpace * i
      );
    }
  }
  noFill();
  strokeWeight(3);
  rect(0, 0, w - 2 * gSpace);
}

function windowResized() {
  setup();
  draw();
}
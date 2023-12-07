let chinaHour, chinaMinute, chinaSecond;
let handColorIndex = 0; 
let handColors = [
  [255, 0, 0], ////////// Red
  [0, 255, 0], ///////// Green
  [0, 0, 255], ////////// Blue
];

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('myContainer');
  angleMode(DEGREES);
}

function draw() {
  background(255);
  translate(width / 2, height / 2);

 ///////////////// Current China time
  let chinaOffset = 8; 
  let currentUTC = new Date();
  let currentHour = currentUTC.getUTCHours();
  let currentMinute = currentUTC.getUTCMinutes();
  let currentSecond = currentUTC.getUTCSeconds();

  chinaHour = (currentHour + chinaOffset) % 24;
  chinaMinute = currentMinute;
  chinaSecond = currentSecond;
//////////////Cllock draw
  drawClock(chinaHour, chinaMinute, chinaSecond);
}

function drawClock(h, m, s) {
  // Clock design
  let diameter = min(width, height) * 0.8;
  let radius = diameter / 2;

  //////////////Clock face
  fill(255);
  stroke(50);
  strokeWeight(8);
  ellipse(0, 0, diameter);

  ///////////////Hour marks
  for (let i = 0; i < 12; i++) {
    let angle = map(i, 0, 12, 0, 360);
    let x = radius * cos(angle);
    let y = radius * sin(angle);
    let markSize = i % 3 === 0 ? 20 : 10; 
    /////////////////// Longer marks at every 3rd hour
    strokeWeight(4);
    line(x * 0.9, y * 0.9, x * markSize / 10, y * markSize / 10);
  }

  strokeWeight(6);
  stroke(handColors[handColorIndex][0], handColors[handColorIndex][1], handColors[handColorIndex][2]);
  let hourAngle = map(h % 12, 0, 12, 0, 360) - 90;
  let hourX = radius * 0.5 * cos(hourAngle);
  let hourY = radius * 0.5 * sin(hourAngle);
  line(0, 0, hourX, hourY);

  ////////////Minute hand
  strokeWeight(4);
  let minuteAngle = map(m, 0, 60, 0, 360) - 90;
  let minuteX = radius * 0.8 * cos(minuteAngle);
  let minuteY = radius * 0.8 * sin(minuteAngle);
  line(0, 0, minuteX, minuteY);

  ///////Second hand
  stroke(255, 0, 0); 
  strokeWeight(2);
  let secondAngle = map(s, 0, 60, 0, 360) - 90;
  let secondX = radius * 0.8 * cos(secondAngle);
  let secondY = radius * 0.8 * sin(secondAngle);
  line(0, 0, secondX, secondY);
}

function mousePressed() {
  handColorIndex = (handColorIndex + 1) % handColors.length;
}

let elevatorY;
let speed;
let acceleration;
let easing;
let observationDeckY;
let stars = [];
let sunX;
let cloud1X;
let cloud2X;
let cloud3X;

function setup() {
  let canvas = createCanvas(400, 500);
  canvas.parent('myContainer');
  elevatorY = height;
  speed = 0;
  acceleration = 0.1;
  easing = 0.05;
  observationDeckY = height * 0.1;
  sunX = width * 0.7;
  cloud1X = 100;
  cloud2X = 200;
  cloud3X = 300;

////////////////Background stars
  for (let i = 0; i < 50; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3),
      color: color(random(200, 255), random(200, 255), random(200, 255), random(150, 200))
    });
  }
}

function draw() {
  background(138, 218, 246);

 ///////////////////stars
  for (let star of stars) {
    fill(star.color);
    noStroke();
    ellipse(star.x, star.y, star.size, star.size);
  }

  ///////////////// Clouds
  drawCloud(cloud1X, 50);
  drawCloud(cloud2X, 150);
  drawCloud(cloud3X, 100);
  
  /////////////////// Moving clouds
  cloud1X = (cloud1X + 0.2) % width;
  cloud2X = (cloud2X + 0.3) % width;
  cloud3X = (cloud3X + 0.1) % width;

  /////////////////// Sun and Movement
  fill(255, 255, 0);
  ellipse(sunX, 50, 50, 50);
  sunX += 0.5;
  if (sunX > width + 25) {
    sunX = -25;
  }

  ///////////////////ELEVATOR
  fill(80);
  rect(width / 2 - 40, 0, 80, height);

  ////////////Observatory deck indicator
  fill(255, 0, 0);
  rect(width / 2 - 45, observationDeckY, 90, 5);

  ///////////////Elevator
  fill(150);
  rect(width / 2 - 30, elevatorY, 60, 70);

  ///////////////Pressed moves
  if (mouseIsPressed && mouseX > width / 2 - 30 && mouseX < width / 2 + 30 && mouseY > elevatorY && mouseY < elevatorY + 70) {
    elevatorY = mouseY - 35;
  } else {
    let targetY = height - mouseY;

    let force = targetY - elevatorY;
    force *= easing;
    speed += force * acceleration;
    elevatorY += speed;
  }

  ///////////////certain bounds
  elevatorY = constrain(elevatorY, 0, height - 70);
  if (elevatorY <= observationDeckY + 5 && elevatorY >= observationDeckY - 5) {
    fill(255, 0, 0);
    textSize(20);
    text('Observation Deck', width / 2 - 65, observationDeckY - 10);
  }

  ////////////////showing lift speed
  fill(255);
  textSize(20);
  text(`Lift Speed: 600m/min HOVER TO MOVE`, 10, 20);
}
///////////Cloud shape
function drawCloud(x, y) {
  fill(255);
  noStroke();
  ellipse(x, y, 50, 30);
  ellipse(x + 15, y - 15, 50, 30);
  ellipse(x + 35, y, 50, 30);
}

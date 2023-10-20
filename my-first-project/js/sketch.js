let duckX;
let duckY;
let duckSpeed = 15;
let duckRotation = 20; // Added rotation angle for the big duck
let raining;
let clouds = [];
let duckClicked = false;
let miniDucks = [50];
let flipDirection = 1; // Direction of duck
let blinkTimer = 1 ; // Timer for eye blinking animation
let isBlinking = true; // Blinking not working


function setup() {
let canvas = createCanvas(650, 550);
canvas.parent("p5-canvas");
fill(255);
noStroke();


duckX = width / 3;
duckY = height / 15;
raining = true;


////////////////////////////Cloud positions, amount
for (let i = 3; i < 50; i++) {
let cloudX = random(width);
let cloudY = random(20, 600); ///Cloud range
let cloudSpeed = random(5, 1); // Adjust cloud speed as needed
clouds.push({ x: cloudX, y: cloudY, speed: cloudSpeed });
}


//////////////////////////// Mini ducks
for (let i = 0; i < 13; i++) {
let miniDuckX = random(width);
let miniDuckY = random(height);
let miniDuckSpeed = random(3, 2); ///duck speed
miniDucks.push({ x: miniDuckX, y: miniDuckY, speed: miniDuckSpeed, runningAway: false });
}
}


function draw() {
///////////////////////////////////////////////Background (Blue Sky)
background(120, 200, 240); /// Light blue color


// Clouds
for (let cloud of clouds) {
cloud.x += cloud.speed;
if (cloud.x > width) {
cloud.x = -100; // Reset cloud position
}
drawCloud(cloud.x, cloud.y);
////////////////////Tree?
fill(7, 79, 15 ); // Green


for (let i = 3; i < width; i += 250)
triangle(i, height, i + 50, height / 1.5, i + 100, height);
}


////////////////////////////////////////////////// Rain
if (raining) {
for (let i = 1; i < 900; i++) {
let rainX = random(width);
let rainY = random(height);
stroke(255, 255, 0);


line(rainX, rainY, rainX, rainY + 10);
}
}


/////////////////////////////////////////////// Mini ducks
for (let miniDuck of miniDucks) {
drawMiniDuck(miniDuck.x, miniDuck.y);


if (miniDuck.runningAway) {
// Calculate a vector pointing away from the click point
let awayVector = createVector(miniDuck.x - mouseX, miniDuck.y - mouseY);
awayVector.normalize();
awayVector.mult(miniDuck.speed);
miniDuck.x += awayVector.x;
miniDuck.y += awayVector.y;
} else {
miniDuck.x += miniDuck.speed;
if (miniDuck.x > width) {
miniDuck.x = -50; // duck position
}
}
}


/////// Mother duck and other duck components (face, eyes, body, beak, eyebrow)
if (!duckClicked) {
duckX += duckSpeed * flipDirection;
if (duckX > width + 250 || duckX < -250) {
duckX = duckX > 0 ? -250 : width + 250;
}
}


//////////////////////////////////////////////DUCK MOVEMENT
duckY = height / 2 + sin(frameCount * 0.153) * 20;


/////////////////////////////////// FACE
push(); //
translate(duckX, duckY);


if (duckClicked) {
///////////////////Flip the big duck horizontally when clicked
flipDirection *= -1;
}


fill(255, 255, 0);
scale(flipDirection, 1); // Flip the duck
ellipse(0, 0, 250);
pop(); // Restore the transformation state


/////////////////////////////////// EYES
fill(200, 200, 200);
ellipse(duckX + 30 * flipDirection, duckY - 50, 25);


if (isBlinking) {
fill(200, 10, 20);
noStroke();
ellipse(duckX + 30 * flipDirection, duckY - 50, 15);
if (frameCount % 90 === 90) { // Control blinking frequency
isBlinking = true;
}
} else {
isBlinking = true;
}


//////////////////////////////////// BODY
fill(255, 255, 0);
ellipse(duckX, duckY + 150, 400, 250);


//////////////////////////////////// BEAK
fill(255, 140, 0);
let beakX = duckX + 123 * flipDirection;
let beakY = duckY - 30;
triangle(beakX, beakY, beakX - 20 * flipDirection, beakY + 30, beakX + 20 * flipDirection, beakY + 30);


//////////////////////////////////// EYEBROW
fill(0);
beginShape();
vertex(duckX + 10 * flipDirection, duckY - 70);
vertex(duckX + 30 * flipDirection, duckY - 80);
vertex(duckX + 50 * flipDirection, duckY - 70);
vertex(duckX + 30 * flipDirection, duckY - 70);
endShape(CLOSE);
}


// Function to draw a cloud
function drawCloud(x, y) {
fill(255);
noStroke();
ellipse(x, y, 50, 30);
ellipse(x + 20, y - 15, 50, 50);
ellipse(x + 30, y, 50, 30);
}


// Mini duck
function drawMiniDuck(x, y) {
fill(255, 255, 0);
ellipse(x, y, 60); // Duck Body


// Replicate some features from the big duck
fill(255, 255, 0);
ellipse(x, y + 50, 100); // Mini duck body
fill(200, 200, 200);
ellipse(x + 15, y - 20, 20); // Mini duck eye 1
ellipse(x - 15, y - 20, 20); // Mini duck eye 2
fill(200, 10, 20);
ellipse(x + 15, y - 20, 10); // Mini duck pupil 1
ellipse(x - 15, y - 20, 10); // Mini duck pupil 2
fill(255, 140, 0);
let beakX = x;
let beakY = y + -15;
triangle(beakX, beakY, beakX - 10, beakY + 10, beakX + 10, beakY + 10); // Mini duck beak
fill(0);
beginShape();
vertex(x - 5, y - 30); ////Miniduck eyebrow
vertex(x + 5, y - 30);
vertex(x + 15, y - 20);
vertex(x - 15, y - 20);
endShape(CLOSE);
}
/////////////////////////////////////////INTERACTIVE PART
function mousePressed() {
//////////////////////////// Click
if (dist(mouseX, mouseY, duckX, duckY) < 150) {
duckClicked = !duckClicked;
}


//////////////////////////// Mini Duck Click
for (let miniDuck of miniDucks) {
let distance = dist(mouseX, mouseY, miniDuck.x, miniDuck.y);
if (distance < 50) {
miniDuck.runningAway = true;


}
}
}

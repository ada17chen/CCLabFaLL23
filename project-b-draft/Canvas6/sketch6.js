let images = [];
let currentImage = 0;
let forwardButton, backButton;

function preload() {
  images[0] = loadImage('realgold.png');
  images[1] = loadImage('realhusky.png');
  images[2] = loadImage('tiny.png');
}

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("myContainer");

////////////Forward button
  forwardButton = createButton('Next');
  forwardButton.position(450, 550);
  forwardButton.mousePressed(nextImage);

///////////Backward button
  backButton = createButton('Previous');
  backButton.position(50, 550);
  backButton.mousePressed(previousImage);
}

function draw() {
  background(253, 255, 114);

  if (images[currentImage]) {
    image(images[currentImage], 50, 50, width - 100, height - 150);
  }

///////////Frame
  noFill();
  strokeWeight(6);
  stroke(100);
  rect(50, 50, width - 100, height - 150);
}

function nextImage() {
  currentImage = (currentImage + 1) % images.length;
}

function previousImage() {
  currentImage = (currentImage - 1 + images.length) % images.length;
}

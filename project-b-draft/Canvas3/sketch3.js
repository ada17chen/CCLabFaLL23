let seeds = [];
let flowers = [];
let gardenImg;
let customCursor;

function preload() {
  gardenImg = loadImage('garden.png');
  customCursor = loadImage('paw2.png');
  
}

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent('myContainer');

  for (let i = 0; i < 50; i++) {
    seeds.push(new Seed(random(width), random(height)));
  }
customCursor.resize(90, 50);
}

function draw() {
  background(gardenImg);
  image(customCursor, mouseX, mouseY);
  fill("white")
  textSize(20)
 text("Touch the seeds with your paw", 150, 50); 
  for (let seed of seeds) {
    seed.show();
    seed.update();
  }

  for (let flower of flowers) {
    flower.show();
    flower.grow();
  }

  if (mouseIsPressed) {
    for (let i = seeds.length - 1; i >= 0; i--) {
      if (seeds[i].clicked(mouseX, mouseY)) {
        let flowerType = floor(random(3));
        flowers.push(new Flower(seeds[i].x, seeds[i].y, flowerType));
        seeds.splice(i, 1);
        break;
      }
    }
  }
}

class Seed {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
  }

  show() {
    fill(139, 69, 19);
    ellipse(this.x, this.y, this.size);
  }

  update() {
    this.x += random(-1, 1);
    this.y += random(-1, 1);
  }

  clicked(px, py) {
    let d = dist(px, py, this.x, this.y);
    return d < this.size;
  }
}

class Flower {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.size = 5;
    this.maxSize = random(20, 30);
    this.stemHeight = random(40, 80);
    this.numPetals = 10; // Change this value to increase/decrease petals
  }

  show() {
////////////Stem
    stroke(0, 150, 0);
    strokeWeight(6);
    line(this.x, this.y, this.x, this.y - this.stemHeight);
///////////// Flower
    noStroke();
    fill(255, 0, 0);
    ellipse(this.x, this.y - this.stemHeight, this.size * 2);
/////////// Petals
    for (let i = 0; i < this.numPetals; i++) { 
      let angle = map(i, 0, this.numPetals, 0, TWO_PI);
      let petalX = this.x + cos(angle) * (this.size * 2);
      let petalY = this.y - this.stemHeight + sin(angle) * (this.size * 2);
      fill(random(255), random(255), random(255));
      ellipse(petalX, petalY, this.size * 1.5, this.size * 1.5);
    }
  }

  grow() {
    if (this.size < this.maxSize) {
      this.size += 0.1;
    }
  }
}

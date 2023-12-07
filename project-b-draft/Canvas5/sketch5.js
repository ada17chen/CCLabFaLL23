let basketImg;
let basket;
let bonesImg;
let bones = [];
let score = 0;
let gameOver = false;

function preload() {
  basketImg = loadImage('beg2.png'); 
  bonesImg = loadImage('treat.png');
  backgroundImage = loadImage('back.png')
}

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('myContainer');
  basket = new Basket();
  
}

function draw() {
  background(backgroundImage);
  
  if (!gameOver) {
    if (frameCount % 60 === 0) {
      bones.push(new Bones(random(width), 0));
    }

    for (let i = bones.length - 1; i >= 0; i--) {
      bones[i].update();
      bones[i].show();

      if (bones[i].hits(basket)) {
        score++;
        bones.splice(i, 1);
      } else if (bones[i].y > height) {
        bones.splice(i, 1);
      }
    }

    basket.show();
    fill(0);
    textSize(24);
    text(`Score: ${score}`, 20, 30);
  } else {
    textSize(40);
    textAlign(CENTER, CENTER);
    text('Game Over', width / 2, height / 2);
    text(`Score: ${score}`, width / 2, height / 2 + 40);
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    basket.move(-10);
  } else if (keyCode === RIGHT_ARROW) {
    basket.move(10);
  }
}

class Basket {
  constructor() {
    this.x = width / 2;
    this.y = height - 50;
    this.width = 80;
    this.height = 40;
  }

  move(step) {
    this.x += step;
    this.x = constrain(this.x, 0, width - this.width);
  }
/////////////basket size
 show() {
    let imageSize = 70; 
    image(basketImg, this.x, this.y, imageSize, imageSize * 0.8);
  }
}

class Bones {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 30; 
    this.speed = random(1, 4);
  }

  update() {
    this.y += this.speed;
  }

  show() {
    image(bonesImg, this.x, this.y, this.size, this.size);
  }

  hits(basket) {
    return (
      this.x > basket.x &&
      this.x < basket.x + basket.width &&
      this.y > basket.y &&
      this.y < basket.y + basket.height
    );
  }
}

let buildings = [
    { name: "Burj Khalifa", height: 828, x: 50, color: "#ff0000", hovered: false }, 
    { name: "Shanghai Tower", height: 632, x: 150, color: "orange", hovered: false },
    { name: "Clock Tower", height: 601, x: 250, color: "yellow", hovered: false },
    { name: "Goldin Finance 117", height: 599, x: 350, color: "#96C796", hovered: false },
    { name: "Ping An Finance Cente", height: 555, x: 450, color: "lightblue", hovered: false }
  ];
  const tallestHeight = Math.max(...buildings.map(building => building.height));
  const scaleFactor = 300 / tallestHeight;
  
  let dogImage; ///////////VARIABLE for dog
  let backgroundImage; ///////////VARIABLE for background
  
  function preload() {
    dogImage = loadImage('corgi2.png');
    backgroundImage = loadImage('sky.png');
  }
  
  function setup() {
    let canvas = createCanvas(600, 400);
    canvas.parent('myContainer');
  }
  
  function drawBackground() {
    image(backgroundImage, 0, 0, width, height);
  }
  
  function draw() {/////showing background
    drawBackground();
    
    ////////////////////MOUSE
    for (let i = 0; i < buildings.length; i++) {
      let scaledHeight = buildings[i].height * scaleFactor;
      if (
        mouseX > buildings[i].x &&
        mouseX < buildings[i].x + 50 &&
        mouseY > height - scaledHeight &&
        mouseY < height
      ) {
        buildings[i].hovered = true;
      } else {
        buildings[i].hovered = false;
      }
    }
  
  //////////////////////BUILDINGS
    for (let i = 0; i < buildings.length; i++) {
      let scaledHeight = buildings[i].height * scaleFactor;
      fill(buildings[i].hovered ? '#3212F3' : buildings[i].color); // Highlight if hovered
      rect(buildings[i].x, height - scaledHeight, 50, scaledHeight);
      fill(0);
      text(buildings[i].name, buildings[i].x, height - scaledHeight - 10);
    }
   //////////////////DOG IMAGE
    image(dogImage, mouseX, mouseY, 50, 50);
  }
  
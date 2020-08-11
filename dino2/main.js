var dinos = [];
var agents = 1;
var sprites = [];
var obstacles = [];
var gameStarted = true;
var speed = 6;
var score = 0;

/*
  IDS

  0 = 1Big
  1 = 1Small
  2 = 2Big
  3 = 2Small
  4 = 3Big
  5 = 3Small
  6 = 2Big1Small1Big
  7 = BirdFlapDown
  8 = BirdFlapUp
  9 = DinoIdle
  10 = DinoLeftUp
  11 = DinoRightUp
  12 = DinoDuckLeftUp
  13 = DinoDuckRightUp
*/

function preload() {
  sprites[0] = loadImage("Assets/1Big.png");
  sprites[1] = loadImage("Assets/1Small.png");
  sprites[2] = loadImage("Assets/2Big.png");
  sprites[3] = loadImage("Assets/2Small.png");
  sprites[4] = loadImage("Assets/3Big.png");
  sprites[5] = loadImage("Assets/3Small.png");
  sprites[6] = loadImage("Assets/2Big1Small1Big.png");
  sprites[7] = loadImage("Assets/BirdFlapDown.png");
  sprites[8] = loadImage("Assets/BirdFlapUp.png");
  sprites[9] = loadImage("Assets/DinoIdle.png");
  sprites[10] = loadImage("Assets/DinoLeftUp.png");
  sprites[11] = loadImage("Assets/DinoRightUp.png");
  sprites[12] = loadImage("Assets/DinoDuckLeftUp.png");
  sprites[13] = loadImage("Assets/DinoDuckRightUp.png");
}

function setup() {
  createCanvas(1000, 600);
  //frameRate(10);
  obstacles[0] = new Obstacle(width, floor(random(0, 7)));
  for (var i=0; i<agents; i++) {
    dinos[i] = new Dino();
  }
}

function draw() {
  background(220);
  line(0, (height/2)+200, width, (height/2)+200);
  score++;
  stroke(0);
  fill(0);
  textSize(16);
  text("Score: "+score, 10, height-10);
  noFill();
  if (gameStarted) {
    for (var i in obstacles) {
      obstacles[i].update();
      obstacles[i].show();
      //obstacles[i].hitbox();
      if (obstacles[i].x < -100) {
        delete obstacles[i];
      }
    }
  }
  for (var i=0; i<agents; i++) {
    /*for (var j=0; j<agents; j++) {
      if (!dinos[j].dead) {dinos[j].show();break;}
    }*/
    if (!dinos[i].dead) {
      dinos[i].update();
      dinos[i].show();
      //dinos[i].hitbox();
    }
  }
  if (keyIsDown(DOWN_ARROW)) {
    dinos[0].duck();
  }
  else {
    dinos[0].notDuck();
  }
  for (var i=0; i<agents; i++) {
    for (var j in obstacles) {
      if (Collided(dinos[i].hitboxSize.x, dinos[i].hitboxSize.y, dinos[i].hitboxSize.w, dinos[i].hitboxSize.h, obstacles[j].hitboxSize.x, obstacles[j].hitboxSize.y, obstacles[j].hitboxSize.w, obstacles[j].hitboxSize.h)) {
        dinos[i].dead = true;
      }
    }
  }
  var allDead = true;
  for (var i=0; i<agents; i++) {
    if (!dinos[i].dead) allDead = false;
  }
  if (allDead) {
    Reset();
  }
}

function Reset() {
  obstacles = [];
  obstacles[0] = new Obstacle(width, floor(random(0, 7)));
  for (var i=0; i<agents; i++) {
    dinos[i].dead = false;
  }
  speed = 6;
  score = 0;
}

function Collided(x1, y1, w1, h1, x2, y2, w2, h2) {
  var rect1 = {x: x1, y: y1, width: w1, height: h1}
  var rect2 = {x: x2, y: y2, width: w2, height: h2}
  
  return (rect1.x < rect2.x + rect2.width &&
     rect1.x + rect1.width > rect2.x &&
     rect1.y < rect2.y + rect2.height &&
     rect1.y + rect1.height > rect2.y);
}

function keyPressed() {
  if (keyCode === 32) {
    dinos[0].jump();
  }
}
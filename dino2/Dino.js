class Dino {
  constructor() {
    this.x = 64;
    this.y = ((height/2)+200)-43;
    this.hitboxSize = {x:this.x+5, y:this.y, w:24, h:43};
    
    this.velocity = 1;
    this.dead = false;
    this.jumping = false;
    this.ducking = false;
    this.gravity = .8;
    this.dead = false;
    this.runningFrame = 10;
    this.duckingFrame = 12;
  }

  update() {
    this.y += this.velocity;
    if (frameCount % 10 == 0) {
      if (this.runningFrame == 10) {
        this.runningFrame = 11;
        this.duckingFrame = 13;
      }
      else {
        this.runningFrame = 10;
        this.duckingFrame = 12;
      }
    }
    if (this.y >= ((height/2)+200)-44) {
      this.y = ((height/2)+200)-44;
      this.velocity = 1;
      this.jumping = false;
    }
    this.velocity += this.gravity;
    this.hitboxSize.x = this.x+5;
    if (!this.ducking)
      this.hitboxSize.y = this.y;
  }

  duck() {
    this.ducking = true;
    this.hitboxSize = {x:this.x+5, y:this.y+15, w:40, h:20};
  }
  notDuck() {
    this.ducking = false;
    this.hitboxSize = {x:this.x+5, y:this.y, w:24, h:43};
  }

  hitbox() {
    strokeWeight(1);
    stroke(100, 0, 0);
    noFill();
    rect(this.hitboxSize.x, this.hitboxSize.y, this.hitboxSize.w, this.hitboxSize.h);
  }

  show() {
    if (!gameStarted) {
      image(sprites[9], this.x, this.y);
    }
    else {
      if (!this.jumping) {
        if (!this.ducking) {
          image(sprites[this.runningFrame], this.x, this.y);
        }
        else {
          image(sprites[this.duckingFrame], this.x, this.y);
        }
      }
      else {
        image(sprites[9], this.x, this.y);
      }
    }
  }

  jump() {
    if (!this.jumping) {
      this.velocity = -12;
      this.jumping = true;
    }
  }
}
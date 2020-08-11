class Obstacle {
  constructor(x, id) {
    this.x = x;
    this.y = (((height/2)+200)-36);
    this.id = id;
    
    this.madeAnother = false;
    this.madeID = 0;
    this.frame = 7;
    switch (this.id) {
      case 0:
        this.hitboxSize = {x:this.x-1, y:this.y, w:16, h:34};
        break;
      case 1:
        this.hitboxSize = {x:this.x+1, y:this.y+13, w:12, h:21};
        break;
      case 2:
        this.hitboxSize = {x:this.x-1, y:this.y+1, w:34, h:33};
        break;
      case 3:
        this.hitboxSize = {x:this.x+1, y:this.y+14, w:26, h:20};
        break;
      case 4:
        this.hitboxSize = {x:this.x-1, y:this.y+1, w:52, h:33};
        break;
      case 5:
        this.hitboxSize = {x:this.x, y:this.y, w:40, h:20};
        break;
      case 6:
        this.hitboxSize = {x:this.x-1, y:this.y+1, w:64, h:33};
        break;
      case 7:
        var randomNum = floor(random(0, 3));
        this.hitboxSize = {x:this.x, y:this.y+8, w:33, h:20};
        switch (randomNum) {
          case 0:
            this.y = ((height/2)+200)-36;
            break;
          case 1:
            this.y = (((height/2)+200)-36)-36;
            break;
          case 2:
            this.y = (((height/2)+200)-36)-72;
            break;
        }
        break;
    }
  }
  hitbox() {
    stroke(100, 0, 0);
    strokeWeight(1);
    rect(this.hitboxSize.x, this.hitboxSize.y, this.hitboxSize.w, this.hitboxSize.h);
  }
  update() {
    this.x -= speed;
    if (frameCount % 15 == 0) {
      if (this.id == 7) {
        if (this.frame == 7) {
          this.frame = 8;
        }
        else {
          this.frame = 7;
        }
      }
    }
    if (this.x < width/2 && !this.madeAnother) {
      obstacles[obstacles.length] = new Obstacle(floor(random(width, width+(width/2))), floor(random(0, 8)));
      //obstacles[obstacles.length] = new Obstacle(floor(random(width, width+(width/2))), 7);
      speed += .3;
      this.madeAnother = true;
    }
    if (obstacles[obstacles.length-1].x < width/(width/4)) {
      this.madeAnother = false;
      this.madeID++;
      console.log(this.madeID);
    }
    switch(this.id) {
      case 0:
        this.hitboxSize.x = this.x-1;
        this.hitboxSize.y = this.y;
        break;
      case 1:
        this.hitboxSize.x = this.x+1;
        this.hitboxSize.y = this.y+13;
        break;
      case 2:
        this.hitboxSize.x = this.x-1;
        this.hitboxSize.y = this.y+1;
        break;
      case 3:
        this.hitboxSize.x = this.x+1;
        this.hitboxSize.y = this.y+14;
        break;
      case 4:
        this.hitboxSize.x = this.x-1;
        this.hitboxSize.y = this.y+1;
        break;
      case 5:
        this.hitboxSize.x = this.x+1;
        this.hitboxSize.y = this.y+14;
        break;
      case 6:
        this.hitboxSize.x = this.x-1;
        this.hitboxSize.y = this.y+1;
        break;
      case 7:
        this.hitboxSize.x = this.x;
        this.hitboxSize.y = this.y+8;
        break;
      default:
        this.hitboxSize.x = this.x;
        this.hitboxSize.y = this.y;
    }
  }
  show() {
    if (this.id == 7) {
      image(sprites[this.frame], this.x, this.y);
    }
    else {
      image(sprites[this.id], this.x, this.y);
    }
  }
}
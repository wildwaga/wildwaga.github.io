dog_site = {};

dog_site.init = function() {
  dog_site.dog = document.getElementById("dog");
  dog_site.pet_count = document.getElementById("petcount");
  dog_site.pets = 0;
  dog.addEventListener("mousedown", dog_site.mousedown);
  dog.addEventListener("mouseup", dog_site.mouseup);
  dog_site.loop();
}

dog_site.mousedown = function() {
  dog_site.dog.src = "dog_happy_l.png";
  dog_site.pets++;
  if (dog_site.pets < 10) {
    dog_site.dog.className += " clicked";
  }  
  dog_site.pet_count.className += " clicked";
}

dog_site.mouseup = function() {
  dog_site.dog.src = "dog_l.png";
  dog_site.dog.className -= " clicked";
  dog_site.pet_count.className -= " clicked";
}

dog_site.loop = function() {
  dog_site.pet_count.innerHTML = dog_site.pets;
  setTimeout(dog_site.loop, 1000 / 60);
  
  if (dog_site.pets > 10) {
    dog_site.dog.style.animation = "spin " + 50 / dog_site.pets + "s linear infinite";
  }
}

window.onload = function() {
  dog_site.init();
}
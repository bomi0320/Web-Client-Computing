var slides = document.querySelectorAll("#slides > img");
var prev = document.getElementById("prev");
var next = document.getElementById("next");
var current = 0;

showSlides(current);

var slideBtns = document.querySelectorAll(".slideBtn");
for (var i = 0; i < slideBtns.length; i++) {
  slideBtns[i].addEventListener("click", function() {
    var slideNum = parseInt(this.getAttribute("data-slide"));
    if (slideNum !== current) {
      showSlides(slideNum);
    }
  });
}

prev.onclick = prevSlide;
next.onclick = nextSlide;

function showSlides(n) {
  var slideOrder = [];
  for (var i = 0; i < slides.length; i++) {
    var order = i - n;
    if (order < 0) {
      order += slides.length;
    }
    slideOrder.push(order);
    slides[i].style.display = "none";
  }
  slideOrder.forEach(function(order) {
    slides[order].style.display = "block";
  });
  current = n;
}

function prevSlide() {
  var prevNum = current - 1;
  if (prevNum < 0) {
    prevNum = slides.length - 1;
  }
  showSlides(prevNum);
}

function nextSlide() {
  var nextNum = current + 1;
  if (nextNum >= slides.length) {
    nextNum = 0;
  }
  showSlides(nextNum);
}
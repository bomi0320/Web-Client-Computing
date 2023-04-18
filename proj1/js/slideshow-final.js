var slides = document.querySelectorAll(".image");
var images = document.querySelector('.images'); 
var prev = document.getElementById("prev");
var next = document.getElementById("next");
var one = document.getElementById("one");
var two = document.getElementById("two");
var three = document.getElementById("three");
var four = document.getElementById("four");
var five = document.getElementById("five");
var current = 0;

prev.onclick = prevSlide;
next.onclick = nextSlide;
one.onclick = oneSlide;
two.onclick = twoSlide;
three.onclick = threeSlide;
four.onclick = fourSlide;
five.onclick = fiveSlide;

function prevSlide() {  
  images.style.transition = "none";
  if (current > 0) {current -= 1; const size = current * (1200); images.style.transform = "translateX(" + (-size) + "px)";}
  else
    {current = slides.length - 1; images.style.transform = "translateX(-4800px)";}
}

function nextSlide() {
  images.style.transition = "none";
  if (current < slides.length - 1) {current += 1; const size = current * 1200; images.style.transform = "translateX(" + (-size) + "px)";}
  else
    {current = 0; images.style.transform = "translateX(0px)";}
    //showSlides(current);  
    
}

function oneSlide(){
  images.style.transition = "all 2s ease-in-out";
  images.style.transform="translateX(0px)";
  current = 0;

}

function twoSlide(){
  images.style.transition = "all 2s ease-in-out";
  images.style.transform="translateX(-1200px)";
  current = 1;

}

function threeSlide(){
  images.style.transition = "all 2s ease-in-out";
  images.style.transform="translateX(-2400px)";
  current = 2;
  
}

function fourSlide(){
  images.style.transition = "all 2s ease-in-out";
  images.style.transform="translateX(-3600px)";
  current = 3;

}

function fiveSlide(){
  images.style.transition = "all 2s ease-in-out";
  images.style.transform="translateX(-4800px)";
  current = 4;

    
}



/////////////////////////////////////////////////////////

function reset_animation(){
  var element1 = document.getElementById("bb");
  var element2 = document.getElementById("ball");
  element1.classList.remove("box");
  element2.classList.remove("effect");
  void element1.offsetWidth;
  void element2.offsetWidth;
  element1.classList.add("box");
  element2.classList.add("effect");
}

////////////////////////////////////////////

function newRegister() {
  var newItem = document.createElement("li");  // 요소 노드 추가
  var subject = document.querySelector("#subject");  // 폼의 텍스트 필드
  var newText = document.createTextNode(subject.value);  // 텍스트 필드의 값을 텍스트 노드로 만들기
  var image = document.createElement("img"); 
  image.src = "./images/trash.png";
  image.width = 15;
  image.style.cssFloat = 'right'; //휴지통 오른쪽으로
 
  newItem.appendChild(newText);   // 텍스트 노드를 요소 노드의 자식 노드로 추가
  newItem.appendChild(image);     //휴지통 이미지를 요소 노드의 자식 노드로 추가

  var itemList = document.querySelector("#itemList");  // 웹 문서에서 부모 노드 가져오기 
  itemList.appendChild(newItem);  // 새로 만든 요소 노드를 부모 노드에 추가

  subject.value="";

   //삭제 코드
   var items = document.querySelectorAll("#itemList > li"); //li(리스트) 태그 전체를 찾아냄.
   var pics = document.querySelectorAll("#itemList > li > img");
   for(i=0; i<items.length; i++) {
     pics[i].addEventListener("click", function() { // 항목 클릭했을 때 실행할 함수
       if(this.parentNode.parentNode)   // 부모 노드가 있다면(무조건 있음)
         this.parentNode.parentNode.removeChild(this.parentNode);  // 부모 노드에서 삭제
       });
   }
}




 

  let test = document.getElementById("balloon")
  test.addEventListener("mouseover", function(event){
    const target2 = ball;

    target2.classList.remove("effect");
    void target2.offsetWidth;
    target2.classList.add("effect");
  });


async function init() {
  const response = await fetch('http://localhost:8090/https://search.naver.com/search.naver?where=nexearch&sm=top_sug.pre&fbm=1&acr=2&acq=%EC%83%81%EC%98%81&qdt=0&ie=utf8&query=%EC%83%81%EC%98%81%EC%98%81%ED%99%94', {
  headers: {
    "X-Requested-With": "XMLHttpRequest"
  }
});
const body = response.text().then(function(html){
  var html_dom = new DOMParser().parseFromString(html,'text/html');
  console.log(html_dom.body);
  var books = html_dom.querySelectorAll(".card_item");
  console.log(books);
  display(books);
});
}

function display(books) {
  const result = document.querySelector('#result');
  let string = '';
  books.forEach((book) => {
    var title = book.querySelector(".area_text_box").innerText;
    var genre = book.querySelector(".info dd:first-of-type").innerText;
    var time = book.querySelector(".info dd:last-of-type").innerText;
    var day = book.querySelector(".info dl:nth-of-type(2) dd").innerText;
    var rating = book.querySelector(".num").innerText;
    var cast = book.querySelector(".info dl:nth-of-type(3)").textContent; // ._text:nth-of-type(2)
    cast = cast.substr(4);
    var poster = book.querySelector(".img_box > img").src;
    string += `<table><tr><th>영화</th><td>${title}</td></tr>
                <tr><th>장르</th><td>${genre}</td></tr>
                <tr><th>상영시간</th><td>${time}</td></tr>
                <tr><th>개봉일</th><td>${day}</td></tr>
                <tr><th>평점</th><td>${rating}</td></tr>
                <tr><th>출연</th><td>${cast}</td></tr>
                <tr><th>포스터</th><td><img width="178" height="260" src="${poster}"></td></tr></table>
                `;
  });            
  result.innerHTML = string;
}

init();

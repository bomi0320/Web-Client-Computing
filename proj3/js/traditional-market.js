async function drawMap() {
  const lat = 37.55684;
  const lng = 126.91404;

  var mapContainer = document.querySelector('#map'), // 지도를 표시할 div 
      mapOption = { 
        center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표 - 이지스퍼블리싱
        level: 14 // 지도의 확대 레벨
      };

  // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
  var map = new kakao.maps.Map(mapContainer, mapOption); 

  // 마커 클러스터러를 생성합니다 
  var clusterer = new kakao.maps.MarkerClusterer({
    map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
    averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
    minLevel: 10 // 클러스터 할 최소 지도 레벨 
  });

  // 오픈 데이터 서버에서 캠핑장 정보 가져오기
  const oldSite = await getCampingSite(); //78개 중에서 72개 살려주기. 10% 아래로 내려주는게 아님.
  const campingSite = [];
  const locations = [];
  for(i=0; i<oldSite.length; i++) {
    var query = encodeURI(oldSite[i].area + " " + oldSite[i].address); //한글을 엔코딩. 꼭 해야함!
    const response = await fetch(`https://dapi.kakao.com/v2/local/search/address.json?analyze_type=similar&page=1&size=10&query=${query}`, {
      headers:  { //카카오 암호. 헤더에 필요. REST API 암호 필요
                  "Authorization": "KakaoAK bd2349a7ecef28b1648053cd6ecbb0ba"
                }
    });
    const data = await response.json();
    const location = data.documents;
    //console.log(location);
    if(location.length>0){ //주소를 찾지 못한 경우 이 라인 통과하지 못함.
      campingSite.push(oldSite[i]);
      locations.push(location[0]);
    }
  }
  //에러가 안나는 주소만 처리하기. 반복문 사용하기
  console.log(campingSite);
  console.log(locations);
    
  // 마커들을 모아놓을 변수
  var markers = [];
  for(let i = 0; i < campingSite.length; i++) { 
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(locations[i].y, locations[i].x)
    });
    markers.push(marker);   // 마커를 배열에 추가합니다

    var infowindow = new kakao.maps.InfoWindow( {
      content : campingSite[i].title+'('+campingSite[i].openday+')<br>' + locations[i].address_name + '<br>경도:' + locations[i].x + '<br>위도:' +  locations[i].y   // 인포윈도우에 표시할 내용
      //title(openday)
      //카카오에 보냈을 때 나오는 주소address_name 사용
      //여기에 정보들 표시 4개 정보를 4줄에 걸쳐서 표시.
    });

    // 마커에 이벤트를 등록합니다
    // 이벤트 리스너로는 클로저를 만들어 등록합니다 
    // 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
    // 마커에 마우스오버하면 makeOverListener() 실행
    kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));  
    // 마커에서 마우스아웃하면 makeOutListener() 실행
    kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));   
  }
  console.log(markers);
  clusterer.addMarkers(markers);
}

async function getCampingSite() {
  const url = 'http://apis.data.go.kr/6480000/gyeongnammarket/gyeongnammarketList?serviceKey=B6zhGRpSGLOIl5ZZ1tDANRtUdOOj2PhiUchfbiQmYH9%2FbBfxC9EtMsjgf2C7V7Em4ZIuqEtJmRCTfSnEb6X4gw%3D%3D&numOfRows=78&pageNo=1&resultType=json';
  let res = await fetch(url);
  let json = await res.json();
  const campingSite = json.gyeongnammarketList.body.items.item;
  return campingSite;
}

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
function makeOverListener(map, marker, infowindow) {
  return function() {
    infowindow.open(map, marker);          
  };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다 
function makeOutListener(infowindow) {
  return function() {
    infowindow.close();
  };
}

var mapdraw = document.querySelector("#mapdraw");
mapdraw.onclick = drawMap;
  
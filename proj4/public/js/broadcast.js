window.addEventListener('load', function(){
  // 변수를 선언합니다.
  let color = 'black';
  let width = 1;
  let isDown = false; //마우스 왼쪽 버튼을 누른 상태인가? false. 누른 상태도 그려야 그려짐.
  let newPoint, oldPoint;
  let reset = false;

  // 소켓을 연결합니다.
  const socket = io.connect();

  // 캔버스를 추출합니다.
  const canvas = document.querySelector('#canvas');
  const pen = document.querySelector('#pen');
  const eraser = document.querySelector('#eraser');
  const wid = document.querySelector('#wid');
  const color_select = document.querySelector('#color_select');
  const reset_button = document.querySelector('#reset');
  const context = canvas.getContext('2d');

  // 마우스 이벤트를 연결합니다.
  canvas.addEventListener('mousedown', function (event) {
      isDown = true; //버튼이 눌린 상태 -> 그림을 그린다.
      const rect = canvas.getBoundingClientRect();
      oldPoint = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
      };
  });

  canvas.addEventListener('mousemove', function(event) {
      if (!isDown) { return; }
      const rect = canvas.getBoundingClientRect();
      newPoint = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
      };
      socket.emit('line', { //객체
          x1: oldPoint.x, //출발점 좌표
          y1: oldPoint.y,
          x2: newPoint.x, //끝나는 점 좌표
          y2: newPoint.y,
          color: color,
          width: width,
          reset: reset
      });
      oldPoint = newPoint;
  });

  canvas.addEventListener('mouseup', function(event) { //이때는 그리면 안됨.
      isDown = false;
      const rect = canvas.getBoundingClientRect();
      oldPoint = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
      };
  });

  // 입력 양식 이벤트를 연결합니다.
  pen.addEventListener('click', function(event) {
      width = 1; //굵기 초기값이 1
      color = 'black';
      wid.value=width;
  });

  eraser.addEventListener('click', function(event) {
      width = 10; //굵기 초기값이 10
      color = 'white';
      wid.value=width;
  });

  wid.addEventListener('change', function(event) {
      width=wid.value;
  });

  color_select.addEventListener('change', function(event){
      color = color_select.value;
      wid.value=width;
  });

  reset_button.addEventListener('click', function(event){ //캔버스 전체 초기화하는 명령어(구글링하기)
      console.log("reset");
      //reset = true;
      console.log(reset);
      const param = {
        reset: true
    };
        socket.emit('line', param);
      //context.clearRect(0, 0, canvas.width, canvas.height);
  });

  // 소켓 이벤트를 연결합니다.
  
  socket.on('line', function (data) {
    console.log(data.reset);
      console.log(data);
      console.log(canvas.getBoundingClientRect());
      context.beginPath();
      context.lineWidth = data.width; //굵기
      context.strokeStyle = data.color; //색
      context.moveTo(data.x1, data.y1);
      context.lineTo(data.x2, data.y2);
      if(data.reset) {context.clearRect(0, 0, canvas.width, canvas.height);} //이게 왜 안될까..
      
      data.reset = false;
      context.stroke(); //화면에 노출시켜라
  });

//==============================================================================

    const nickname = document.querySelector('#nickname');
    const message = document.querySelector('#message');
    const merong = document.querySelector('#merong');
    const chatList = document.querySelector('.chatting-list');

    merong.addEventListener('click', () => {
        const param = {
            nickName : nickname.value,
            msg : message.value,
        };
        socket.emit('chatting', param);
        //console.log(param); 
    });

    let i=1;
    socket.on('chatting', (data) =>{
        //console.log("socket 출력");
        console.log(data);
        const li = document.createElement('li');
        li.innerText = `[#${i}] (${data.nickName}) ${data.msg}`;
        chatList.appendChild(li);
        i += 1;
    });

});


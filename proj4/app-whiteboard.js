// 웹 서버를 생성하고 실행합니다.
const express = require('express');
const app = express();
const server = require('http').Server(app);
app.use(express.static(`${__dirname}/public`)); //public 폴더 안에서 찾아라.
server.listen(52274, () => {
    console.log('Server Running at http://127.0.0.1:52274');
});

// 소켓 서버를 생성하고 실행합니다.
const io = require('socket.io')(server); //socket.io 라이브러리. 소켓 기능과 브로드캐스트 기능을 가진 라이브러리.
io.on('connection', (socket) => {
    socket.on('line', (data) => { //line: 직선을 그려라
        io.sockets.emit('line', data); //나머지 모든 브라우저에 broadcast
    });
});
//요청 하지 않은 브라우저에 서버가 먼저 메시지를 보냄.
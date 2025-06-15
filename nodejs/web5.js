// 모듈 설치
// npm install express
// npm install express@4.14

// 웹서버 작성 (web5.js)
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// URL 파라미터 처리
app.all('/param', function (request, response) {
    var id = request.param('id');
    var pass = request.param('pass');
    response.send('<h1>ID : ' + id + ' PASSWORD : ' + pass + '</h1>');
});

// JSON 타입 응답 처리
app.all('/data.json', function (request, response) {
    response.type('application/json');
    response.send(items); // items는 별도 정의 필요
});

// 서버 실행
app.listen(52273, function () {
    console.log("Server Running at http://127.0.0.1:52273");
});

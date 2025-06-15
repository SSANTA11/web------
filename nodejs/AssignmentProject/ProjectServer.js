const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

const dot = ['.', '..', '...'];
let i = 0;
const port = 3000;

function readJSON(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/main', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log("로그인 요청:", username);

  const users = readJSON("user.json");
  const found = users.find(u => u.username === username && u.password === password);

  if (found) {
    res.send({ success: true, nickname: found.username });
  } else {
    res.send({ success: false, message: "인증 실패: 아이디 또는 비밀번호가 잘못되었습니다." });
  }
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  console.log("회원가입 요청:", username);

  const users = readJSON("user.json");
  const found = users.find(u => u.username === username);

  let isCapital = false;
  let isAlphaNum = true;

  if (password.length > 0) {
    if (password[0] >= 'A' && password[0] <= 'Z') {
      isCapital = true;
    }

    for (let i = 0; i < password.length; i++) {
      if (!((password[i] >= 'A' && password[i] <= 'Z') ||
        (password[i] >= 'a' && password[i] <= 'z') ||
        (password[i] >= '0' && password[i] <= '9'))) {
        isAlphaNum = false;
        break;
      }
    }
  }


  if (found) {
    res.send({ success: false, message: "아이디 이슈: 이미 존재하는 아이디입니다." });
  } else if (!username || username.trim() === '') {
    res.send({ success: false, message: "아이디 이슈: 빈 문자열은 불가합니다." });
  } else if (!isCapital) {
    res.send({ success: false, message: "비밀번호 이슈: 첫 글자는 대문자여야 합니다." });
  } else if (!isAlphaNum) {
    res.send({ success: false, message: "비밀번호 이슈: 영문자 또는 숫자만 가능합니다." });

  } else if (password.length < 8) {
    res.send({ success: false, message: "비밀번호 이슈: 8자리 이상이어야 합니다." });
  } else {
    users.push({ username, password });
    fs.writeFileSync("user.json", JSON.stringify(users, null, 2));
    res.send({ success: true, message: "회원가입 성공!" });
  }
});

app.get('/rooms', (req, res) => {
  const rooms = readJSON("rooms.json");
  res.json(rooms);
});

app.post('/rooms', (req, res) => {
  const { roomName } = req.body;
  console.log("채팅방 생성 요청:", roomName);

  const rooms = readJSON("rooms.json");
  const found = rooms.find(r => r.roomName === roomName);

  if (!roomName || roomName.trim() === '') {
    res.send({ success: false, message: "채팅방 이름 이슈: 빈 값은 허용되지 않습니다." });
  } else if (found) {
    res.send({ success: false, message: "채팅방 이름 이슈: 중복된 이름입니다." });
  } else {
    const time = new Date().toLocaleString();
    rooms.push({ roomName });
    fs.writeFileSync("rooms.json", JSON.stringify(rooms, null, 2));
    res.send({ success: true, roomName, time });
  }
});

app.post('/messages', (req, res) => {
  const { room, user, message } = req.body;
  if (!room || !user || !message) {
    return res.status(400).send({ success: false, message: "필수 항목 누락" });
  }

  const messages = readJSON("messages.json");

  const newMsg = {
    id: messages.length + 1,
    room,
    user,
    message,
    time: new Date().toISOString()
  };

  messages.push(newMsg);
  fs.writeFileSync("messages.json", JSON.stringify(messages, null, 2));
  res.send({ success: true });
});

app.get('/messages/room=:roomName', (req, res) => {
  const room = req.params.roomName;
  const messages = readJSON("messages.json");
  const filtered = messages.filter(m => m.room === room);
  res.json(filtered);
});

app.listen(port, () => {
  let dots = setInterval(() => {
    process.stdout.write('\r서버 구동 중' + dot[i % dot.length] + ' ');
    i++;
  }, 500);
  console.log(`\n서버 주소: http://localhost:${port}/login`);
});

/*
 * 컴퓨터공학과
 * 20194090 박현수
 */
const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');

// multer 라이브러리 사용
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // 사용자가 업로드한 파일 uploads 디렉토리에 저장
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname); // 업로드한 파일 확장자 명
        cb(null, path.basename(file.originalname.split('.')[0]) + Date.now() + extname); // 저장할 파일의 이름 설정
    }
});

const upload = multer({ storage }); // 파일 업로드 처리 미들웨어

// 사용자가 서버 주소:8080 접속 시 보여줄 페이지
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// 사용자가 파일 업로드 시 파일 저장 후 기존 페이지로 리다이렉트
app.post('/upload', upload.single('file'), (req, res) => {
    res.redirect('/');
});

const port = 8080; // 서버 포트 설정
const server = app.listen(port, () => {
    console.log('Listening on', port); // 8080 포트에서 서버 실행
});

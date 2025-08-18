# 💬 Gemini AI Chat with Streaming & MariaDB

AI와 실시간으로 대화하며, 대화 내용을 MariaDB에 저장하는 Node.js + React 기반의 Gemini 챗봇 프로젝트입니다. Google Gemini API의 스트리밍 기능을 활용하여 자연스러운 응답을 구현했습니다.

---

## 📦 프로젝트 구조


# chat-nodejs/ ├── server.js                
# Express 백엔드 서버 ├── .env                     
# 환경 변수 설정 ├── service-account.json     
# Google Cloud 서비스 계정 키 ├── package.json             
# Node.js 의존성 ├── client/ │   ├── src/ │   │   ├── HomeStreaming.jsx 
# React 프론트엔드 컴포넌트 │   │   ├── App.css 
# 커서 애니메이션 CSS │   │   └── index.js │   └── public/ └── README.md


---

## 주요 기능

### 실시간 AI 응답 (Streaming)
- Gemini API의 엔드포인트 사용
- 단어 단위로 응답을 출력하여 자연스러운 대화 경험 제공
- 깜빡이는 커서 애니메이션으로 타이핑 느낌 연출

### MariaDB 연동
- 사용자 및 AI의 모든 메시지를 `chat_messages` 테이블에 저장
- `sender`, `message`, `timestamp` 필드 포함

### OAuth 인증
- Google Cloud 서비스 계정을 통해 Gemini API에 안전하게 접근
- `google-auth-library`를 사용하여 액세스 토큰 자동 발급

---

## 핵심 로직 설명

### 1. 백엔드 (`server.js`)
- `/chat`: 일반 응답 처리
- `/chat-stream`: SSE 기반 스트리밍 응답 처리
- `saveMessage(sender, message)`: MariaDB에 메시지 저장
- `GoogleAuth`: OAuth 인증 및 토큰 발급

### 2. 프론트엔드 (`HomeStreaming.jsx`)
- 닉네임과 메시지 입력
- `EventSource`로 Gemini 응답을 실시간 수신
- `streamText()` 함수로 단어 단위 출력
- 출력 중에는 `typing-cursor` CSS로 깜빡이는 커서 표시

---

## 설치 및 실행

### 1. MariaDB 설정
sql
`
CREATE DATABASE chat_db;
USE chat_db;

CREATE TABLE chat_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender VARCHAR(50),
  message TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
`
### 2. .env 설정

DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=chat
GOOGLE_APPLICATION_CREDENTIALS=./service-account.json

### 3. 패키지 설치

npm install

### 4. 서버 실행

node server.js

### 5. 프론트엔드 실행

cd client
npm install
npm start

### 참고 자료

Google Gemini API Docs

Google Auth Library

MariaDB Docs

### 개발자

정현중

AI (Gemini 응답)

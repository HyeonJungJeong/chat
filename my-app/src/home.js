import React, {useEffect} from 'react';

function Home() {
    useEffect(() => {

    const $history = document.getElementById('history');
    const $refreshButton = $history.querySelector(':scope > button[name="refresh"]');
    const $list = $history.querySelector(':scope > .list');
    const $messageForm = document.getElementById('messageForm');

    const refresh = () => {

        $list.innerHTML = '';
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== XMLHttpRequest.DONE) {
                return;
            }
            if (xhr.status < 200 || xhr.status >= 300) {
                alert('대화 내역을 불러오지 못하였습니다. 잠시 후 다시 시도해 주세요.');
                return;
            }
            const messages = JSON.parse(xhr.responseText);
            for (const message of messages) {
                const $item = document.createElement('li');
                $item.classList.add('item');
                $item.innerText = message;
                $list.append($item);
            }
        };
        xhr.open('GET', `${window.origin}/chat/message`);
        xhr.send();
    };

    setInterval(refresh, 2000);

    $messageForm.onsubmit = (e) => {
        e.preventDefault();
        // 메시지 가져오기
        fetch('http://localhost:5000/chat/message')
            .then(res => res.json())
            .then(data => console.log(data));

// 메시지 보내기
        fetch('http://localhost:5000/chat/message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: '새 메세지입니다!' })
        });

    };

    return () => {
        clearInterval(refresh);
    };
}, []);

    return (
        <form id="messageForm">
            <label>
                메세지
                <input required minLength="1" maxLength="100" name="message" type="text"/>
            </label>
            <button type="submit">보내기</button>
        </form>
    );
}

export default Home;

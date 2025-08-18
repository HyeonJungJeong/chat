import React, {useState, useEffect} from 'react';

function Home() {
    const [nickname, setNickname] = useState('');
    const [input, setInput] = useState('');
    const [chat, setChat] = useState([]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        if (!nickname) return;
        const userMessage = { sender: nickname, message: input };
        setChat((prev) => [...prev, userMessage]);

        const res = await fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({message: input, user: nickname }),
        });

        const data = await res.json();
        const aiMessage = { sender: 'AI', message: data.reply };
        setChat((prev) => [...prev, aiMessage]);
        setInput('');
    };



    // // 2초마다 메시지 갱신
    // useEffect(() => {
    //     fetchMessages();
    //     const interval = setInterval(fetchMessages, 2000);
    //     return () => clearInterval(interval);
    // }, []);


    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2>🤖 AI와 채팅하기</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {chat.map((msg, idx) => (
                    <li key={idx} style={{ marginBottom: '10px' }}>
                        <strong>{msg.sender}:</strong> {msg.message}
                    </li>
                ))}
            </ul>
            <form onSubmit={sendMessage} style={{ marginTop: '20px' }}>
                <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="닉네임을 입력하세요"
                    style={{ width: '30%', padding: '8px', marginRight: '10px' }}
                />
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="메세지를 입력하세요"
                    style={{ width: '40%', padding: '8px' }}
                />
                <button type="submit" style={{ padding: '8px 12px', marginLeft: '8px' }}>전송</button>
            </form>
        </div>



    );
}

export default Home;

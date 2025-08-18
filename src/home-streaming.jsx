import React, { useState, useEffect } from 'react';

function HomeStreaming() {
    const [nickname, setNickname] = useState('');
    const [input, setInput] = useState('');
    const [chat, setChat] = useState([]);
    const [streamingReply, setStreamingReply] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || !nickname.trim()) return;

        const userMessage = { sender: nickname, message: input };
        setChat((prev) => [...prev, userMessage]);
        setInput('');
        setStreamingReply('');
        setIsTyping(true);

        const url = `http://localhost:5000/chat-stream?message=${encodeURIComponent(input)}&user=${encodeURIComponent(nickname)}`;
        const eventSource = new EventSource(url);

        let fullText = '';

        eventSource.onmessage = (event) => {
            fullText += event.data;
        };

        eventSource.onerror = () => {
            eventSource.close();
            streamText(fullText);
        };
    };

    const streamText = (text) => {
        const words = text.split(' ');
        let index = 0;

        const interval = setInterval(() => {
            if (index < words.length) {
                setStreamingReply((prev) => prev + (index === 0 ? '' : ' ') + words[index]);
                index++;
            } else {
                clearInterval(interval);
                setIsTyping(false);
                setChat((prev) => [...prev, { sender: 'AI', message: text }]);
                setStreamingReply('');
            }
        }, 150); // 단어당 150ms
    };

    useEffect(() => {
        const chatBox = document.querySelector('ul');
        if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
    }, [chat, streamingReply]);

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2>🤖 AI와 채팅하기 (스트리밍)</h2>
            <ul style={{ listStyle: 'none', padding: 0, maxHeight: '400px', overflowY: 'auto' }}>
                {chat.map((msg, idx) => (
                    <li key={idx} style={{ marginBottom: '10px' }}>
                        <strong>{msg.sender}:</strong> {msg.message}
                    </li>
                ))}
                {streamingReply && (
                    <li style={{ marginBottom: '10px' }}>
                        <strong>AI:</strong> {streamingReply}
                        {isTyping && <span className="typing-cursor" />}
                    </li>
                )}
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

export default HomeStreaming;
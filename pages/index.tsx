import { useState } from 'react';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: '你好嘛主人，我叫小依，是你专属的小女友~今天也要贴贴~' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input } as Message;
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>萌新型AI女友小依</h1>
      <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '300px' }}>
        {messages.map((m, i) => (
          <p key={i} style={{ textAlign: m.sender === 'user' ? 'right' : 'left' }}>
            <strong>{m.sender === 'user' ? '我' : '小依'}:</strong> {m.text}
          </p>
        ))}
      </div>
      <div style={{ marginTop: '10px' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') sendMessage();
          }}
          style={{ width: '80%' }}
        />
        <button onClick={sendMessage}>发送</button>
      </div>
    </div>
  );
}

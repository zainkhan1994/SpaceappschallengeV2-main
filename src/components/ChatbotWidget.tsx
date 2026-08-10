import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const ChatbotWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'system', content: 'You are a helpful assistant for the NASA Space Apps Challenge 2026 event. Answer questions based on the event FAQ, rules, and guides.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.result.content }]);
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, there was an error. Please try again.' }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
          onClick={() => setOpen(true)}
          aria-label="Open chat"
        >
          <MessageCircle size={28} />
        </button>
      )}
      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-80 max-w-full bg-slate-900 border border-slate-700 rounded-xl shadow-2xl flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800 rounded-t-xl">
            <span className="font-bold text-white">Need Help?</span>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: 320 }}>
            {messages.filter(m => m.role !== 'system').map((msg, i) => (
              <div key={i} className={`text-sm ${msg.role === 'user' ? 'text-blue-300 text-right' : 'text-gray-200 text-left'}`}>{msg.content}</div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t border-slate-700 bg-slate-800 rounded-b-xl flex items-center gap-2">
            <input
              className="flex-1 rounded-lg bg-slate-700 text-white px-3 py-2 text-sm outline-none"
              type="text"
              placeholder="Ask a question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              disabled={loading}
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2 disabled:opacity-50"
              onClick={handleSend}
              disabled={loading || !input.trim()}
              aria-label="Send"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;

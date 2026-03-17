import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, CheckCircle2, MoreVertical, Image as ImageIcon, Smile, ShieldCheck, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ChatInterface = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'system',
      text: 'Report successfully submitted and is under review.',
      time: '09:30 AM',
    },
    {
      id: 2,
      type: 'auto',
      text: 'An official has been assigned to your case (Rahul Sharma).',
      time: '10:15 AM',
    },
    {
      id: 3,
      type: 'official',
      sender: 'Rahul Sharma',
      role: 'Ward 4 Engineer',
      text: 'Hello, our team is en-route to the location. Can you confirm if the water flow has increased since yesterday?',
      time: '10:20 AM',
    },
    {
      id: 4,
      type: 'user',
      text: 'Yes, it flooded the pavement this morning.',
      time: '10:25 AM',
    },
    {
      id: 5,
      type: 'system',
      text: 'Status changed to IN-PROGRESS by Officer Rahul Sharma.',
      time: '10:45 AM',
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInput('');

    // Simulate official reply after 3s
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        type: 'official',
        sender: 'Rahul Sharma',
        role: 'Ward 4 Engineer',
        text: 'Noted. We have deployed the heavy machinery to fix it. ETA 2 hours for resolution.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 3000);
  };

  const renderMessage = (msg) => {
    if (msg.type === 'system' || msg.type === 'auto') {
      return (
        <div key={msg.id} className="flex justify-center my-4 animate-in fade-in zoom-in-95 duration-300">
          <div className={`px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm border ${msg.type === 'system' ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
            <span className="flex items-center gap-2">
              {msg.type === 'auto' && <AlertCircle className="w-4 h-4" />} {msg.text}
            </span>
          </div>
        </div>
      );
    }

    const isUser = msg.type === 'user';

    return (
      <div key={msg.id} className={`flex w-full mt-4 space-x-3 max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-300 ${isUser ? 'ml-auto justify-end' : ''}`}>
        
        {!isUser && (
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700 font-serif border-2 border-white shadow-sm ring-1 ring-slate-100">
            {msg.sender.charAt(0)}
          </div>
        )}

        <div className={`flex flex-col ${isUser ? 'items-end' : ''}`}>
          
          {!isUser && (
            <div className="flex items-center mb-1 space-x-2">
              <span className="text-sm font-bold block text-slate-800">{msg.sender}</span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200">
                <ShieldCheck className="w-3 h-3" /> VERIFIED OFFICIAL
              </span>
            </div>
          )}

          <div className={`p-4 rounded-2xl shadow-sm text-sm ${isUser ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm'}`}>
            <p className="leading-relaxed">{msg.text}</p>
          </div>
          
          <span className="text-xs text-slate-400 font-medium mt-1.5">
            {msg.time} {isUser && <CheckCircle2 className="inline w-3.5 h-3.5 text-slate-300 ml-1" />}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto w-full h-[calc(100vh-100px)] flex flex-col bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-sm animate-in fade-in duration-500">
      
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-slate-200 z-10 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Ticket #{id || 'RES-0000'}
            </h2>
            <p className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 mt-0.5">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Active Communication
            </p>
          </div>
        </div>
        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-full transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-50 via-slate-100/50 to-slate-50">
        {messages.map(renderMessage)}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200 shrink-0">
        <form onSubmit={handleSend} className="flex items-end gap-2 bg-slate-50 border border-slate-300 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:bg-white transition-all shadow-sm">
          <button type="button" className="p-3 text-slate-400 hover:text-indigo-600 rounded-xl hover:bg-indigo-50 transition-colors shrink-0">
            <ImageIcon className="w-6 h-6" />
          </button>
          
          <textarea 
            rows="1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
            placeholder="Type your message securely..."
            className="w-full bg-transparent border-none py-3 px-2 focus:outline-none resize-none text-slate-700 min-h-[48px] max-h-32 text-sm md:text-base placeholder:font-medium placeholder:text-slate-400"
          />
          
          <button 
            type="submit" 
            disabled={!input.trim()}
            className={`p-3 rounded-xl shrink-0 transition-all font-bold 
              ${input.trim() ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700' : 'bg-slate-200 text-slate-400'}`}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <p className="text-center text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-3 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3 h-3" /> Encrypted Connection
        </p>
      </div>

    </div>
  );
};

export default ChatInterface;

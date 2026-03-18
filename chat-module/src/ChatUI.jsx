import React from 'react';
import { 
  Send, 
  Smile, 
  Paperclip, 
  Image as ImageIcon,
  ShieldCheck,
  Check
} from 'lucide-react';

/**
 * Reusable Chat UI Component
 * Designed for the Resolyn Analytics System
 */
const ChatUI = ({ messages, onSendMessage, currentUser, recipient, caseId }) => {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header (Optional, usually handled by parent) */}
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((msg, idx) => {
          if (msg.type === 'system') {
            return (
              <div key={msg.id || idx} className="flex justify-center my-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white border border-slate-100 px-3 py-1 rounded-full shadow-sm">
                  {msg.text}
                </span>
              </div>
            );
          }

          const isMe = msg.senderId === currentUser.id;
          
          return (
            <div key={msg.id || idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex flex-col max-w-[80%] ${isMe ? 'items-end' : 'items-start'}`}>
                <div className={`p-3 rounded-2xl text-sm ${isMe ? 'bg-blue-600 text-white rounded-tr-sm shadow-blue-100' : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm'} shadow-sm`}>
                  <p className="leading-relaxed font-medium">{msg.text}</p>
                </div>
                <div className={`flex items-center gap-1.5 mt-1 px-1 ${isMe ? 'flex-row-reverse' : ''}`}>
                  <span className="text-[10px] text-slate-400 font-bold">{msg.time}</span>
                  {isMe && (
                    <div className="flex -space-x-1.5">
                      <Check className={`w-3 h-3 ${msg.read ? 'text-blue-500' : 'text-slate-300'}`} />
                      <Check className={`w-3 h-3 ${msg.read ? 'text-blue-500' : 'text-slate-300'}`} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-100 bg-white">
        <div className="bg-slate-100/80 rounded-2xl p-2 border border-transparent focus-within:border-blue-200 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50 transition-all flex flex-col">
          <textarea 
            placeholder="Type your message..."
            className="w-full bg-transparent outline-none p-2 text-sm text-slate-800 resize-none min-h-[40px] max-h-32 font-medium"
            rows="1"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                const text = e.target.value;
                if (text.trim()) {
                  onSendMessage(text);
                  e.target.value = '';
                }
              }
            }}
          />
          <div className="flex justify-between items-center px-1 pt-1">
            <div className="flex gap-1">
              <button className="p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                <Smile className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                <ImageIcon className="w-5 h-5" />
              </button>
            </div>
            <button 
              onClick={(e) => {
                const textarea = e.currentTarget.parentElement.parentElement.querySelector('textarea');
                if (textarea.value.trim()) {
                  onSendMessage(textarea.value);
                  textarea.value = '';
                }
              }}
              className="w-9 h-9 flex items-center justify-center bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200 hover:scale-105 active:scale-95 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-center gap-2 opacity-40">
           <ShieldCheck className="w-3 h-3 text-slate-400" />
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secured Node Connection</p>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;

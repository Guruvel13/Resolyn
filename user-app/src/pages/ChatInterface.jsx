import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Send, 
  CheckCircle2, 
  MoreVertical, 
  Image as ImageIcon, 
  Smile, 
  ShieldCheck, 
  AlertCircle,
  Paperclip,
  Search,
  MessageSquare,
  Clock,
  Phone,
  Video,
  Info,
  Check,
  Hash,
  TrendingUp,
  MapPin,
  Calendar,
  ChevronRight,
  Download,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const ChatInterface = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [selectedChat, setSelectedChat] = useState(id || "RES-9705");
  const [input, setInput] = useState('');
  const [showDetails, setShowDetails] = useState(true);

  // Mock Data for Analytics
  const responseTimeData = [
    { name: 'Mon', time: 45 },
    { name: 'Tue', time: 52 },
    { name: 'Wed', time: 38 },
    { name: 'Thu', time: 25 },
    { name: 'Fri', time: 30 },
  ];

  const departmentPerformance = [
    { name: 'Resolved', value: 85, color: '#10b981' },
    { name: 'Pending', value: 15, color: '#f59e0b' },
  ];

  const chatList = [
    { id: "RES-9705", title: "Streetlight Repair", lastMsg: "Team is en-route now.", time: "10:20 AM", unread: 2, status: 'active', officer: "Rahul Sharma" },
    { id: "RES-9801", title: "Water Pipe Burst", lastMsg: "Awaiting final approval.", time: "Yesterday", unread: 0, status: 'pending', officer: "Nitin B." },
    { id: "RES-9204", title: "Road Pothole", lastMsg: "Issue resolved. Thank you!", time: "Monday", unread: 0, status: 'resolved', officer: "Suresh K." },
  ];

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'system',
      text: 'Case initialized and assigned to Officer Rahul Sharma.',
      time: '09:30 AM',
    },
    {
      id: 2,
      type: 'official',
      sender: 'Rahul Sharma',
      role: 'Ward 4 Engineer',
      text: 'Hello, our team is en-route to the location. Can you confirm if the water flow has increased since yesterday?',
      time: '10:20 AM',
    },
    {
      id: 3,
      type: 'user',
      text: 'Yes, it flooded the pavement this morning. It looks like the main pipe is cracked.',
      time: '10:25 AM',
      read: true
    },
    {
      id: 4,
      type: 'official',
      sender: 'Rahul Sharma',
      role: 'Ward 4 Engineer',
      text: 'Understood. We have deployed the heavy machinery to fix it. We are also coordinating with the Traffic Police to divert vehicles.',
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
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };

    setMessages([...messages, newMessage]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        type: 'official',
        sender: 'Rahul Sharma',
        role: 'Ward 4 Engineer',
        text: 'Received. We are updating the status on the tracker now.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 2000);
  };

  return (
    <div className="w-full h-[calc(100vh-140px)] flex flex-row bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in duration-700">
      
      {/* 1. Sidebar - Chat List */}
      <div className="hidden lg:flex flex-col w-80 border-r border-slate-100 bg-[#f8f9fb]">
        <div className="p-6 border-b border-slate-100 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-extrabold text-[#111827] tracking-tight">Messages</h2>
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search reports..."
              className="w-full bg-[#f3f4f6] border-none rounded-xl py-2 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1 mt-2">
          {chatList.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`p-4 rounded-2xl cursor-pointer transition-all flex items-center gap-3 relative group ${selectedChat === chat.id ? 'bg-white shadow-sm ring-1 ring-slate-200/50' : 'hover:bg-white/50'}`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg flex-shrink-0 ${chat.status === 'active' ? 'bg-blue-50 text-blue-600' : (chat.status === 'resolved' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400')}`}>
                {chat.id.split('-')[1].charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-0.5">
                  <h4 className="font-bold text-sm text-[#111827] truncate pr-2">{chat.title}</h4>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter whitespace-nowrap">{chat.time}</span>
                </div>
                <p className="text-xs text-slate-500 truncate font-medium">
                  {chat.lastMsg}
                </p>
              </div>
              {chat.unread > 0 && (
                <div className="absolute right-4 bottom-4 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg shadow-blue-500/20">
                  {chat.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden border-r border-slate-100">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white/80 backdrop-blur-md z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="lg:hidden p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-500">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-700 shadow-sm relative">
                R
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h2 className="text-base font-bold text-[#111827] flex items-center gap-2">
                  Rahul Sharma
                  <span className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase tracking-wider border border-blue-100">
                    <ShieldCheck className="w-3 h-3" /> Official
                  </span>
                </h2>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                  Active now <span className="mx-1">•</span> Case #{selectedChat}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl hover:bg-slate-50 text-slate-400 transition-colors border border-transparent hover:border-slate-100">
              <Phone className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className={`p-2 rounded-xl transition-all ${showDetails ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#f8f9fb]/40 scroll-smooth">
          {messages.map((msg, idx) => {
            if (msg.type === 'system') {
              return (
                <div key={msg.id} className="flex justify-center items-center gap-3 py-2">
                  <div className="h-px flex-1 bg-slate-200/50"></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full border border-slate-200">
                    {msg.text}
                  </span>
                  <div className="h-px flex-1 bg-slate-200/50"></div>
                </div>
              );
            }

            const isUser = msg.type === 'user';
            return (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                key={msg.id} 
                className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex flex-col max-w-[85%] sm:max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}>
                  <div className={`p-4 rounded-2xl shadow-sm relative group ${isUser ? 'bg-[#2563EB] text-white rounded-tr-sm' : 'bg-white border border-slate-100 text-[#111827] rounded-tl-sm shadow-[0_2px_15px_rgba(0,0,0,0.02)]'}`}>
                    <p className="text-[13.5px] leading-relaxed font-semibold">{msg.text}</p>
                  </div>
                  <div className={`flex items-center gap-2 mt-1.5 px-1 ${isUser ? 'flex-row-reverse' : ''}`}>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{msg.time}</span>
                    {isUser && (
                      <div className="flex">
                        <Check className={`w-3.5 h-3.5 ${msg.read ? 'text-blue-500' : 'text-slate-300'}`} />
                        <Check className={`w-3.5 h-3.5 -ml-2.5 ${msg.read ? 'text-blue-500' : 'text-slate-300'}`} />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-6 bg-white border-t border-slate-100">
          <form onSubmit={handleSend} className="bg-[#f3f4f6] rounded-2xl p-2.5 focus-within:ring-4 focus-within:ring-blue-50 focus-within:bg-white focus-within:border-blue-200 border border-transparent transition-all flex flex-col">
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
              placeholder="Start typing your response..."
              className="w-full bg-transparent outline-none p-3 text-sm text-[#111827] placeholder:text-slate-400 resize-none min-h-[44px] max-h-32 font-bold"
            />
            <div className="flex justify-between items-center px-2 pb-1 pt-1.5">
              <div className="flex gap-1.5">
                <button type="button" className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-blue-600 rounded-xl hover:bg-blue-50 transition-colors">
                  <Smile className="w-5 h-5" />
                </button>
                <button type="button" className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-blue-600 rounded-xl hover:bg-blue-50 transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>
              </div>
              <button 
                type="submit" 
                disabled={!input.trim()}
                className={`w-11 h-11 flex items-center justify-center rounded-xl shadow-lg transition-all 
                  ${input.trim() ? 'bg-[#2563EB] text-white shadow-blue-200 hover:scale-105 active:scale-95' : 'bg-slate-200 text-slate-400 shadow-none'}`}
              >
                <Send className="w-5 h-5 translate-x-px -translate-y-px" />
              </button>
            </div>
          </form>
          <div className="mt-4 flex items-center justify-center gap-2 overflow-hidden px-4">
             <div className="h-px flex-1 bg-slate-100"></div>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 whitespace-nowrap">
               <ShieldCheck className="w-3 h-3" /> End-to-end Encrypted
             </p>
             <div className="h-px flex-1 bg-slate-100"></div>
          </div>
        </div>
      </div>

      {/* 3. Right Sidebar - Chart UI & Analytics */}
      <AnimatePresence>
        {showDetails && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 340, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="hidden xl:flex flex-col border-l border-slate-100 bg-white overflow-y-auto"
          >
            <div className="p-6">
              <h3 className="text-lg font-bold text-[#111827] mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" /> Case Intelligence
              </h3>

              {/* Response Time Chart */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Avg. Response Time</h4>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">-12% faster</span>
                </div>
                <div className="h-32 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={responseTimeData}>
                      <Tooltip 
                        cursor={{fill: '#f8f9fb'}}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontSize: '12px' }}
                      />
                      <Bar dataKey="time" radius={[4, 4, 0, 0]}>
                        {responseTimeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 3 ? '#2563EB' : '#e2e8f0'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Department Sentiment / Performance */}
              <div className="mb-8 p-4 bg-[#f8f9fb] rounded-2xl border border-slate-100">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4">Department Load</h4>
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={departmentPerformance}
                          innerRadius={25}
                          outerRadius={35}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {departmentPerformance.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-xs font-bold text-slate-700">85% Efficiency</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                      <span className="text-xs font-bold text-slate-700">High Volume</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Case Summary Card */}
              <div className="space-y-4">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Quick Details</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors">
                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-[13px] font-bold text-[#111827]">Ward 4 Street</p>
                      <p className="text-[11px] text-slate-500">Near Green Park Metro</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors">
                    <Calendar className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-[13px] font-bold text-[#111827]">Oct 24, 2026</p>
                      <p className="text-[11px] text-slate-500">Scheduled on-site visit</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-2">
                <button className="w-full flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all group shadow-sm">
                  <span className="flex items-center gap-2 text-sm font-bold text-[#111827]">
                    <Download className="w-4 h-4 text-slate-400" /> Export Chat Log
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all group shadow-sm">
                  <span className="flex items-center gap-2 text-sm font-bold text-[#111827]">
                    <Share2 className="w-4 h-4 text-slate-400" /> Share Case File
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ChatInterface;

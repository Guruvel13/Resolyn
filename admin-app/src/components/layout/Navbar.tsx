import React, { useState, useEffect, useRef } from 'react';
import { Bell, Search, User, X, Check, Clock, AlertTriangle } from 'lucide-react';

const mockSearchResults = [
  { id: 'RES-9801', title: 'Pipe Burst - Koramangala', type: 'incident' },
  { id: 'U-102', title: 'Officer Rajesh', type: 'user' },
  { id: 'RES-9705', title: 'Substation B2 Fault', type: 'incident' },
];

const mockNotifications = [
  { id: 1, text: 'Critical Incident near Sector 4', time: '5m ago', type: 'warning' },
  { id: 2, text: 'New complaint assigned to Water Dept', time: '12m ago', type: 'info' },
  { id: 3, text: 'User access request from Anita Desai', time: '1h ago', type: 'access' },
];

const Navbar: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-[2000] relative">
      <div className="relative w-96" ref={dropdownRef}>
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
          <Search size={18} />
        </span>
        <input
          type="text"
          placeholder="Search complaints, officials, area..."
          value={searchValue}
          onChange={(e) => {
             setSearchValue(e.target.value);
             setShowResults(e.target.value.length > 0);
          }}
          onFocus={() => searchValue.length > 0 && setShowResults(true)}
          className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 sm:text-sm transition-all"
        />

        {showResults && (
           <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-2xl border border-slate-200 shadow-2xl p-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <p className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recent Matches</p>
              {mockSearchResults.map((res) => (
                 <button key={res.id} className="w-full text-left px-3 py-2.5 hover:bg-slate-50 rounded-xl flex items-center gap-3 group transition-colors">
                    <div className="p-1.5 bg-slate-100 rounded-lg text-slate-500 group-hover:text-slate-900 transition-colors">
                       <Search size={14} />
                    </div>
                    <div>
                       <p className="text-sm font-bold text-slate-900 line-clamp-1">{res.title}</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{res.id} • {res.type}</p>
                    </div>
                 </button>
              ))}
           </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
           <button 
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowResults(false);
              }}
              className={`p-2 rounded-xl transition-all relative ${showNotifications ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-900'}`}
           >
             <Bell size={20} />
             <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
           </button>

           {showNotifications && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                 <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm">System Alerts</h4>
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase">3 New</span>
                 </div>
                 <div className="max-h-[300px] overflow-y-auto divide-y divide-slate-100">
                    {mockNotifications.map((note) => (
                       <div key={note.id} className="p-4 hover:bg-slate-50 transition-colors flex gap-3">
                          <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${note.type === 'warning' ? 'bg-rose-500' : 'bg-indigo-500'}`}></div>
                          <div>
                             <p className="text-xs font-medium text-slate-900 leading-normal">{note.text}</p>
                             <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase">{note.time}</p>
                          </div>
                       </div>
                    ))}
                 </div>
                 <button className="w-full py-3 bg-white text-xs font-bold text-slate-400 hover:text-slate-900 border-t border-slate-100 transition-colors">
                    Mark all as read
                 </button>
              </div>
           )}
        </div>
        
        <div className="h-8 w-px bg-slate-200 mx-2"></div>
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 leading-none group-hover:text-indigo-600 transition-colors">Admin User</p>
            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tight">Nodal Officer</p>
          </div>
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 border border-slate-200 group-hover:border-slate-900 group-hover:bg-white transition-all overflow-hidden shadow-inner">
            <User size={20} className="group-hover:scale-110 transition-transform" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

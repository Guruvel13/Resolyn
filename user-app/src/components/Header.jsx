import React from 'react';
import { ShieldCheck, Bell, User, Search, Map } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="sticky top-6 z-50 w-full px-4 sm:px-6 lg:px-8 pointer-events-none">
      <header className="max-w-[1200px] mx-auto bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.05)] rounded-[2rem] px-6 py-3 flex justify-between items-center pointer-events-auto">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight hidden sm:block">
              Resolyn
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1 rounded-2xl border border-slate-200/20">
            <Link
              to="/dashboard"
              className={`px-4 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${isActive('/dashboard') ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Activity
            </Link>
            <Link
              to="/file-report"
              className={`px-4 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${isActive('/file-report') ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Report
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex relative group">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-indigo-600 transition-colors" />
            <input
              type="text"
              placeholder="Search IDs..."
              className="pl-9 pr-4 py-2 bg-slate-100/50 border-transparent rounded-xl text-xs font-bold focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none w-48 text-slate-700 placeholder:text-slate-400 placeholder:font-bold"
            />
          </div>

          <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all relative border border-transparent hover:border-slate-100 hover:shadow-sm">
            <Bell className="w-5 h-5 font-bold" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-600 rounded-full border-2 border-white animate-pulse"></span>
          </button>

          <div className="h-4 w-px bg-slate-200/50 mx-1"></div>

          <Link to="/profile" className="flex items-center gap-3 pl-1 pr-1 py-1 rounded-2xl transition-all group border border-transparent hover:border-slate-100 hover:bg-white hover:shadow-sm">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 overflow-hidden ring-2 ring-white">
              <User className="text-white w-5 h-5" />
            </div>
            <div className="hidden sm:block">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Citizen</p>
              <p className="text-xs font-bold text-slate-800 leading-none">Verified</p>
            </div>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Header;

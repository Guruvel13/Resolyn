import React from 'react';
import { ShieldCheck, Bell, User, Search, Map } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-600/20 group-hover:bg-indigo-700 transition-colors">
                <ShieldCheck className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                Resolyn
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-1 pl-4 border-l border-slate-200">
              <Link 
                to="/dashboard" 
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive('/dashboard') ? 'bg-slate-100 text-indigo-700' : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'}`}
              >
                My Activity
              </Link>
              <Link 
                to="/file-report" 
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive('/file-report') ? 'bg-slate-100 text-indigo-700' : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'}`}
              >
                File Report
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search public records..." 
                className="pl-9 pr-4 py-1.5 bg-slate-100 border-transparent rounded-full text-sm focus:bg-white focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all outline-none w-64 text-slate-700 placeholder:text-slate-400"
              />
            </div>

            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
            </button>
            <div className="h-6 w-px bg-slate-200 mx-1"></div>
            <Link to="/profile" className="flex items-center gap-2 p-1 pr-3 hover:bg-slate-50 rounded-full transition-all border border-transparent hover:border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100">
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden">
                <User className="text-slate-600 w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-slate-700 hidden sm:block">Citizen</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

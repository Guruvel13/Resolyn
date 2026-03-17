import { Search, Bell } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between px-8">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search system logs, departments, or coordinates..." 
            className="w-full bg-slate-100 border-transparent focus:bg-white focus:border-brand-300 focus:ring-4 focus:ring-brand-50 rounded-xl py-2 pl-10 pr-4 text-sm transition-all outline-none text-slate-700 placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <nav className="hidden md:flex items-center gap-6 mr-6">
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Help Center</a>
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Documentation</a>
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors flex items-center gap-1">
            System Status
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </a>
        </nav>

        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="w-px h-6 bg-gray-200 mx-1"></div>
        
        <div className="flex items-center gap-3 pl-2 cursor-pointer group">
          <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden group-hover:border-brand-300 transition-colors">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
}

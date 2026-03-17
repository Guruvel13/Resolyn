import { Bell, Search, User, Grid3X3 } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10 sticky top-0">
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-white shadow-sm shadow-blue-500/20">
            <Grid3X3 className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900">
            Resolyn <span className="font-normal text-slate-400 ml-1">Admin Operations</span>
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-64 hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search city records..." 
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-9 pr-4 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all"
          />
        </div>
        
        <button className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-6 w-px bg-slate-200 mx-2"></div>

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 m-0 leading-none">Alex Commander</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Operational Lead</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-slate-200 border border-slate-300 overflow-hidden group-hover:ring-2 group-hover:ring-blue-600/20 transition-all">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBj9jQe0pyI5oibMn-XjJAY7o1HNxF6nRhojkCjXiiTii6i_fyZPLO_qAgKAD5e0sJUDRXP994H6w_WVQYxFg_s_pF6DdSy5r-dy04ZLMf7P6OKdZ4MaRTGNeGwoTHFCZrrdoDFiLVm19PN8YjYZLgevmvJUuD8IKvDi9iRSMo0MvpWDtl0ijMamu9vkP1XbL_p2srg1i-yGcXR__6WzM6e4zUAYztkEdCqWZKKIKkIlWEdjexrV6ITnpKgfKnBiiWncDvF86mFK4Q" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

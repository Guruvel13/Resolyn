import { Bell, Search, Hexagon } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-20 bg-[#09090b]/80 backdrop-blur-md border-b border-[#27272a] flex items-center justify-between px-8 z-20">
      
      <div className="flex-1 flex items-center">
        <div className="relative w-96 group">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#00ffcc] transition-colors" />
          <input 
            type="text" 
            placeholder="Search tickets, IDs, or locations... [CTRL+K]" 
            className="w-full bg-[#18181b] border border-[#27272a] rounded-sm py-2 pl-10 pr-4 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[#00ffcc] focus:ring-1 focus:ring-[#00ffcc] transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-zinc-400 hover:text-[#00ffcc] transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#ff0055] rounded-full shadow-[0_0_8px_rgba(255,0,85,0.8)] animate-pulse"></span>
        </button>
        
        <div className="h-8 w-px bg-[#27272a]"></div>

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right">
            <p className="text-sm font-bold text-zinc-100 group-hover:text-[#00ffcc] transition-colors">Commander</p>
            <p className="text-xs text-zinc-500 font-mono">ID: 0x8A4F</p>
          </div>
          <div className="relative">
             <Hexagon className="w-10 h-10 text-[#27272a] fill-[#18181b] group-hover:block transition-all" />
             <div className="absolute inset-0 flex items-center justify-center font-bold text-[#00ffcc]">C</div>
          </div>
        </div>
      </div>
    </header>
  );
}

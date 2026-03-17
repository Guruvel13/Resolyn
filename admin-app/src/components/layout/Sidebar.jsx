import { NavLink } from 'react-router-dom';
import { LayoutDashboard, AlertCircle, Map, FileText, Settings, ShieldAlert } from 'lucide-react';
import clsx from 'clsx';

export default function Sidebar() {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Complaints', path: '/complaints', icon: AlertCircle },
    { name: 'Heatmap', path: '/heatmap', icon: Map },
    { name: 'Reports', path: '/reports', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-[#09090b] border-r border-[#27272a] h-full flex flex-col pt-6 z-10 glass-panel">
      
      {/* Brand */}
      <div className="px-6 mb-10 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#09090b] border-2 border-[#00ffcc] shadow-[0_0_10px_rgba(0,255,204,0.3)] flex items-center justify-center transform rotate-45">
          <ShieldAlert className="w-5 h-5 text-[#00ffcc] -rotate-45" />
        </div>
        <div>
          <h1 className="text-xl font-mono font-bold tracking-wider text-white">RESOLYN</h1>
          <p className="text-[10px] uppercase text-[#00ffcc] tracking-[0.2em] font-mono">Operations</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => clsx(
              'flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-300 relative group',
              isActive 
                ? 'text-[#00ffcc] bg-[rgba(0,255,204,0.05)] border-l-2 border-[#00ffcc]' 
                : 'text-zinc-400 hover:text-white hover:bg-[#18181b] border-l-2 border-transparent'
            )}
          >
            <item.icon className={clsx("w-5 h-5 transition-transform duration-300 group-hover:scale-110")} />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-[#27272a]">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium text-zinc-400 hover:text-white hover:bg-[#18181b] transition-all">
          <Settings className="w-5 h-5" />
          Settings
        </button>
      </div>
    </aside>
  );
}

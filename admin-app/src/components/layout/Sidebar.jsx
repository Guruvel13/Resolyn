import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Settings, Shield, ChevronRight, Rss } from 'lucide-react';
import clsx from 'clsx';

export default function Sidebar() {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Central Registry', path: '/complaints', icon: Users },
    { name: 'Heatmap', path: '/heatmap', icon: ChevronRight },
    { name: 'Reports', path: '/reports', icon: FileText },
  ];

  return (
    <aside className="w-72 bg-white border-r border-slate-200 h-full flex flex-col p-4 overflow-y-auto shrink-0">
      
      {/* Filters Header in Central Registry Style */}
      <div className="flex items-center justify-between mb-6 px-2">
        <h3 className="font-bold text-slate-500 uppercase text-[11px] tracking-wider">Navigation</h3>
        <span className="text-[10px] text-primary font-bold uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded">Admin v4.2</span>
      </div>

      <div className="space-y-6">
        {/* Live Feed Toggle - Reference Pattern */}
        <div className="flex items-center justify-between rounded-lg bg-blue-600/5 p-3 border border-blue-600/10">
          <div className="flex items-center gap-2">
            <Rss className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Live Operations</span>
          </div>
          <div className="h-4 w-4 rounded-full bg-primary animate-pulse"></div>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => clsx(
                'flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors group',
                isActive 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={clsx("w-4 h-4", isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600")} />
                {item.name}
              </div>
              {item.name === 'Central Registry' && (
                <span className={clsx("text-[10px] px-1.5 py-0.5 rounded-full font-bold", isActive ? "bg-white/20" : "bg-slate-100 text-slate-500")}>1.2k</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Action Button */}
        <button className="w-full mt-4 flex items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-bold text-white shadow-sm hover:bg-primary/90 transition-colors">
          <Shield className="w-4 h-4" />
          System Status
        </button>
      </div>

      <div className="mt-auto pt-6 border-t border-slate-100 px-2">
        <button className="flex items-center gap-3 text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>
    </aside>
  );
}

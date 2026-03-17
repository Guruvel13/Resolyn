import { LayoutDashboard, Map, Building2, Users, FileText, Settings, ChevronRight, ShieldCheck } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Map, label: 'Map Insights', id: 'map' },
  { icon: Building2, label: 'Departments', id: 'departments' },
  { icon: Users, label: 'Complaints', id: 'complaints' },
  { icon: FileText, label: 'Audit Logs', id: 'logs' },
  { icon: Settings, label: 'Analytics', id: 'analytics' },
];

export default function Sidebar({ activeTab, onTabChange }: { activeTab: string, onTabChange: (id: string) => void }) {
  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-40">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-200">
          <Building2 size={24} />
        </div>
        <div>
          <h2 className="font-bold text-slate-900 font-outfit leading-tight">RESOLYN</h2>
          <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Admin Suite</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Main Menu</p>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group text-sm font-medium",
              activeTab === item.id 
                ? "bg-brand-600 text-white shadow-md shadow-brand-100" 
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <item.icon size={18} className={cn(
              "transition-colors",
              activeTab === item.id ? "text-white" : "text-slate-400 group-hover:text-slate-600"
            )} />
            {item.label}
            {activeTab === item.id && <ChevronRight size={14} className="ml-auto opacity-70" />}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="bg-brand-50 rounded-xl p-4 border border-brand-100">
          <div className="flex items-center gap-2 mb-2 text-brand-700">
            <ShieldCheck size={16} />
            <span className="text-[11px] font-bold uppercase tracking-wider">Audit Security</span>
          </div>
          <p className="text-[11px] text-brand-600 leading-relaxed">
            Your last security audit was 2 days ago. No vulnerabilities found.
          </p>
        </div>
        
        <div className="mt-4 flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-900 truncate">Jane Doe</p>
            <p className="text-[10px] text-slate-500 truncate">Admin Account</p>
          </div>
          <button className="text-slate-400 hover:text-slate-600">
            <Settings size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}

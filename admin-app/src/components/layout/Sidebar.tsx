import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Building2, Map as MapIcon, Settings, Users, Shield } from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
    { icon: <FileText size={20} />, label: 'Complaints', path: '/complaints' },
    { icon: <Building2 size={20} />, label: 'Departments', path: '/departments' },
    { icon: <MapIcon size={20} />, label: 'Live Map', path: '/map' },
    { icon: <Users size={20} />, label: 'User Management', path: '/users' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold">R</div>
          <span className="text-xl font-bold tracking-tight text-slate-900">Resolyn</span>
          <span className="text-xs font-bold text-slate-400 border border-slate-200 px-1.5 rounded uppercase ml-1">Admin</span>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium text-sm ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-100">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium text-sm ${
              isActive
                ? 'bg-slate-900 text-white'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`
          }
        >
          <Settings size={20} />
          Settings
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;

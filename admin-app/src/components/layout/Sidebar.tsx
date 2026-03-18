import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  Building2, 
  Map as MapIcon, 
  Settings, 
  Users,
  ShieldCheck
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
    { icon: <FileText size={20} />, label: 'Complaints', path: '/complaints' },
    { icon: <Building2 size={20} />, label: 'Departments', path: '/departments' },
    { icon: <MapIcon size={20} />, label: 'Live Map', path: '/map' },
    { icon: <Users size={20} />, label: 'User Management', path: '/users' },
  ];

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isHovered ? 260 : 80 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white border-r border-slate-200 flex flex-col z-[1000] shadow-[10px_0_30px_rgba(0,0,0,0.01)]"
    >
      <div className="p-4 flex flex-col h-full">
        {/* Logo Section */}
        <div className="h-14 flex items-center px-2 mb-8 gap-3 overflow-hidden">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black shrink-0 shadow-lg shadow-slate-200">
            R
          </div>
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <span className="text-xl font-black tracking-tight text-slate-900">Resolyn</span>
                <span className="text-[8px] font-black text-slate-400 border border-slate-200 px-1 py-0.5 rounded-md uppercase">Admin</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Section */}
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center h-12 rounded-2xl transition-all font-bold text-sm overflow-hidden group/item ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-200'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <div className="w-[48px] h-full flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    className="whitespace-nowrap font-black tracking-wide"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto pt-6 border-t border-slate-50">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center h-12 rounded-2xl transition-all font-bold text-sm overflow-hidden ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xl shadow-slate-200'
                  : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            <div className="w-[48px] h-full flex items-center justify-center shrink-0">
              <Settings size={20} />
            </div>
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="whitespace-nowrap font-black tracking-wide"
                >
                  Settings
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;

import { Users, Clock, Shield, Droplets, Zap, Truck, Recycle, Plus, MoreVertical } from 'lucide-react';

const departments = [
  { 
    name: 'Water Department', 
    sub: 'Utility Operations', 
    lead: 'Sarah Jenkins', 
    staff: 24, 
    sla: '1.2 Days', 
    icon: Droplets,
    color: 'bg-blue-50 text-blue-600',
    iconColor: 'text-blue-200'
  },
  { 
    name: 'Roads Department', 
    sub: 'Infrastructure', 
    lead: 'Michael Chen', 
    staff: 42, 
    sla: '2.5 Days', 
    icon: Truck,
    color: 'bg-slate-50 text-slate-600',
    iconColor: 'text-slate-200'
  },
  { 
    name: 'Power Department', 
    sub: 'Energy Grid', 
    lead: 'Elena Rodriguez', 
    staff: 18, 
    sla: '0.8 Days', 
    icon: Zap,
    color: 'bg-amber-50 text-amber-600',
    iconColor: 'text-amber-200'
  },
  { 
    name: 'Sanitation Dept', 
    sub: 'Public Health', 
    lead: 'David Smith', 
    staff: 35, 
    sla: '1.5 Days', 
    icon: Recycle,
    color: 'bg-emerald-50 text-emerald-600',
    iconColor: 'text-emerald-200'
  },
];

export default function Departments() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-brand-600 mb-1">
             <Settings size={14} className="animate-spin-slow" />
             <span className="text-[10px] font-bold uppercase tracking-widest">Administration</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Department Configuration</h1>
          <p className="text-slate-500 mt-1 max-w-xl">
            Configure organizational units, assign leadership, and track operational performance metrics for all departments.
          </p>
        </div>
        
        <button className="px-5 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-semibold hover:bg-brand-700 shadow-lg shadow-brand-100 transition-all flex items-center gap-2 w-fit">
          <Plus size={18} /> Add New Department
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {departments.map((dept, i) => (
          <div key={i} className="card-paper p-0 group overflow-hidden flex flex-col">
            <div className={`h-24 ${dept.color} flex items-center justify-center relative overflow-hidden`}>
               <dept.icon size={64} className={`absolute -right-4 -bottom-4 opacity-10 ${dept.iconColor}`} />
               <div className="bg-white p-3 rounded-xl shadow-sm z-10">
                 <dept.icon size={24} />
               </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{dept.name}</h3>
                  <p className="text-[11px] font-bold text-brand-600 uppercase tracking-widest mt-0.5">{dept.sub}</p>
                </div>
                <button className="text-slate-300 hover:text-slate-600">
                  <MoreVertical size={16} />
                </button>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <Users size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase leading-none">Dept Lead</p>
                    <p className="text-xs font-bold text-slate-700">{dept.lead}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <Shield size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase leading-none">Staff Count</p>
                    <p className="text-xs font-bold text-slate-700">{dept.staff} Employees</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <Clock size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase leading-none">Avg. SLA</p>
                    <p className="text-xs font-bold text-emerald-600">{dept.sla}</p>
                  </div>
                </div>
              </div>
              
              <button className="w-full py-2 border border-slate-100 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors mt-auto">
                Manage Department
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: 'System Overall SLA', value: '1.45 Days', icon: Activity, color: 'bg-blue-50 text-blue-600' },
           { label: 'Total Active Staff', value: '119', icon: Users, color: 'bg-emerald-50 text-emerald-600' },
           { label: 'Open High Priority Tickets', value: '14', icon: AlertTriangle, color: 'bg-rose-50 text-rose-600' },
         ].map((stat, i) => (
           <div key={i} className="card-paper p-6 flex items-center gap-5">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
                <h4 className="text-2xl font-bold text-slate-900 leading-none">{stat.value}</h4>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}

import { Settings, Activity, AlertTriangle } from 'lucide-react';

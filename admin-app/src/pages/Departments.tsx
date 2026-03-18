import React from 'react';
import { Building2, Users, CheckCircle2, AlertCircle, ArrowUpRight, Search, Settings, MoreHorizontal } from 'lucide-react';

const departments = [
  { name: 'Water & Supply', head: 'Dr. Ramesh Kumar', staff: 124, activeIssues: 42, efficiency: '94%', color: 'bg-blue-500' },
  { name: 'Electrical/Grid', head: 'Engr. Sunita Rao', staff: 86, activeIssues: 18, efficiency: '88%', color: 'bg-amber-500' },
  { name: 'Sanitation & Waste', head: 'Arjun Mehra', staff: 210, activeIssues: 64, efficiency: '82%', color: 'bg-emerald-500' },
  { name: 'Roads & Transport', head: 'Vikram Singh', staff: 145, activeIssues: 92, efficiency: '76%', color: 'bg-rose-500' },
  { name: 'Public Health', head: 'Dr. Anita Desai', staff: 98, activeIssues: 12, efficiency: '98%', color: 'bg-indigo-500' },
  { name: 'Forestry & Parks', head: 'Sanjay Dutt', staff: 54, activeIssues: 5, efficiency: '91%', color: 'bg-teal-500' },
];

const Departments: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Departmental Oversight</h1>
          <p className="text-slate-500 mt-1">Manage departmental heads, workforce allocation and KPIs.</p>
        </div>
        <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center gap-2">
          Add New Department
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {departments.map((dept, i) => (
          <div key={i} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
            <div className="p-6 border-b border-slate-50">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 ${dept.color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-${dept.color.split('-')[1]}-200`}>
                  <Building2 size={24} />
                </div>
                <button className="text-slate-400 hover:text-slate-900 p-1">
                  <MoreHorizontal size={20} />
                </button>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{dept.name}</h3>
              <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Lead: {dept.head}
              </p>
            </div>
            
            <div className="p-6 grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-3 rounded-2xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Workforce</p>
                <div className="flex items-center gap-2 mt-1">
                   <Users className="text-slate-400" size={16} />
                   <span className="font-bold text-slate-900">{dept.staff}</span>
                </div>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pending</p>
                <div className="flex items-center gap-2 mt-1">
                   <AlertCircle className="text-rose-500" size={16} />
                   <span className="font-bold text-slate-900">{dept.activeIssues}</span>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${dept.color}`} 
                    style={{ width: dept.efficiency }}
                  ></div>
                </div>
                <span className="text-xs font-bold text-slate-700">{dept.efficiency} Efficiency</span>
              </div>
              <button className="text-indigo-600 hover:text-indigo-700 transition-colors p-1">
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departments;

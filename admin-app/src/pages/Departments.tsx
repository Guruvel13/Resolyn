import React, { useState } from 'react';
import { Building2, Users, AlertCircle, ArrowUpRight, Search, X, Check, Landmark, Droplets, Zap, Construction, ShieldCheck, HeartPulse, TreeDeciduous } from 'lucide-react';

const initialDepartments = [
  { id: 1, name: 'Water & Supply', head: 'Dr. Ramesh Kumar', staff: 124, activeIssues: 42, efficiency: '94%', color: 'bg-blue-500', icon: <Droplets size={24} /> },
  { id: 2, name: 'Electrical/Grid', head: 'Engr. Sunita Rao', staff: 86, activeIssues: 18, efficiency: '88%', color: 'bg-amber-500', icon: <Zap size={24} /> },
  { id: 3, name: 'Sanitation & Waste', head: 'Arjun Mehra', staff: 210, activeIssues: 64, efficiency: '82%', color: 'bg-emerald-500', icon: <Construction size={24} /> },
  { id: 4, name: 'Roads & Transport', head: 'Vikram Singh', staff: 145, activeIssues: 92, efficiency: '76%', color: 'bg-rose-500', icon: <Landmark size={24} /> },
  { id: 5, name: 'Public Health', head: 'Dr. Anita Desai', staff: 98, activeIssues: 12, efficiency: '98%', color: 'bg-indigo-500', icon: <HeartPulse size={24} /> },
  { id: 6, name: 'Forestry & Parks', head: 'Sanjay Dutt', staff: 54, activeIssues: 5, efficiency: '91%', color: 'bg-teal-500', icon: <TreeDeciduous size={24} /> },
];

const Departments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDept, setNewDept] = useState({ name: '', head: '', staff: '', color: 'bg-slate-500' });

  const filteredDepts = initialDepartments.filter(dept => 
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.head.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Departmental Oversight</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Resource Allocation & KPI Monitoring</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none shadow-sm"
            />
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 shrink-0 flex items-center gap-2 group"
          >
            <Building2 size={18} className="group-hover:scale-110 transition-transform" />
            Add New Department
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDepts.map((dept) => (
          <div key={dept.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div className="p-6 border-b border-slate-50">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 ${dept.color} rounded-2xl flex items-center justify-center text-white shadow-2xl transition-transform group-hover:scale-110`}>
                  {dept.icon}
                </div>
                <div className="flex flex-col items-end">
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Efficiency</span>
                   <span className="text-lg font-bold text-slate-900">{dept.efficiency}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{dept.name}</h3>
              <p className="text-sm text-slate-500 mt-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                Active Head: <span className="font-bold text-slate-700">{dept.head}</span>
              </p>
            </div>
            
            <div className="p-6 grid grid-cols-2 gap-4">
              <div className="bg-slate-50/80 p-4 rounded-2xl border border-transparent hover:border-slate-200 transition-all group/stat">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Workforce</p>
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-white rounded-lg shadow-sm group-hover/stat:text-indigo-600 transition-colors"><Users size={18} /></div>
                   <span className="text-lg font-bold text-slate-900">{dept.staff}</span>
                </div>
              </div>
              <div className="bg-slate-50/80 p-4 rounded-2xl border border-transparent hover:border-slate-200 transition-all group/stat">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Active Tasks</p>
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-white rounded-lg shadow-sm group-hover/stat:text-rose-600 transition-colors"><AlertCircle size={18} /></div>
                   <span className="text-lg font-bold text-slate-900 text-rose-600">{dept.activeIssues}</span>
                </div>
              </div>
            </div>

            <div className="px-6 py-5 bg-slate-50/30 flex items-center justify-between group-hover:bg-slate-50 transition-colors">
               <div className="flex-1 mr-4">
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                     <div 
                        className={`h-full ${dept.color} transition-all duration-1000`} 
                        style={{ width: dept.efficiency }}
                     ></div>
                  </div>
               </div>
               <button className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all active:scale-95">
                  <ArrowUpRight size={20} />
               </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Department Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)}></div>
           <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md relative overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100">
              <div className="p-8">
                 <div className="flex justify-between items-center mb-6">
                    <div>
                       <h2 className="text-2xl font-bold text-slate-900">New Department</h2>
                       <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Initialization Protocol</p>
                    </div>
                    <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                       <X size={20} className="text-slate-400" />
                    </button>
                 </div>

                 <div className="space-y-5">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Title</label>
                       <input 
                          type="text" 
                          placeholder="e.g. Urban Planning"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Appointed Head</label>
                       <input 
                          type="text" 
                          placeholder="Full Name"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none"
                       />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Initial Staff</label>
                          <input 
                             type="number" 
                             placeholder="00"
                             className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Priority</label>
                          <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none appearance-none">
                             <option>Primary</option>
                             <option>Secondary</option>
                             <option>Auxiliary</option>
                          </select>
                       </div>
                    </div>
                 </div>

                 <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-full mt-8 bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-[0.98]"
                 >
                    <Check size={20} />
                    Create Department
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Departments;

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
  const [departments, setDepartments] = useState(initialDepartments);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  
  const [newDept, setNewDept] = useState({ 
    name: '', 
    head: '', 
    staff: '', 
    priority: 'Primary' 
  });

  const filteredDepts = departments.filter(dept => 
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.head.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDept = () => {
    if (!newDept.name || !newDept.head) return;
    
    setIsAdding(true);
    setTimeout(() => {
      const deptToAdd = {
        id: departments.length + 1,
        name: newDept.name,
        head: newDept.head,
        staff: parseInt(newDept.staff) || 0,
        activeIssues: 0,
        efficiency: '100%',
        color: 'bg-indigo-600',
        icon: <Building2 size={24} />
      };
      
      setDepartments([...departments, deptToAdd]);
      setIsAdding(false);
      setIsAddModalOpen(false);
      setNewDept({ name: '', head: '', staff: '', priority: 'Primary' });
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Departmental Oversight</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Resource Allocation & KPI Monitoring</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none shadow-sm"
            />
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 shrink-0 flex items-center gap-2 group active:scale-95"
          >
            <Building2 size={18} className="group-hover:scale-110 transition-transform" />
            Add New Department
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredDepts.map((dept) => (
          <div key={dept.id} className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1 group">
            <div className="p-8 border-b border-slate-50">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-16 h-16 ${dept.color} rounded-2xl flex items-center justify-center text-white shadow-2xl transition-all group-hover:rotate-6 group-hover:scale-110`}>
                  {dept.icon}
                </div>
                <div className="flex flex-col items-end">
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Efficiency</span>
                   <span className="text-xl font-bold text-slate-900">{dept.efficiency}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight">{dept.name}</h3>
              <p className="text-sm text-slate-500 mt-3 flex items-center gap-2 font-medium">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                Active Head: <span className="font-bold text-slate-700">{dept.head}</span>
              </p>
            </div>
            
            <div className="p-8 grid grid-cols-2 gap-4 bg-slate-50/20">
              <div className="bg-white p-5 rounded-3xl border border-slate-100 hover:border-indigo-100 transition-all group/stat shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Workforce</p>
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl group-hover/stat:scale-110 transition-transform"><Users size={18} /></div>
                   <span className="text-xl font-bold text-slate-900">{dept.staff}</span>
                </div>
              </div>
              <div className="bg-white p-5 rounded-3xl border border-slate-100 hover:border-rose-100 transition-all group/stat shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Active Tasks</p>
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-rose-50 text-rose-600 rounded-xl group-hover/stat:scale-110 transition-transform"><AlertCircle size={18} /></div>
                   <span className="text-xl font-bold text-rose-600">{dept.activeIssues}</span>
                </div>
              </div>
            </div>

            <div className="px-8 py-6 bg-slate-50/30 flex items-center justify-between group-hover:bg-white transition-colors">
               <div className="flex-1 mr-6">
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                     <div 
                        className={`h-full ${dept.color} transition-all duration-1000 ease-out`} 
                        style={{ width: dept.efficiency }}
                     ></div>
                  </div>
               </div>
               <button className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-lg transition-all active:scale-90">
                  <ArrowUpRight size={24} />
               </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Department Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[6000] flex items-center justify-center p-4 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => !isAdding && setIsAddModalOpen(false)}></div>
           <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md relative overflow-hidden animate-in zoom-in-95 duration-500 border border-white/20">
              <div className="p-10">
                 <div className="flex justify-between items-center mb-8">
                    <div>
                       <h2 className="text-3xl font-bold text-slate-900 tracking-tight">New Department</h2>
                       <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-[0.2em] mt-2 bg-indigo-50 inline-block px-2 py-1 rounded">Initialization Protocol</p>
                    </div>
                    <button onClick={() => !isAdding && setIsAddModalOpen(false)} className="p-3 hover:bg-slate-100 rounded-2xl transition-colors active:scale-95">
                       <X size={20} className="text-slate-400" />
                    </button>
                 </div>

                 <div className="space-y-6">
                    <div className="space-y-3">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Department Name</label>
                       <input 
                          type="text" 
                          value={newDept.name}
                          onChange={(e) => setNewDept({...newDept, name: e.target.value})}
                          placeholder="e.g. Urban Security"
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none font-medium shadow-inner"
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Appointed Dept Head</label>
                       <input 
                          type="text" 
                          value={newDept.head}
                          onChange={(e) => setNewDept({...newDept, head: e.target.value})}
                          placeholder="Name of Official"
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none font-medium shadow-inner"
                       />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                       <div className="space-y-3">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Staff Count</label>
                          <input 
                             type="number" 
                             value={newDept.staff}
                             onChange={(e) => setNewDept({...newDept, staff: e.target.value})}
                             placeholder="Quantity"
                             className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none font-medium shadow-inner"
                          />
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Priority</label>
                          <select 
                            value={newDept.priority}
                            onChange={(e) => setNewDept({...newDept, priority: e.target.value})}
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none appearance-none font-bold text-slate-700"
                          >
                             <option>Primary</option>
                             <option>Secondary</option>
                             <option>Auxiliary</option>
                          </select>
                       </div>
                    </div>
                 </div>

                 <button 
                  onClick={handleAddDept}
                  disabled={isAdding}
                  className={`w-full mt-10 bg-slate-900 text-white py-5 rounded-[1.5rem] font-bold flex items-center justify-center gap-3 transition-all shadow-2xl shadow-slate-200 active:scale-95 ${isAdding ? 'opacity-70 cursor-wait' : 'hover:bg-slate-800'}`}
                 >
                    {isAdding ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <Check size={20} />
                    )}
                    {isAdding ? 'Synchronizing...' : 'Finalize Department'}
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Departments;

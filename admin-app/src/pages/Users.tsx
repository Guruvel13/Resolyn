import React, { useState, useMemo } from 'react';
import { User, Shield, Key, Search, MoreHorizontal, UserPlus, Mail, Phone, Calendar, X, Check, Lock, ShieldCheck, UserCog } from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'Rahul Sharma', role: 'Field Agent', department: 'Water & Supply', status: 'Active', lastSeen: '10 mins ago', email: 'rahul.s@resolyn.gov' },
  { id: 2, name: 'Sunita Rao', role: 'Dept Head', department: 'Electrical', status: 'On Leave', lastSeen: '1 day ago', email: 'sunita.r@resolyn.gov' },
  { id: 3, name: 'Vikram Singh', role: 'Nodal Officer', department: 'Roads', status: 'Active', lastSeen: 'Now', email: 'vikram.v@resolyn.gov' },
  { id: 4, name: 'Anita Desai', role: 'Gov Official', department: 'Public Health', status: 'Active', lastSeen: '3 hours ago', email: 'anita.d@resolyn.gov' },
];

const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const filteredUsers = useMemo(() => {
    return mockUsers.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            user.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === 'all' || user.status.toLowerCase().replace(' ', '-') === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-500 mt-1">Manage portal access, roles, and departmental permissions.</p>
        </div>
        <button 
          onClick={() => setShowInviteModal(true)}
          className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-200"
        >
          <UserPlus size={18} /> Invite Official
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/30">
                <div className="relative w-full sm:w-64">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                   <input 
                      type="text" 
                      placeholder="Search officials..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                   />
                </div>
                <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                   {['all', 'active', 'on-leave'].map((t) => (
                      <button 
                         key={t}
                         onClick={() => setActiveTab(t)}
                         className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${activeTab === t ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-900'}`}
                      >
                         {t.replace('-', ' ')}
                      </button>
                   ))}
                </div>
             </div>
             
             <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white border-b border-slate-100">
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Official</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Role/Dept</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="group hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold border border-slate-200 shadow-inner">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                               <p className="text-sm font-bold text-slate-900">{user.name}</p>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex flex-col">
                             <span className="text-sm font-bold text-slate-800">{user.role}</span>
                             <span className="text-xs text-slate-500">{user.department}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                           <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase border ${user.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                             {user.status}
                           </span>
                        </td>
                        <td className="px-6 py-5 text-right">
                           <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200">
                                 <UserCog size={16} />
                              </button>
                              <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200">
                                 <Lock size={16} />
                              </button>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-100 group">
              <div className="relative z-10 transition-transform group-hover:scale-[1.02] duration-500">
                 <Shield className="mb-4 opacity-50" size={32} />
                 <h3 className="text-xl font-bold mb-2">Access Control</h3>
                 <p className="text-indigo-100 text-sm leading-relaxed mb-6">Review system Audit Logs for critical and unauthorized changes.</p>
                 <button className="w-full bg-white text-indigo-600 font-bold py-3 rounded-xl text-sm hover:bg-indigo-50 transition-all shadow-lg shadow-indigo-900/20">Go to Audit Logs</button>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl transition-transform group-hover:scale-150 duration-700"></div>
           </div>

           <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                 <ShieldCheck size={18} className="text-emerald-500" /> Security Summary
              </h4>
              <div className="space-y-4">
                 {[
                   { label: 'Authorized Officials', value: '42' },
                   { label: 'Departmental Heads', value: '6' },
                   { label: 'External Contractors', value: '12' },
                   { label: 'System Access', value: '99.9%' },
                 ].map((stat, i) => (
                   <div key={i} className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0 text-sm font-medium">
                      <span className="text-slate-500">{stat.label}</span>
                      <span className="text-slate-900 font-bold">{stat.value}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-[6000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                 <h3 className="font-bold text-slate-900">Invite New Official</h3>
                 <button onClick={() => setShowInviteModal(false)} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                    <X size={20} />
                 </button>
              </div>
              <div className="p-8 space-y-6">
                 <div className="space-y-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Basic Information</p>
                    <div className="space-y-3">
                       <input 
                          type="text" 
                          placeholder="Full Name" 
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                       />
                       <input 
                          type="email" 
                          placeholder="Official email (gov.in / gov.id)" 
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                       />
                    </div>
                 </div>
                 <div className="space-y-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Assignment</p>
                    <div className="grid grid-cols-2 gap-3">
                       <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold text-slate-600">
                          <option>Select Dept</option>
                          <option>Water</option>
                          <option>Electrical</option>
                          <option>Roads</option>
                       </select>
                       <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-bold text-slate-600">
                          <option>Select Role</option>
                          <option>Field Agent</option>
                          <option>Dept Head</option>
                       </select>
                    </div>
                 </div>
                 <div className="pt-4 flex gap-3">
                    <button 
                       onClick={() => setShowInviteModal(false)}
                       className="flex-1 py-3 bg-slate-50 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-100 transition-all"
                    >
                       Cancel
                    </button>
                    <button 
                      onClick={() => setShowInviteModal(false)}
                      className="flex-1 py-3 bg-slate-900 text-white font-bold rounded-xl text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                    >
                       Send Invite
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Users;

import React, { useState, useMemo } from 'react';
import { User, Shield, Key, Search, MoreHorizontal, UserPlus, Mail, Phone, Calendar, X, Check, Lock, ShieldCheck, UserCog } from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'Rahul Sharma', role: 'Field Agent', department: 'Water & Supply', status: 'Active', lastSeen: '10 mins ago', email: 'rahul.s@resolyn.gov' },
  { id: 2, name: 'Sunita Rao', role: 'Dept Head', department: 'Electrical', status: 'On Leave', lastSeen: '1 day ago', email: 'sunita.r@resolyn.gov' },
  { id: 3, name: 'Vikram Singh', role: 'Nodal Officer', department: 'Roads', status: 'Active', lastSeen: 'Now', email: 'vikram.v@resolyn.gov' },
  { id: 4, name: 'Anita Desai', role: 'Gov Official', department: 'Public Health', status: 'Active', lastSeen: '3 hours ago', email: 'anita.d@resolyn.gov' },
  { id: 5, name: 'Deepak Kumar', role: 'Supervisor', department: 'Sanitation', status: 'Active', lastSeen: 'Now', email: 'deepak.k@resolyn.gov' },
  { id: 6, name: 'Meera Reddy', role: 'Auditor', department: 'Education', status: 'Active', lastSeen: '5 mins ago', email: 'meera.r@resolyn.gov' },
  { id: 7, name: 'Sanjay Gupta', role: 'Executive', department: 'Urban Planning', status: 'On Leave', lastSeen: '3 days ago', email: 'sanjay.g@resolyn.gov' },
];

const Users: React.FC = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [isInviting, setIsInviting] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Field Agent', department: 'Water & Supply' });

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            user.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === 'all' || user.status.toLowerCase().replace(' ', '-') === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab, users]);

  const handleInvite = () => {
    if (!newUser.name || !newUser.email) return;
    
    setIsInviting(true);
    setTimeout(() => {
      const userToAdd = {
        id: users.length + 1,
        name: newUser.name,
        role: newUser.role,
        department: newUser.department,
        status: 'Active',
        lastSeen: 'Now',
        email: newUser.email
      };
      
      setUsers([userToAdd, ...users]);
      setIsInviting(false);
      setShowInviteModal(false);
      setNewUser({ name: '', email: '', role: 'Field Agent', department: 'Water & Supply' });
    }, 1200);
  };

  const toggleUserStatus = (id: number) => {
    setUsers(prev => prev.map(u => 
      u.id === id ? { ...u, status: u.status === 'Active' ? 'On Leave' : 'Active' } : u
    ));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">Manage portal access, roles, and departmental permissions.</p>
        </div>
        <button 
          onClick={() => setShowInviteModal(true)}
          className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center gap-2 shadow-xl shadow-slate-200 active:scale-95 group"
        >
          <UserPlus size={18} className="group-hover:rotate-12 transition-transform" /> Invite Official
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/20">
           <div className="relative w-full sm:w-64 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={16} />
              <input 
                 type="text" 
                 placeholder="Search officials..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none"
              />
           </div>
           <div className="flex items-center gap-1 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
              {['all', 'active', 'on-leave'].map((t) => (
                 <button 
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${activeTab === t ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}
                 >
                    {t.replace('-', ' ')}
                 </button>
              ))}
           </div>
        </div>
        
        <div className="overflow-x-auto">
           <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/10 border-b border-slate-100">
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Official</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Role/Dept</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Status</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center text-slate-600 font-bold border border-white shadow-sm transition-transform group-hover:scale-105">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                           <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{user.name}</p>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                         <span className="text-sm font-bold text-slate-800">{user.role}</span>
                         <span className="text-xs text-slate-500 font-medium">{user.department}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <span 
                         onClick={() => toggleUserStatus(user.id)}
                         className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border cursor-pointer transition-all active:scale-95 ${user.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100'}`}
                       >
                         {user.status}
                       </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                          <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-200 hover:shadow-sm">
                             <UserCog size={18} />
                          </button>
                          <button className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-200 hover:shadow-sm">
                             <Lock size={18} />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
           {filteredUsers.length === 0 && (
              <div className="p-20 text-center">
                 <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">No officials matching your search</p>
              </div>
           )}
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-[6000] flex items-center justify-center p-4 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => !isInviting && setShowInviteModal(false)}></div>
           <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 border border-white/20 relative">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                 <div>
                    <h3 className="text-2xl font-bold text-slate-900">Invite Official</h3>
                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-1">Credentials Access</p>
                 </div>
                 <button onClick={() => !isInviting && setShowInviteModal(false)} className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-all rounded-2xl active:scale-90">
                    <X size={20} />
                 </button>
              </div>
              <div className="p-10 space-y-8">
                 <div className="space-y-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Basic Information</p>
                    <div className="space-y-4">
                       <input 
                          type="text" 
                          value={newUser.name}
                          onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                          placeholder="Full Name" 
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none font-medium shadow-inner"
                       />
                       <input 
                          type="email" 
                          value={newUser.email}
                          onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                          placeholder="Official email (gov.in / gov.id)" 
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none font-medium shadow-inner"
                       />
                    </div>
                 </div>
                 <div className="space-y-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Assignment</p>
                    <div className="grid grid-cols-2 gap-4">
                       <select 
                        value={newUser.department}
                        onChange={(e) => setNewUser({...newUser, department: e.target.value})}
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none font-bold text-slate-700 shadow-sm appearance-none"
                       >
                          <option>Water & Supply</option>
                          <option>Electrical</option>
                          <option>Roads</option>
                          <option>Sanitation</option>
                          <option>Public Health</option>
                          <option>Education</option>
                          <option>Urban Planning</option>
                       </select>
                       <select 
                        value={newUser.role}
                        onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none font-bold text-slate-700 shadow-sm appearance-none"
                       >
                          <option>Field Agent</option>
                          <option>Dept Head</option>
                          <option>Nodal Officer</option>
                          <option>Supervisor</option>
                          <option>Auditor</option>
                          <option>Executive</option>
                       </select>
                    </div>
                 </div>
                 <div className="pt-4 flex gap-4">
                    <button 
                       onClick={() => setShowInviteModal(false)}
                       className="flex-1 py-4 bg-slate-50 text-slate-600 font-bold rounded-2xl text-sm hover:bg-slate-100 transition-all active:scale-95"
                    >
                       Cancel
                    </button>
                    <button 
                      onClick={handleInvite}
                      disabled={isInviting}
                      className={`flex-1 py-4 bg-slate-900 text-white font-bold rounded-2xl text-sm transition-all shadow-2xl shadow-slate-200 active:scale-95 flex items-center justify-center gap-3 ${isInviting ? 'opacity-70' : 'hover:bg-slate-800'}`}
                    >
                       {isInviting ? (
                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                       ) : (
                         <Check size={18} />
                       )}
                       {isInviting ? 'Processing' : 'Send Invite'}
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

import React from 'react';
import { User, Shield, Key, Search, MoreHorizontal, UserPlus, Mail, Phone, Calendar } from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'Rahul Sharma', role: 'Field Agent', department: 'Water & Supply', status: 'Active', lastSeen: '10 mins ago' },
  { id: 2, name: 'Sunita Rao', role: 'Dept Head', department: 'Electrical', status: 'On Leave', lastSeen: '1 day ago' },
  { id: 3, name: 'Vikram Singh', role: 'Nodal Officer', department: 'Roads', status: 'Active', lastSeen: 'Now' },
  { id: 4, name: 'Anita Desai', role: 'Gov Official', department: 'Public Health', status: 'Active', lastSeen: '3 hours ago' },
];

const Users: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-500 mt-1">Manage portal access, roles, and departmental permissions.</p>
        </div>
        <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-200">
          <UserPlus size={18} /> Invite Official
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Official</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Role/Dept</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockUsers.map((user) => (
                      <tr key={user.id} className="group hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold border border-slate-200">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                               <p className="text-sm font-bold text-slate-900">{user.name}</p>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Last seen: {user.lastSeen}</p>
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
                           <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200">
                              <MoreHorizontal size={18} />
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-100">
              <div className="relative z-10">
                 <Shield className="mb-4 opacity-50" size={32} />
                 <h3 className="text-xl font-bold mb-2">Access Control</h3>
                 <p className="text-indigo-100 text-sm leading-relaxed mb-6">Review system Audit Logs for critical and unauthorized changes.</p>
                 <button className="w-full bg-white text-indigo-600 font-bold py-3 rounded-xl text-sm hover:bg-indigo-50 transition-all">Go to Audit Logs</button>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
           </div>

           <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                 <Key size={18} className="text-amber-500" /> Security Summary
              </h4>
              <div className="space-y-4">
                 {[
                   { label: 'Authorized Officials', value: '42' },
                   { label: 'Departmental Heads', value: '6' },
                   { label: 'External Contractors', value: '12' },
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
    </div>
  );
};

export default Users;

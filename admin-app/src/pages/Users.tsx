import { Search, UserPlus, Filter, MoreHorizontal, Download, ChevronLeft, ChevronRight } from 'lucide-react';

const users = [
  { name: 'Adrian Sterling', email: 'adrian.s@gov.enterprise', dept: 'Department of Finance', role: 'ADMIN', lastLogin: '10 mins ago', ip: '192.168.1.45', initial: 'AS', color: 'bg-blue-100 text-blue-600' },
  { name: 'Elena Rodriguez', email: 'elena.r@gov.enterprise', dept: 'Internal Audit', role: 'REVIEWER', lastLogin: '2 hours ago', ip: '192.168.1.12', initial: 'ER', color: 'bg-purple-100 text-purple-600' },
  { name: 'Julian Wagner', email: 'j.wagner@gov.enterprise', dept: 'Operations', role: 'MANAGER', lastLogin: 'Yesterday, 4:32 PM', ip: '172.16.0.8', initial: 'JW', color: 'bg-emerald-100 text-emerald-600' },
  { name: 'Marcus King', email: 'm.king@gov.enterprise', dept: 'IT Infrastructure', role: 'ADMIN', lastLogin: '3 days ago', ip: '10.0.0.124', initial: 'MK', color: 'bg-slate-100 text-slate-600' },
  { name: 'Sarah Chen', email: 's.chen@gov.enterprise', dept: 'Public Relations', role: 'MANAGER', lastLogin: 'May 12, 09:15 AM', ip: '192.168.1.99', initial: 'SC', color: 'bg-amber-100 text-amber-600' },
];

export default function UsersPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-400 mb-1">
             <span className="text-[10px] font-bold uppercase tracking-widest">Admin Portal</span>
             <ChevronRight size={10} />
             <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600">User Management</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">System Users & Roles</h1>
          <p className="text-slate-500 mt-1 max-w-xl">
            Manage departmental access and enterprise governance roles.
          </p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-white hover:shadow-sm transition-all flex items-center gap-2">
            <Download size={18} /> Export
          </button>
          <button className="px-5 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-semibold hover:bg-brand-700 shadow-lg shadow-brand-100 transition-all flex items-center gap-2 w-fit">
            <UserPlus size={18} /> Add New User
          </button>
        </div>
      </div>

      <div className="card-paper overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="flex items-center gap-2">
             {['All Users', 'Admins', 'Managers', 'Reviewers'].map((tab, i) => (
               <button key={tab} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${i === 0 ? 'bg-brand-600 text-white shadow-md shadow-brand-50' : 'text-slate-500 hover:bg-slate-50'}`}>
                 {tab}
               </button>
             ))}
           </div>
           
           <div className="flex items-center gap-3">
             <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
               <input 
                 type="text" 
                 placeholder="Search users..." 
                 className="bg-slate-50 border border-slate-100 focus:border-brand-200 rounded-lg py-1.5 pl-9 pr-4 text-xs outline-none transition-all w-48"
               />
             </div>
             <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                <Filter size={14} /> More Filters
             </button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/30 border-b border-slate-100">
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Name & ID</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Department</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Role</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last Login</th>
                <th className="px-6 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map((user, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                       <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-bold ${user.color}`}>
                         {user.initial}
                       </div>
                       <div>
                         <p className="text-xs font-bold text-slate-900 leading-tight">{user.name}</p>
                         <p className="text-[10px] font-medium text-slate-500">{user.email}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold text-slate-600">{user.dept}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                      user.role === 'ADMIN' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                      user.role === 'MANAGER' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      'bg-purple-50 text-purple-600 border-purple-100'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs font-bold text-slate-700 leading-none">{user.lastLogin}</p>
                    <p className="text-[9px] text-slate-400 font-medium mt-1 uppercase tracking-tighter">IP: {user.ip}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-300 hover:text-slate-600 p-1">
                       <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100 flex items-center justify-between">
           <p className="text-[11px] text-slate-500 font-medium">Showing <span className="text-slate-900 font-bold">1 to 5</span> of 42 users</p>
           <div className="flex items-center gap-2">
              <button className="p-1.5 border border-slate-100 rounded-lg text-slate-400 hover:bg-slate-50 disabled:opacity-30" disabled>
                <ChevronLeft size={16} />
              </button>
              {[1, 2, 3].map(p => (
                <button key={p} className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${p === 1 ? 'bg-brand-600 text-white shadow-md shadow-brand-50' : 'text-slate-500 hover:bg-slate-50'}`}>
                   {p}
                </button>
              ))}
              <button className="p-1.5 border border-slate-100 rounded-lg text-slate-400 hover:bg-slate-50">
                <ChevronRight size={16} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

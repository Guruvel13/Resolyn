import { Search, Download, RefreshCcw, Shield } from 'lucide-react';

const logs = [
  { time: 'Oct 24, 2023 • 14:22:01', user: 'admin_user_01', ip: '192.168.1.42', action: 'User Created', severity: 'Info', status: 'view trace' },
  { time: 'Oct 24, 2023 • 14:21:45', user: 'system_daemon', ip: '10.0.0.5', action: 'Permission Changed', severity: 'Warning', status: 'view trace' },
  { time: 'Oct 24, 2023 • 14:19:30', user: 'unauthorized_404', ip: '182.44.2.11', action: 'Record Deleted', severity: 'Critical', status: 'view trace' },
  { time: 'Oct 24, 2023 • 14:15:12', user: 'dev_ops_sarah', ip: '45.23.121.9', action: 'API Key Generated', severity: 'Info', status: 'view trace' },
  { time: 'Oct 24, 2023 • 14:12:05', user: 'automated_sync', ip: '127.0.0.1', action: 'Database Schema Update', severity: 'Warning', status: 'view trace' },
  { time: 'Oct 24, 2023 • 14:05:58', user: 'support_rep_02', ip: '172.16.254.1', action: 'User Logged In', severity: 'Info', status: 'view trace' },
  { time: 'Oct 24, 2023 • 13:58:21', user: 'billing_manager', ip: '92.3.1.25', action: 'Subscription Cancelled', severity: 'Critical', status: 'view trace' },
  { time: 'Oct 24, 2023 • 13:45:10', user: 'unknown_client', ip: '201.2.4.55', action: 'Failed Login Attempt', severity: 'Critical', status: 'view trace' },
];

export default function AuditLogs() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-brand-600 rounded-xl text-white shadow-lg shadow-brand-100">
             <Shield size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900">Audit logs</h1>
              <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full uppercase">System Wide</span>
            </div>
            <p className="text-slate-500 text-sm font-medium mt-0.5">Comprehensive history of all system events and user actions.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-white hover:shadow-sm transition-all flex items-center gap-2">
            <Download size={16} /> Export CSV
          </button>
          <button className="p-2 border border-slate-200 rounded-xl text-slate-400 hover:bg-white transition-colors">
            <RefreshCcw size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="card-paper p-6 h-fit space-y-8">
           <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Main Menu</p>
              <nav className="space-y-4">
                 <div className="flex items-center gap-3 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
                    <Activity size={18} />
                    <span className="text-sm font-medium">Dashboard</span>
                 </div>
                 <div className="flex items-center gap-3 text-brand-600 bg-brand-50 -mx-6 px-6 py-2 border-r-4 border-brand-600 font-bold transition-all">
                    <Shield size={18} />
                    <span className="text-sm">Audit Logs</span>
                 </div>
                 <div className="flex items-center gap-3 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
                    <Users size={18} />
                    <span className="text-sm font-medium">Access Control</span>
                 </div>
              </nav>
           </div>

           <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Filters</p>
              <div className="space-y-4">
                 <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Date Range</label>
                    <select className="w-full bg-slate-50 border border-slate-100 rounded-lg py-2 px-3 text-xs font-medium outline-none focus:ring-2 focus:ring-brand-50">
                       <option>Last 24 Hours</option>
                       <option>Last 7 Days</option>
                       <option>Month to Date</option>
                    </select>
                 </div>

                 <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">User ID</label>
                    <div className="relative">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                       <input type="text" placeholder="Search user..." className="w-full bg-slate-50 border border-slate-100 rounded-lg py-2 pl-9 pr-3 text-xs outline-none focus:ring-2 focus:ring-brand-50" />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Severity</label>
                    {[
                      { label: 'Info', color: 'bg-blue-500' },
                      { label: 'Warning', color: 'bg-amber-500' },
                      { label: 'Critical', color: 'bg-rose-500' },
                    ].map(s => (
                      <label key={s.label} className="flex items-center gap-2 cursor-pointer group">
                         <input type="checkbox" defaultChecked className="hidden" />
                         <div className="w-4 h-4 rounded border border-slate-200 flex items-center justify-center transition-all bg-white group-hover:border-brand-300">
                            <div className={`w-1.5 h-1.5 rounded-full ${s.color}`}></div>
                         </div>
                         <span className="text-xs font-medium text-slate-600">{s.label}</span>
                      </label>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Logs Table */}
        <div className="lg:col-span-3 card-paper overflow-hidden">
           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead>
                 <tr className="bg-slate-50/50 border-b border-slate-100">
                   <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Timestamp</th>
                   <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">User ID</th>
                   <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">IP Address</th>
                   <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Action Type</th>
                   <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Severity</th>
                   <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Details</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                 {logs.map((log, i) => (
                   <tr key={i} className="hover:bg-slate-50/30 transition-colors group">
                      <td className="px-6 py-4">
                        <span className="text-xs font-medium text-slate-500 tabular-nums">{log.time}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold text-slate-700">{log.user}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-bold text-slate-400 tabular-nums uppercase">{log.ip}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold text-slate-900">{log.action}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          log.severity === 'Info' ? 'bg-blue-50 text-blue-600' :
                          log.severity === 'Warning' ? 'bg-amber-50 text-amber-600' :
                          'bg-rose-50 text-rose-600'
                        }`}>
                          {log.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-[10px] font-bold text-brand-600 uppercase tracking-wider flex items-center gap-1.5 ml-auto hover:underline">
                           View Trace
                        </button>
                      </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>

           <div className="p-4 border-t border-slate-100 flex items-center justify-between">
              <p className="text-[11px] text-slate-500 font-medium tracking-tight">Showing <span className="text-slate-900 font-bold">1-25</span> of 1,240 results</p>
              <div className="flex items-center gap-2">
                 {[1, 2, 3, '...', 50].map((p, i) => (
                   <button key={i} className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${p === 1 ? 'bg-brand-600 text-white shadow-md shadow-brand-50' : 'text-slate-500 hover:bg-slate-50'}`}>
                      {p}
                   </button>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

import { Activity, Users } from 'lucide-react';

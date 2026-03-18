import React from 'react';
import { History, Shield, AlertTriangle, UserCheck, FileText, ChevronRight, Filter, Download } from 'lucide-react';

const mockLogs = [
  { id: 1, action: 'Status Updated', user: 'Vikram Singh', target: 'RES-9801', date: '12 mins ago', type: 'info', details: 'Changed status to In Progress' },
  { id: 2, action: 'User Permissions', user: 'Admin System', target: 'Rahul Sharma', date: '45 mins ago', type: 'security', details: 'Added Field Agent role' },
  { id: 3, action: 'Critical Alert', user: 'Gov. Sensors', target: 'HSR Sector 2', date: '2 hours ago', type: 'warning', details: 'Automated pressure drop alert' },
  { id: 4, action: 'Ticket Assigned', user: 'Sunita Rao', target: 'RES-9705', date: '5 hours ago', type: 'info', details: 'Assigned to Electrical Dept.' },
  { id: 5, action: 'File Exported', user: 'Vikram Singh', target: 'Monthly Report', date: '1 day ago', type: 'info', details: 'Full CSV export of Q3 data' },
];

const AuditLogs: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System Audit Logs</h1>
          <p className="text-slate-500 mt-1">Immutable record of all administrative actions and system events.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all">
             <Filter size={18} /> Filter Logs
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all flex items-center gap-2">
             <Download size={18} /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
         <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex items-center gap-6 overflow-x-auto">
            {['All Events', 'Security', 'User Activity', 'Automated Alerts'].map((tab, i) => (
               <button key={i} className={`whitespace-nowrap text-xs font-bold uppercase tracking-widest px-1 py-1 border-b-2 transition-all ${i === 0 ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-900'}`}>
                  {tab}
               </button>
            ))}
         </div>

         <div className="divide-y divide-slate-100">
            {mockLogs.map((log) => (
               <div key={log.id} className="p-6 flex items-start justify-between group hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-start gap-4">
                     <div className={`mt-1 p-2 rounded-xl border ${
                        log.type === 'security' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 
                        log.type === 'warning' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                        'bg-slate-50 text-slate-600 border-slate-200'
                     }`}>
                        {log.type === 'security' ? <Shield size={18} /> : 
                         log.type === 'warning' ? <AlertTriangle size={18} /> :
                         <UserCheck size={18} />}
                     </div>
                     <div>
                        <div className="flex items-center gap-2">
                           <span className="font-bold text-slate-900 text-sm">{log.action}</span>
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1.5 py-0.5 bg-slate-100 rounded">TARGET: {log.target}</span>
                        </div>
                        <p className="text-sm text-slate-500 mt-1">{log.details}</p>
                        <div className="flex items-center gap-3 mt-3">
                           <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> {log.user}
                           </span>
                           <span className="text-xs text-slate-400 flex items-center gap-1.5">
                              <History size={14} /> {log.date}
                           </span>
                        </div>
                     </div>
                  </div>
                  <button className="p-2 text-slate-300 group-hover:text-slate-900 transition-colors">
                     <ChevronRight size={20} />
                  </button>
               </div>
            ))}
         </div>

         <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-center">
            <button className="text-xs font-bold text-indigo-600 hover:underline">Load older entries...</button>
         </div>
      </div>
    </div>
  );
};

export default AuditLogs;

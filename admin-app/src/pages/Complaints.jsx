import { useState } from 'react';
import { Filter, MoreVertical, Eye } from 'lucide-react';
import StatusBadge from '../components/ui/StatusBadge';

export default function Complaints() {
  const [filter, setFilter] = useState('All');

  const mockComplaints = [
    { id: 'INC-2049', type: 'Infrastructure', location: 'Sector 7G', status: 'Active', time: '10m ago' },
    { id: 'INC-2048', type: 'Public Safety', location: 'Downtown', status: 'Escalated', time: '1h ago' },
    { id: 'INC-2047', type: 'Sanitation', location: 'West End', status: 'Pending', time: '3h ago' },
    { id: 'INC-2046', type: 'Infrastructure', location: 'North Hills', status: 'Resolved', time: '1d ago' },
     { id: 'INC-2045', type: 'Noise', location: 'East Side', status: 'Resolved', time: '1d ago' },
  ];

  const statuses = ['All', 'Pending', 'Active', 'Escalated', 'Resolved'];

  const filteredComplaints = filter === 'All' 
    ? mockComplaints 
    : mockComplaints.filter(c => c.status === filter);

  return (
    <div className="h-full flex flex-col gap-6 animate-fade-in">
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-3xl font-mono font-bold tracking-tight text-white mb-1 uppercase">Incident Logs</h1>
            <p className="text-zinc-500 text-sm">System-wide active complaint registry.</p>
         </div>
         <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#18181b] border border-[#27272a] text-sm font-mono text-zinc-300 hover:text-white hover:border-zinc-500 transition-all">
               <Filter className="w-4 h-4" />
               ADVANCED FILTER
            </button>
         </div>
      </div>

      <div className="flex gap-2 mb-2">
         {statuses.map(s => (
            <button 
               key={s}
               onClick={() => setFilter(s)}
               className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider transition-all border ${filter === s ? 'bg-[#00ffcc] text-black border-[#00ffcc] font-bold shadow-[0_0_10px_rgba(0,255,204,0.3)]' : 'bg-[#18181b] text-zinc-400 border-[#27272a] hover:bg-[#27272a]'}`}
            >
               {s}
            </button>
         ))}
      </div>

      <div className="flex-1 bg-[#18181b]/50 border border-[#27272a] overflow-hidden flex flex-col relative">
         {/* Cyber grid overlay */}
         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDEwaDQwTTAgMjBoNDBNMCAzMGg0ME0xMCAwdjQwTTIwIDB2NDBNMzAgMHY0MCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] pointer-events-none"></div>
         
         <div className="overflow-x-auto relative">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-[#27272a] bg-[#09090b]/80">
                     <th className="p-4 text-xs font-mono text-zinc-500 uppercase tracking-widest">ID</th>
                     <th className="p-4 text-xs font-mono text-zinc-500 uppercase tracking-widest">Type</th>
                     <th className="p-4 text-xs font-mono text-zinc-500 uppercase tracking-widest">Location</th>
                     <th className="p-4 text-xs font-mono text-zinc-500 uppercase tracking-widest">Time</th>
                     <th className="p-4 text-xs font-mono text-zinc-500 uppercase tracking-widest">Status</th>
                     <th className="p-4 text-xs font-mono text-zinc-500 uppercase tracking-widest text-right">Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {filteredComplaints.map((complaint, idx) => (
                     <tr key={complaint.id} className={`border-b border-[#27272a] hover:bg-[#27272a]/50 transition-colors group ${idx % 2 === 0 ? 'bg-[#18181b]/30' : ''}`}>
                        <td className="p-4 font-mono text-sm text-zinc-300">
                           <span className="text-[#00ffcc] opacity-0 group-hover:opacity-100 transition-opacity mr-2">»</span>
                           {complaint.id}
                        </td>
                        <td className="p-4 text-sm text-zinc-100">{complaint.type}</td>
                        <td className="p-4 text-sm text-zinc-400 font-mono">{complaint.location}</td>
                        <td className="p-4 text-sm text-zinc-500 tracking-wide">{complaint.time}</td>
                        <td className="p-4"><StatusBadge status={complaint.status} /></td>
                        <td className="p-4 text-right">
                           <button className="p-1.5 text-zinc-500 hover:text-[#00ffcc] hover:bg-[rgba(0,255,204,0.1)] rounded transition-colors inline-block mr-2">
                              <Eye className="w-4 h-4" />
                           </button>
                           <button className="p-1.5 text-zinc-500 hover:text-white transition-colors inline-block">
                              <MoreVertical className="w-4 h-4" />
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
            
            {filteredComplaints.length === 0 && (
               <div className="p-12 text-center text-zinc-500 font-mono flex flex-col items-center">
                  <div className="w-12 h-12 border border-dashed border-zinc-600 mb-4 flex items-center justify-center rotate-45">
                     <span className="-rotate-45 block">/</span>
                  </div>
                  NO RECORDS MATCHING CURRENT FILTER PARAMETERS
               </div>
            )}
         </div>
      </div>
    </div>
  );
}

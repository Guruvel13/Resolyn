import { useState } from 'react';
import { Filter, Search, ChevronDown, Download, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

export default function Complaints() {
  const [filter, setFilter] = useState('All');

  const mockComplaints = [
    { id: 'INC-2049', type: 'Infrastructure', location: 'Sector 7G', status: 'Active', time: '10m ago', priority: 'High' },
    { id: 'INC-2048', type: 'Public Safety', location: 'Downtown', status: 'Escalated', time: '1h ago', priority: 'Critical' },
    { id: 'INC-2047', type: 'Sanitation', location: 'West End', status: 'Pending', time: '3h ago', priority: 'Medium' },
    { id: 'INC-2046', type: 'Infrastructure', location: 'North Hills', status: 'Resolved', time: '1d ago', priority: 'Low' },
  ];

  const statuses = ['All', 'Pending', 'Active', 'Escalated', 'Resolved'];

  const getStatusStyles = (status) => {
    switch(status.toLowerCase()) {
      case 'active': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'escalated': return 'bg-red-50 text-red-700 border-red-200';
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'resolved': return 'bg-slate-100 text-slate-600 border-slate-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Complaint Registry</h1>
          <p className="text-slate-500 mt-1 font-medium">Detailed log of all city service requests and active incidents.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm flex items-center gap-2 transition-all">
            <Download className="w-4 h-4" />
            Export Data
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2">
            Add Records
          </button>
        </div>
      </div>

      <div className="prof-card overflow-hidden">
        {/* Table Header/Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/50">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {statuses.map(s => (
              <button 
                key={s}
                onClick={() => setFilter(s)}
                className={clsx(
                  "px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border",
                  filter === s 
                    ? "bg-slate-900 text-white border-slate-900 shadow-md" 
                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700"
                )}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Find a ticket..." 
                className="bg-white border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium min-w-[200px]"
              />
            </div>
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/30">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">Ticket ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">Incident Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">Location</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">Date Filed</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockComplaints.map((complaint) => (
                <tr key={complaint.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-5 text-sm font-bold text-blue-600 border-b border-slate-100">{complaint.id}</td>
                  <td className="px-6 py-5 text-sm font-semibold text-slate-700 border-b border-slate-100">{complaint.type}</td>
                  <td className="px-6 py-5 text-sm text-slate-500 font-medium border-b border-slate-100">{complaint.location}</td>
                  <td className="px-6 py-5 text-sm text-slate-500 font-medium border-b border-slate-100">{complaint.time}</td>
                  <td className="px-6 py-5 border-b border-slate-100">
                    <span className={clsx(
                      "px-3 py-1 rounded-full text-[11px] font-bold border",
                      getStatusStyles(complaint.status)
                    )}>
                      {complaint.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right border-b border-slate-100">
                    <button className="text-slate-400 hover:text-blue-600 p-2 rounded-lg hover:bg-white transition-all">
                      <AlertCircle className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer/Pagination */}
        <div className="p-6 flex items-center justify-between text-sm font-bold text-slate-500 bg-slate-50/20">
          <p>Showing 1 to 4 of 48 results</p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-white transition-all disabled:opacity-50" disabled>Previous</button>
            <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-white transition-all">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Download, ChevronRight, MapPin, Clock, Tag } from 'lucide-react';

const mockComplaints = [
  { id: 'RES-9801', title: 'Massive pipe burst flooding main road', department: 'Water & Supply', status: 'In Progress', priority: 'High', date: '2 hours ago', location: 'Koramangala 4th Block' },
  { id: 'RES-9705', title: 'Streetlight Pole #4521 dead', department: 'Electrical', status: 'Resolved', priority: 'Low', date: '5 hours ago', location: 'HSR Layout Sector 2' },
  { id: 'RES-9692', title: 'Garbage accumulation near park entrance', department: 'Sanitation', status: 'Pending', priority: 'Medium', date: '1 day ago', location: 'Indiranagar 100ft Rd' },
  { id: 'RES-9688', title: 'Deep pothole causing bike accidents', department: 'Roads', status: 'Assigned', priority: 'Critical', date: '1 day ago', location: 'Sarjapur Main Road' },
  { id: 'RES-9684', title: 'Broken drainage cover on sidewalk', department: 'Water & Supply', status: 'Pending', priority: 'Medium', date: '2 days ago', location: 'BTM Layout 2nd Stage' },
];

const Complaints: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'assigned': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'in progress': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'resolved': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical': return 'text-rose-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-amber-600';
      default: return 'text-slate-500';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Complaint Management</h1>
          <p className="text-slate-500 mt-1">Review and dispatch officials to resolve civic issues.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
            <Download size={18} /> Export List
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors">
            <Filter size={18} /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 p-4 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            {['All', 'Pending', 'In Progress', 'Resolved'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === tab.toLowerCase()
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-slate-400">
             <span className="text-xs font-bold uppercase tracking-widest">Showing {mockComplaints.length} Records</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Incident</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Priority</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Details</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockComplaints.map((complaint) => (
                <tr key={complaint.id} className="group hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-indigo-600 mb-1">{complaint.id}</span>
                      <span className="font-bold text-slate-900 text-sm line-clamp-1">{complaint.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase border ${getStatusColor(complaint.status)}`}>
                      {complaint.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm font-bold">
                    <span className={getPriorityColor(complaint.priority)}>{complaint.priority}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin size={12} /> {complaint.location}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Tag size={12} /> {complaint.department}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200">
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Complaints;

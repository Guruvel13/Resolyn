import React, { useState, useMemo } from 'react';
import { Search, Filter, MoreVertical, Download, ChevronRight, MapPin, Clock, Tag, X, User, ExternalLink, MessageSquare } from 'lucide-react';

const mockComplaints = [
  { id: 'RES-9801', title: 'Massive pipe burst flooding main road', department: 'Water & Supply', status: 'In Progress', priority: 'High', date: '2 hours ago', location: 'Koramangala 4th Block', reporter: 'Anita Kumar', phone: '+91 98321 44321', desc: 'Water is gushing out from a 4-inch pipe since 8 AM today. The entire street is flooded and vehicles are struggling to pass.' },
  { id: 'RES-9705', title: 'Streetlight Pole #4521 dead', department: 'Electrical', status: 'Resolved', priority: 'Low', date: '5 hours ago', location: 'HSR Layout Sector 2', reporter: 'Siddharth M.', phone: '+91 77651 22312', desc: 'Pole number 4521 has been inactive for three nights. It is the only light in this corner, making it dark and unsafe.' },
  { id: 'RES-9692', title: 'Garbage accumulation near park entrance', department: 'Sanitation', status: 'Pending', priority: 'Medium', date: '1 day ago', location: 'Indiranagar 100ft Rd', reporter: 'Ramesh Singh', phone: '+91 88902 11234', desc: 'Garbage pile is getting larger every day. The smell is unbearable for morning walkers. Request immediate cleanup.' },
  { id: 'RES-9688', title: 'Deep pothole causing bike accidents', department: 'Roads', status: 'Assigned', priority: 'Critical', date: '1 day ago', location: 'Sarjapur Main Road', reporter: 'Priya K.', phone: '+91 99001 55678', desc: 'Huge pothole right after the turn near Wipro gate. Multiple bikers have almost fallen. This is a life-threatening hazard.' },
  { id: 'RES-9684', title: 'Broken drainage cover on sidewalk', department: 'Water & Supply', status: 'Pending', priority: 'Medium', date: '2 days ago', location: 'BTM Layout 2nd Stage', reporter: 'Karan J.', phone: '+91 91234 56789', desc: 'Crawl space drainage cover is broken. A child or elderly person could easily fall in. Needs replacement immediately.' },
];

const Complaints: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<typeof mockComplaints[0] | null>(null);

  const filteredComplaints = useMemo(() => {
    return mockComplaints.filter(item => {
      const matchesTab = activeTab === 'all' || item.status.toLowerCase() === activeTab;
      const matchesSearch = item.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.location.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchTerm]);

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
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Complaint Management</h1>
          <p className="text-slate-500 mt-1">Review and dispatch officials to resolve civic issues.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search ID, title, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            <Download size={18} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-50/50 gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
            {['All', 'Pending', 'In Progress', 'Resolved'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.toLowerCase()
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
            {filteredComplaints.length} Records Found
          </span>
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
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map((complaint) => (
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
                      <button 
                         onClick={() => setSelectedItem(complaint)}
                         className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-2">
                       <Search size={32} className="text-slate-200" />
                       <p className="text-slate-500 font-medium">No results found for "{searchTerm}"</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Overlay */}
      {selectedItem && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-end p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="w-full max-w-xl bg-white h-full rounded-3xl shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                       <Tag size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900">Incident Details</h3>
                        <p className="text-xs text-slate-500 font-medium">{selectedItem.id}</p>
                    </div>
                 </div>
                 <button onClick={() => setSelectedItem(null)} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                    <X size={20} />
                 </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                 <div>
                    <h2 className="text-xl font-bold text-slate-900 leading-tight">{selectedItem.title}</h2>
                    <div className="flex items-center gap-3 mt-4">
                       <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase border ${getStatusColor(selectedItem.status)}`}>
                         {selectedItem.status}
                       </span>
                       <span className={`text-sm font-bold ${getPriorityColor(selectedItem.priority)}`}>
                         {selectedItem.priority} Priority
                       </span>
                    </div>
                 </div>

                 <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Report Description</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{selectedItem.desc}</p>
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div>
                       <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Reporter Info</h4>
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-full border border-slate-200 flex items-center justify-center text-slate-600 font-bold">
                             {selectedItem.reporter.charAt(0)}
                          </div>
                          <div>
                             <p className="text-sm font-bold text-slate-900">{selectedItem.reporter}</p>
                             <p className="text-xs text-slate-500">{selectedItem.phone}</p>
                          </div>
                       </div>
                    </div>
                    <div>
                       <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Location</h4>
                       <div className="flex items-start gap-2">
                          <MapPin size={16} className="text-indigo-600 mt-0.5 shrink-0" />
                          <p className="text-sm font-medium text-slate-700">{selectedItem.location}</p>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Available Actions</h4>
                    <div className="grid grid-cols-2 gap-3">
                       <button className="flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all">
                          <User size={16} /> Assign Official
                       </button>
                       <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">
                          <MessageSquare size={16} /> Reply to User
                       </button>
                    </div>
                 </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 mt-auto">
                 <button className="w-full flex items-center justify-center gap-2 py-3 bg-white text-indigo-600 border border-indigo-100 rounded-xl text-sm font-bold hover:bg-indigo-50 transition-all">
                    <ExternalLink size={16} /> View on Live Map
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Complaints;

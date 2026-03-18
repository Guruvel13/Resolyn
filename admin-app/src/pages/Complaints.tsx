import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, MoreVertical, Download, ChevronRight, MapPin, Clock, Tag, X, User as UserIcon, ExternalLink, MessageSquare, Check } from 'lucide-react';
import { api } from '../services/api';

const Complaints: React.FC = () => {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const data = await api.get('/complaints');
      if (Array.isArray(data)) {
        setComplaints(data);
      }
    } catch (err) {
      console.error('Failed to fetch complaints:', err);
    }
  };

  const filteredComplaints = useMemo(() => {
    return complaints.filter(item => {
      const statusMatches = activeTab === 'all' || item.status.toLowerCase() === activeTab;
      const searchMatches = (item._id?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             item.location?.address?.toLowerCase().includes(searchTerm.toLowerCase()));
      return statusMatches && searchMatches;
    });
  }, [activeTab, searchTerm, complaints]);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    setIsProcessing(true);
    try {
      const updated = await api.put(`/complaints/${id}`, { status: newStatus });
      if (updated._id) {
        setComplaints(prev => prev.map(c => 
          c._id === id ? { ...c, status: newStatus } : c
        ));
        if (selectedItem?._id === id) {
          setSelectedItem((prev: any) => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'assigned': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'in progress': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'resolved': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
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
          <p className="text-slate-500 mt-1 font-medium text-sm">Review and dispatch officials to resolve civic issues.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64 group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search ID, title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm active:scale-95">
            <Download size={18} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="border-b border-slate-50 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-50/20 gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
            {['All', 'Pending', 'In Progress', 'Resolved'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap active:scale-95 ${
                  activeTab === tab.toLowerCase()
                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-200'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 bg-white border border-slate-100 px-3 py-1.5 rounded-lg shadow-sm">
            {filteredComplaints.length} INCIDENTS RECORDED
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/10 border-b border-slate-50">
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Incident</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Priority</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Geospatial Data</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map((complaint) => (
                  <tr key={complaint._id} className="group hover:bg-slate-50/50 transition-all cursor-pointer" onClick={() => setSelectedItem(complaint)}>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-indigo-600 mb-1.5 bg-indigo-50 w-fit px-2 py-0.5 rounded uppercase tracking-widest">{complaint._id?.substring(0, 8)}</span>
                        <span className="font-bold text-slate-900 text-sm tracking-tight group-hover:text-indigo-600 transition-colors uppercase truncate max-w-[200px]">{complaint.title}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-2.5 py-1.5 rounded-xl text-[10px] font-bold uppercase border transition-all ${getStatusColor(complaint.status)}`}>
                        {complaint.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-xs font-bold uppercase tracking-widest">
                      <span className={getPriorityColor(complaint.priority)}>{complaint.priority}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <MapPin size={12} className="text-slate-300" /> {complaint.location?.address || 'Pinned Location'}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <Tag size={12} className="text-slate-300" /> {complaint.department}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button 
                         className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:border-indigo-100 group-hover:shadow-lg transition-all active:scale-90"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                       <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 shadow-inner">
                          <Search size={32} className="text-slate-200" />
                       </div>
                       <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">No records in database</p>
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
        <div className="fixed inset-0 z-[7000] flex items-center justify-end p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="absolute inset-0" onClick={() => !isProcessing && setSelectedItem(null)}></div>
           <div className="w-full max-w-xl bg-white h-full rounded-[2.5rem] shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 border border-white/20 relative">
              <div className="p-10 border-b border-slate-50 flex items-center justify-between">
                 <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-indigo-100 shadow-xl">
                       <Tag size={28} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Incident Record</h3>
                        <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-[0.23em] mt-1 bg-indigo-50 px-2 py-0.5 rounded-full inline-block">{selectedItem._id}</p>
                    </div>
                 </div>
                 <button onClick={() => !isProcessing && setSelectedItem(null)} className="w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-400 hover:text-slate-900 transition-all rounded-2xl active:scale-90 hover:shadow-md border border-slate-100">
                    <X size={24} />
                 </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-12 space-y-10 custom-scrollbar">
                 <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-slate-900 leading-[1.1] tracking-tight">{selectedItem.title}</h2>
                    <div className="flex items-center gap-4 pt-2">
                       <span className={`px-4 py-2 rounded-2xl text-[10px] font-bold uppercase border shadow-sm ${getStatusColor(selectedItem.status)}`}>
                         {selectedItem.status}
                       </span>
                       <span className={`text-[11px] font-extrabold uppercase tracking-widest ${getPriorityColor(selectedItem.priority)}`}>
                         {selectedItem.priority} PRIORITY
                       </span>
                    </div>
                 </div>

                 <div className="bg-slate-50/50 rounded-[2rem] p-8 space-y-5 border border-slate-100 shadow-inner">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em]">Initial Briefing</h4>
                    <p className="text-base text-slate-600 leading-relaxed font-medium">{selectedItem.description}</p>
                 </div>

                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em]">Information Node</h4>
                       <div className="flex items-center gap-4 bg-white p-4 rounded-[1.5rem] border border-slate-100 shadow-sm">
                          <div className="w-12 h-12 bg-indigo-50 rounded-xl border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">
                             {selectedItem.user?.name?.charAt(0) || 'U'}
                          </div>
                          <div>
                             <p className="text-sm font-bold text-slate-900">{selectedItem.user?.name || 'Anonymous'}</p>
                             <p className="text-[10px] font-medium text-slate-400 font-mono tracking-tighter">{selectedItem.user?.email || 'N/A'}</p>
                          </div>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em]">Geospatial Point</h4>
                       <div className="flex items-start gap-3 bg-white p-4 rounded-[1.5rem] border border-slate-100 shadow-sm min-h-[5rem]">
                          <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center shrink-0 border border-rose-100">
                             <MapPin size={20} className="text-rose-600" />
                          </div>
                          <p className="text-xs font-bold text-slate-700 leading-snug">{selectedItem.location?.address || 'Pinned Location'}</p>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-6 pt-8 border-t border-slate-100">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em]">Response Protocol</h4>
                    <div className="grid grid-cols-2 gap-4">
                       {selectedItem.status !== 'Resolved' ? (
                         <>
                            <button 
                              onClick={() => handleStatusUpdate(selectedItem._id, 'Assigned')}
                              disabled={isProcessing}
                              className={`flex items-center justify-center gap-3 py-4.5 bg-slate-900 text-white rounded-[1.25rem] text-sm font-bold shadow-xl shadow-slate-200 transition-all active:scale-95 ${isProcessing ? 'opacity-70' : 'hover:bg-slate-800'}`}
                            >
                               {isProcessing ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <UserIcon size={18} />}
                               {isProcessing ? 'SYNCHRONIZING' : 'ASSIGN OFFICIAL'}
                            </button>
                            <button 
                              onClick={() => handleStatusUpdate(selectedItem._id, 'Resolved')}
                              disabled={isProcessing}
                              className="flex items-center justify-center gap-3 py-4.5 bg-emerald-600 text-white rounded-[1.25rem] text-sm font-bold shadow-xl shadow-emerald-100 transition-all hover:bg-emerald-700 active:scale-95"
                            >
                               <Check size={18} /> RESOLVE TICKET
                            </button>
                         </>
                       ) : (
                         <div className="col-span-2 bg-emerald-50 border border-emerald-100 p-6 rounded-[1.5rem] flex items-center gap-4 shadow-sm animate-in zoom-in-95 duration-500">
                            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shrink-0 shadow-inner">
                               <Check size={28} />
                            </div>
                            <div>
                               <p className="text-sm font-bold text-emerald-900 uppercase tracking-tight">Case Cleared</p>
                               <p className="text-xs text-emerald-700 font-medium">This incident has been archived and resolved successfully.</p>
                            </div>
                         </div>
                       )}
                    </div>
                 </div>
              </div>

              <div className="p-10 bg-slate-50/50 border-t border-slate-100 mt-auto">
                 <button className="w-full flex items-center justify-center gap-3 py-4.5 bg-white text-indigo-600 border border-indigo-100 rounded-[1.5rem] text-sm font-bold hover:bg-white hover:shadow-xl hover:shadow-indigo-50 transition-all active:scale-[0.98]">
                    <ExternalLink size={18} /> INTERFACE WITH LIVE MAP
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Complaints;

import React, { useState, useMemo } from 'react';
import { Search, Filter, MoreVertical, Download, ChevronRight, MapPin, Clock, Tag, X, User, ExternalLink, MessageSquare, Check, AlertCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const mockComplaints = [
  { id: 'RES-9801', title: 'Massive pipe burst flooding main road', department: 'Water & Supply', status: 'In Progress', priority: 'High', date: '2 hours ago', timestamp: Date.now() - 2 * 60 * 60 * 1000, location: 'Koramangala 4th Block', reporter: 'Anita Kumar', phone: '+91 98321 44321', desc: 'Water is gushing out from a 4-inch pipe since 8 AM today.' },
  { id: 'RES-9705', title: 'Streetlight Pole #4521 dead', department: 'Electrical', status: 'Resolved', priority: 'Low', date: '5 hours ago', timestamp: Date.now() - 5 * 60 * 60 * 1000, location: 'HSR Layout Sector 2', reporter: 'Siddharth M.', phone: '+91 77651 22312', desc: 'Pole number 4521 has been inactive for three nights.' },
  { id: 'RES-9692', title: 'Garbage accumulation near park entrance', department: 'Sanitation', status: 'Pending', priority: 'Medium', date: '1 day ago', timestamp: Date.now() - 24 * 60 * 60 * 1000, location: 'Indiranagar 100ft Rd', reporter: 'Ramesh Singh', phone: '+91 88902 11234', desc: 'Garbage pile is getting larger every day.' },
  { id: 'RES-9688', title: 'Deep pothole causing bike accidents', department: 'Roads', status: 'Assigned', priority: 'Critical', date: '1 day ago', timestamp: Date.now() - 25 * 60 * 60 * 1000, location: 'Sarjapur Main Road', reporter: 'Priya K.', phone: '+91 99001 55678', desc: 'Huge pothole right after the turn near Wipro gate.' },
  { id: 'RES-9684', title: 'Broken drainage cover on sidewalk', department: 'Water & Supply', status: 'Pending', priority: 'Medium', date: '2 days ago', timestamp: Date.now() - 48 * 60 * 60 * 1000, location: 'BTM Layout 2nd Stage', reporter: 'Karan J.', phone: '+91 91234 56789', desc: 'Crawl space drainage cover is broken.' },
  { id: 'RES-9600', title: 'Illegal sewage connection detected', department: 'Sanitation', status: 'In Progress', priority: 'High', date: '4 days ago', timestamp: Date.now() - 96 * 60 * 60 * 1000, location: 'Whitefield Main Rd', reporter: 'Suresh L.', phone: '+91 99887 76655', desc: 'Illegal connection from commercial complex.' },
  { id: 'RES-9550', title: 'Street flooding due to blocked drain', department: 'Water & Supply', status: 'Assigned', priority: 'High', date: '6 days ago', timestamp: Date.now() - 144 * 60 * 60 * 1000, location: 'Electronic City Ph 1', reporter: 'Megha R.', phone: '+91 99443 32211', desc: 'Road is submerged after light rain.' },
  { id: 'RES-9400', title: 'Old tree branch touching power lines', department: 'Electrical', status: 'Pending', priority: 'Critical', date: '10 days ago', timestamp: Date.now() - 240 * 60 * 60 * 1000, location: 'Jayanagar 4th Block', reporter: 'Vikas G.', phone: '+91 98866 55443', desc: 'Sparks occurring during wind.' },
];

const Complaints: React.FC = () => {
  const [complaints, setComplaints] = useState(mockComplaints);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('All Departments');
  const [filterDate, setFilterDate] = useState('Last 7 Days');
  const [filterPriority, setFilterPriority] = useState('All Priority');
  const [selectedItem, setSelectedItem] = useState<typeof mockComplaints[0] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const departments = ['All Departments', 'Water & Supply', 'Electrical', 'Sanitation', 'Roads', 'Public Health'];
  const priorities = ['All Priority', 'Critical', 'High', 'Medium', 'Low'];
  const dates = ['Last 24 Hours', 'Last 7 Days', 'Last 30 Days', 'All Time'];

  const filteredComplaints = useMemo(() => {
    return complaints.filter(item => {
      const matchesTab = activeTab === 'all' || item.status.toLowerCase() === activeTab;
      const matchesDept = filterDept === 'All Departments' || item.department === filterDept;
      const matchesPriority = filterPriority === 'All Priority' || item.priority === filterPriority;
      
      // Date logic with buffer and safety
      let matchesDate = true;
      if (item.timestamp) {
        const now = Date.now();
        const hourBuffer = 60 * 60 * 1000;
        if (filterDate === 'Last 24 Hours') matchesDate = (now - item.timestamp) <= (24 * 60 * 60 * 1000 + hourBuffer);
        else if (filterDate === 'Last 7 Days') matchesDate = (now - item.timestamp) <= (7 * 24 * 60 * 60 * 1000 + hourBuffer);
        else if (filterDate === 'Last 30 Days') matchesDate = (now - item.timestamp) <= (30 * 24 * 60 * 60 * 1000 + hourBuffer);
      }
      
      const matchesSearch = item.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.location.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTab && matchesSearch && matchesDept && matchesPriority && matchesDate;
    });
  }, [activeTab, searchTerm, filterDept, filterPriority, filterDate, complaints]);

  const handleExport = () => {
    const headers = ['ID', 'Title', 'Department', 'Status', 'Priority', 'Location', 'Date', 'Reporter', 'Phone', 'Description'];
    const csvRows = [
      headers.join(','),
      ...filteredComplaints.map(c => [
        c.id, 
        `"${c.title.replace(/"/g, '""')}"`, 
        c.department, 
        c.status, 
        c.priority, 
        `"${c.location.replace(/"/g, '""')}"`, 
        c.date,
        `"${c.reporter || ''}"`,
        `"${c.phone || ''}"`,
        `"${(c.desc || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`
      ].join(','))
    ];

    const csvString = csvRows.join('\n');
    // Add UTF-8 BOM for Excel compatibility
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `resolyn_complaints_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleStatusUpdate = (id: string, newStatus: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      setComplaints(prev => prev.map(c => 
        c.id === id ? { ...c, status: newStatus } : c
      ));
      if (selectedItem?.id === id) {
        setSelectedItem(prev => prev ? { ...prev, status: newStatus } : null);
      }
      setIsProcessing(false);
    }, 800);
  };

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
    <div className="max-w-[1600px] mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 relative px-2 md:px-6">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 pt-4 pb-4 transition-all">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-[#0f172a] tracking-tight leading-none">Complaint Intelligence</h1>
          <p className="text-slate-500 font-medium text-sm flex items-center gap-2">
            <Filter size={14} className="text-indigo-500" />
            Advanced operational control & official dispatching
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          {/* Search */}
          <div className={`relative transition-all duration-300 ${isSearchFocused ? 'w-full xl:w-80' : 'w-full xl:w-64'}`}>
            <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${isSearchFocused ? 'text-indigo-500' : 'text-slate-400'}`} size={16} />
            <input 
              type="text" 
              placeholder="Search ID, title, area..."
              value={searchTerm}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium shadow-sm"
            />
          </div>

          {/* New Filters */}
          <div className="flex items-center gap-2 relative z-20 overflow-visible">
             
             {/* Date Filter */}
             <div className="relative z-30">
                <button 
                  onClick={() => setOpenDropdown(openDropdown === 'date' ? null : 'date')}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-700 shadow-sm hover:border-indigo-500 transition-all whitespace-nowrap"
                >
                  <Clock size={14} className="text-slate-400" />
                  {filterDate}
                  <ChevronDown size={14} className={`transition-transform duration-300 ${openDropdown === 'date' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openDropdown === 'date' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 5, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full left-0 w-48 bg-white border border-slate-100 rounded-2xl shadow-2xl z-[100] p-2 overflow-hidden"
                    >
                      {dates.map(date => (
                        <button 
                          key={date}
                          onClick={() => { setFilterDate(date); setOpenDropdown(null); }}
                          className={`w-full text-left px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterDate === date ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                        >
                          {date}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>

             {/* Department Filter */}
             <div className="relative z-30">
                <button 
                  onClick={() => setOpenDropdown(openDropdown === 'dept' ? null : 'dept')}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-700 shadow-sm hover:border-indigo-500 transition-all whitespace-nowrap"
                >
                  <Tag size={14} className="text-slate-400" />
                  {filterDept}
                  <ChevronDown size={14} className={`transition-transform duration-300 ${openDropdown === 'dept' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openDropdown === 'dept' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 5, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full left-0 w-56 bg-white border border-slate-100 rounded-2xl shadow-2xl z-[100] p-2"
                    >
                      {departments.map(dept => (
                        <button 
                          key={dept}
                          onClick={() => { setFilterDept(dept); setOpenDropdown(null); }}
                          className={`w-full text-left px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterDept === dept ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                        >
                          {dept}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>

             {/* Priority Filter */}
             <div className="relative z-30">
                <button 
                  onClick={() => setOpenDropdown(openDropdown === 'priority' ? null : 'priority')}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-700 shadow-sm hover:border-indigo-500 transition-all whitespace-nowrap"
                >
                  <AlertCircle size={14} className="text-slate-400" />
                  {filterPriority}
                  <ChevronDown size={14} className={`transition-transform duration-300 ${openDropdown === 'priority' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openDropdown === 'priority' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 5, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full left-0 w-48 bg-white border border-slate-100 rounded-2xl shadow-2xl z-[100] p-2"
                    >
                      {priorities.map(p => (
                        <button 
                          key={p}
                          onClick={() => { setFilterPriority(p); setOpenDropdown(null); }}
                          className={`w-full text-left px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterPriority === p ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                        >
                          {p}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>

             <button 
                onClick={handleExport}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all whitespace-nowrap"
             >
               <Download size={14} />
               Export Report
             </button>
          </div>
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
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="bg-slate-50/10 border-b border-slate-50">
                <th className="w-[35%] px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Incident Details</th>
                <th className="w-[15%] px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Status</th>
                <th className="w-[15%] px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Priority</th>
                <th className="w-[25%] px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Location Context</th>
                <th className="w-[10%] px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map((complaint) => (
                  <tr key={complaint.id} className="group hover:bg-slate-50/50 transition-all cursor-pointer" onClick={() => setSelectedItem(complaint)}>
                    <td className="px-8 py-7">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-black text-indigo-600 bg-indigo-50/50 w-fit px-2 py-0.5 rounded-md uppercase tracking-widest border border-indigo-100/50">{complaint.id}</span>
                        <span className="font-black text-slate-900 text-sm tracking-tight group-hover:text-indigo-600 transition-colors uppercase truncate pr-4">{complaint.title}</span>
                      </div>
                    </td>
                    <td className="px-8 py-7 text-center">
                      <span className={`inline-flex px-3 py-1 rounded-xl text-[10px] font-black uppercase border transition-all shadow-sm ${getStatusColor(complaint.status)}`}>
                        {complaint.status}
                      </span>
                    </td>
                    <td className="px-8 py-7 text-center">
                      <span className={`text-[11px] font-black uppercase tracking-wider ${getPriorityColor(complaint.priority)}`}>
                        {complaint.priority}
                      </span>
                    </td>
                    <td className="px-8 py-7">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-50 w-fit px-2 py-1 rounded-lg border border-slate-100">
                          <MapPin size={10} className="text-rose-500" /> {complaint.location}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
                          <Tag size={10} className="text-slate-300" /> {complaint.department}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-7 text-right">
                      <button 
                         className="inline-flex w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-xl items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:border-indigo-100 group-hover:shadow-lg transition-all active:scale-90"
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
                       <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em]">No results found for current criteria</p>
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
                        <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-[0.23em] mt-1 bg-indigo-50 px-2 py-0.5 rounded-full inline-block">{selectedItem.id}</p>
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
                    <p className="text-base text-slate-600 leading-relaxed font-medium">{selectedItem.desc}</p>
                 </div>

                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em]">Information Node</h4>
                       <div className="flex items-center gap-4 bg-white p-4 rounded-[1.5rem] border border-slate-100 shadow-sm">
                          <div className="w-12 h-12 bg-indigo-50 rounded-xl border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">
                             {selectedItem.reporter.charAt(0)}
                          </div>
                          <div>
                             <p className="text-sm font-bold text-slate-900">{selectedItem.reporter}</p>
                             <p className="text-[10px] font-medium text-slate-400 font-mono tracking-tighter">{selectedItem.phone}</p>
                          </div>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em]">Geospatial Point</h4>
                       <div className="flex items-start gap-3 bg-white p-4 rounded-[1.5rem] border border-slate-100 shadow-sm min-h-[5rem]">
                          <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center shrink-0 border border-rose-100">
                             <MapPin size={20} className="text-rose-600" />
                          </div>
                          <p className="text-xs font-bold text-slate-700 leading-snug">{selectedItem.location}</p>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-6 pt-8 border-t border-slate-100">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em]">Response Protocol</h4>
                    <div className="grid grid-cols-2 gap-4">
                       {selectedItem.status !== 'Resolved' ? (
                         <>
                            <button 
                              onClick={() => handleStatusUpdate(selectedItem.id, 'Assigned')}
                              disabled={isProcessing}
                              className={`flex items-center justify-center gap-3 py-4.5 bg-slate-900 text-white rounded-[1.25rem] text-sm font-bold shadow-xl shadow-slate-200 transition-all active:scale-95 ${isProcessing ? 'opacity-70' : 'hover:bg-slate-800'}`}
                            >
                               {isProcessing ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <User size={18} />}
                               {isProcessing ? 'SYNCHRONIZING' : 'ASSIGN OFFICIAL'}
                            </button>
                            <button 
                              onClick={() => handleStatusUpdate(selectedItem.id, 'Resolved')}
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

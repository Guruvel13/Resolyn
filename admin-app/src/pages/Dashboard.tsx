import React, { useState, useMemo, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell
} from 'recharts';
import { 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Users as UsersIcon, 
  ArrowUpRight, 
  TrendingUp, 
  Calendar,
  ChevronDown,
  Download,
  Filter,
  MoreVertical,
  Activity,
  Smile,
  ShieldCheck,
  CreditCard,
  Package,
  Cpu,
  Trophy,
  AlertTriangle,
  History,
  Timer,
  ArrowRight,
  Search,
  Map as MapIcon,
  ChevronRight,
  MoreHorizontal,
  LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../services/api';

// --- MOCK DATA FOR CHARTS (until backend provides them) ---
const trendData = [
  { name: 'Mon', new: 45, resolved: 38 },
  { name: 'Tue', new: 52, resolved: 45 },
  { name: 'Wed', new: 48, resolved: 50 },
  { name: 'Thu', new: 61, resolved: 55 },
  { name: 'Fri', new: 55, resolved: 58 },
  { name: 'Sat', new: 32, resolved: 40 },
  { name: 'Sun', new: 28, resolved: 35 },
];

const departmentWorkload = [
  { name: 'Water', count: 320, time: 2.8 },
  { name: 'Roads', count: 210, time: 3.5 },
  { name: 'Electricity', count: 450, time: 1.2 },
  { name: 'Sanitation', count: 180, time: 1.8 },
  { name: 'Public Health', count: 140, time: 2.2 },
];

const priorityData = [
  { name: 'High', value: 280, color: '#ef4444' },
  { name: 'Medium', value: 650, color: '#f59e0b' },
  { name: 'Low', value: 552, color: '#10b981' },
];

const recentComplaintsMock = [
  { id: 'RES-9012', dept: 'Electrical', status: 'In Progress', priority: 'High', date: '2024-03-18', timestamp: Date.now() - 3600000, time: '-' },
  { id: 'RES-8945', dept: 'Water & Supply', status: 'Resolved', priority: 'Medium', date: '2024-03-17', timestamp: Date.now() - 86400000, time: '2.4 Days' },
  { id: 'RES-8821', dept: 'Roads', status: 'Pending', priority: 'High', date: '2024-03-18', timestamp: Date.now() - 172800000, time: '-' },
  { id: 'RES-8710', dept: 'Sanitation', status: 'Resolved', priority: 'Low', date: '2024-03-16', timestamp: Date.now() - 259200000, time: '1.2 Days' },
  { id: 'RES-8633', dept: 'Public Health', status: 'Overdue', priority: 'High', date: '2024-03-12', timestamp: Date.now() - 604800000, time: '-' },
];

const Dashboard: React.FC = () => {
  const [statsData, setStatsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filterDept, setFilterDept] = useState('All Departments');
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [filterDate, setFilterDate] = useState('Last 7 Days');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const departments = ['All Departments', 'Water & Supply', 'Electrical', 'Sanitation', 'Roads', 'Public Health'];
  const statuses = ['All Status', 'Resolved', 'In Progress', 'Pending', 'Overdue'];
  const dates = ['Last 24 Hours', 'Last 7 Days', 'Last 30 Days', 'All Time'];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.get('/complaints/stats');
        setStatsData(data);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const kpiData = useMemo(() => {
    if (!statsData) return [
      { label: 'Total Complaints', value: '1,482', change: '+12%', icon: <Activity size={18} />, color: '#6366f1', trend: 'up' },
      { label: 'Resolved Complaints', value: '1,120', change: '+18%', icon: <CheckCircle2 size={18} />, color: '#10b981', trend: 'up' },
      { label: 'Pending Complaints', value: '362', change: '-5%', icon: <Clock size={18} />, color: '#f59e0b', trend: 'down' },
      { label: 'Avg. Resolution Time', value: '2.4 Days', change: '-12%', icon: <Timer size={18} />, color: '#8b5cf6', trend: 'down' },
      { label: 'Overdue Complaints', value: '42', change: '+4', icon: <AlertTriangle size={18} />, color: '#ef4444', trend: 'up' },
      { label: 'Today (New)', value: '28', change: '+8%', icon: <ShieldCheck size={18} />, color: '#3b82f6', trend: 'up' },
    ];

    return [
      { label: 'Total Reports', value: statsData.total?.toString() || '0', change: '+12%', icon: <Activity size={18} />, color: '#6366f1', trend: 'up' },
      { label: 'Resolved Cases', value: statsData.resolved?.toString() || '0', change: '+18%', icon: <CheckCircle2 size={18} />, color: '#10b981', trend: 'up' },
      { label: 'Pending Issues', value: statsData.pending?.toString() || '0', change: '-5%', icon: <Clock size={18} />, color: '#f59e0b', trend: 'down' },
      { label: 'In Progress', value: statsData.inProgress?.toString() || '0', change: '+4', icon: <History size={18} />, color: '#8b5cf6', trend: 'up' },
      { label: 'Health Score', value: '94%', change: '+2%', icon: <Smile size={18} />, color: '#3b82f6', trend: 'up' },
      { label: 'Efficiency', value: '2.4d', change: '-12%', icon: <Timer size={18} />, color: '#6366f1', trend: 'down' },
    ];
  }, [statsData]);

  const filteredRecentComplaints = useMemo(() => {
    // Combine mock data with real activity if possible, or just use mock for now for the detailed table
    return recentComplaintsMock.filter(item => {
      const matchesDept = filterDept === 'All Departments' || item.dept === filterDept;
      const matchesStatus = filterStatus === 'All Status' || item.status === filterStatus;
      
      let matchesDate = true;
      if (item.timestamp) {
        const now = Date.now();
        const hourBuffer = 60 * 60 * 1000;
        if (filterDate === 'Last 24 Hours') matchesDate = (now - item.timestamp) <= (24 * 60 * 60 * 1000 + hourBuffer);
        else if (filterDate === 'Last 7 Days') matchesDate = (now - item.timestamp) <= (7 * 24 * 60 * 60 * 1000 + hourBuffer);
        else if (filterDate === 'Last 30 Days') matchesDate = (now - item.timestamp) <= (30 * 24 * 60 * 60 * 1000 + hourBuffer);
      }

      const matchesSearch = item.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.dept.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesDept && matchesStatus && matchesSearch && matchesDate;
    });
  }, [filterDept, filterStatus, filterDate, searchTerm]);

  const statusData = useMemo(() => {
    if (!statsData) return [
      { name: 'Resolved', value: 1120, color: '#10b981' },
      { name: 'In Progress', value: 240, color: '#6366f1' },
      { name: 'Pending', value: 122, color: '#f59e0b' },
    ];
    return [
      { name: 'Resolved', value: statsData.resolved || 0, color: '#10b981' },
      { name: 'In Progress', value: statsData.inProgress || 0, color: '#6366f1' },
      { name: 'Pending', value: statsData.pending || 0, color: '#f59e0b' },
    ];
  }, [statsData]);

  const handleExport = () => {
    const headers = ['ID', 'Department', 'Status', 'Priority', 'Date', 'Resolution Time'];
    const csvRows = [
      headers.join(','),
      ...filteredRecentComplaints.map(c => [
        c.id, 
        c.dept, 
        c.status, 
        c.priority, 
        c.date, 
        c.time
      ].join(','))
    ];

    const csvString = csvRows.join('\n');
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `executive_summary_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-md p-4 border border-slate-100 shadow-xl rounded-2xl animate-in zoom-in-95 duration-300">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-50 pb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-3 py-1">
              <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: entry.color }}></div>
              <p className="text-xs font-bold text-slate-900">
                {entry.name}: <span className="ml-2 text-indigo-600">{entry.value}</span>
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 animate-in fade-in duration-1000 min-h-screen pb-20 px-2 md:px-6">
      
      {/* 1. HEADER & FILTERS */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 pt-8 pb-4 transition-all">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-[#0f172a] tracking-tight leading-none">Executive Intelligence</h1>
          <p className="text-slate-500 font-medium text-sm flex items-center gap-2">
            <Activity size={14} className="text-indigo-500 animate-pulse" />
            Real-time operational overview across all divisions
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          {/* Search */}
          <div className={`relative transition-all duration-300 ${isSearchFocused ? 'w-full xl:w-80' : 'w-full xl:w-64'}`}>
            <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${isSearchFocused ? 'text-indigo-500' : 'text-slate-400'}`} size={16} />
            <input 
              type="text" 
              placeholder="Search complaints, IDs..."
              value={searchTerm}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium shadow-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 relative overflow-visible z-20">
             
             {/* Date Dropdown */}
             <div className="relative z-30">
                <button 
                  onClick={() => setOpenDropdown(openDropdown === 'date' ? null : 'date')}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-700 shadow-sm hover:border-indigo-500 transition-all whitespace-nowrap"
                >
                  <Calendar size={14} className="text-slate-400" />
                  {filterDate}
                  <ChevronDown size={14} className={`transition-transform duration-300 ${openDropdown === 'date' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openDropdown === 'date' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 5, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full left-0 w-48 bg-white border border-slate-100 rounded-2xl shadow-2xl z-[100] p-2"
                    >
                      {dates.map(d => (
                        <button 
                          key={d}
                          onClick={() => { setFilterDate(d); setOpenDropdown(null); }}
                          className={`w-full text-left px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterDate === d ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                        >
                          {d}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>

             {/* Dept Dropdown */}
             <div className="relative z-30">
                <button 
                  onClick={() => setOpenDropdown(openDropdown === 'dept' ? null : 'dept')}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-700 shadow-sm hover:border-indigo-500 transition-all whitespace-nowrap"
                >
                  <Filter size={14} className="text-slate-400" />
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

             {/* Status Dropdown */}
             <div className="relative z-30">
                <button 
                  onClick={() => setOpenDropdown(openDropdown === 'status' ? null : 'status')}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-700 shadow-sm hover:border-indigo-500 transition-all whitespace-nowrap"
                >
                  <LayoutGrid size={14} className="text-slate-400" />
                  {filterStatus}
                  <ChevronDown size={14} className={`transition-transform duration-300 ${openDropdown === 'status' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openDropdown === 'status' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 5, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full left-0 w-48 bg-white border border-slate-100 rounded-2xl shadow-2xl z-[100] p-2"
                    >
                      {statuses.map(s => (
                        <button 
                          key={s}
                          onClick={() => { setFilterStatus(s); setOpenDropdown(null); }}
                          className={`w-full text-left px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterStatus === s ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                        >
                          {s}
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

      {/* 2. KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        {kpiData.map((kpi, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="group relative bg-white p-6 rounded-[1.75rem] border border-slate-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] overflow-hidden cursor-default"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                {kpi.icon}
              </div>
              <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black border transition-all ${
                kpi.trend === 'up' && i !== 2 && i !== 3 && i !== 4 ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                (kpi.trend === 'down' && (i === 2 || i === 3)) ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                'bg-rose-50 text-rose-600 border-rose-100'
              }`}>
                {kpi.trend === 'up' ? <TrendingUp size={10} /> : <TrendingUp size={10} className="rotate-180" />}
                {kpi.change}
              </div>
            </div>
            
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5 leading-none">{kpi.label}</p>
              <h3 className="text-2xl font-black text-[#0f172a] tracking-tight">{loading ? '...' : kpi.value}</h3>
            </div>

            <div 
              className="absolute -right-4 -bottom-4 w-16 h-16 blur-[40px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
              style={{ backgroundColor: kpi.color }}
            ></div>
          </motion.div>
        ))}
      </div>

      {/* 3. MAIN ANALYTICS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* A. Resolution Velocity */}
        <div className="xl:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Resolution Velocity</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Daily trend of incoming vs resolved cases</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>
                <span className="text-[10px] font-black text-slate-500 uppercase">Incoming</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                <span className="text-[10px] font-black text-slate-500 uppercase">Resolved</span>
              </div>
            </div>
          </div>
          
          <div className="h-80 w-full mt-4 min-w-0 relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dx={-10} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="new" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorNew)" />
                <Area type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRes)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* B. System Health */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col">
          <div className="mb-8">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">System Health</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Status efficiency ratio</p>
          </div>
          
          <div className="h-64 w-full relative min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  cornerRadius={10}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total</p>
               <p className="text-2xl font-black text-slate-900 leading-none">{loading ? '...' : statsData?.total || '1,482'}</p>
            </div>
          </div>

          <div className="space-y-3 mt-auto">
            {statusData.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100/50">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-xs font-bold text-slate-600">{item.name}</span>
                </div>
                <span className="text-xs font-black text-slate-900">
                  {loading ? '...' : (item.value && statsData?.total ? ((item.value/statsData.total)*100).toFixed(0) : '0')}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* C. Divisional Load */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Divisional Load</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Volume by department</p>
            </div>
            <button className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-900 hover:text-white transition-all">
              <MoreHorizontal size={18} />
            </button>
          </div>
          
          <div className="h-64 w-full relative min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentWorkload} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} width={80} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#6366f1" radius={[0, 10, 10, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* D. Resolution Efficiency */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Resolution Efficiency</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Avg days per division</p>
            </div>
            <button className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-900 hover:text-white transition-all">
              <Timer size={18} />
            </button>
          </div>
          
          <div className="h-64 w-full relative min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentWorkload}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dx={-10} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="time" fill="#f59e0b" radius={[10, 10, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* E. Priority Matrix */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="mb-8">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Priority Matrix</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Urgency distribution</p>
          </div>
          <div className="h-64 w-full relative min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={60}
                  cornerRadius={5}
                  dataKey="value"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
             {priorityData.map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }}></div>
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{p.name}</span>
                </div>
             ))}
          </div>
        </div>

      </div>

      {/* 4. RECENT ACTIVITY (FEED) AND OPERATIONS TABLE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Activity Feed (New from Main) */}
        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <div>
                 <h3 className="text-xl font-black text-slate-900 tracking-tight">Live Intelligence</h3>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time system events</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                 <History size={18} />
              </div>
           </div>

           <div className="space-y-6">
              {(statsData?.recentActivity || [
                { type: 'incident', title: 'Power outage reported in Sector 4', time: '12 mins ago', status: 'critical' },
                { type: 'official', title: 'Officer Rajesh assigned to Case #892', time: '45 mins ago', status: 'update' },
                { type: 'resolved', title: 'Water leak in BTM Layout resolved', time: '2 hours ago', status: 'success' },
                { type: 'system', title: 'Satellite Telemetry stream synchronized', time: '4 hours ago', status: 'info' }
              ]).map((item: any, idx: number) => (
                 <div key={idx} className="flex items-start gap-4 group/item cursor-pointer">
                    <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
                       item.status === 'critical' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]' : 
                       item.status === 'success' ? 'bg-emerald-500' : 
                       item.status === 'update' ? 'bg-indigo-500' : 'bg-slate-300'
                    }`}></div>
                    <div className="space-y-1 pb-6 border-b border-slate-50 last:border-0 w-full">
                       <p className="text-xs font-bold text-slate-900 group-hover/item:text-indigo-600 transition-colors">{item.title}</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.time}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* Operations Table */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
           <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Recent Operations</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Live complaint log feed</p>
              </div>
              <div className="flex gap-2">
                 <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-900 hover:text-white transition-all"><Filter size={18} /></button>
                 <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-900 hover:text-white transition-all"><Search size={18} /></button>
              </div>
           </div>

           <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-slate-50/50">
                       <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID</th>
                       <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Division</th>
                       <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                       <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority</th>
                       <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Resolution</th>
                    </tr>
                 </thead>
                  <tbody className="divide-y divide-slate-50">
                     {filteredRecentComplaints.map((c, i) => (
                        <tr key={i} className="group hover:bg-slate-50/50 transition-all cursor-pointer">
                           <td className="px-8 py-5">
                              <span className="text-xs font-black text-slate-900 group-hover:text-indigo-600 transition-colors">#{c.id}</span>
                              <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tight">{c.date}</p>
                           </td>
                           <td className="px-8 py-5">
                              <div className="flex items-center gap-2">
                                 <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                                 <span className="text-xs font-bold text-slate-600">{c.dept}</span>
                              </div>
                           </td>
                           <td className="px-8 py-5">
                              <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-tight shadow-sm border ${
                                 c.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                 c.status === 'In Progress' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                                 c.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                 'bg-rose-50 text-rose-600 border-rose-100'
                              }`}>
                                 {c.status}
                              </span>
                           </td>
                           <td className="px-8 py-5">
                              <div className="flex items-center gap-2">
                                 <div className={`w-2 h-2 rounded-full ${
                                    c.priority === 'High' ? 'bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]' :
                                    c.priority === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                                 }`}></div>
                                 <span className="text-xs font-bold text-slate-600">{c.priority}</span>
                              </div>
                           </td>
                           <td className="px-8 py-5">
                              {c.time !== '-' ? (
                                 <div className="flex items-center gap-2 text-emerald-600">
                                    <Clock size={12} />
                                    <span className="text-xs font-black">{c.time}</span>
                                 </div>
                              ) : (
                                 <span className="text-xs font-black text-slate-300">N/A</span>
                              )}
                           </td>
                        </tr>
                     ))}
                  </tbody>
              </table>
           </div>

           <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Activity Log</p>
              <div className="flex gap-2">
                 <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-900 hover:shadow-md transition-all">Previous</button>
                 <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-900 hover:shadow-md transition-all">Next</button>
              </div>
           </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;

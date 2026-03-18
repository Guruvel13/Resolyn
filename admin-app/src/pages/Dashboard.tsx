import React, { useState, useMemo } from 'react';
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
  Cell,
  LineChart,
  Line,
  Legend
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
  MoreHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MOCK DATA ---
const kpiData = [
  { label: 'Total Complaints', value: '1,482', change: '+12%', icon: <Activity size={18} />, color: '#6366f1', trend: 'up' },
  { label: 'Resolved Complaints', value: '1,120', change: '+18%', icon: <CheckCircle2 size={18} />, color: '#10b981', trend: 'up' },
  { label: 'Pending Complaints', value: '362', change: '-5%', icon: <Clock size={18} />, color: '#f59e0b', trend: 'down' },
  { label: 'Avg. Resolution Time', value: '2.4 Days', change: '-12%', icon: <Timer size={18} />, color: '#8b5cf6', trend: 'down' },
  { label: 'Overdue Complaints', value: '42', change: '+4', icon: <AlertTriangle size={18} />, color: '#ef4444', trend: 'up' },
  { label: 'Today (New)', value: '28', change: '+8%', icon: <ShieldCheck size={18} />, color: '#3b82f6', trend: 'up' },
];

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

const statusData = [
  { name: 'Resolved', value: 1120, color: '#10b981' },
  { name: 'In Progress', value: 240, color: '#6366f1' },
  { name: 'Pending', value: 122, color: '#f59e0b' },
];

const priorityData = [
  { name: 'High', value: 280, color: '#ef4444' },
  { name: 'Medium', value: 650, color: '#f59e0b' },
  { name: 'Low', value: 552, color: '#10b981' },
];

const leaderboard = [
  { rank: 1, name: 'Electricity', time: '1.2 Days', rate: '98%', color: 'indigo' },
  { rank: 2, name: 'Sanitation', time: '1.8 Days', rate: '94%', color: 'emerald' },
  { rank: 3, name: 'Public Health', time: '2.2 Days', rate: '91%', color: 'blue' },
];

const recentComplaints = [
  { id: 'RES-9012', dept: 'Electricity', status: 'In Progress', priority: 'High', date: '2024-03-18', time: '-' },
  { id: 'RES-8945', dept: 'Water', status: 'Resolved', priority: 'Medium', date: '2024-03-17', time: '2.4 Days' },
  { id: 'RES-8821', dept: 'Roads', status: 'Pending', priority: 'High', date: '2024-03-18', time: '-' },
  { id: 'RES-8710', dept: 'Sanitation', status: 'Resolved', priority: 'Low', date: '2024-03-16', time: '1.2 Days' },
  { id: 'RES-8633', dept: 'Public Health', status: 'Overdue', priority: 'High', date: '2024-03-12', time: '-' },
];

const Dashboard: React.FC = () => {
  const [filterDept, setFilterDept] = useState('All Departments');
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="space-y-10 animate-in fade-in duration-1000 bg-slate-50/10 min-h-screen pb-20">
      
      {/* 1. HEADER & FILTERS */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pt-6 pb-2 transition-shadow">
        <div>
          <h1 className="text-3xl font-black text-[#0f172a] tracking-tight">Executive Intelligence</h1>
          <p className="text-slate-500 mt-1 font-medium text-sm flex items-center gap-2">
            <Activity size={14} className="text-indigo-500 animate-pulse" />
            Real-time operational overview across all divisions
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Search */}
          <div className={`relative transition-all duration-300 ${isSearchFocused ? 'w-full lg:w-80' : 'w-full lg:w-64'}`}>
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isSearchFocused ? 'text-indigo-500' : 'text-slate-400'}`} size={16} />
            <input 
              type="text" 
              placeholder="Search complaints, IDs..."
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-hide">
             <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-sm hover:border-indigo-500 transition-all whitespace-nowrap">
               <Calendar size={14} className="text-slate-400" />
               Last 7 Days
               <ChevronDown size={14} />
             </button>
             <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-sm hover:border-indigo-500 transition-all whitespace-nowrap">
               <Filter size={14} className="text-slate-400" />
               {filterDept}
               <ChevronDown size={14} />
             </button>
             <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all whitespace-nowrap">
               <Download size={14} />
               Export Report
             </button>
          </div>
        </div>
      </div>

      {/* 2. KPI CARDS (Instant Overview) */}
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
              <h3 className="text-2xl font-black text-[#0f172a] tracking-tight">{kpi.value}</h3>
            </div>

            <div 
              className="absolute -right-4 -bottom-4 w-16 h-16 blur-[40px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
              style={{ backgroundColor: kpi.color }}
            ></div>
          </motion.div>
        ))}
      </div>

      {/* 3. MAIN ANALYTICS (Charts) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* A. Complaint Trends (Line Chart) */}
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
          
          <div className="h-80 w-full mt-4">
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
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', fontSize: '11px', fontWeight: 'bold' }} />
                <Area type="monotone" dataKey="new" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorNew)" />
                <Area type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRes)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* B. Status Distribution (Pie Chart) */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col">
          <div className="mb-8">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">System Health</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Status efficiency ratio</p>
          </div>
          
          <div className="h-64 w-full relative">
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
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total</p>
               <p className="text-2xl font-black text-slate-900 leading-none">1,482</p>
            </div>
          </div>

          <div className="space-y-3 mt-auto">
            {statusData.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100/50">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-xs font-bold text-slate-600">{item.name}</span>
                </div>
                <span className="text-xs font-black text-slate-900">{((item.value/1482)*100).toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* C. Workload & Performance (Bar Charts) */}
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
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentWorkload} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} width={80} />
                <Tooltip />
                <Bar dataKey="count" fill="#6366f1" radius={[0, 10, 10, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

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
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentWorkload}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dx={-10} />
                <Tooltip />
                <Bar dataKey="time" fill="#f59e0b" radius={[10, 10, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="mb-8">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Priority Matrix</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Urgency distribution</p>
          </div>
          <div className="h-64 w-full">
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
                <Tooltip />
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

      {/* 4. OPERATIONAL FEED TABLE */}
      <div className="grid grid-cols-1 gap-8">
        
        {/* Modern Table */}
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
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
                       <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Complaint ID</th>
                       <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Division</th>
                       <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                       <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority</th>
                       <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Resolution</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {recentComplaints.map((c, i) => (
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
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Viewing Page 01 / 15</p>
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

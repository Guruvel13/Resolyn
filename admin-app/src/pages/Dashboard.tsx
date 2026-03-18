import React, { useState, useMemo, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { AlertCircle, CheckCircle2, Clock, Users as UsersIcon, ArrowUpRight, TrendingUp, Calendar } from 'lucide-react';
import { api } from '../services/api';

const timeData = {
  daily: [
    { name: '08:00', reports: 4, resolved: 2 },
    { name: '10:00', reports: 12, resolved: 5 },
    { name: '12:00', reports: 18, resolved: 14 },
    { name: '14:00', reports: 22, resolved: 19 },
    { name: '16:00', reports: 15, resolved: 12 },
    { name: '18:00', reports: 10, resolved: 8 },
    { name: '20:00', reports: 5, resolved: 4 },
  ],
  weekly: [
    { name: 'Mon', reports: 40, resolved: 24 },
    { name: 'Tue', reports: 30, resolved: 13 },
    { name: 'Wed', reports: 20, resolved: 98 },
    { name: 'Thu', reports: 27, resolved: 39 },
    { name: 'Fri', reports: 18, resolved: 48 },
    { name: 'Sat', reports: 23, resolved: 38 },
    { name: 'Sun', reports: 34, resolved: 43 },
  ],
  monthly: [
    { name: 'Jan', reports: 400, resolved: 240 },
    { name: 'Feb', reports: 300, resolved: 210 },
    { name: 'Mar', reports: 520, resolved: 480 },
    { name: 'Apr', reports: 450, resolved: 390 },
    { name: 'May', reports: 600, resolved: 550 },
    { name: 'Jun', reports: 550, resolved: 520 },
  ]
};

const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [isExporting, setIsExporting] = useState(false);
  const [statsData, setStatsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const currentData = useMemo(() => timeData[timeRange], [timeRange]);

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

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 1500);
  };

  const stats = [
    { label: 'Total Reports', value: statsData?.total?.toString() || '0', change: '+12%', icon: <AlertCircle size={20} className="text-amber-500" />, bg: 'bg-amber-50' },
    { label: 'Resolved', value: statsData?.resolved?.toString() || '0', change: '+18%', icon: <CheckCircle2 size={20} className="text-emerald-500" />, bg: 'bg-emerald-50' },
    { label: 'Active Issues', value: statsData?.pending?.toString() || '0', change: '-8%', icon: <Clock size={20} className="text-blue-500" />, bg: 'bg-blue-50' },
    { label: 'In Progress', value: statsData?.inProgress?.toString() || '0', change: '+4', icon: <UsersIcon size={20} className="text-indigo-500" />, bg: 'bg-indigo-50' },
  ];

  const recentActivity = statsData?.recentActivity || [
    { type: 'incident', title: 'Power outage reported in Sector 4', time: '12 mins ago', status: 'critical' },
    { type: 'official', title: 'Officer Rajesh assigned to Case #892', time: '45 mins ago', status: 'update' },
    { type: 'resolved', title: 'Water leak in BTM Layout resolved', time: '2 hours ago', status: 'success' },
    { type: 'system', title: 'Satellite Telemetry stream synchronized', time: '4 hours ago', status: 'info' }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-md p-5 border border-slate-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)] rounded-[1.5rem] animate-in zoom-in-95 duration-300">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">{label} SEGMENT</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-4 py-1.5 first:pt-0">
              <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: entry.color }}></div>
              <p className="text-xs font-bold text-slate-900 tracking-tight">
                {entry.name.toUpperCase()}: <span className="ml-2 text-slate-500 font-mono">{entry.value}</span>
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Command Center</h1>
          <div className="text-slate-400 mt-2 font-medium flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
             Active Intelligence Stream • Sector Alpha-9 Bangalore
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="bg-white p-1.5 rounded-[1.25rem] border border-slate-100 flex shadow-sm">
             {(['daily', 'weekly', 'monthly'] as const).map((range) => (
               <button 
                 key={range}
                 onClick={() => setTimeRange(range)}
                 className={`px-5 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all active:scale-95 ${
                   timeRange === range ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
                 }`}
               >
                 {range}
               </button>
             ))}
          </div>
          <button 
            onClick={handleExport}
            className={`flex items-center gap-2 px-5 py-3.5 bg-white border border-slate-100 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-slate-900 shadow-sm transition-all active:scale-95 ${isExporting ? 'opacity-70 cursor-wait' : 'hover:bg-slate-50 hover:shadow-lg'}`}
          >
            {isExporting ? (
              <div className="w-3.5 h-3.5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div>
            ) : <Calendar size={16} />}
            {isExporting ? 'GENERATING...' : 'EXPORT LOGS'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-100 transition-all group cursor-default">
            <div className="flex items-center justify-between mb-6">
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>{stat.icon}</div>
              <span className={`text-[10px] font-bold px-2 py-1.5 rounded-xl border ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tighter">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] -rotate-12 translate-x-4">
                 <TrendingUp size={120} className="text-indigo-600" />
              </div>
              <div className="flex items-center justify-between mb-10 relative z-10">
                <h3 className="text-lg font-bold text-slate-900 tracking-tight uppercase">Incident Velocity</h3>
                <button className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-2 tracking-widest bg-indigo-50 px-3 py-1.5 rounded-xl transition-all group-hover:px-4">
                  ANALYTICS <ArrowUpRight size={14} />
                </button>
              </div>
              <div className="h-72 w-full relative z-10 transition-transform duration-700 group-hover:scale-[1.02] min-h-[18rem]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={currentData}>
                    <defs>
                      <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dy={15} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dx={-15} />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#6366f1', strokeWidth: 1.5, strokeDasharray: '6 6' }} />
                    <Area type="monotone" dataKey="reports" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorReports)" animationDuration={1500} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative group overflow-hidden">
              <div className="flex items-center justify-between mb-10 relative z-10">
                <h3 className="text-lg font-bold text-slate-900 tracking-tight uppercase">Resolution Quota</h3>
                <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100 tracking-widest">
                  <TrendingUp size={14} /> PEAK PERFORMANCE
                </div>
              </div>
              <div className="h-72 w-full relative z-10 transition-transform duration-700 group-hover:scale-[1.02] min-h-[18rem]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dy={15} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dx={-15} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9', opacity: 0.5 }} />
                    <Bar 
                      dataKey="resolved" 
                      fill="#0f172a" 
                      radius={[10, 10, 0, 0]} 
                      barSize={timeRange === 'daily' ? 40 : timeRange === 'weekly' ? 30 : 20} 
                      animationDuration={1500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col group">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight uppercase">Activity Stream</h3>
              <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 cursor-pointer">
                 <ArrowUpRight size={18} />
              </div>
           </div>
           
           <div className="space-y-6">
              {recentActivity.map((item: any, idx: number) => (
                 <div key={idx} className="flex items-start gap-5 group/item cursor-pointer">
                    <div className={`mt-1 w-2.5 h-2.5 rounded-full shrink-0 group-hover/item:scale-150 transition-transform ${
                       item.status === 'critical' ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]' : 
                       item.status === 'success' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 
                       item.status === 'update' ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.4)]' : 'bg-slate-300 shadow-sm'
                    }`}></div>
                    <div className="space-y-1 pb-6 border-b border-slate-50 last:border-0 w-full group-hover/item:border-slate-100 transition-colors">
                       <p className="text-xs font-bold text-slate-900 line-clamp-1 tracking-tight group-hover/item:text-indigo-600 transition-colors">{item.title}</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.time}</p>
                    </div>
                 </div>
              ))}
           </div>
           
           <button className="w-full mt-auto py-5 bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] rounded-2xl hover:bg-slate-900 hover:text-white transition-all duration-500 border border-transparent active:scale-95">
              Access Full Feed Logs
           </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

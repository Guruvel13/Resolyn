import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { AlertCircle, CheckCircle2, Clock, Users as UsersIcon, ArrowUpRight, TrendingUp, Calendar } from 'lucide-react';

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
  
  const currentData = useMemo(() => timeData[timeRange], [timeRange]);

  const stats = [
    { label: 'Total Reports', value: timeRange === 'daily' ? '86' : timeRange === 'weekly' ? '1,284' : '4,821', change: '+12%', icon: <AlertCircle size={20} className="text-amber-500" />, bg: 'bg-amber-50' },
    { label: 'Resolved', value: timeRange === 'daily' ? '64' : timeRange === 'weekly' ? '842' : '3,910', change: '+18%', icon: <CheckCircle2 size={20} className="text-emerald-500" />, bg: 'bg-emerald-50' },
    { label: 'Avg. Response', value: '4.2h', change: '-8%', icon: <Clock size={20} className="text-blue-500" />, bg: 'bg-blue-50' },
    { label: 'Active Officials', value: '86', change: '+4', icon: <UsersIcon size={20} className="text-indigo-500" />, bg: 'bg-indigo-50' },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-slate-100 shadow-2xl rounded-2xl">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-3 py-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <p className="text-sm font-bold text-slate-900 capitalize">
                {entry.name}: <span className="ml-1 text-slate-500 font-medium">{entry.value}</span>
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Infrastructure Overview</h1>
          <p className="text-slate-500 mt-1">Real-time monitoring of civic reports and resolutions.</p>
        </div>
        <div className="bg-white p-1 rounded-xl border border-slate-200 flex shadow-sm">
           {(['daily', 'weekly', 'monthly'] as const).map((range) => (
             <button 
               key={range}
               onClick={() => setTimeRange(range)}
               className={`px-4 py-1.5 text-xs font-bold capitalize rounded-lg transition-all ${
                 timeRange === range ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'
               }`}
             >
               {range}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2.5 rounded-2xl ${stat.bg}`}>{stat.icon}</div>
              <span className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900">Incident Frequency</h3>
            <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              View Analytics <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentData}>
                <defs>
                  <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dx={-10} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '5 5' }} />
                <Area type="monotone" dataKey="reports" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorReports)" animationDuration={1000} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900">Resolution Performance</h3>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
              <TrendingUp size={14} /> High Efficiency
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dx={-10} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                <Bar 
                  dataKey="resolved" 
                  fill="#0f172a" 
                  radius={[6, 6, 0, 0]} 
                  barSize={timeRange === 'daily' ? 32 : timeRange === 'weekly' ? 24 : 16} 
                  animationDuration={1000}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import { TrendingDown, TrendingUp, Timer, CheckCircle, SentimentSatisfied, VerifiedUser, MoreVertical, Calendar, Download, CreditCard, SupportAgent, Inventory2 } from 'lucide-react';

export default function Dashboard() {
  const metrics = [
    { title: 'Avg. Resolution Time', value: '4.2 Days', trend: '-12%', trendDir: 'down', icon: Timer, color: 'text-primary' },
    { title: 'Active Volume', value: '1,284', trend: '+5%', trendDir: 'up', icon: CheckCircle, color: 'text-amber-500' },
    { title: 'CSAT Score', value: '88%', trend: '-2%', trendDir: 'down', icon: SentimentSatisfied, color: 'text-emerald-500' },
    { title: 'SLA Compliance', value: '94%', trend: '+1%', trendDir: 'up', icon: VerifiedUser, color: 'text-primary' },
  ];

  const departments = [
    { name: 'Billing & Payments', tickets: 412, sla: '92%', trend: [3, 5, 4, 7, 6, 9, 8], color: 'text-blue-600', bg: 'bg-blue-100/40', icon: CreditCard },
    { name: 'Technical Support', tickets: 284, sla: '76%', trend: [8, 7, 6, 5, 4, 3, 2], color: 'text-indigo-600', bg: 'bg-indigo-100/40', icon: SupportAgent },
    { name: 'Shipping & Logistics', tickets: 192, sla: '88%', trend: [2, 2, 3, 4, 5, 5, 6], color: 'text-purple-600', bg: 'bg-purple-100/40', icon: Inventory2 },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav className="flex text-[11px] font-bold text-slate-400 gap-1 mb-1 uppercase tracking-wider">
            <span>Home</span> <span className="text-slate-300">/</span> <span className="text-slate-600">Executive Dashboard</span>
          </nav>
          <h1 className="text-2xl font-bold text-slate-900 leading-tight">Executive Insight Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Real-time enterprise complaint performance overview</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-hover transition-all shadow-md shadow-primary/20">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Metric Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none">{metric.title}</span>
              <metric.icon className="w-5 h-5 text-slate-300" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900 tracking-tight">{metric.value}</span>
              <span className={`text-[11px] font-bold flex items-center gap-0.5 ${metric.trendDir === 'down' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {metric.trendDir === 'down' ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />} 
                {metric.trend.replace('-', '')}
              </span>
            </div>
            <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full ${metric.color.replace('text', 'bg')}`} style={{ width: metric.title.includes('Compliance') ? '94%' : metric.title.includes('CSAT') ? '88%' : '65%' }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Mockup Section */}
      <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Resolution Trends</h3>
            <p className="text-sm text-slate-400 font-medium">Monthly resolution volume vs. incoming complaints</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-md text-[10px] font-bold text-primary uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Resolved
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-md text-[10px] font-bold text-slate-500 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Incoming
            </div>
          </div>
        </div>
        <div className="relative h-[250px] w-full border-b border-l border-slate-100 flex items-end">
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-slate-300 font-bold text-xs uppercase tracking-widest italic opacity-50">Telemetry Stream Connected: Visualizing Operational Flow...</p>
           </div>
           {/* Visual placeholders for chart bars */}
           <div className="flex-1 flex items-end gap-2 px-6 h-full">
              {[40, 60, 45, 80, 55, 90, 70, 85, 60, 95, 80, 92].map((h, i) => (
                <div key={i} className="flex-1 bg-primary/10 rounded-t-sm flex flex-col justify-end gap-0.5 overflow-hidden group hover:bg-primary/20 transition-all cursor-pointer" style={{ height: `${h}%` }}>
                   <div className="w-full bg-primary/40 h-[60%] transition-all group-hover:h-[80%]"></div>
                   <div className="w-full bg-primary h-[30%]"></div>
                </div>
              ))}
           </div>
        </div>
        <div className="mt-4 flex justify-between px-8 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
          <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
        </div>
      </div>

      {/* Department Performance Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
          <h3 className="text-lg font-bold text-slate-900">Department Performance</h3>
          <div className="flex items-center gap-2">
             <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><MoreVertical className="w-5 h-5" /></button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 italic">Department</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">Open Tickets</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">SLA Rating</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">Trend (7d)</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {departments.map((dept, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-all group cursor-pointer">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`size-10 rounded-xl ${dept.bg} flex items-center justify-center ${dept.color} shadow-sm group-hover:scale-105 transition-transform`}>
                        <dept.icon className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-bold text-slate-800 tracking-tight">{dept.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-600">{dept.tickets}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-emerald-500 h-full" style={{ width: dept.sla }}></div>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-600">{dept.sla}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="h-8 w-24 flex items-end gap-1 px-1">
                      {dept.trend.map((val, i) => (
                        <div key={i} className={`flex-1 ${i === 6 ? 'bg-primary' : i > 4 ? 'bg-primary/60' : 'bg-primary/20'} rounded-t-[1px]`} style={{ height: `${val * 10}%` }}></div>
                      ))}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-xs font-bold text-primary uppercase tracking-widest hover:underline decoration-2 underline-offset-4">View Analytics</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-5 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400 bg-slate-50/20">
          <span className="uppercase tracking-widest">Showing Primary Segment: 3 Metrics Detected</span>
          <div className="flex gap-4">
            <button className="hover:text-slate-700 transition-colors uppercase tracking-widest cursor-pointer">Previous Page</button>
            <button className="hover:text-slate-700 transition-colors uppercase tracking-widest cursor-pointer">Next Page</button>
          </div>
        </div>
      </div>
    </div>
  );
}

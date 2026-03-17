import { Activity, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export default function Dashboard() {
  const kpis = [
    { title: 'Active Incidents', value: '142', change: '+12%', icon: AlertTriangle, color: 'text-[#ffaa00]', border: 'border-[#ffaa00]' },
    { title: 'Critical Escalations', value: '28', change: '+4%', icon: Activity, color: 'text-[#ff0055]', border: 'border-[#ff0055]' },
    { title: 'Resolved Today', value: '3,840', change: '+24%', icon: CheckCircle, color: 'text-[#00ffcc]', border: 'border-[#00ffcc]' },
    { title: 'Avg Response Time', value: '1.4h', change: '-18%', icon: Clock, color: 'text-zinc-300', border: 'border-zinc-600' },
  ];

  return (
    <div className="h-full flex flex-col gap-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-mono font-bold tracking-tight text-white mb-1 uppercase">Operations Oversight</h1>
          <p className="text-zinc-500 text-sm">Real-time telemetry and infrastructure analytics.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#00ffcc] bg-[rgba(0,255,204,0.05)] border border-[#00ffcc]/30 px-3 py-1.5 shadow-[0_0_10px_rgba(0,255,204,0.1)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ffcc] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ffcc]"></span>
          </span>
          SYSTEM ONLINE
        </div>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="relative bg-[#18181b]/80 border border-[#27272a] p-5 group hover:border-zinc-500 overflow-hidden transition-all duration-500">
            {/* Minimalist corner accents */}
            <div className={`absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-bl from-${kpi.color.split('-')[1]} to-transparent`}></div>
            
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 bg-[#09090b] border ${kpi.border} shadow-[0_0_10px_currentColor] text-currentColor opacity-80 ${kpi.color}`}>
                <kpi.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-sm ${kpi.change.startsWith('+') ? 'bg-[rgba(0,255,204,0.1)] text-[#00ffcc]' : 'bg-[rgba(255,0,85,0.1)] text-[#ff0055]'}`}>
                {kpi.change}
              </span>
            </div>
            <div>
              <h3 className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">{kpi.title}</h3>
              <p className="text-4xl font-light text-white font-mono tracking-tighter">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[400px]">
        {/* Placeholder for Main Chart */}
         <div className="lg:col-span-2 bg-[#18181b]/50 border border-[#27272a] flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50"></div>
            <Activity className="w-12 h-12 text-zinc-600 group-hover:text-[#00ffcc] transition-colors mb-4 animate-pulse" />
            <p className="text-zinc-500 text-sm font-mono tracking-wide">INITIALIZING METRICS DATA_STREAM...</p>
         </div>

         {/* Placeholder for Recent Activity List */}
         <div className="bg-[#18181b]/50 border border-[#27272a] p-5">
            <h3 className="text-zinc-100 text-sm font-semibold uppercase tracking-widest border-b border-[#27272a] pb-3 mb-4">Live Incident Feed</h3>
             <div className="space-y-4">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="flex gap-3 items-start border-l-2 border-[#ff0055] pl-3 py-1">
                     <div className="flex-1">
                        <p className="text-xs text-zinc-300 font-medium">Critical Pothole - Sector 7G</p>
                        <p className="text-[10px] text-zinc-500 font-mono mt-1">ID: #992{i} • {i}m ago</p>
                     </div>
                  </div>
                ))}
             </div>
         </div>
      </div>
    </div>
  );
}

import { Search, Map as MapIcon, Layers, Filter, FileDown, Plus } from 'lucide-react';

const hotspots = [
  { name: 'West Harbor', count: 84, trend: 'up', color: 'bg-rose-500' },
  { name: 'Riverside Park', count: 72, trend: 'neutral', color: 'bg-amber-500' },
  { name: 'Old Town Square', count: 56, trend: 'up', color: 'bg-blue-500' },
  { name: 'The Heights', count: 41, trend: 'neutral', color: 'bg-indigo-500' },
];

export default function MapPage() {
  return (
    <div className="h-[calc(100vh-160px)] flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Geospatial Analytics</h1>
          <p className="text-slate-500 mt-1 text-sm font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Real-time infrastructure monitoring
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search coordinates..." 
              className="bg-white border border-slate-200 focus:border-brand-300 focus:ring-4 focus:ring-brand-50 rounded-xl py-2 pl-9 pr-4 text-xs transition-all outline-none w-64"
            />
          </div>
          <button className="p-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-white hover:shadow-sm transition-all">
            <Filter size={18} />
          </button>
          <button className="px-4 py-2 bg-brand-600 text-white rounded-xl text-sm font-semibold hover:bg-brand-700 shadow-lg shadow-brand-100 transition-all flex items-center gap-2">
            <Plus size={16} /> New Report
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
        <div className="lg:col-span-3 card-paper relative overflow-hidden flex flex-col">
          {/* Map Controls Header */}
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <button className="bg-brand-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg flex items-center gap-2">
              <Activity size={12} /> Heatmap
            </button>
            <button className="bg-white text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg border border-slate-100 flex items-center gap-2">
              <Layers size={12} /> Cluster View
            </button>
          </div>

          {/* Mock Map Background */}
          <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
            <div className="absolute inset-0 opacity-40 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-0.1276,51.5074,13/800x600?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTAwMHgyeW96NzlvcXN3NmgifQ.K_98P59GW30SUnWt7_Wegw')] bg-cover"></div>
            
            {/* Pulsing Dots */}
            <div className="relative w-full h-full">
              <div className="absolute top-1/3 left-1/4 group animate-bounce cursor-pointer">
                <div className="w-4 h-4 bg-brand-600 rounded-full border-2 border-white shadow-lg"></div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white px-2 py-1 rounded shadow-xl border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                  <p className="text-[10px] font-bold text-slate-900">#492 Illegal Construction</p>
                </div>
              </div>
              <div className="absolute top-1/2 left-2/3 animate-pulse cursor-pointer group">
                <div className="w-4 h-4 bg-rose-500 rounded-full border-2 border-white shadow-lg"></div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white px-2 py-1 rounded shadow-xl border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                  <p className="text-[10px] font-bold text-slate-900">Severe Waste Overflow</p>
                </div>
              </div>
            </div>
          </div>

          {/* Incident Feed Overlay */}
          <div className="absolute bottom-4 left-4 right-4 h-24 bg-white/90 backdrop-blur-sm rounded-xl border border-white/50 shadow-2xl p-4 flex gap-4 items-center">
             <div className="w-12 h-12 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600 flex-shrink-0">
                <MapIcon size={24} />
             </div>
             <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-brand-700 bg-brand-100 px-1.5 py-0.5 rounded uppercase">Live Incident</span>
                  <span className="text-[10px] text-slate-400 font-medium tracking-tight">2 MINS AGO</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 truncate">Construction debris blocking main artery on High Street...</h4>
             </div>
             <button className="p-2 text-slate-400 hover:text-brand-600 transition-colors">
                <ArrowUpRight size={20} />
             </button>
          </div>
        </div>

        <div className="card-paper flex flex-col">
          <div className="p-5 border-b border-slate-100">
             <div className="flex justify-between items-center mb-1">
               <h3 className="text-sm font-bold text-slate-900">Regional Hotspots</h3>
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last 24h</span>
             </div>
             <p className="text-[11px] text-slate-500 font-medium">Highest volume report areas</p>
          </div>
          
          <div className="flex-1 p-5 space-y-6">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Epicenter</p>
              <h4 className="text-base font-bold text-slate-900">South Downtown</h4>
              <div className="flex items-center gap-2 mt-1">
                 <span className="text-[10px] font-bold text-rose-600">+12.5%</span>
                 <span className="text-[10px] text-slate-400 font-medium">vs. last week</span>
              </div>
            </div>

            <div className="space-y-4">
              {hotspots.map((spot, i) => (
                <div key={i} className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center text-[10px] font-bold text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors border border-slate-100 underline decoration-brand-200/50 underline-offset-4">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{spot.name}</p>
                    <p className="text-[10px] text-slate-500">{spot.count} Complaints</p>
                  </div>
                  <div className={`w-12 h-1 rounded-full bg-slate-100 overflow-hidden`}>
                     <div className={`h-full ${spot.color}`} style={{ width: `${100 - (i * 15)}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-5 border-t border-slate-100">
             <button className="w-full py-2.5 bg-slate-50 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                <FileDown size={14} /> Export Regional Report
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper to avoid import errors since Activity was injected in the thought
import { Activity } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';

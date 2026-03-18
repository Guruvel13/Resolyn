import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AlertTriangle, Shield, Maximize2, User, Landmark, Zap, Droplets, Construction, Search, Info, Tag } from 'lucide-react';
import { api } from '../services/api';

// Fix for default marker icons in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const officials = [
  { id: 101, position: [12.9300, 77.6200], name: 'Officer Rajesh', Status: 'On-site' },
  { id: 102, position: [12.9150, 77.6350], name: 'Officer Sarah', Status: 'Moving' },
];

const assets = [
  { id: 201, position: [12.9380, 77.6220], name: 'Pump Station A1', Type: 'Critical Utility' },
  { id: 202, position: [12.9750, 77.5900], name: 'Grid Substation Delta', Type: 'Power Grid' },
];

const Map: React.FC = () => {
  const center: [number, number] = [12.9352, 77.6245];
  const [viewMode, setViewMode] = useState<'incidents' | 'officials' | 'assets'>('incidents');
  const [liveOfficials, setLiveOfficials] = useState(officials);
  const [mapSearch, setMapSearch] = useState('');
  const [complaints, setComplaints] = useState<any[]>([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await api.get('/complaints');
        if (Array.isArray(data)) {
          setComplaints(data);
        }
      } catch (err) {
        console.error('Failed to fetch complaints for map:', err);
      }
    };
    fetchComplaints();
  }, []);

  // Simulate Live Movement
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveOfficials(prev => prev.map(off => ({
        ...off,
        position: [
          (off.position[0] as number) + (Math.random() - 0.5) * 0.001,
          (off.position[1] as number) + (Math.random() - 0.5) * 0.001
        ]
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'water': return <Droplets size={14} />;
      case 'electrical': return <Zap size={14} />;
      case 'roads': return <Construction size={14} />;
      default: return <Info size={14} />;
    }
  };

  const filteredIncidents = useMemo(() => {
    return complaints.filter(i => 
      i.title?.toLowerCase().includes(mapSearch.toLowerCase()) || 
      i.department?.toLowerCase().includes(mapSearch.toLowerCase()) ||
      i.location?.address?.toLowerCase().includes(mapSearch.toLowerCase())
    ).map(i => ({
      ...i,
      id: i._id,
      position: [i.location?.coordinates?.[1] || 12.9352, i.location?.coordinates?.[0] || 77.6245],
      type: i.department,
      severity: i.priority,
      icon: getIcon(i.department)
    }));
  }, [complaints, mapSearch]);

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Geospatial Intelligence</h1>
          <p className="text-indigo-600 mt-2 uppercase text-[10px] font-bold tracking-[0.2em] bg-indigo-50 px-3 py-1 rounded-full w-fit">Active Monitoring Sector: Bangalore South-East</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64 group">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={16} />
             <input 
              type="text" 
              placeholder="Locate incident..." 
              value={mapSearch}
              onChange={(e) => setMapSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-[1.25rem] text-xs focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none shadow-sm"
             />
          </div>
          <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-[1.25rem] border border-slate-200 shadow-sm">
             {(['incidents', 'officials', 'assets'] as const).map((mode) => (
                <button 
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-5 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all active:scale-95 ${
                    viewMode === mode ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {mode}
                </button>
             ))}
          </div>
        </div>
      </div>

      <div className="flex-1 rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl relative group min-h-[550px]">
        <MapContainer 
            center={center} 
            zoom={13} 
            className="w-full h-full z-0" 
            zoomControl={false}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          <ZoomControl position="bottomright" />
          
          {viewMode === 'incidents' && filteredIncidents.map((incident) => (
            <Marker key={incident.id} position={incident.position as [number, number]}>
              <Popup className="custom-popup" offset={[0, -20]}>
                <div className="p-4 min-w-[240px]">
                  <div className="flex items-center justify-between mb-4 border-b border-slate-50 pb-3">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg">{incident.icon}</div>
                       <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Node ID: {incident.id?.substring(0, 8)}</p>
                          <p className="text-[10px] font-bold text-indigo-600 uppercase transition-colors">{incident.type}</p>
                       </div>
                    </div>
                    <span className={`w-3 h-3 rounded-full animate-pulse shadow-sm ${incident.severity === 'Critical' ? 'bg-rose-500' : incident.severity === 'High' ? 'bg-orange-500' : 'bg-amber-500'}`}></span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base leading-tight tracking-tight mb-2 uppercase">{incident.title}</h4>
                  <div className="bg-slate-50 p-3 rounded-xl mb-4 border border-slate-100">
                     <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Current Status</span>
                        <span className="text-[10px] font-bold text-indigo-600 bg-white px-2 py-1 rounded-lg shadow-sm border border-indigo-50 uppercase">{incident.status}</span>
                     </div>
                  </div>
                  <button className="w-full bg-slate-900 text-white text-[10px] font-bold py-3.5 rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 active:scale-95">
                    <Shield size={16} /> DISPATCH RESPONSE TEAM
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}

          {viewMode === 'officials' && liveOfficials.map((off) => (
             <Marker key={off.id} position={off.position as [number, number]}>
                <Popup offset={[0, -20]}>
                   <div className="p-3">
                      <div className="flex items-center gap-4 mb-4">
                         <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-[1.25rem] flex items-center justify-center shadow-inner border border-indigo-100"><User size={24} /></div>
                         <div>
                            <h4 className="font-bold text-slate-900 text-sm">{off.name}</h4>
                            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1.5">
                               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                               {off.Status}
                            </p>
                         </div>
                      </div>
                      <button className="w-full bg-slate-50 text-slate-900 text-[10px] font-bold py-2.5 rounded-xl border border-slate-200 hover:bg-white transition-all shadow-sm">INITIATE COMMS</button>
                   </div>
                </Popup>
             </Marker>
          ))}

          {viewMode === 'assets' && assets.map((asset) => (
             <Marker key={asset.id} position={asset.position as [number, number]}>
                <Popup offset={[0, -20]}>
                   <div className="p-3">
                      <div className="flex items-center gap-4 mb-3">
                         <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-[1.25rem] flex items-center justify-center shadow-inner border border-emerald-100"><Landmark size={24} /></div>
                         <div>
                            <h4 className="font-bold text-slate-900 text-sm">{asset.name}</h4>
                            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-tight">{asset.Type}</p>
                         </div>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-[9px] font-bold text-slate-400 text-center uppercase">Last Inspection: 4d ago</div>
                   </div>
                </Popup>
             </Marker>
          ))}

          <Circle 
            center={center} 
            radius={viewMode === 'incidents' ? 2800 : 1800} 
            pathOptions={{ 
              fillColor: viewMode === 'incidents' ? '#f43f5e' : '#6366f1', 
              fillOpacity: 0.04, 
              color: viewMode === 'incidents' ? '#f43f5e' : '#6366f1',
              weight: 1,
              dashArray: '8, 12'
            }} 
          />
        </MapContainer>

        <div className="absolute top-8 left-8 z-[1000] space-y-3 pointer-events-none">
           <div className="bg-white/95 backdrop-blur-md p-4 rounded-[1.5rem] border border-slate-100 shadow-2xl flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.4)]"></div>
              <p className="text-[10px] font-bold text-slate-800 uppercase tracking-[0.2em]">Network Uplink: Active</p>
           </div>
           <div className="bg-slate-900/95 text-white p-4 rounded-[1.5rem] shadow-2xl flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 -translate-x-4 group-hover:translate-x-0 border border-white/5">
              <Zap size={16} className="text-amber-400" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">Telemetry Stream: <span className="text-white">Live</span></p>
           </div>
        </div>

        <div className="absolute top-8 right-8 z-[1000] flex flex-col gap-3">
           <button className="w-12 h-12 bg-white text-slate-700 rounded-2xl shadow-2xl border border-slate-100 hover:bg-slate-50 transition-all hover:scale-110 active:scale-90 flex items-center justify-center">
              <Maximize2 size={20} />
           </button>
           <button className="w-12 h-12 bg-white text-rose-500 rounded-2xl shadow-2xl border border-slate-100 hover:bg-rose-50 transition-all hover:scale-110 active:scale-90 flex items-center justify-center">
              <AlertTriangle size={20} />
           </button>
        </div>

        <div className="absolute bottom-8 left-8 z-[1000] bg-white/95 backdrop-blur-lg p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-indigo-50/50 max-w-xs transition-all group-hover:translate-y-0 translate-y-8 opacity-0 group-hover:opacity-100 duration-500">
           <div className="flex items-start gap-5">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl shadow-inner border border-indigo-100 flex items-center justify-center shrink-0">
                 <Shield size={28} />
              </div>
              <div>
                 <p className="text-lg font-bold text-slate-900 leading-tight tracking-tight">Sector Alpha-9</p>
                 <p className="text-[11px] text-slate-500 mt-3 leading-relaxed font-medium">Monitoring <span className="text-indigo-600 font-bold uppercase">{viewMode}</span> dynamics. Satellite telemetry synchronized at <span className="text-slate-900 font-extrabold">1:1 scale</span>.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Map;

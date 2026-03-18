import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AlertTriangle, Info, Shield, Filter, Maximize2, User, Landmark, Zap, Droplets, Construction } from 'lucide-react';

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

const incidents = [
  { id: 1, position: [12.9352, 77.6245], type: 'Water', severity: 'High', title: 'Major Pipe Burst', status: 'Fixing', icon: <Droplets size={14} /> },
  { id: 2, position: [12.9128, 77.6387], type: 'Electrical', severity: 'Medium', title: 'Transformer Spark', status: 'Assigned', icon: <Zap size={14} /> },
  { id: 3, position: [12.9716, 77.5946], type: 'Roads', severity: 'Critical', title: 'Sinkhole Detected', status: 'Pending', icon: <Construction size={14} /> },
  { id: 4, position: [12.9279, 77.6833], type: 'Sanitation', severity: 'Low', title: 'Illegal Dumping', status: 'Reviewing', icon: <Info size={14} /> },
];

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

  return (
    <div className="h-full flex flex-col space-y-4 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Geospatial Intelligence</h1>
          <p className="text-slate-500 mt-1 uppercase text-[10px] font-bold tracking-widest">Active Monitoring Sector: Bangalore South</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white p-1 rounded-xl border border-slate-200 flex shadow-sm">
             {(['incidents', 'officials', 'assets'] as const).map((mode) => (
                <button 
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-1.5 text-xs font-bold capitalize rounded-lg transition-all ${
                    viewMode === mode ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {mode}
                </button>
             ))}
          </div>
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 rounded-3xl overflow-hidden border border-slate-200 shadow-xl relative group min-h-[500px]">
        <MapContainer 
            center={center} 
            zoom={13} 
            className="w-full h-full z-0" 
            zoomControl={false}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="bottomright" />
          
          {viewMode === 'incidents' && incidents.map((incident) => (
            <Marker key={incident.id} position={incident.position as [number, number]}>
              <Popup className="custom-popup">
                <div className="p-1 min-w-[200px]">
                  <div className="flex items-center justify-between mb-3 border-b border-slate-50 pb-2">
                    <div className="flex items-center gap-2">
                       <div className="p-1.5 bg-slate-900 text-white rounded-lg">{incident.icon}</div>
                       <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{incident.type}</span>
                    </div>
                    <span className={`w-2 h-2 rounded-full ${incident.severity === 'Critical' ? 'bg-rose-500' : incident.severity === 'High' ? 'bg-orange-500' : 'bg-amber-500'}`}></span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm leading-tight">{incident.title}</h4>
                  <div className="flex items-center gap-2 mt-3">
                     <span className="text-[10px] font-bold text-slate-400">STATUS:</span>
                     <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase">{incident.status}</span>
                  </div>
                  <button className="w-full mt-4 bg-slate-900 text-white text-[10px] font-bold py-2 rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-100 flex items-center justify-center gap-2">
                    <Shield size={14} /> Dispatch Official
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}

          {viewMode === 'officials' && officials.map((off) => (
             <Marker key={off.id} position={off.position as [number, number]}>
                <Popup>
                   <div className="p-1">
                      <div className="flex items-center gap-3 mb-2">
                         <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg"><User size={14} /></div>
                         <h4 className="font-bold text-slate-900 text-sm">{off.name}</h4>
                      </div>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-tight">Accessing Geo-sector Alpha</p>
                   </div>
                </Popup>
             </Marker>
          ))}

          {viewMode === 'assets' && assets.map((asset) => (
             <Marker key={asset.id} position={asset.position as [number, number]}>
                <Popup>
                   <div className="p-1">
                      <div className="flex items-center gap-3 mb-2">
                         <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg"><Landmark size={14} /></div>
                         <h4 className="font-bold text-slate-900 text-sm">{asset.name}</h4>
                      </div>
                      <p className="text-xs text-emerald-600 font-bold uppercase">{asset.Type}</p>
                   </div>
                </Popup>
             </Marker>
          ))}

          {/* Dynamic Boundary Visualization */}
          <Circle 
            center={center} 
            radius={viewMode === 'incidents' ? 2500 : 1500} 
            pathOptions={{ fillColor: viewMode === 'incidents' ? '#f43f5e' : '#6366f1', fillOpacity: 0.05, stroke: false, dashArray: '10, 10' }} 
          />
        </MapContainer>

        {/* Floating Sector Metadata */}
        <div className="absolute top-6 left-6 z-[1000] space-y-2 pointer-events-none">
           <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-slate-100 shadow-xl flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <p className="text-[10px] font-bold text-slate-800 uppercase tracking-widest">Network Latency: 12ms</p>
           </div>
           <div className="bg-slate-900 text-white p-3 rounded-2xl shadow-2xl flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all delay-75 translate-x-[-10px] group-hover:translate-x-0">
              <Zap size={14} className="text-amber-400" />
              <p className="text-[10px] font-bold uppercase tracking-widest">Grid Stability: OK</p>
           </div>
        </div>

        {/* Floating Controls */}
        <div className="absolute top-6 right-6 z-[1000] flex flex-col gap-2">
           <button className="p-3 bg-white text-slate-700 rounded-2xl shadow-xl border border-slate-100 hover:bg-slate-50 transition-all hover:scale-110 active:scale-95">
              <Maximize2 size={18} />
           </button>
           <button className="p-3 bg-white text-rose-500 rounded-2xl shadow-xl border border-slate-100 hover:bg-rose-50 transition-all hover:scale-110 active:scale-95">
              <AlertTriangle size={18} />
           </button>
        </div>

        <div className="absolute bottom-6 left-6 z-[1000] bg-white/95 backdrop-blur-md p-5 rounded-3xl shadow-2xl border border-indigo-50 max-w-xs transition-all group-hover:translate-y-0 translate-y-4 opacity-0 group-hover:opacity-100 hover:scale-[1.02]">
           <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl shadow-inner">
                 <Shield size={24} />
              </div>
              <div>
                 <p className="text-sm font-bold text-slate-900 leading-tight">Live Sector Analysis</p>
                 <p className="text-xs text-slate-500 mt-2 leading-relaxed">Viewing <span className="text-indigo-600 font-bold">{viewMode}</span> current state. All data updated in real-time via satellite telemetry.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Map;

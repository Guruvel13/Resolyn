import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AlertTriangle, Info, Shield, Filter, Maximize2 } from 'lucide-react';

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
  { id: 1, position: [12.9352, 77.6245], type: 'Water', severity: 'High', title: 'Major Pipe Burst', status: 'Fixing' },
  { id: 2, position: [12.9128, 77.6387], type: 'Electrical', severity: 'Medium', title: 'Transformer Spark', status: 'Assigned' },
  { id: 3, position: [12.9716, 77.5946], type: 'Roads', severity: 'Critical', title: 'Sinkhole Detected', status: 'Pending' },
  { id: 4, position: [12.9279, 77.6833], type: 'Sanitation', severity: 'Low', title: 'Illegal Dumping', status: 'Reviewing' },
];

const Map: React.FC = () => {
  const center: [number, number] = [12.9352, 77.6245]; // Bangalore centerish

  return (
    <div className="h-full flex flex-col space-y-4 animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Geospatial Intelligence</h1>
          <p className="text-slate-500 mt-1">Real-time incident mapping and asset tracking.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white p-1 rounded-xl border border-slate-200 flex shadow-sm">
             <button className="px-4 py-1.5 text-xs font-bold bg-slate-900 text-white rounded-lg shadow-md transition-all">Incidents</button>
             <button className="px-4 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-all">Officials</button>
             <button className="px-4 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-all">Assets</button>
          </div>
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 rounded-3xl overflow-hidden border border-slate-200 shadow-xl relative group">
        <MapContainer 
            center={center} 
            zoom={13} 
            className="w-full h-full z-0" 
            zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="bottomright" />
          
          {incidents.map((incident) => (
            <Marker key={incident.id} position={incident.position as [number, number]}>
              <Popup className="custom-popup">
                <div className="p-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${incident.severity === 'Critical' ? 'bg-rose-500' : 'bg-amber-500'}`}></span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{incident.type}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm leading-tight">{incident.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">Status: <span className="font-bold text-slate-800">{incident.status}</span></p>
                  <button className="w-full mt-3 bg-slate-900 text-white text-[10px] font-bold py-1.5 rounded-lg hover:bg-slate-800 transition-colors">Dispatch Official</button>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Infrastructure Circles - Example */}
          <Circle 
            center={center} 
            radius={2000} 
            pathOptions={{ fillColor: '#6366f1', fillOpacity: 0.05, stroke: false }} 
          />
        </MapContainer>

        {/* Floating Controls */}
        <div className="absolute top-6 right-6 z-[1000] flex flex-col gap-2">
           <button className="p-3 bg-white text-slate-700 rounded-2xl shadow-xl border border-slate-100 hover:bg-slate-50 transition-all">
              <Maximize2 size={20} />
           </button>
           <button className="p-3 bg-white text-rose-500 rounded-2xl shadow-xl border border-slate-100 hover:bg-rose-50 transition-all">
              <AlertTriangle size={20} />
           </button>
        </div>

        <div className="absolute bottom-6 left-6 z-[1000] bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-slate-100 max-w-xs transition-transform group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:opacity-100">
           <div className="flex items-start gap-3">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                 <Shield size={20} />
              </div>
              <div>
                 <p className="text-sm font-bold text-slate-900 leading-tight">Emergency Protocol Gamma</p>
                 <p className="text-xs text-slate-500 mt-1">4 High-priority events detected in the Koramangala sector.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Map;

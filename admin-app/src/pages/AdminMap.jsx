import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Layers, Crosshair } from 'lucide-react';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function AdminMap() {
  const position = [51.505, -0.09]; // Default center

  return (
    <div className="h-full flex flex-col gap-6 animate-fade-in">
       <div className="flex items-center justify-between">
         <div>
            <h1 className="text-3xl font-mono font-bold tracking-tight text-white mb-1 uppercase">Geospatial Intelligence</h1>
            <p className="text-zinc-500 text-sm">Global incident heatmap and infrastructure tracking.</p>
         </div>
         <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[rgba(0,255,204,0.05)] border border-[#00ffcc]/30 text-sm font-mono text-[#00ffcc] hover:bg-[#00ffcc] hover:text-black hover:border-[#00ffcc] transition-all shadow-[0_0_10px_rgba(0,255,204,0.2)]">
               <Layers className="w-4 h-4" />
               TOGGLE HEATMAP
            </button>
            <button className="flex items-center justify-center p-1.5 bg-[#18181b] border border-[#27272a] text-zinc-400 hover:text-white transition-all">
               <Crosshair className="w-5 h-5" />
            </button>
         </div>
      </div>

      <div className="flex-1 bg-white border border-slate-200 rounded-xl relative overflow-hidden shadow-sm">
         <MapContainer center={position} zoom={13} scrollWheelZoom={true} className="h-full w-full z-10">
            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
               <Popup>
                  <div className="font-mono text-xs">
                     <span className="text-[#ff0055] font-bold">CRITICAL:</span> Incident #2049<br/>
                     Sector 7G
                  </div>
               </Popup>
            </Marker>
         </MapContainer>
         
         {/* HUD Overlay */}
         <div className="absolute bottom-6 right-6 z-20 bg-white/90 border border-slate-200 p-5 rounded-lg shadow-xl backdrop-blur-md">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2">Location Telemetry</h4>
            <p className="text-blue-600 font-bold text-sm tracking-wide">LAT: <span className="text-slate-900">51.505</span></p>
            <p className="text-blue-600 font-bold text-sm tracking-wide mt-1">LNG: <span className="text-slate-900">-0.090</span></p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-8">
               <span className="text-[10px] uppercase font-bold text-slate-400">Satellite Sync:</span>
               <span className="text-[10px] uppercase font-bold text-emerald-600">STABLE</span>
            </div>
         </div>
      </div>
    </div>
  );
}

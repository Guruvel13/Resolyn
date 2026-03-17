import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Layers, Crosshair } from 'lucide-react';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
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

      <div className="flex-1 bg-[#18181b] border border-[#27272a] relative overflow-hidden group">
         {/* Decorative frame */}
         <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00ffcc] z-20 pointer-events-none m-4"></div>
         <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00ffcc] z-20 pointer-events-none m-4"></div>
         <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00ffcc] z-20 pointer-events-none m-4"></div>
         <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00ffcc] z-20 pointer-events-none m-4"></div>

         <MapContainer center={position} zoom={13} scrollWheelZoom={true} className="h-full w-full z-10" style={{ filter: 'invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}>
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
         <div className="absolute bottom-6 right-6 z-20 bg-[#09090b]/90 border border-[#27272a] p-4 glass-panel backdrop-blur-md">
            <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-2 border-b border-[#27272a] pb-1">Coordinates</h4>
            <p className="text-[#00ffcc] font-mono text-sm tracking-widest">LAT: <span className="text-white">51.505</span></p>
            <p className="text-[#00ffcc] font-mono text-sm tracking-widest mt-1">LNG: <span className="text-white">-0.090</span></p>
            <div className="mt-3 pt-3 border-t border-[#27272a] flex items-center justify-between">
               <span className="text-[10px] uppercase font-mono text-zinc-500">Signal:</span>
               <span className="text-[10px] uppercase font-mono text-green-500">STRONG</span>
            </div>
         </div>
      </div>
    </div>
  );
}

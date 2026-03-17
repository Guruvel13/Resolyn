import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default marker icon using base64 or absolute paths
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
};

const MapPicker = ({ position, setPosition }) => {
  const [center, setCenter] = useState([20.5937, 78.9629]); // Default India

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setCenter(coords);
        if (!position) setPosition(coords);
      });
    }
  }, []); // eslint-disable-line

  return (
    <div className="h-[350px] w-full rounded-2xl overflow-hidden border border-slate-300 shadow-sm relative z-0">
      <MapContainer 
        center={position || center} 
        zoom={position ? 15 : 5} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} />
      </MapContainer>
      <div className="absolute top-4 right-4 z-[1000] bg-white px-3 py-1.5 rounded-lg shadow-md border border-slate-200 text-sm font-semibold text-slate-700 pointer-events-none">
        {position ? `${position[0].toFixed(4)}, ${position[1].toFixed(4)}` : 'Click to drop pin'}
      </div>
    </div>
  );
};

export default MapPicker;

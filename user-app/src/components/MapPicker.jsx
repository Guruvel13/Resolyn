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
  const map = useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  useEffect(() => {
    if (position && map) {
      map.flyTo(position, 15);
    }
  }, [position, map]);

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
};

const MapPicker = ({ position, setPosition }) => {
  const [center, setCenter] = useState([20.5937, 78.9629]); // Default India
  const [searchQuery, setSearchQuery] = useState('');

  // Update input text when position changes via click or fetch
  useEffect(() => {
    const fetchAddress = async () => {
      if (position) {
        // We only reverse geocode if the search query doesn't already contain something (or if it's currently showing coordinates)
        // to avoid constant overriding when typing, though this useEffect runs primarily on position change (clicks / auto fetch)
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position[0]}&lon=${position[1]}`);
          const data = await response.json();
          if (data && data.display_name) {
            setSearchQuery(data.display_name);
          } else {
            setSearchQuery(`${position[0].toFixed(4)}, ${position[1].toFixed(4)}`);
          }
        } catch (err) {
          setSearchQuery(`${position[0].toFixed(4)}, ${position[1].toFixed(4)}`);
        }
      } else {
        setSearchQuery('');
      }
    };

    fetchAddress();
  }, [position]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleInputKeyDown = async (e) => {
    if (e.key === 'Enter') {
      const query = searchQuery.trim();
      
      // If it looks like coordinates "lat, lng"
      const parts = query.split(',').map(v => parseFloat(v.trim()));
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        setPosition(parts);
        return;
      }
      
      // Otherwise, attempt a basic address search using Nominatim (OpenStreetMap's free geocoder)
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
        const data = await response.json();
        if (data && data.length > 0) {
          const newPos = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
          setPosition(newPos);
          setSearchQuery(data[0].display_name);
        } else {
          alert("Location not found. Try entering a more specific address.");
        }
      } catch (err) {
        alert("Error searching for location.");
      }
    }
  };

  useEffect(() => {
    if (!position && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setCenter(coords);
        setPosition(coords);
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
      <div className="absolute top-4 right-4 z-[1000]">
        <div className="relative">
          <input 
            type="text" 
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="Search address or coords..."
            className="bg-white px-4 py-2.5 rounded-lg shadow-md border border-slate-200 text-sm font-semibold text-slate-700 w-64 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
        <p className="text-[10px] text-slate-500 text-right mt-1.5 drop-shadow-sm font-medium pr-1 bg-white/50 backdrop-blur-sm rounded">Press Enter to place pin</p>
      </div>
    </div>
  );
};

export default MapPicker;

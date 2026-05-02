import { useEffect } from 'react';
import { GlassCard } from './ui/GlassCard';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { renderToString } from 'react-dom/server';
import { MapPin } from 'lucide-react';

const customMarkerIcon = new L.DivIcon({
  html: renderToString(
    <div className="relative flex items-center justify-center w-8 h-8">
      <MapPin className="w-8 h-8 text-blue-400 fill-blue-500/20 drop-shadow-md" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full mt-[-6px]"></div>
    </div>
  ),
  className: 'bg-transparent border-0',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

function LocationMarker({ position, onLocationSelect }) {
  const map = useMapEvents({
    click(e) {
      if (onLocationSelect && e.latlng && !isNaN(e.latlng.lat) && !isNaN(e.latlng.lng)) {
        onLocationSelect(e.latlng.lat, e.latlng.lng);
      }
    },
  });

  const lat = position && position[0];
  const lon = position && position[1];

  const isValidType = typeof lat === 'number' && typeof lon === 'number';
  const isValidNumber = isValidType && !isNaN(lat) && !isNaN(lon);

  useEffect(() => {
    if (isValidNumber && map) {
      try {
        const currentCenter = map.getCenter();
        const currentZoom = map.getZoom();
        const safeZoom = (typeof currentZoom === 'number' && !isNaN(currentZoom)) ? Math.max(currentZoom, 10) : 10;
        
        map.setView([lat, lon], safeZoom, { animate: false });
      } catch (err) {
        console.error("setView failed", err);
      }
    }
  }, [lat, lon, map, isValidNumber]);

  if (!isValidNumber) {
    return null;
  }

  return (
    <Marker 
      position={[lat, lon]} 
      icon={customMarkerIcon}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;
          if (marker && marker.getLatLng) {
            const pos = marker.getLatLng();
            if (onLocationSelect && pos && !isNaN(pos.lat) && !isNaN(pos.lng)) {
              onLocationSelect(pos.lat, pos.lng);
            }
          }
        },
      }}
    ></Marker>
  );
}

export function MapPicker({ location, onLocationSelect }) {
  if (!location) return null;
  
  const lat = Number(location.lat);
  const lon = Number(location.lon);
  
  if (!isFinite(lat) || !isFinite(lon)) return null;
  
  const position = [lat, lon];

  return (
    <GlassCard className="h-[300px] sm:h-[400px] md:h-auto lg:h-auto">
      <div className="absolute top-4 left-4 z-[400] pointer-events-none">
        <div className="bg-slate-900/80 backdrop-blur-md text-white px-4 py-2 rounded-xl border border-white/10 shadow-lg pointer-events-auto">
          <p className="text-xs text-white/50 font-medium uppercase tracking-wider mb-0.5">Selected Location</p>
          <p className="text-base font-medium truncate max-w-[200px]">{location.name}, {location.country}</p>
        </div>
      </div>
      
      <div className="absolute bottom-4 right-4 z-[400] pointer-events-none">
        <div className="bg-[#0f172a]/90 backdrop-blur-md text-white/80 px-3 py-1.5 rounded-lg border border-white/10 shadow-lg pointer-events-auto text-xs">
          Tap anywhere to change location
        </div>
      </div>
      
      <div className="flex-1 w-full h-full relative group bg-[#0f172a] ">
        <MapContainer 
          center={position} 
          zoom={10} 
          scrollWheelZoom={true} 
          className="w-full h-full z-0 filter saturate-[1.2] group-hover:saturate-[1.3] transition-all duration-700"
        >
          {/* Dark map tiles matching premium theme */}
          <TileLayer
            attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            maxZoom={19}
            subdomains="abcd"
          />
          <LocationMarker position={position} onLocationSelect={onLocationSelect} />
        </MapContainer>
        
        {/* Subtle glassmorphism overlay on map borders */}
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[inherit] pointer-events-none z-[400]"></div>
      </div>
    </GlassCard>
  );
}

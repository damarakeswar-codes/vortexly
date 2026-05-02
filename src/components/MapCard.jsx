import { GlassCard } from './ui/GlassCard';

export function MapCard({ location }) {
   if (!location) return null;
   // We will just show a static placeholder or an iframe map if allowed,
   // but since we want premium feel, maybe a stylized iframe
   const mapSrc = `https://maps.google.com/maps?q=${location.lat},${location.lon}&t=&z=10&ie=UTF8&iwloc=&output=embed`;

   return (
     <GlassCard className="h-[300px] sm:h-[400px] lg:h-full lg:min-h-[300px] p-0 overflow-hidden flex flex-col">
        <div className="flex-1 w-full h-full relative opacity-90 hover:opacity-100 transition-opacity">
           <iframe 
             title={`Map of ${location.name}`}
             width="100%" 
             height="100%" 
             frameBorder="0" 
             scrolling="no" 
             marginHeight="0" 
             marginWidth="0" 
             src={mapSrc}
             className="absolute inset-0 filter grayscale invert contrast-80 hue-rotate-180" // stylized dark map
             style={{ border: 0 }}
           ></iframe>
           {/* Overlay to enforce glassmorphism feel over map */}
           <div className="absolute inset-0 bg-blue-900/10 pointer-events-none"></div>
        </div>
     </GlassCard>
   );
}

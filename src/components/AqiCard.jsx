import { GlassCard } from './ui/GlassCard';
import { Activity } from 'lucide-react';

export function AqiCard({ aqi }) {
  if (!aqi) return null;

  // US EPA Index: 1=Good, 2=Moderate, 3=Unhealthy for sensitive, 4=Unhealthy, 5=Very Unhealthy, 6=Hazardous
  const epaIndex = aqi['us-epa-index'];
  
  const getAqiInfo = (index) => {
    switch(index) {
      case 1: return { label: 'Good', color: 'bg-green-400', text: 'text-green-400', desc: 'Air quality is considered satisfactory.' };
      case 2: return { label: 'Moderate', color: 'bg-yellow-400', text: 'text-yellow-400', desc: 'Air quality is acceptable.' };
      case 3: return { label: 'Unhealthy for Sensitive Groups', color: 'bg-orange-400', text: 'text-orange-400', desc: 'Members of sensitive groups may experience health effects.'};
      case 4: return { label: 'Unhealthy', color: 'bg-red-500', text: 'text-red-500', desc: 'Everyone may begin to experience health effects.'};
      case 5: return { label: 'Very Unhealthy', color: 'bg-purple-500', text: 'text-purple-500', desc: 'Health warnings of emergency conditions.'};
      case 6: return { label: 'Hazardous', color: 'bg-rose-900', text: 'text-rose-900', desc: 'Health alert: everyone may experience more serious health effects.'};
      default: return { label: 'Unknown', color: 'bg-gray-400', text: 'text-gray-400', desc: 'No data available.'};
    }
  };

  const info = getAqiInfo(epaIndex);

  const pollutants = [
    { name: 'PM2.5', value: aqi.pm2_5.toFixed(1) },
    { name: 'PM10', value: aqi.pm10.toFixed(1) },
    { name: 'NO2', value: aqi.no2.toFixed(1) },
    { name: 'O3', value: aqi.o3.toFixed(1) },
    { name: 'CO', value: aqi.co.toFixed(1) }
  ];

  return (
    <GlassCard className="p-6 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium uppercase tracking-wider text-white/60">Air Quality Index</h3>
        </div>
        
        <div className="text-white mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs uppercase font-medium tracking-wider px-2.5 py-1 rounded-full border border-current ${info.text} bg-current/10`}>{info.label}</span>
          </div>
          <p className="text-sm opacity-80 leading-relaxed mt-2">{info.desc}</p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-1 sm:gap-2 pt-4 border-t border-white/10">
        {pollutants.map(p => (
          <div key={p.name} className="flex flex-col items-center">
            <span className="text-xs text-white/50 font-medium uppercase tracking-wider mb-1">{p.name}</span>
            <span className="text-sm font-medium text-white">{p.value}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

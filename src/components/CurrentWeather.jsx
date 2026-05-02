import { MapPin, Droplets, Wind, Sun, Eye, Gauge, ThermometerSun } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { format } from 'date-fns';

export function CurrentWeather({ current, location, unit = 'C' }) {
  if (!current || !location) return null;

  const temp = unit === 'C' ? Math.round(current.temp_c) : Math.round(current.temp_f);
  const feelsLike = unit === 'C' ? Math.round(current.feelslike_c) : Math.round(current.feelslike_f);
  const dewPoint = unit === 'C' ? Math.round(current.dewpoint_c) : Math.round(current.dewpoint_f);
  const wind = unit === 'C' ? `${current.wind_kph} km/h` : `${current.wind_mph} mph`;
  const visibility = unit === 'C' ? `${current.vis_km} km` : `${current.vis_miles} mi`;
  const pressure = `${current.pressure_mb} mb`;

  const isDay = current.is_day === 1;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Main Temp Card */}
      <GlassCard className="col-span-1 md:col-span-2 flex flex-col sm:flex-row items-center sm:items-start justify-between bg-gradient-to-br from-white/20 to-white/5 border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]">
        <div className="flex flex-col items-center sm:items-start text-white text-center sm:text-left">
          <div className="flex items-center gap-2 text-xl sm:text-2xl font-medium tracking-tight mb-1">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 opacity-60" />
            {location.name}
          </div>
          <div className="text-xs sm:text-sm text-white/60 font-normal mb-4 sm:mb-6">
            {format(new Date(location.localtime), 'EEEE, d MMMM yyyy | h:mm a')}
          </div>
          
          <div className="flex items-start gap-2">
            <div className="text-6xl sm:text-[80px] font-bold tracking-tight leading-none font-display text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
              {temp}&deg;
            </div>
            <div className="pt-2 text-lg md:text-2xl text-white/90 font-medium">
              {unit}
            </div>
          </div>
          
          <div className="mt-4 text-base sm:text-lg font-medium tracking-wide">
            {current.condition.text}
          </div>
          <div className="mt-1 text-sm text-white/60">
            Feels like {feelsLike}&deg;{unit}
          </div>
        </div>

        <div className="flex flex-col items-center mt-6 sm:mt-0">
          <img 
            src={current.condition.icon.replace('64x64', '128x128')} 
            alt={current.condition.text} 
            className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 drop-shadow-2xl object-cover"
          />
        </div>
      </GlassCard>

      {/* Highlights Card */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <GlassCard className="flex flex-col items-center sm:items-start gap-2 bg-white/5 border-white/10 hover:bg-white/10 transition-colors p-4">
          <div className="p-2 bg-white/5 rounded-full border border-white/5 text-white/80">
            <Wind className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="text-white text-center sm:text-left w-full mt-1">
            <div className="text-[11px] sm:text-xs text-white/50 font-medium uppercase tracking-wider truncate">Wind ({current.wind_dir})</div>
            <div className="text-sm sm:text-base font-medium mt-1">{wind}</div>
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col items-center sm:items-start gap-2 bg-white/5 border-white/10 hover:bg-white/10 transition-colors p-4">
          <div className="p-2 bg-white/5 rounded-full border border-white/5 text-white/80">
            <Droplets className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="text-white text-center sm:text-left w-full mt-1">
            <div className="text-[11px] sm:text-xs text-white/50 font-medium uppercase tracking-wider">Humidity</div>
            <div className="text-sm sm:text-base font-medium mt-1">{current.humidity}%</div>
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col items-center sm:items-start gap-2 bg-white/5 border-white/10 hover:bg-white/10 transition-colors p-4">
          <div className="p-2 bg-white/5 rounded-full border border-white/5 text-white/80">
            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="text-white text-center sm:text-left w-full mt-1">
            <div className="text-[11px] sm:text-xs text-white/50 font-medium uppercase tracking-wider">Visibility</div>
            <div className="text-sm sm:text-base font-medium mt-1">{visibility}</div>
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col items-center sm:items-start gap-2 bg-white/5 border-white/10 hover:bg-white/10 transition-colors p-4">
          <div className="p-2 bg-white/5 rounded-full border border-white/5 text-white/80">
            <Gauge className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="text-white text-center sm:text-left w-full mt-1">
            <div className="text-[11px] sm:text-xs text-white/50 font-medium uppercase tracking-wider">Pressure</div>
            <div className="text-sm sm:text-base font-medium mt-1">{pressure}</div>
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col items-center sm:items-start gap-2 bg-white/5 border-white/10 hover:bg-white/10 transition-colors p-4">
          <div className="p-2 bg-white/5 rounded-full border border-white/5 text-white/80">
            <ThermometerSun className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="text-white text-center sm:text-left w-full mt-1">
            <div className="text-[11px] sm:text-xs text-white/50 font-medium uppercase tracking-wider">Dew Point</div>
            <div className="text-sm sm:text-base font-medium mt-1">{dewPoint}&deg;{unit}</div>
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col items-center sm:items-start gap-2 bg-white/5 border-white/10 hover:bg-white/10 transition-colors p-4">
          <div className="p-2 bg-white/5 rounded-full border border-white/5 text-white/80">
            <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="text-white text-center sm:text-left w-full mt-1">
            <div className="text-[11px] sm:text-xs text-white/50 font-medium uppercase tracking-wider">UV Index</div>
            <div className="text-sm sm:text-base font-medium mt-1">{current.uv}</div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

import { MapPin, Droplets, Wind, Sun, Eye, Gauge, ThermometerSun } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { format } from 'date-fns';
import { MapPicker } from './MapPicker';

function getUnsplashImageId(condition, isDay) {
  const c = condition.toLowerCase();
  
  if (c.includes('rain') || c.includes('drizzle') || c.includes('shower')) return '1515694346937-94d85e41e6f0';
  if (c.includes('snow') || c.includes('ice') || c.includes('blizzard') || c.includes('pellets')) return '1478265409131-1f65c88f965c';
  if (c.includes('thunder') || c.includes('storm')) return '1605727216801-e27ce1d0ce49';
  if (c.includes('fog') || c.includes('mist')) return '1485594050903-8e8ee7b071a8';
  if (c.includes('cloud') || c.includes('overcast')) return isDay ? '1534088568595-a066f410cbda' : '1534088568595-a066f410cbda'; 
  
  // Clear or partly cloudy
  return isDay ? '1601297183305-6df142704ea2' : '1519681393784-d120267933ba';
}

export function CurrentWeather({ current, location, unit = 'C', onLocationSelect }) {
  if (!current || !location) return null;

  const temp = unit === 'C' ? Math.round(current.temp_c) : Math.round(current.temp_f);
  const feelsLike = unit === 'C' ? Math.round(current.feelslike_c) : Math.round(current.feelslike_f);
  const dewPoint = unit === 'C' ? Math.round(current.dewpoint_c) : Math.round(current.dewpoint_f);
  const wind = unit === 'C' ? `${current.wind_kph} km/h` : `${current.wind_mph} mph`;
  const visibility = unit === 'C' ? `${current.vis_km} km` : `${current.vis_miles} mi`;
  const pressure = `${current.pressure_mb} mb`;

  const isDay = current.is_day === 1;
  const imageId = getUnsplashImageId(current.condition.text, isDay);
  const bgUrl = `https://images.unsplash.com/photo-${imageId}?auto=format&fit=crop&q=80&w=1000`;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 sm:gap-6">
      <div className="space-y-4">
        {/* Main Temp Card */}
        <GlassCard className="col-span-1 md:col-span-2 flex flex-col sm:flex-row items-center sm:items-start justify-between border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] relative overflow-hidden p-4 sm:p-6">
          {/* Background Image */}
          <div 
            className="absolute inset-0 z-0 opacity-40 mix-blend-overlay transition-all duration-1000"
            style={{
              backgroundImage: `url(${bgUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-black/20 to-black/60 pointer-events-none"></div>

          <div className="flex flex-col items-center sm:items-start text-white text-center sm:text-left relative z-10 w-full">
            <div className="flex items-center gap-2 text-lg sm:text-xl font-medium tracking-tight mb-1 drop-shadow-md">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 opacity-80" />
              {location.name}
            </div>
            <div className="text-xs sm:text-sm text-white/80 font-normal mb-4 sm:mb-6 drop-shadow-sm">
              {format(new Date(location.localtime), 'EEEE, d MMMM yyyy | h:mm a')}
            </div>
            
            <div className="flex items-start gap-2">
              <div className="text-6xl sm:text-7xl font-semibold tracking-tight leading-none text-white pb-2 drop-shadow-lg">
                {temp}&deg;
              </div>
              <div className="pt-2 text-xl font-medium text-white drop-shadow-md">
                {unit}
              </div>
            </div>
            
            <div className="mt-4 text-base sm:text-lg font-medium tracking-wide drop-shadow-md">
              {current.condition.text}
            </div>
            <div className="mt-1 text-sm text-white/80 drop-shadow-sm">
              Feels like {feelsLike}&deg;{unit}
            </div>
          </div>

          <div className="flex flex-col items-center mt-6 sm:mt-0 relative z-10 w-full">
            <img 
              src={current.condition.icon.replace('64x64', '128x128')} 
              alt={current.condition.text} 
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 drop-shadow-2xl object-cover scale-110"
            />
          </div>
        </GlassCard>

        {/* Highlights Card */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <GlassCard className="flex flex-col items-center sm:items-start gap-2 bg-white/5 border-white/10 hover:bg-white/10 transition-colors p-4">
            <div className="p-2 bg-white/5 rounded-full border border-white/5 text-white/80">
              <Wind className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="text-white text-center sm:text-left w-full mt-1">
              <div className="text-xs text-white/50 font-medium uppercase tracking-wider truncate">Wind ({current.wind_dir})</div>
              <div className="text-base font-normal mt-1">{wind}</div>
            </div>
          </GlassCard>

          <GlassCard className="flex flex-col items-center sm:items-start gap-2 bg-white/5 border-white/10 hover:bg-white/10 transition-colors p-4">
            <div className="p-2 bg-white/5 rounded-full border border-white/5 text-white/80">
              <Droplets className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="text-white text-center sm:text-left w-full mt-1">
              <div className="text-xs text-white/50 font-medium uppercase tracking-wider">Humidity</div>
              <div className="text-base font-normal mt-1">{current.humidity}%</div>
            </div>
          </GlassCard>

          <GlassCard className="flex flex-col items-center sm:items-start gap-2 bg-white/5 border-white/10 hover:bg-white/10 transition-colors p-4">
            <div className="p-2 bg-white/5 rounded-full border border-white/5 text-white/80">
              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="text-white text-center sm:text-left w-full mt-1">
              <div className="text-xs text-white/50 font-medium uppercase tracking-wider">Visibility</div>
              <div className="text-base font-normal mt-1">{visibility}</div>
            </div>
          </GlassCard>

          <GlassCard className="flex flex-col items-center sm:items-start gap-2 bg-white/5 border-white/10 hover:bg-white/10 transition-colors p-4">
            <div className="p-2 bg-white/5 rounded-full border border-white/5 text-white/80">
              <Gauge className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="text-white text-center sm:text-left w-full mt-1">
              <div className="text-xs text-white/50 font-medium uppercase tracking-wider">Pressure</div>
              <div className="text-base font-normal mt-1">{pressure}</div>
            </div>
          </GlassCard>

          <GlassCard className="flex flex-col items-center sm:items-start gap-2 bg-white/5 border-white/10 hover:bg-white/10 transition-colors p-4">
            <div className="p-2 bg-white/5 rounded-full border border-white/5 text-white/80">
              <ThermometerSun className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="text-white text-center sm:text-left w-full mt-1">
              <div className="text-xs text-white/50 font-medium uppercase tracking-wider">Dew Point</div>
              <div className="text-base font-normal mt-1">{dewPoint}&deg;{unit}</div>
            </div>
          </GlassCard>

          <GlassCard className="flex flex-col items-center sm:items-start gap-2 bg-white/5 border-white/10 hover:bg-white/10 transition-colors p-4">
            <div className="p-2 bg-white/5 rounded-full border border-white/5 text-white/80">
              <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="text-white text-center sm:text-left w-full mt-1">
              <div className="text-xs text-white/50 font-medium uppercase tracking-wider">UV Index</div>
              <div className="text-base font-normal mt-1">{current.uv}</div>
            </div>
          </GlassCard>
        </div>
      </div>
      
      <MapPicker 
        location={location} 
        onLocationSelect={onLocationSelect} 
      />
    </div>
  );
}

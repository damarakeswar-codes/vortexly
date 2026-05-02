import { GlassCard } from './ui/GlassCard';
import { format } from 'date-fns';

export function HourlyForecast({ forecast, unit = 'C' }) {
  if (!forecast || !forecast.forecastday) return null;

  // Combine today and tomorrow's hours, then filter for the next 24 hours
  const todayHours = forecast.forecastday[0].hour;
  const tomorrowHours = forecast.forecastday[1]?.hour || [];
  const allHours = [...todayHours, ...tomorrowHours];
  
  const currentEpoch = Math.floor(Date.now() / 1000);
  const next24Hours = allHours
    .filter(hour => hour.time_epoch >= currentEpoch - 3600) // include current hour
    .slice(0, 24);

  return (
    <div className="mt-4 sm:mt-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium uppercase tracking-wider text-white/60">Hourly Forecast</h3>
        <span className="text-xs text-blue-400 font-medium tracking-wider uppercase">Next 24 Hours</span>
      </div>
      
      <div className="flex overflow-x-auto gap-4 pb-4 scroll-smooth hide-scrollbar">
        {next24Hours.map((hour, index) => {
          const temp = unit === 'C' ? Math.round(hour.temp_c) : Math.round(hour.temp_f);
          const isCurrentHour = index === 0;
          
          return (
            <div 
              key={hour.time_epoch} 
              className={`flex-shrink-0 flex flex-col items-center space-y-3 p-3 rounded-2xl min-w-[70px] transition-all
                ${isCurrentHour ? 'bg-white/10 border border-white/20' : 'bg-transparent hover:bg-white/5'}
              `}
            >
              <div className="text-xs text-white/60 font-medium uppercase">
                {isCurrentHour ? 'Now' : format(new Date(hour.time), 'h a')}
              </div>
              
              <img 
                src={hour.condition.icon} 
                alt={hour.condition.text} 
                className="w-10 h-10 drop-shadow-md"
                title={hour.condition.text}
              />
              
              <div className="text-base font-medium text-white">
                {temp}&deg;
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { GlassCard } from './ui/GlassCard';
import { format } from 'date-fns';

export function DailyForecast({ forecast, unit = 'C' }) {
  if (!forecast || !forecast.forecastday) return null;

  return (
    <GlassCard className="p-6 flex flex-col">
      <h3 className="text-sm font-medium uppercase tracking-wider text-white/60 mb-4">{forecast.forecastday.length}-Day Forecast</h3>
      
      <div className="space-y-4">
        {forecast.forecastday.map((dayData, index) => {
          const date = new Date(dayData.date);
          const maxTemp = unit === 'C' ? Math.round(dayData.day.maxtemp_c) : Math.round(dayData.day.maxtemp_f);
          const minTemp = unit === 'C' ? Math.round(dayData.day.mintemp_c) : Math.round(dayData.day.mintemp_f);
          const shortDay = index === 0 ? 'Today' : format(date, 'EEE');
          
          return (
            <div key={dayData.date} className="flex items-center justify-between text-white border-b border-white/5 last:border-0 pb-3 last:pb-0">
              <span className="text-sm font-medium w-12 text-white/80">
                {shortDay}
              </span>
              
              <div className="flex-1 flex items-center justify-center">
                <img 
                  src={dayData.day.condition.icon} 
                  alt={dayData.day.condition.text}
                  className="w-6 h-6 drop-shadow-sm" 
                />
              </div>
              
              <div className="flex items-center justify-end gap-3 flex-1">
                 <span className="text-sm font-medium w-6 text-right">{maxTemp}&deg;</span>
                 <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-blue-400 rounded-full"
                     style={{
                        width: '100%',
                        opacity: 0.8
                     }}
                   ></div>
                 </div>
                 <span className="text-sm font-medium text-white/50 w-6">{minTemp}&deg;</span>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

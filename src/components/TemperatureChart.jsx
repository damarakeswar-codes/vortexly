import { GlassCard } from './ui/GlassCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { HourlyForecast } from './HourlyForecast';

export function TemperatureChart({ forecast, unit = 'C' }) {
  if (!forecast || !forecast.forecastday) return null;

  // Get next 24 hours of data for chart
  const todayHours = forecast.forecastday[0].hour;
  const tomorrowHours = forecast.forecastday[1]?.hour || [];
  const allHours = [...todayHours, ...tomorrowHours];
  
  const currentEpoch = Math.floor(Date.now() / 1000);
  const data = allHours
    .filter(hour => hour.time_epoch >= currentEpoch)
    .slice(0, 12) // Show next 12 hours
    .map(hour => ({
      time: format(new Date(hour.time), 'ha'),
      temp: unit === 'C' ? Math.round(hour.temp_c) : Math.round(hour.temp_f),
    }));

  return (
    <GlassCard className="p-6 h-[500px] w-full">
      <h3 className="text-sm font-medium uppercase tracking-wider text-white/60 mb-4">Temperature Trend</h3>
      <div className="w-full h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fff" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#fff" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              stroke="rgba(255,255,255,0.5)" 
              tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 12 }} 
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.5)" 
              tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Area 
              type="monotone" 
              dataKey="temp" 
              stroke="#fff" 
              fillOpacity={1} 
              fill="url(#colorTemp)" 
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <HourlyForecast 
        forecast={forecast} 
        unit={unit} 
      />
    </GlassCard>
  );
}

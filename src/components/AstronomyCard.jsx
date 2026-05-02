import { GlassCard } from './ui/GlassCard';
import { Sunrise, Moon } from 'lucide-react';

export function AstronomyCard({ astro }) {
  if (!astro) return null;

  return (
    <GlassCard className="p-6 h-full flex flex-col justify-between">
      <h3 className="text-sm font-medium uppercase tracking-wider text-white/60">Astronomy</h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 text-orange-400">
             <Sunrise className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-white/50 font-medium uppercase tracking-wider">Sunrise</div>
            <div className="text-base font-medium text-white mt-0.5">{astro.sunrise}</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400">
             <Moon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-white/50 font-medium uppercase tracking-wider">Moon Phase</div>
            <div className="text-base font-medium text-white mt-0.5">{astro.moon_phase}</div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

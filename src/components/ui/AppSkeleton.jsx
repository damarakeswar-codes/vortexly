export function AppSkeleton() {
  return (
    <div className="animate-pulse flex flex-col lg:grid lg:grid-cols-12 gap-5 sm:gap-6 pb-4 w-full">
      {/* Left Column - Main Content */}
      <div className="lg:col-span-8 flex flex-col gap-5 sm:gap-6">
        {/* Current Weather */}
        <div className="h-[340px] sm:h-[280px] md:h-[260px] bg-white/10 border border-white/5 rounded-2xl sm:rounded-3xl w-full"></div>
        {/* Hourly Forecast */}
        <div className="h-[160px] bg-white/10 border border-white/5 rounded-2xl sm:rounded-3xl w-full"></div>
        {/* AQI and Astronomy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <div className="h-[220px] bg-white/10 border border-white/5 rounded-2xl sm:rounded-3xl w-full"></div>
          <div className="h-[220px] bg-white/10 border border-white/5 rounded-2xl sm:rounded-3xl w-full"></div>
        </div>
        {/* Temperature Chart */}
        <div className="h-[300px] bg-white/10 border border-white/5 rounded-2xl sm:rounded-3xl w-full"></div>
      </div>
      
      {/* Right Column - Sidebar */}
      <div className="lg:col-span-4 flex flex-col gap-5 sm:gap-6 lg:h-full">
        {/* Map Picker */}
        <div className="h-[300px] sm:h-[400px] lg:h-[350px] shrink-0 bg-white/10 border border-white/5 rounded-2xl sm:rounded-3xl w-full"></div>
        {/* Daily Forecast */}
        <div className="h-[400px] lg:flex-1 bg-white/10 border border-white/5 rounded-2xl sm:rounded-3xl w-full"></div>
      </div>
    </div>
  );
}

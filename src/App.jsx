import { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { HourlyForecast } from './components/HourlyForecast';
import { DailyForecast } from './components/DailyForecast';
import { AqiCard } from './components/AqiCard';
import { AstronomyCard } from './components/AstronomyCard';
import { TemperatureChart } from './components/TemperatureChart';
import { MapCard } from './components/MapCard';
import { AppSkeleton } from './components/ui/AppSkeleton';
import { useWeather } from './hooks/useWeather';
import { CloudDrizzle, Settings2 } from 'lucide-react';
import { cn } from './utils/cn';

function App() {
  const { 
    data, 
    loading, 
    error, 
    setLocationQuery, 
    setLocationByCoords 
  } = useWeather('London');

  const [unit, setUnit] = useState('C');
  const [backgroundClass, setBackgroundClass] = useState('bg-weather-sunny');

  useEffect(() => {
    if (data?.current) {
      const code = data.current.condition.code;
      const isDay = data.current.is_day;
      
      if (!isDay) {
        setBackgroundClass('bg-weather-night');
      } else if ([1000].includes(code)) {
        setBackgroundClass('bg-weather-sunny');
      } else if ([1003, 1006, 1009, 1030].includes(code)) {
        setBackgroundClass('bg-weather-cloudy');
      } else if ([1063, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246, 1273, 1276].includes(code) || code > 1150 && code < 1200) {
        setBackgroundClass('bg-weather-rain');
      } else if ([1066, 1069, 1114, 1210, 1213, 1219, 1222, 1225, 1255, 1258].includes(code) || code >= 1200 && code < 1230) {
        setBackgroundClass('bg-weather-snow');
      } else {
        setBackgroundClass('bg-weather-sunny');
      }
    }
  }, [data]);

  const handleGeolocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => setLocationByCoords(position.coords.latitude, position.coords.longitude),
        (error) => alert("Could not get location: " + error.message)
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const toggleUnit = () => setUnit(u => u === 'C' ? 'F' : 'C');

  return (
    <div className={cn("min-h-screen p-2 sm:p-3 md:p-6 transition-colors duration-1000 font-sans text-white flex flex-col", backgroundClass)}>
      <div className="w-full mx-auto my-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl sm:rounded-[32px] shadow-2xl overflow-hidden p-2 sm:p-4 md:p-6 flex flex-col relative">
        
        {/* Header Section */}
        <header className="flex flex-wrap items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8 relative z-50">
          <div className="flex items-center gap-2 sm:gap-3 text-white">
            <div className="p-1.5 sm:p-2 bg-white/20 rounded-xl backdrop-blur-md">
              <CloudDrizzle className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-semibold tracking-tight font-display">Vortexly</h1>
              <p className="text-[8px] sm:text-[10px] text-blue-300 font-medium uppercase tracking-[0.2em] mt-1">Weather Intel</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 order-2 md:order-3">
            <button 
              onClick={toggleUnit}
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 rounded-full font-bold transition-colors text-sm sm:text-base"
              >
              &deg;{unit}
            </button>
          </div>

          <div className="w-full md:flex-1 md:max-w-2xl px-0 md:px-8 order-3 md:order-2 mt-2 md:mt-0">
            <SearchBar 
              onLocationSelect={setLocationQuery} 
              onGeolocation={handleGeolocation} 
            />
          </div>
        </header>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 backdrop-blur-md text-white p-4 rounded-xl mb-8 max-w-xl mx-auto text-center">
            <p className="font-medium">Error loading weather data</p>
            <p className="text-sm opacity-80 mt-1">{error}</p>
          </div>
        )}

        {loading ? (
          <AppSkeleton />
        ) : data ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in pb-12">
            
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <CurrentWeather 
                current={data.current} 
                location={data.location} 
                unit={unit} 
              />
              
              <HourlyForecast 
                forecast={data.forecast} 
                unit={unit} 
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <AqiCard aqi={data.current.air_quality} />
                 <AstronomyCard astro={data.forecast.forecastday[0]?.astro} />
              </div>

               <TemperatureChart 
                forecast={data.forecast} 
                unit={unit} 
              />
            </div>

            {/* Right Column - Sidebar */}
            <div className="flex flex-col space-y-6 lg:h-full">
              <DailyForecast 
                forecast={data.forecast} 
                unit={unit} 
              />
              
              <MapCard location={data.location} />
            </div>

          </div>
        ) : null}
        
      </div>
    </div>
  );
}

export default App;

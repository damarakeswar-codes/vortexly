import { useState, useEffect, useRef } from 'react';
import { useDebounce } from 'use-debounce';
import { Search, MapPin, Loader2, Mic } from 'lucide-react';
import { weatherService } from '../services/weatherApi';
import { cn } from '../utils/cn';

export function SearchBar({ onLocationSelect, onGeolocation }) {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 500);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('recent_weather_searches');
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedQuery.length >= 3) {
        setLoading(true);
        const results = await weatherService.searchLocations(debouncedQuery);
        setSuggestions(results);
        setLoading(false);
        setIsOpen(true);
      } else {
        setSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [debouncedQuery]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (locationName) => {
    onLocationSelect(locationName);
    setQuery('');
    setIsOpen(false);
    
    const updatedRecents = [locationName, ...recentSearches.filter(item => item !== locationName)].slice(0, 5);
    setRecentSearches(updatedRecents);
    localStorage.setItem('recent_weather_searches', JSON.stringify(updatedRecents));
  };

  const startListening = () => {
    // Basic implementation for Web Speech API
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } else {
      alert("Voice search is not supported in this browser.");
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl mx-auto z-50">
      <div className="relative flex items-center w-full h-12 sm:h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg px-3 sm:px-4 focus-within:ring-2 ring-white/50 transition-all">
        <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if(e.target.value.length > 0) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search city, zip, or place..."
          className="w-full h-full bg-transparent border-none outline-none text-white px-2 sm:px-3 placeholder:text-white/60 text-sm sm:text-lg"
        />
        
        <div className="flex items-center gap-2">
          {loading && <Loader2 className="w-5 h-5 text-white animate-spin" />}
          
          <button 
            type="button"
            onClick={startListening}
            className={cn("p-2 rounded-full transition-colors", isListening ? "bg-red-500/50 text-white" : "hover:bg-white/10 text-white/80")}
            title="Voice Search"
          >
            <Mic className="w-5 h-5" />
          </button>

          <button 
            type="button"
            onClick={onGeolocation}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/80"
            title="Use current location"
          >
            <MapPin className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isOpen && (query.length > 0 || recentSearches.length > 0) && (
        <div className="absolute top-16 left-0 w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
          {suggestions.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Results
              </div>
              {suggestions.map((loc) => (
                <button
                  key={`${loc.lat}-${loc.lon}`}
                  onClick={() => handleSelect(loc.name)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors flex items-center justify-between"
                >
                  <span className="text-gray-800 dark:text-gray-200 font-medium">{loc.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{loc.region}, {loc.country}</span>
                </button>
              ))}
            </div>
          ) : query.length > 0 && query.length >= 3 && !loading ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No locations found for "{query}"
            </div>
          ) : null}

          {recentSearches.length > 0 && suggestions.length === 0 && (
            <div className="py-2 border-t border-gray-100 dark:border-gray-700/50">
               <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Recent Searches
              </div>
              {recentSearches.map((loc) => (
                <button
                  key={loc}
                  onClick={() => handleSelect(loc)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors flex items-center text-gray-700 dark:text-gray-300"
                >
                  <Search className="w-4 h-4 mr-3 opacity-50" />
                  {loc}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

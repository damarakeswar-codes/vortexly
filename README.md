# Vortexly — Weather Intel

**Vortexly** is a premium glassmorphism weather dashboard that delivers real‑time conditions, forecasts, AQI, astronomy, and location-aware search in a fast, modern UI.

---

## 📸 Preview / Screenshots (Optional)

Screenshots aren’t included in this repository.

Suggested additions:
- `assets/preview-desktop.png`
- `assets/preview-mobile.png`
- `assets/search-autocomplete.gif`

---

## 🚀 Features

### UI & Experience
- **Glassmorphism dashboard** with consistent reusable panels
- **Motion-based entrances** for key UI sections (`motion/react`)
- **Dynamic background gradients** based on condition codes + day/night
- **Loading skeleton** while data is fetched

### Weather
- **Current conditions**: temperature, feels-like, condition text + icon
- **Highlights**: wind (with direction), humidity, visibility, pressure, dew point, UV
- **Hourly forecast** for the next **24 hours**
- **7-day forecast** overview
- **Temperature trend chart** for upcoming hours (Recharts)

### Air & Astronomy
- **Air Quality Index (AQI)** with US EPA category label
- Pollutant breakdown: **PM2.5, PM10, NO2, O3, CO**
- **Astronomy**: sunrise and moon phase

### Search & Location
- **Autocomplete search** using WeatherAPI location search
- **Recent searches** saved in `localStorage` (up to 5)
- **Geolocation** via `navigator.geolocation` (query becomes `"lat,lon"`)
- **Voice search** (basic Web Speech API via `webkitSpeechRecognition`, where available)

### Map
- **Embedded map preview** via a Google Maps iframe (no Maps API key required)

---

## 🛠️ Tech Stack

### Frontend
- **React 19**
- **Vite**
- **Tailwind CSS v4** (`@tailwindcss/vite`)

### UI & Visualization
- **motion** (`motion/react`) for animations
- **Recharts** for charting
- **lucide-react** for icons

### Data & Utilities
- **Axios** for HTTP requests
- **date-fns** for formatting dates/times
- **use-debounce** for debounced autocomplete
- **clsx** + **tailwind-merge** (via `src/utils/cn.js`)

### External Services
- **WeatherAPI** (forecast + location search + AQI + alerts payload)

> Note: `@google/genai`, `express`, and `dotenv` exist in `package.json`, but there is **no code in `src/` currently using Gemini or an Express backend**. This is likely scaffolding/AI Studio related.

---

## 📂 Folder Structure

```txt
vortexly/
├─ index.html                 # app shell + Google Fonts
├─ package.json               # scripts + dependencies
├─ package-lock.json
├─ vite.config.ts             # Vite config + env define
├─ tsconfig.json              # TS config (repo contains JS/JSX)
├─ metadata.json              # requests geolocation + microphone permissions
├─ .gitignore                 # ignores .env* (except .env.example)
├─ .env                       # local env values (do not commit real secrets)
└─ src/
   ├─ main.jsx                # React entry
   ├─ App.jsx                 # layout + unit toggle + background logic
   ├─ index.css               # Tailwind + glass styles + background themes
   ├─ components/
   │  ├─ SearchBar.jsx        # autocomplete + recents + voice + geo button
   │  ├─ CurrentWeather.jsx   # current + highlights
   │  ├─ HourlyForecast.jsx   # next 24 hours scroller
   │  ├─ DailyForecast.jsx    # 7-day list
   │  ├─ AqiCard.jsx          # AQI category + pollutant stats
   │  ├─ AstronomyCard.jsx    # sunrise + moon phase
   │  ├─ TemperatureChart.jsx # temperature trend (Recharts)
   │  ├─ MapCard.jsx          # Google Maps iframe embed
   │  └─ ui/
   │     ├─ GlassCard.jsx     # reusable animated glass panel wrapper
   │     └─ AppSkeleton.jsx   # loading skeleton layout
   ├─ hooks/
   │  └─ useWeather.js        # fetch orchestration + localStorage persistence
   ├─ services/
   │  └─ weatherApi.js        # WeatherAPI client + error handling
   └─ utils/
      └─ cn.js                # className merge helper
```

---

## ⚙️ Installation & Setup

### Prerequisites
- **Node.js** (recommended: current LTS)

### Clone the repo

```bash
git clone <your-repo-url>
cd vortexly
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Vite reads variables from `.env`, `.env.local`, etc. Create `.env.local` and add the required keys.

**Windows (PowerShell)**

```powershell
Copy-Item .env .env.local
```

### Run the dev server

```bash
npm run dev
```

The dev server runs on `http://localhost:3000` (configured in `package.json`).

---

## 🔑 Environment Variables

### Required
- `VITE_WEATHER_API_KEY` — WeatherAPI key used by `src/services/weatherApi.js`.

### Present in repo (currently unused by `src/`)
- `GEMINI_API_KEY` — injected via `vite.config.ts` as `process.env.GEMINI_API_KEY`, but not referenced in UI code.
- `APP_URL` — not referenced in `src/` currently.

### Example `.env.local`

```env
VITE_WEATHER_API_KEY=your_weatherapi_key_here
GEMINI_API_KEY=your_gemini_api_key_here
APP_URL=http://localhost:3000
```

**Security note:** `.gitignore` ignores `.env*` (except `.env.example`). Avoid committing real secrets—prefer committing an `.env.example` file with placeholders.

---

## 🌐 API Usage

Vortexly uses **WeatherAPI** directly from the browser via Axios.

- **Docs**: `https://www.weatherapi.com/docs/`
- **Base URL**: `https://api.weatherapi.com/v1`

### Endpoints used

#### Forecast + current + AQI + alerts
- **GET** `/forecast.json`
- Used by: `weatherService.getForecast(query, days = 7)`
- Parameters:
  - `q`: location query (e.g., `London`, postal code, or `"lat,lon"`)
  - `days`: forecast days (default `7`)
  - `aqi=yes`
  - `alerts=yes`

Sample request:

```bash
curl "https://api.weatherapi.com/v1/forecast.json?key=YOUR_KEY&q=London&days=7&aqi=yes&alerts=yes"
```

#### Location autocomplete search
- **GET** `/search.json`
- Used by: `weatherService.searchLocations(query)`
- Notes:
  - returns `[]` for queries shorter than 3 characters

Sample request:

```bash
curl "https://api.weatherapi.com/v1/search.json?key=YOUR_KEY&q=San"
```

---

## 🧩 Key Components / Architecture

### Data flow
- **`src/hooks/useWeather.js`**
  - Owns `data`, `loading`, and `error` state
  - Triggers fetch when `locationQuery` changes
  - Persists the last location in `localStorage` (`last_weather_location`)
- **`src/services/weatherApi.js`**
  - Axios client with shared base URL and `key` param
  - `getForecast()` for dashboard data
  - `searchLocations()` for autocomplete
  - Consistent error messaging for UI display

### UI composition
- **`src/App.jsx`**
  - Composes cards into a responsive grid
  - °C/°F unit toggle
  - Applies background themes based on condition code + day/night
  - Geolocation support via `"lat,lon"` query
- **Reusable UI**
  - `GlassCard` provides a consistent panel wrapper + motion entrance
  - `AppSkeleton` provides a full-page loading layout

---

## 🎨 UI/UX Highlights

- **Glassmorphism** utilities via `.glass-panel` in `src/index.css`
- **Premium typography**: Inter + Playfair Display (loaded in `index.html`)
- **Weather-aware ambiance**: gradient themes for sunny/cloudy/rain/snow/night
- **Map styling**: iframe filtered (grayscale/invert/contrast/hue-rotate) to match the dark-glass theme

---

## 📱 Responsiveness

Optimized for:
- **Mobile** (stacked layout, compact spacing)
- **Tablet**
- **Desktop** (multi-column grid + sidebar)

Implemented with Tailwind responsive utilities (`sm`, `md`, `lg`).

---

## 🚧 Future Improvements

- Add a committed **`.env.example`** and remove/rotate any exposed keys
- Persist **unit preference** (°C/°F) to `localStorage`
- Improve voice search compatibility by supporting standard `SpeechRecognition` (in addition to `webkitSpeechRecognition`)
- Render **WeatherAPI alerts** (payload is requested but not displayed in UI)
- Accessibility improvements: keyboard navigation + ARIA roles for the search dropdown
- Add tests for `weatherApi` and `useWeather`
- Remove unused dependencies or implement their intended features (`@google/genai`, `express`, `dotenv`) based on roadmap

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch:

```bash
git checkout -b feat/your-feature
```

3. Run locally and verify:

```bash
npm install
npm run dev
```

4. Open a PR with:
   - what changed
   - why it changed
   - screenshots/gifs for UI updates

---

## 📄 License

MIT (recommended). If you haven’t added a license file yet, add a `LICENSE` file or replace this section with your preferred license.
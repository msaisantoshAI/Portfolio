'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useTheme } from 'next-themes';

export type ThemeMode = 'light' | 'dark' | 'system';
export type TimePhase = 'dawn' | 'morning' | 'afternoon' | 'goldenHour' | 'sunset' | 'night';
export type WeatherState = 'clear' | 'partlyCloudy' | 'cloudy' | 'rain' | 'thunderstorm' | 'fog' | 'snow';
export type LocationRegion = 'india' | 'us' | 'europe' | 'asia' | 'global';

export interface EnvironmentState {
  themeMode: ThemeMode;
  timePhase: TimePhase;
  weatherState: WeatherState;
  temperature: number | null;
  location: string;
  region: LocationRegion;
  localTime: string;
  isDay: boolean;
  weatherDescription: string;
  effectiveTheme: 'light' | 'dark';
  isSimulating: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  setCustomLocation: (city: string, lat?: number, lon?: number, timezone?: string) => Promise<void>;
  setTimePhaseOverride: (phase: TimePhase | null) => void;
  setWeatherOverride: (weather: WeatherState | null) => void;
  resetToLiveLocation: () => void;
  refreshWeather: () => void;
}

const defaultState: EnvironmentState = {
  themeMode: 'system',
  timePhase: 'afternoon',
  weatherState: 'clear',
  temperature: null,
  location: 'Hyderabad',
  region: 'india',
  localTime: '',
  isDay: true,
  weatherDescription: 'Clear',
  effectiveTheme: 'light',
  isSimulating: false,
  setThemeMode: () => {},
  setCustomLocation: async () => {},
  setTimePhaseOverride: () => {},
  setWeatherOverride: () => {},
  resetToLiveLocation: () => {},
  refreshWeather: () => {},
};

const EnvironmentContext = createContext<EnvironmentState>(defaultState);

export function useEnvironment() {
  return useContext(EnvironmentContext);
}

// Map WMO Weather Codes to our visual weather states
function mapWmoCode(code: number): { state: WeatherState; description: string } {
  if (code === 0) return { state: 'clear', description: 'Clear' };
  if (code === 1) return { state: 'clear', description: 'Mainly Clear' };
  if (code === 2) return { state: 'partlyCloudy', description: 'Partly Cloudy' };
  if (code === 3) return { state: 'cloudy', description: 'Overcast' };
  if (code === 45 || code === 48) return { state: 'fog', description: 'Foggy' };
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return { state: 'rain', description: 'Rain' };
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return { state: 'snow', description: 'Snow' };
  if (code >= 95 && code <= 99) return { state: 'thunderstorm', description: 'Thunderstorm' };
  return { state: 'clear', description: 'Clear' };
}

export function EnvironmentProvider({ children }: { children: React.ReactNode }) {
  const { setTheme } = useTheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [timePhase, setTimePhase] = useState<TimePhase>('afternoon');
  const [weatherState, setWeatherState] = useState<WeatherState>('clear');
  const [temperature, setTemperature] = useState<number | null>(null);
  const [location, setLocation] = useState<string>('Hyderabad');
  const [region, setRegion] = useState<LocationRegion>('india');
  const [currentTimezone, setCurrentTimezone] = useState<string>('');
  const [localTime, setLocalTime] = useState<string>('');
  const [isDay, setIsDay] = useState<boolean>(true);
  const [weatherDescription, setWeatherDescription] = useState<string>('Clear');
  const [sunriseTime, setSunriseTime] = useState<Date | null>(null);
  const [sunsetTime, setSunsetTime] = useState<Date | null>(null);

  // Manual Simulator Overrides
  const [timePhaseOverride, setTimePhaseOverride] = useState<TimePhase | null>(null);
  const [weatherOverride, setWeatherOverride] = useState<WeatherState | null>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const rawTimePhaseRef = useRef<TimePhase>('afternoon');

  // Load saved theme mode from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sai_portfolio_theme_mode') as ThemeMode | null;
      if (saved && (saved === 'light' || saved === 'dark' || saved === 'system')) {
        setThemeModeState(saved);
      }
    } catch {
      // Ignore
    }
  }, []);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    try {
      localStorage.setItem('sai_portfolio_theme_mode', mode);
    } catch {
      // Ignore
    }
  };

  // 1. Calculate Time Phase from Current Local Time and Sunrise/Sunset
  const updateTimePhase = useCallback(() => {
    const now = new Date();
    
    // Format local time string (using custom timezone if simulating a different city)
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    if (currentTimezone) {
      options.timeZone = currentTimezone;
    }

    const timeFormatter = new Intl.DateTimeFormat([], options);
    setLocalTime(timeFormatter.format(now));

    // Get current minutes in the target timezone
    let targetHours = now.getHours();
    let targetMinutes = now.getMinutes();

    if (currentTimezone) {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: currentTimezone,
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      }).formatToParts(now);
      const hPart = parts.find((p) => p.type === 'hour')?.value;
      const mPart = parts.find((p) => p.type === 'minute')?.value;
      if (hPart) targetHours = parseInt(hPart, 10);
      if (mPart) targetMinutes = parseInt(mPart, 10);
    }

    const currentMins = targetHours * 60 + targetMinutes;

    let computedPhase: TimePhase = 'morning';
    let computedIsDay = true;

    if (sunriseTime && sunsetTime) {
      const sunriseMinutes = sunriseTime.getHours() * 60 + sunriseTime.getMinutes();
      const sunsetMinutes = sunsetTime.getHours() * 60 + sunsetTime.getMinutes();

      const dawnStart = sunriseMinutes - 45;
      const dawnEnd = sunriseMinutes + 30;
      const goldenHourStart = sunsetMinutes - 60;
      const sunsetEnd = sunsetMinutes + 45;

      if (currentMins >= dawnStart && currentMins < dawnEnd) {
        computedPhase = 'dawn';
        computedIsDay = true;
      } else if (currentMins >= dawnEnd && currentMins < 12 * 60) {
        computedPhase = 'morning';
        computedIsDay = true;
      } else if (currentMins >= 12 * 60 && currentMins < goldenHourStart) {
        computedPhase = 'afternoon';
        computedIsDay = true;
      } else if (currentMins >= goldenHourStart && currentMins < sunsetMinutes) {
        computedPhase = 'goldenHour';
        computedIsDay = true;
      } else if (currentMins >= sunsetMinutes && currentMins < sunsetEnd) {
        computedPhase = 'sunset';
        computedIsDay = false;
      } else {
        computedPhase = 'night';
        computedIsDay = false;
      }
    } else {
      if (targetHours >= 5 && targetHours < 7) {
        computedPhase = 'dawn';
        computedIsDay = true;
      } else if (targetHours >= 7 && targetHours < 12) {
        computedPhase = 'morning';
        computedIsDay = true;
      } else if (targetHours >= 12 && targetHours < 17) {
        computedPhase = 'afternoon';
        computedIsDay = true;
      } else if (targetHours >= 17 && targetHours < 18) {
        computedPhase = 'goldenHour';
        computedIsDay = true;
      } else if (targetHours >= 18 && targetHours < 19) {
        computedPhase = 'sunset';
        computedIsDay = false;
      } else {
        computedPhase = 'night';
        computedIsDay = false;
      }
    }

    rawTimePhaseRef.current = computedPhase;

    if (!timePhaseOverride) {
      setTimePhase(computedPhase);
      setIsDay(computedIsDay);
    } else {
      setTimePhase(timePhaseOverride);
      setIsDay(timePhaseOverride !== 'sunset' && timePhaseOverride !== 'night');
    }
  }, [sunriseTime, sunsetTime, currentTimezone, timePhaseOverride]);

  // Real-time clock update (every second)
  useEffect(() => {
    updateTimePhase();
    const interval = setInterval(updateTimePhase, 1000);
    return () => clearInterval(interval);
  }, [updateTimePhase]);

  // 2. Weather Engine (Fetches user location & current weather)
  const fetchWeather = useCallback(async (customLat?: number, customLon?: number, customName?: string, customTz?: string) => {
    try {
      let lat = customLat ?? 17.385;
      let lon = customLon ?? 78.4867;
      let locName = customName ?? 'Hyderabad';
      let tzName = customTz ?? '';
      let detectedRegion: LocationRegion = 'india';

      if (customLat === undefined) {
        try {
          const geoRes = await fetch('https://ipwho.is/', { cache: 'no-store' });
          if (geoRes.ok) {
            const geoData = await geoRes.json();
            if (geoData && geoData.success !== false) {
              lat = geoData.latitude || lat;
              lon = geoData.longitude || lon;
              locName = geoData.city || geoData.region || geoData.country || locName;
              tzName = geoData.timezone?.id || '';

              const locLower = `${geoData.city || ''} ${geoData.region || ''} ${geoData.country || ''}`.toLowerCase();
              const countryCode = (geoData.country_code || '').toUpperCase();

              if (countryCode === 'IN' || locLower.includes('india') || locLower.includes('hyderabad')) {
                detectedRegion = 'india';
              } else if (countryCode === 'US' || countryCode === 'CA' || locLower.includes('united states')) {
                detectedRegion = 'us';
              } else if (['GB', 'FR', 'DE', 'IT', 'ES', 'NL', 'CH'].includes(countryCode)) {
                detectedRegion = 'europe';
              } else if (['JP', 'SG', 'KR', 'CN', 'AE', 'TH'].includes(countryCode)) {
                detectedRegion = 'asia';
              } else {
                detectedRegion = 'global';
              }
            }
          }
        } catch {
          // Keep defaults
        }
      } else {
        const locLower = locName.toLowerCase();
        if (locLower.includes('india') || locLower.includes('hyderabad') || locLower.includes('mumbai') || locLower.includes('delhi')) {
          detectedRegion = 'india';
        } else if (locLower.includes('francisco') || locLower.includes('york') || locLower.includes('states') || locLower.includes('usa')) {
          detectedRegion = 'us';
        } else if (locLower.includes('london') || locLower.includes('paris') || locLower.includes('berlin') || locLower.includes('europe')) {
          detectedRegion = 'europe';
        } else if (locLower.includes('tokyo') || locLower.includes('singapore') || locLower.includes('dubai') || locLower.includes('asia')) {
          detectedRegion = 'asia';
        } else {
          detectedRegion = 'global';
        }
      }

      setLocation(locName);
      setRegion(detectedRegion);
      setCurrentTimezone(tzName);

      // Step B: Fetch Live Weather from Open-Meteo API
      const tzParam = tzName ? encodeURIComponent(tzName) : 'auto';
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day&daily=sunrise,sunset&timezone=${tzParam}`;
      const wRes = await fetch(weatherUrl, { cache: 'no-store' });
      
      if (wRes.ok) {
        const wData = await wRes.json();
        if (wData && wData.current) {
          const temp = Math.round(wData.current.temperature_2m);
          setTemperature(temp);

          const wmo = mapWmoCode(wData.current.weather_code);
          if (!weatherOverride) {
            setWeatherState(wmo.state);
            setWeatherDescription(wmo.description);
          }

          if (wData.daily && wData.daily.sunrise && wData.daily.sunset) {
            const sr = new Date(wData.daily.sunrise[0]);
            const ss = new Date(wData.daily.sunset[0]);
            if (!isNaN(sr.getTime()) && !isNaN(ss.getTime())) {
              setSunriseTime(sr);
              setSunsetTime(ss);
            }
          }
        }
      }
    } catch {
      // Fail silently
    }
  }, [weatherOverride]);

  // Initial weather fetch on mount
  useEffect(() => {
    fetchWeather();
    const weatherInterval = setInterval(() => fetchWeather(), 20 * 60 * 1000);
    return () => clearInterval(weatherInterval);
  }, [fetchWeather]);

  // Handle setting custom simulated location
  const setCustomLocation = async (cityName: string, lat?: number, lon?: number, timezone?: string) => {
    setIsSimulating(true);
    let targetLat = lat;
    let targetLon = lon;
    let targetTz = timezone;
    let targetName = cityName;

    if (targetLat === undefined || targetLon === undefined) {
      try {
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`);
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (geoData.results && geoData.results.length > 0) {
            const result = geoData.results[0];
            targetLat = result.latitude;
            targetLon = result.longitude;
            targetName = result.name;
            targetTz = result.timezone;
          }
        }
      } catch {
        // Ignore
      }
    }

    if (targetLat !== undefined && targetLon !== undefined) {
      await fetchWeather(targetLat, targetLon, targetName, targetTz);
    }
  };

  const resetToLiveLocation = () => {
    setIsSimulating(false);
    setTimePhaseOverride(null);
    setWeatherOverride(null);
    fetchWeather();
  };

  const handleSetTimePhaseOverride = (phase: TimePhase | null) => {
    setTimePhaseOverride(phase);
    setIsSimulating(phase !== null || weatherOverride !== null);
    if (phase) {
      setTimePhase(phase);
      setIsDay(phase !== 'sunset' && phase !== 'night');
    } else {
      setTimePhase(rawTimePhaseRef.current);
      setIsDay(rawTimePhaseRef.current !== 'sunset' && rawTimePhaseRef.current !== 'night');
    }
  };

  const handleSetWeatherOverride = (weather: WeatherState | null) => {
    setWeatherOverride(weather);
    setIsSimulating(timePhaseOverride !== null || weather !== null);
    if (weather) {
      setWeatherState(weather);
      setWeatherDescription(weather.toUpperCase());
    }
  };

  // 3. Compute Effective Theme (Syncing with next-themes)
  let effectiveTheme: 'light' | 'dark' = 'light';
  if (themeMode === 'light') {
    effectiveTheme = 'light';
  } else if (themeMode === 'dark') {
    effectiveTheme = 'dark';
  } else {
    // In system mode: daytime phases -> light, evening/sunset/night -> dark
    effectiveTheme = isDay && (timePhase === 'morning' || timePhase === 'afternoon' || timePhase === 'dawn' || timePhase === 'goldenHour') ? 'light' : 'dark';
  }

  // Update next-themes provider
  useEffect(() => {
    setTheme(effectiveTheme);
  }, [effectiveTheme, setTheme]);

  return (
    <EnvironmentContext.Provider
      value={{
        themeMode,
        timePhase,
        weatherState,
        temperature,
        location,
        region,
        localTime,
        isDay,
        weatherDescription,
        effectiveTheme,
        isSimulating,
        setThemeMode,
        setCustomLocation,
        setTimePhaseOverride: handleSetTimePhaseOverride,
        setWeatherOverride: handleSetWeatherOverride,
        resetToLiveLocation,
        refreshWeather: () => fetchWeather(),
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  );
}

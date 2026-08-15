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
  windSpeed: number | null;
  isWindy: boolean;
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
  windSpeed: null,
  isWindy: false,
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
  const [windSpeed, setWindSpeed] = useState<number | null>(null);
  const [isWindy, setIsWindy] = useState<boolean>(false);
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

      const hPart = parts.find(p => p.type === 'hour');
      const mPart = parts.find(p => p.type === 'minute');
      if (hPart && mPart) {
        targetHours = parseInt(hPart.value, 10);
        targetMinutes = parseInt(mPart.value, 10);
      }
    }

    const currentTotalMinutes = targetHours * 60 + targetMinutes;

    // Default Sunrise (6:00 AM) & Sunset (6:30 PM) if not available
    let srMinutes = 6 * 60; // 360
    let ssMinutes = 18 * 60 + 30; // 1110

    if (sunriseTime && sunsetTime) {
      srMinutes = sunriseTime.getHours() * 60 + sunriseTime.getMinutes();
      ssMinutes = sunsetTime.getHours() * 60 + sunsetTime.getMinutes();
    }

    // Determine 6 Environmental Time Phases
    // Dawn: Sunrise - 45 min to Sunrise + 30 min
    // Morning: Sunrise + 30 min to 11:30 AM
    // Afternoon: 11:30 AM to Sunset - 60 min
    // Golden Hour: Sunset - 60 min to Sunset
    // Sunset / Twilight: Sunset to Sunset + 45 min
    // Night: Sunset + 45 min to Sunrise - 45 min

    const dawnStart = srMinutes - 45;
    const morningStart = srMinutes + 30;
    const afternoonStart = 11 * 60 + 30;
    const goldenHourStart = ssMinutes - 60;
    const sunsetStart = ssMinutes;
    const nightStart = ssMinutes + 45;

    let computedPhase: TimePhase = 'afternoon';
    let computedIsDay = true;

    if (currentTotalMinutes >= dawnStart && currentTotalMinutes < morningStart) {
      computedPhase = 'dawn';
      computedIsDay = true;
    } else if (currentTotalMinutes >= morningStart && currentTotalMinutes < afternoonStart) {
      computedPhase = 'morning';
      computedIsDay = true;
    } else if (currentTotalMinutes >= afternoonStart && currentTotalMinutes < goldenHourStart) {
      computedPhase = 'afternoon';
      computedIsDay = true;
    } else if (currentTotalMinutes >= goldenHourStart && currentTotalMinutes < sunsetStart) {
      computedPhase = 'goldenHour';
      computedIsDay = true;
    } else if (currentTotalMinutes >= sunsetStart && currentTotalMinutes < nightStart) {
      computedPhase = 'sunset';
      computedIsDay = false;
    } else {
      computedPhase = 'night';
      computedIsDay = false;
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

      // Fetch Live Weather & Wind from Open-Meteo API
      const tzParam = tzName ? encodeURIComponent(tzName) : 'auto';
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day,wind_speed_10m&daily=sunrise,sunset&timezone=${tzParam}`;
      const wRes = await fetch(weatherUrl, { cache: 'no-store' });
      
      if (wRes.ok) {
        const wData = await wRes.json();
        if (wData && wData.current) {
          const temp = Math.round(wData.current.temperature_2m);
          setTemperature(temp);

          const wSpeed = Math.round(wData.current.wind_speed_10m || 0);
          setWindSpeed(wSpeed);
          setIsWindy(wSpeed >= 12);

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

  const refreshWeather = () => {
    fetchWeather();
  };

  // Sync NextThemes
  const effectiveTheme = themeMode === 'dark' || (themeMode === 'system' && (!isDay || timePhase === 'night' || timePhase === 'sunset')) 
    ? 'dark' 
    : 'light';

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
        windSpeed,
        isWindy,
        location,
        region,
        localTime,
        isDay,
        weatherDescription,
        effectiveTheme,
        isSimulating,
        setThemeMode,
        setCustomLocation,
        setTimePhaseOverride,
        setWeatherOverride,
        resetToLiveLocation,
        refreshWeather,
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  );
}

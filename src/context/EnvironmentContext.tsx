'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
  setThemeMode: (mode: ThemeMode) => void;
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
  setThemeMode: () => {},
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
  const [localTime, setLocalTime] = useState<string>('');
  const [isDay, setIsDay] = useState<boolean>(true);
  const [weatherDescription, setWeatherDescription] = useState<string>('Clear');
  const [sunriseTime, setSunriseTime] = useState<Date | null>(null);
  const [sunsetTime, setSunsetTime] = useState<Date | null>(null);

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
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    // Format local time string (e.g. "10:14 AM")
    const timeFormatter = new Intl.DateTimeFormat([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    setLocalTime(timeFormatter.format(now));

    // If we have exact sunrise and sunset times from weather API
    if (sunriseTime && sunsetTime) {
      const sunriseMinutes = sunriseTime.getHours() * 60 + sunriseTime.getMinutes();
      const sunsetMinutes = sunsetTime.getHours() * 60 + sunsetTime.getMinutes();

      const dawnStart = sunriseMinutes - 45;
      const dawnEnd = sunriseMinutes + 30;
      const goldenHourStart = sunsetMinutes - 60;
      const sunsetEnd = sunsetMinutes + 45;

      if (currentMinutes >= dawnStart && currentMinutes < dawnEnd) {
        setTimePhase('dawn');
        setIsDay(true);
      } else if (currentMinutes >= dawnEnd && currentMinutes < 12 * 60) {
        setTimePhase('morning');
        setIsDay(true);
      } else if (currentMinutes >= 12 * 60 && currentMinutes < goldenHourStart) {
        setTimePhase('afternoon');
        setIsDay(true);
      } else if (currentMinutes >= goldenHourStart && currentMinutes < sunsetMinutes) {
        setTimePhase('goldenHour');
        setIsDay(true);
      } else if (currentMinutes >= sunsetMinutes && currentMinutes < sunsetEnd) {
        setTimePhase('sunset');
        setIsDay(false);
      } else {
        setTimePhase('night');
        setIsDay(false);
      }
      return;
    }

    // Fallback heuristic based on local hours
    const hour = now.getHours();
    if (hour >= 5 && hour < 7) {
      setTimePhase('dawn');
      setIsDay(true);
    } else if (hour >= 7 && hour < 12) {
      setTimePhase('morning');
      setIsDay(true);
    } else if (hour >= 12 && hour < 17) {
      setTimePhase('afternoon');
      setIsDay(true);
    } else if (hour >= 17 && hour < 18) {
      setTimePhase('goldenHour');
      setIsDay(true);
    } else if (hour >= 18 && hour < 19) {
      setTimePhase('sunset');
      setIsDay(false);
    } else {
      setTimePhase('night');
      setIsDay(false);
    }
  }, [sunriseTime, sunsetTime]);

  // Real-time clock update (every second)
  useEffect(() => {
    updateTimePhase();
    const interval = setInterval(updateTimePhase, 1000);
    return () => clearInterval(interval);
  }, [updateTimePhase]);

  // 2. Weather Engine (Fetches user location & current weather)
  const fetchWeather = useCallback(async () => {
    try {
      // Step A: Determine Location (IP-based fallback or timezone)
      let lat = 17.385; // Default Hyderabad fallback
      let lon = 78.4867;
      let locName = 'Hyderabad';
      let detectedRegion: LocationRegion = 'india';

      try {
        const geoRes = await fetch('https://ipwho.is/', { cache: 'no-store' });
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (geoData && geoData.success !== false) {
            lat = geoData.latitude || lat;
            lon = geoData.longitude || lon;
            locName = geoData.city || geoData.region || geoData.country || locName;

            const locLower = `${geoData.city || ''} ${geoData.region || ''} ${geoData.country || ''}`.toLowerCase();
            const countryCode = (geoData.country_code || '').toUpperCase();

            if (countryCode === 'IN' || locLower.includes('india') || locLower.includes('hyderabad') || locLower.includes('mumbai') || locLower.includes('delhi') || locLower.includes('bangalore') || locLower.includes('bengaluru')) {
              detectedRegion = 'india';
            } else if (countryCode === 'US' || countryCode === 'CA' || locLower.includes('united states') || locLower.includes('california') || locLower.includes('york') || locLower.includes('francisco') || locLower.includes('seattle')) {
              detectedRegion = 'us';
            } else if (['GB', 'FR', 'DE', 'IT', 'ES', 'NL', 'CH', 'SE'].includes(countryCode) || locLower.includes('london') || locLower.includes('paris') || locLower.includes('berlin') || locLower.includes('europe')) {
              detectedRegion = 'europe';
            } else if (['JP', 'SG', 'KR', 'CN', 'AE', 'TH', 'ID'].includes(countryCode) || locLower.includes('tokyo') || locLower.includes('singapore') || locLower.includes('dubai') || locLower.includes('seoul')) {
              detectedRegion = 'asia';
            } else {
              detectedRegion = 'global';
            }
          }
        }
      } catch {
        // Try resolving city from browser timezone
        try {
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
          if (tz) {
            const parts = tz.split('/');
            locName = parts[parts.length - 1].replace(/_/g, ' ');
            const tzLower = tz.toLowerCase();
            if (tzLower.includes('calcutta') || tzLower.includes('kolkata') || tzLower.includes('india') || tzLower.includes('asia/colombo')) {
              detectedRegion = 'india';
            } else if (tzLower.includes('america') || tzLower.includes('us') || tzLower.includes('new_york') || tzLower.includes('los_angeles')) {
              detectedRegion = 'us';
            } else if (tzLower.includes('europe') || tzLower.includes('london') || tzLower.includes('paris')) {
              detectedRegion = 'europe';
            } else if (tzLower.includes('asia') || tzLower.includes('tokyo') || tzLower.includes('singapore')) {
              detectedRegion = 'asia';
            }
          }
        } catch {
          // Keep default
        }
      }

      setLocation(locName);
      setRegion(detectedRegion);

      // Step B: Fetch Live Weather from Open-Meteo API
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day&daily=sunrise,sunset&timezone=auto`;
      const wRes = await fetch(weatherUrl, { cache: 'no-store' });
      
      if (wRes.ok) {
        const wData = await wRes.json();
        if (wData && wData.current) {
          const temp = Math.round(wData.current.temperature_2m);
          setTemperature(temp);

          const wmo = mapWmoCode(wData.current.weather_code);
          setWeatherState(wmo.state);
          setWeatherDescription(wmo.description);

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
      // Fail silently: graceful fallback is already active
    }
  }, []);

  // Fetch weather on mount and refresh every 20 minutes
  useEffect(() => {
    fetchWeather();
    const weatherInterval = setInterval(fetchWeather, 20 * 60 * 1000);
    return () => clearInterval(weatherInterval);
  }, [fetchWeather]);

  // 3. Compute Effective Theme (Syncing with next-themes)
  let effectiveTheme: 'light' | 'dark' = 'light';
  if (themeMode === 'light') {
    effectiveTheme = 'light';
  } else if (themeMode === 'dark') {
    effectiveTheme = 'dark';
  } else {
    // In system mode: daytime phases -> light, evening/sunset/night -> dark
    effectiveTheme = isDay && (timePhase === 'morning' || timePhase === 'afternoon' || timePhase === 'dawn') ? 'light' : 'dark';
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
        setThemeMode,
        refreshWeather: fetchWeather,
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  );
}

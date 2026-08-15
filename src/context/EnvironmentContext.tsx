'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useTheme } from 'next-themes';

export type ThemeMode = 'light' | 'dark' | 'system';
export type TimePhase = 'dawn' | 'morning' | 'afternoon' | 'goldenHour' | 'sunset' | 'twilight' | 'night';
export type WeatherState = 'clear' | 'partlyCloudy' | 'cloudy' | 'rain' | 'heavyRain' | 'thunderstorm' | 'fog' | 'snow';
export type LocationRegion = 'india' | 'us' | 'europe' | 'asia' | 'global';

export interface EnvironmentState {
  themeMode: ThemeMode;
  timePhase: TimePhase;
  weatherState: WeatherState;
  temperature: number | null;
  cloudCover: number; // 0 to 100%
  precipitation: number; // mm
  windSpeed: number; // km/h
  isWindy: boolean;
  location: string;
  country: string;
  region: LocationRegion;
  localTime: string;
  isDay: boolean;
  weatherDescription: string;
  effectiveTheme: 'light' | 'dark';
  isSimulating: boolean;
  latitude: number;
  longitude: number;
  timezone: string;
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
  temperature: 28,
  cloudCover: 20,
  precipitation: 0,
  windSpeed: 10,
  isWindy: false,
  location: 'Hyderabad',
  country: 'India',
  region: 'india',
  localTime: '',
  isDay: true,
  weatherDescription: 'Clear',
  effectiveTheme: 'light',
  isSimulating: false,
  latitude: 17.385,
  longitude: 78.4867,
  timezone: 'Asia/Kolkata',
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
function mapWmoCode(code: number): { state: WeatherState; description: string; defaultCloud: number } {
  if (code === 0) return { state: 'clear', description: 'Clear Sky', defaultCloud: 5 };
  if (code === 1) return { state: 'clear', description: 'Mainly Clear', defaultCloud: 20 };
  if (code === 2) return { state: 'partlyCloudy', description: 'Partly Cloudy', defaultCloud: 45 };
  if (code === 3) return { state: 'cloudy', description: 'Overcast', defaultCloud: 85 };
  if (code === 45 || code === 48) return { state: 'fog', description: 'Fog / Mist', defaultCloud: 90 };
  if (code >= 51 && code <= 55) return { state: 'rain', description: 'Light Drizzle', defaultCloud: 75 };
  if (code >= 61 && code <= 63) return { state: 'rain', description: 'Rain', defaultCloud: 85 };
  if (code === 65 || code === 67 || (code >= 80 && code <= 82)) return { state: 'heavyRain', description: 'Heavy Rain', defaultCloud: 95 };
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return { state: 'snow', description: 'Snow', defaultCloud: 80 };
  if (code >= 95 && code <= 99) return { state: 'thunderstorm', description: 'Thunderstorm', defaultCloud: 100 };
  return { state: 'clear', description: 'Clear', defaultCloud: 15 };
}

export function EnvironmentProvider({ children }: { children: React.ReactNode }) {
  const { setTheme } = useTheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [timePhase, setTimePhase] = useState<TimePhase>('afternoon');
  const [weatherState, setWeatherState] = useState<WeatherState>('clear');
  const [temperature, setTemperature] = useState<number | null>(28);
  const [cloudCover, setCloudCover] = useState<number>(20);
  const [precipitation, setPrecipitation] = useState<number>(0);
  const [windSpeed, setWindSpeed] = useState<number>(10);
  const [isWindy, setIsWindy] = useState<boolean>(false);
  const [location, setLocation] = useState<string>('Hyderabad');
  const [country, setCountry] = useState<string>('India');
  const [region, setRegion] = useState<LocationRegion>('india');
  const [latitude, setLatitude] = useState<number>(17.385);
  const [longitude, setLongitude] = useState<number>(78.4867);
  const [currentTimezone, setCurrentTimezone] = useState<string>('Asia/Kolkata');
  const [localTime, setLocalTime] = useState<string>('');
  const [isDay, setIsDay] = useState<boolean>(true);
  const [weatherDescription, setWeatherDescription] = useState<string>('Clear');
  const [sunriseTime, setSunriseTime] = useState<Date | null>(null);
  const [sunsetTime, setSunsetTime] = useState<Date | null>(null);

  // Simulator Overrides
  const [timePhaseOverride, setTimePhaseOverride] = useState<TimePhase | null>(null);
  const [weatherOverride, setWeatherOverride] = useState<WeatherState | null>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

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

  // 1. Calculate Time Phase from Current Local Time & Solar Horizons
  const updateTimePhase = useCallback(() => {
    const now = new Date();
    
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

    // Default Sunrise (6:00 AM) & Sunset (6:30 PM) if API values unavailable
    let srMinutes = 6 * 60; // 360
    let ssMinutes = 18 * 60 + 30; // 1110

    if (sunriseTime && sunsetTime) {
      srMinutes = sunriseTime.getHours() * 60 + sunriseTime.getMinutes();
      ssMinutes = sunsetTime.getHours() * 60 + sunsetTime.getMinutes();
    }

    // 7 Natural Environmental Solar Phases:
    // Dawn: Sunrise - 50m to Sunrise + 25m
    // Morning: Sunrise + 25m to 11:30 AM
    // Afternoon: 11:30 AM to Sunset - 60m
    // Golden Hour: Sunset - 60m to Sunset
    // Sunset: Sunset to Sunset + 35m
    // Twilight: Sunset + 35m to Sunset + 75m
    // Night: Sunset + 75m to Sunrise - 50m

    const dawnStart = srMinutes - 50;
    const morningStart = srMinutes + 25;
    const afternoonStart = 11 * 60 + 30;
    const goldenHourStart = ssMinutes - 60;
    const sunsetStart = ssMinutes;
    const twilightStart = ssMinutes + 35;
    const nightStart = ssMinutes + 75;

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
    } else if (currentTotalMinutes >= sunsetStart && currentTotalMinutes < twilightStart) {
      computedPhase = 'sunset';
      computedIsDay = false;
    } else if (currentTotalMinutes >= twilightStart && currentTotalMinutes < nightStart) {
      computedPhase = 'twilight';
      computedIsDay = false;
    } else {
      computedPhase = 'night';
      computedIsDay = false;
    }

    if (!timePhaseOverride) {
      setTimePhase(computedPhase);
      setIsDay(computedIsDay);
    } else {
      setTimePhase(timePhaseOverride);
      setIsDay(timePhaseOverride !== 'sunset' && timePhaseOverride !== 'twilight' && timePhaseOverride !== 'night');
    }
  }, [sunriseTime, sunsetTime, currentTimezone, timePhaseOverride]);

  // Real-time clock tick (every second)
  useEffect(() => {
    updateTimePhase();
    const interval = setInterval(updateTimePhase, 1000);
    return () => clearInterval(interval);
  }, [updateTimePhase]);

  // 2. Weather Engine (Live Open-Meteo API Fetch)
  const fetchWeather = useCallback(async (customLat?: number, customLon?: number, customName?: string, customCountry?: string, customTz?: string) => {
    try {
      let lat = customLat ?? 17.385;
      let lon = customLon ?? 78.4867;
      let locName = customName ?? 'Hyderabad';
      let locCountry = customCountry ?? 'India';
      let tzName = customTz ?? 'Asia/Kolkata';
      let detectedRegion: LocationRegion = 'india';

      // If no custom coordinates provided, attempt browser geolocation / IP lookup
      if (customLat === undefined) {
        let gotBrowserGeo = false;

        if (typeof window !== 'undefined' && 'geolocation' in navigator) {
          try {
            const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 3500 });
            });
            if (pos && pos.coords) {
              lat = pos.coords.latitude;
              lon = pos.coords.longitude;
              gotBrowserGeo = true;
            }
          } catch {
            // Geolocation denied or timed out
          }
        }

        if (!gotBrowserGeo) {
          try {
            const geoRes = await fetch('https://ipwho.is/', { cache: 'no-store' });
            if (geoRes.ok) {
              const geoData = await geoRes.json();
              if (geoData && geoData.success !== false) {
                lat = geoData.latitude || lat;
                lon = geoData.longitude || lon;
                locName = geoData.city || geoData.region || locName;
                locCountry = geoData.country || locCountry;
                tzName = geoData.timezone?.id || tzName;
              }
            }
          } catch {
            // Keep default
          }
        }
      }

      // Region categorization
      const locCombined = `${locName} ${locCountry}`.toLowerCase();
      if (locCombined.includes('india') || locCombined.includes('hyderabad') || locCombined.includes('mumbai') || locCombined.includes('delhi')) {
        detectedRegion = 'india';
      } else if (locCombined.includes('united states') || locCombined.includes('usa') || locCombined.includes('york') || locCombined.includes('francisco') || locCombined.includes('canada')) {
        detectedRegion = 'us';
      } else if (locCombined.includes('kingdom') || locCombined.includes('london') || locCombined.includes('france') || locCombined.includes('paris') || locCombined.includes('germany') || locCombined.includes('europe')) {
        detectedRegion = 'europe';
      } else if (locCombined.includes('japan') || locCombined.includes('tokyo') || locCombined.includes('singapore') || locCombined.includes('emirates') || locCombined.includes('dubai') || locCombined.includes('asia')) {
        detectedRegion = 'asia';
      } else {
        detectedRegion = 'global';
      }

      setLocation(locName);
      setCountry(locCountry);
      setRegion(detectedRegion);
      setLatitude(lat);
      setLongitude(lon);
      setCurrentTimezone(tzName);

      // Fetch comprehensive meteorological data from Open-Meteo
      const tzParam = tzName ? encodeURIComponent(tzName) : 'auto';
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day,wind_speed_10m,relative_humidity_2m,cloud_cover,precipitation&daily=sunrise,sunset&timezone=${tzParam}`;
      const wRes = await fetch(weatherUrl, { cache: 'no-store' });
      
      if (wRes.ok) {
        const wData = await wRes.json();
        if (wData && wData.current) {
          const temp = Math.round(wData.current.temperature_2m);
          setTemperature(temp);

          const wSpeed = Math.round(wData.current.wind_speed_10m || 8);
          setWindSpeed(wSpeed);
          setIsWindy(wSpeed >= 14);

          const cCover = typeof wData.current.cloud_cover === 'number' ? wData.current.cloud_cover : 25;
          setCloudCover(cCover);

          const precip = typeof wData.current.precipitation === 'number' ? wData.current.precipitation : 0;
          setPrecipitation(precip);

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
      // Graceful fallback
    }
  }, [weatherOverride]);

  // Initial fetch on mount & recurring 15-min background sync
  useEffect(() => {
    fetchWeather();
    const interval = setInterval(() => fetchWeather(), 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchWeather]);

  // Custom location search handler (supports any global city / state / country)
  const setCustomLocation = async (cityName: string, lat?: number, lon?: number, timezone?: string) => {
    setIsSimulating(true);
    let targetLat = lat;
    let targetLon = lon;
    let targetTz = timezone;
    let targetName = cityName;
    let targetCountry = '';

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
            targetCountry = result.country || '';
            targetTz = result.timezone;
          }
        }
      } catch {
        // Ignore
      }
    }

    if (targetLat !== undefined && targetLon !== undefined) {
      await fetchWeather(targetLat, targetLon, targetName, targetCountry, targetTz);
    }
  };

  const resetToLiveLocation = () => {
    setIsSimulating(false);
    setTimePhaseOverride(null);
    setWeatherOverride(null);
    fetchWeather();
  };

  const refreshWeather = () => {
    fetchWeather(latitude, longitude, location, country, currentTimezone);
  };

  // Sync NextThemes
  const effectiveTheme = themeMode === 'dark' || (themeMode === 'system' && (!isDay || timePhase === 'night' || timePhase === 'sunset' || timePhase === 'twilight')) 
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
        cloudCover,
        precipitation,
        windSpeed,
        isWindy,
        location,
        country,
        region,
        localTime,
        isDay,
        weatherDescription,
        effectiveTheme,
        isSimulating,
        latitude,
        longitude,
        timezone: currentTimezone,
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

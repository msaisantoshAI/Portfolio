'use client';

import React from 'react';
import { useEnvironment, WeatherState } from '@/context/EnvironmentContext';

function getWeatherIcon(state: WeatherState, isDay: boolean): string {
  switch (state) {
    case 'clear':
      return isDay ? '☀' : '🌙';
    case 'partlyCloudy':
      return isDay ? '⛅' : '☁';
    case 'cloudy':
      return '☁';
    case 'rain':
      return '🌧';
    case 'thunderstorm':
      return '⛈';
    case 'fog':
      return '🌫';
    case 'snow':
      return '❄';
    default:
      return isDay ? '☀' : '🌙';
  }
}

export default function WeatherHUD() {
  const { location, localTime, temperature, weatherState, isDay, weatherDescription, themeMode, timePhase } = useEnvironment();

  if (!localTime) return null;

  const icon = getWeatherIcon(weatherState, isDay);

  return (
    <div 
      className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a0f1d]/85 backdrop-blur-xl border border-white/20 text-white font-mono text-[11px] sm:text-xs shadow-md transition-all duration-300 pointer-events-auto"
      title={`Local environment: ${location} • ${temperature !== null ? `${temperature}°C, ` : ''}${weatherDescription} (${timePhase} phase)`}
    >
      <span className="flex items-center gap-1 text-zinc-300">
        <span className="text-blue-400">📍</span>
        <span className="font-semibold text-white truncate max-w-[90px]">{location}</span>
      </span>

      {temperature !== null && (
        <>
          <span className="text-white/30">•</span>
          <span className="font-medium text-zinc-200">{temperature}°C</span>
        </>
      )}

      <span className="text-white/30">•</span>
      <span className="flex items-center gap-1 text-amber-300">
        <span>{icon}</span>
        <span className="font-semibold text-white tracking-wider">{localTime}</span>
      </span>

      {themeMode === 'system' && (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" title="Live environment synced" />
      )}
    </div>
  );
}

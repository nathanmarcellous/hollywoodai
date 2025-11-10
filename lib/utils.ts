import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const AUDIO_API = 'https://advanced-internship-api-production.up.railway.app/';

export const formatTime = (time: number | undefined): string => {
  if (typeof time === 'number' && !isNaN(time)) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    // Convert to string and pad with leading zeros if necessary
    const formatMinutes = minutes.toString().padStart(2, '0');
    const formatSeconds = seconds.toString().padStart(2, '0');
    return `${formatMinutes}:${formatSeconds}`;
  }

  return '00:00';
};

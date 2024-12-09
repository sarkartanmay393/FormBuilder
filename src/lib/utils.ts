import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useSupabase } from "./initSupabase"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function generateRandomInteger(): number {
  return Math.floor(Math.random() * 10000);
}

export const fetchUserIp = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error fetching IP:', error);
  }
};
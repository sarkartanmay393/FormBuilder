import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useSupabase } from "./initSupabase"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function generateRandomInteger(): number {
  return Math.floor(Math.random() * 10000);
}

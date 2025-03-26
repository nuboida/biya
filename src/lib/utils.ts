import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-UK", {
    weekday: 'long',
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const convertKoboToNaira = (value: number) => {
  return (value/100).toFixed(2);
}

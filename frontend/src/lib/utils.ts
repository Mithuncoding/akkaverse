import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * `cn` merges Tailwind class names intelligently.
 * - `clsx` handles conditional/array class inputs.
 * - `twMerge` removes conflicting Tailwind classes (e.g. `p-2 p-4` -> `p-4`).
 * This is the standard shadcn/ui helper used by every component.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a timestamp into a local string
 * @param timestamp The timestamp in milliseconds
 * @returns A formatted date string or 'N/A' if timestamp is invalid
 */
export const formatDate = (timestamp: number | undefined): string => {
  if (!timestamp) return 'N/A';
  return new Date(timestamp).toLocaleString();
};

/**
 * Calculates and formats the duration between two timestamps
 * @param startTime Start timestamp in milliseconds
 * @param endTime End timestamp in milliseconds (uses Date.now() if not provided)
 * @returns A formatted duration string (e.g., "5s", "2m 5s", "1h 2m 5s")
 */
export const getDuration = (
  startTime: number | undefined,
  endTime?: number,
): string => {
  if (!startTime) return 'N/A';

  const end = endTime || Date.now();
  const diff = Math.max(0, end - startTime);

  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  const parts: string[] = [];

  if (hours > 0) {
    parts.push(`${hours}h`);
    parts.push(`${minutes}m`);
    parts.push(`${seconds}s`);
  } else if (minutes > 0) {
    parts.push(`${minutes}m`);
    parts.push(`${seconds}s`);
  } else {
    parts.push(`${seconds}s`);
  }

  return parts.join(' ');
};

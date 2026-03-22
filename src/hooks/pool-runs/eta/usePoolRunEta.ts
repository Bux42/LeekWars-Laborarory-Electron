import { getDuration } from '../../../renderer/utils/DateUtils';

export const usePoolRunEta = (
  processedFights: number,
  totalFights: number,
  startTime: number,
): string => {
  if (processedFights === 0 || !startTime) {
    return ''; // No fights processed yet, cannot estimate
  }

  const elapsedTime = Date.now() - startTime;
  const averageTimePerFight = elapsedTime / processedFights;
  const remainingFights = totalFights - processedFights;
  const estimatedRemainingTime = averageTimePerFight * remainingFights;

  if (!estimatedRemainingTime || estimatedRemainingTime <= 0) {
    return '';
  }

  const fightsPerSecond = processedFights / (elapsedTime / 1000);
  const now = Date.now();
  return `ETA: ${getDuration(now, now + estimatedRemainingTime)} (${fightsPerSecond.toFixed(2)} fights/s)`;
};

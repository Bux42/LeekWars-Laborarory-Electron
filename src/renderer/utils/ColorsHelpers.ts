export function hexToRgb(hexColor: string) {
  const normalizedHex = hexColor.replace('#', '');
  const fullHex =
    normalizedHex.length === 3
      ? normalizedHex
          .split('')
          .map((char) => `${char}${char}`)
          .join('')
      : normalizedHex;

  return {
    red: Number.parseInt(fullHex.slice(0, 2), 16),
    green: Number.parseInt(fullHex.slice(2, 4), 16),
    blue: Number.parseInt(fullHex.slice(4, 6), 16),
  };
}

export function mixColors(startHex: string, endHex: string, ratio: number) {
  const safeRatio = Math.max(0, Math.min(1, ratio));
  const startColor = hexToRgb(startHex);
  const endColor = hexToRgb(endHex);

  const red = Math.round(
    startColor.red + (endColor.red - startColor.red) * safeRatio,
  );
  const green = Math.round(
    startColor.green + (endColor.green - startColor.green) * safeRatio,
  );
  const blue = Math.round(
    startColor.blue + (endColor.blue - startColor.blue) * safeRatio,
  );

  return `rgb(${red}, ${green}, ${blue})`;
}

export function getHeatColor(normalizedValue: number) {
  const firstStop = '#f87171';
  const middleStop = '#fde047';
  const endStop = '#34d399';

  if (normalizedValue <= 0.5) {
    return mixColors(firstStop, middleStop, normalizedValue * 2);
  }

  return mixColors(middleStop, endStop, (normalizedValue - 0.5) * 2);
}

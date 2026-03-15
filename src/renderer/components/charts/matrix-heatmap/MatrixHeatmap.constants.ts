import {
  IMatrixHeatmapEntity,
  IMatrixHeatmapPair,
} from './MatrixHeatmapChart.types';

export const DEFAULT_TITLE = 'Matrix Heatmap';
export const DEFAULT_CELL_SIZE = 50;
export const DEFAULT_CELL_MIN_SIZE = 20;
export const DEFAULT_CELL_MAX_SIZE = 120;
export const AXIS_CELL_SIZE = 110;

export const MOCK_ENTITIES: IMatrixHeatmapEntity[] = [
  { id: 'f1', label: 'Leek Fighter Alpha' },
  { id: 'f2', label: 'Leek Fighter Beta' },
  { id: 'f3', label: 'Leek Fighter Gamma' },
  { id: 'f4', label: 'Leek Fighter Delta' },
  { id: 'f5', label: 'Leek Fighter Epsilon' },
];

export const MOCK_PAIRS: IMatrixHeatmapPair[] = [
  { from: MOCK_ENTITIES[0], to: MOCK_ENTITIES[1], value: 28 },
  { from: MOCK_ENTITIES[0], to: MOCK_ENTITIES[2], value: 62 },
  { from: MOCK_ENTITIES[0], to: MOCK_ENTITIES[3], value: 14 },
  { from: MOCK_ENTITIES[0], to: MOCK_ENTITIES[4], value: 85 },
  { from: MOCK_ENTITIES[1], to: MOCK_ENTITIES[0], value: 46 },
  { from: MOCK_ENTITIES[1], to: MOCK_ENTITIES[2], value: 19 },
  { from: MOCK_ENTITIES[1], to: MOCK_ENTITIES[3], value: 92 },
  { from: MOCK_ENTITIES[1], to: MOCK_ENTITIES[4], value: 38 },
  { from: MOCK_ENTITIES[2], to: MOCK_ENTITIES[0], value: 71 },
  { from: MOCK_ENTITIES[2], to: MOCK_ENTITIES[1], value: 33 },
  { from: MOCK_ENTITIES[2], to: MOCK_ENTITIES[3], value: 54 },
  { from: MOCK_ENTITIES[2], to: MOCK_ENTITIES[4], value: 12 },
  { from: MOCK_ENTITIES[3], to: MOCK_ENTITIES[0], value: 8 },
  { from: MOCK_ENTITIES[3], to: MOCK_ENTITIES[1], value: 49 },
  { from: MOCK_ENTITIES[3], to: MOCK_ENTITIES[2], value: 25 },
  { from: MOCK_ENTITIES[3], to: MOCK_ENTITIES[4], value: 67 },
  { from: MOCK_ENTITIES[4], to: MOCK_ENTITIES[0], value: 59 },
  { from: MOCK_ENTITIES[4], to: MOCK_ENTITIES[1], value: 16 },
  { from: MOCK_ENTITIES[4], to: MOCK_ENTITIES[2], value: 77 },
  { from: MOCK_ENTITIES[4], to: MOCK_ENTITIES[3], value: 43 },
];

import { JSX } from 'react';

export interface IMatrixHeatmapEntity {
  id: string;
  label: string;
}

export interface IMatrixHeatmapPair {
  from: IMatrixHeatmapEntity;
  to: IMatrixHeatmapEntity;
  value: number;
}

export interface IMatrixHeatmapChartProps {
  pairs?: IMatrixHeatmapPair[];
  title?: string;
  cellSize?: number;
  onHoverEntityElement: (entityId: string) => JSX.Element;
  onHoverPairElement: (
    fromId: string,
    toId: string,
    value: number,
  ) => JSX.Element;
}

export interface ITalentDataPoint {
  entityName: string;
  talent: number;
  datetime: string | number | Date;
}

export interface ITalentChartProps {
  data: ITalentDataPoint[];
  title?: string;
  height?: number;
}

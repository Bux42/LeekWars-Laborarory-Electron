export interface ILeek {
  id: number;
  name: string;
  level: number;
  talent: number;
  ai: string;
  image: string;
}

export type SortField = 'name' | 'level' | 'talent' | 'ai';
export type SortDirection = 'asc' | 'desc';

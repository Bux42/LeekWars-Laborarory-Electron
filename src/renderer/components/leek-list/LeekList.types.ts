import { ILeek } from '../../../services/leekwars-laboratory/types/leek/Leek.types';

export interface ILeekListProps {
  leeks: ILeek[];
  showElo?: boolean;
}

export type SortField = 'name' | 'level' | 'talent' | 'ai';
export type SortDirection = 'asc' | 'desc';

import { ILeek } from '../../../services/leekwars-laboratory/leek/Leek.types';

export interface ILeekListProps {
  leeks: ILeek[];
}

export type SortField = 'name' | 'level' | 'talent' | 'ai';
export type SortDirection = 'asc' | 'desc';

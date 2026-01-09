import { ILeek } from '../../../../services/leekwars-laboratory/types/leek/Leek.types';
import { IDropdownItem } from '../../shared/dropdown/Dropdown.types';

export interface ILeekListProps {
  leeks: ILeek[];
  showElo?: boolean;
  getDropdownItems?: (leek: ILeek) => IDropdownItem[];
}

export type SortField = 'name' | 'level' | 'talent' | 'ai';
export type SortDirection = 'asc' | 'desc';

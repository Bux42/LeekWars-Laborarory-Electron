import { LeekResponse } from '../../../../services/leekwarsToolsAPI.schemas';
import { IDropdownItem } from '../../shared/dropdown/Dropdown.types';

export interface ILeekListProps {
  leeks: LeekResponse[];
  getDropdownItems?: (leek: LeekResponse) => IDropdownItem[];
}

export type SortField = 'name' | 'level' | 'ai';
export type SortDirection = 'asc' | 'desc';

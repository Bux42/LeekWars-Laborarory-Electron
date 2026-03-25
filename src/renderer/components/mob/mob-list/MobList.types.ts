import { MobResponse } from '../../../../services/leekwarsToolsAPI.schemas';
import { IDropdownItem } from '../../shared/dropdown/Dropdown.types';

export interface IMobListProps {
  mobs: MobResponse[];
  getDropdownItems?: (mob: MobResponse) => IDropdownItem[];
  onRemoveMob?: (mobId: string) => void;
  onAddMob?: (mobId: string) => void;
}

export type SortField = 'name' | 'type' | 'level' | 'ai';
export type SortDirection = 'asc' | 'desc';

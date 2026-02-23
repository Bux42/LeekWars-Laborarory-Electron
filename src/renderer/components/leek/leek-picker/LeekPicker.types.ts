import { LeekResponse } from '../../../../services/leekwarsToolsAPI.schemas';

export interface ILeekPickerProps {
  availableLeeks: LeekResponse[];
  selectedLeekIds: string[];
  onLeekSelect: (leekId: string) => void;
}

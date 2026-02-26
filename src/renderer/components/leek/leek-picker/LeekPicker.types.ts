import { LeekResponse } from '../../../../services/leekwarsToolsAPI.schemas';

export interface ILeekPickerProps {
  label: string;
  availableLeeks: LeekResponse[];
  selectedLeekIds: string[];
  onLeekSelect: (leekId: string) => void;
}

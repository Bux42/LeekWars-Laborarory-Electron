import { LeekGroupResponse } from '../../../../services/leekwarsToolsAPI.schemas';

export interface ILeekGroupPickerProps {
  label: string;
  availableLeekGroups: LeekGroupResponse[];
  selectedLeekGroupIds: string[];
  onAddLeekGroup: (leekGroupId: string) => void;
}

import { LeekGroupResponse } from '../../../../services/leekwarsToolsAPI.schemas';

export interface ILeekGroupListProps {
  leekGroups: LeekGroupResponse[];
  onRemoveLeekGroup?: (leekGroupId: string) => void;
  showAddLeekButton?: boolean;
  showAddGroupButton?: boolean;
  showRemoveLeekGroupButton?: boolean;
  onAddLeekGroup?: (leekGroupId: string) => void;
}

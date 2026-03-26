import { LeekGroupResponse } from '../../../../services/leekwarsToolsAPI.schemas';

export interface ILeekGroupCardProps {
  leekGroup: LeekGroupResponse;
  showAddLeekButton?: boolean;
  showRemoveLeekGroupButton?: boolean;
  onRemoveLeekGroup?: (leekGroupId: string) => void;
  showAddGroupButton?: boolean;
  onAddLeekGroup?: (leekGroupId: string) => void;
}

import { TeamResponse } from '../../../../services/leekwarsToolsAPI.schemas';

export interface ITeamCardProps {
  team: TeamResponse;
  showDeleteButton?: boolean;
  onDelete?: (teamId: string) => void;
}

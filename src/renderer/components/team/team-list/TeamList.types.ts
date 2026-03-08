import { TeamResponse } from '../../../../services/leekwarsToolsAPI.schemas';

export interface ITeamListProps {
  teams: TeamResponse[];
  showRemoveTeamButton?: boolean;
  onRemoveTeam?: (teamId: string) => void;
}

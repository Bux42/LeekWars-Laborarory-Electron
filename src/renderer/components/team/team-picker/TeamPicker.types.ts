import { TeamResponse } from '../../../../services/leekwarsToolsAPI.schemas';

export interface ITeamPickerProps {
  label: string;
  availableTeams: TeamResponse[];
  selectedTeamIds: string[];
  onTeamSelect: (teamId: string) => void;
}
